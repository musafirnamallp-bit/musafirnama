import http from "node:http";

// Local browser verification only. Payloads remain in memory and are never
// forwarded or logged. Start with: node scripts/mock-quotes.mjs success
const mode = process.argv[2] || "success";
if (!["success", "rejected", "failure", "malformed", "timeout"].includes(mode)) {
  throw new Error("Use success, rejected, failure, malformed or timeout.");
}
const origins = new Set(["http://localhost:5173", "http://127.0.0.1:5173"]);
const stats = { mode, post_requests: 0, accepted_requests: 0, invalid_payloads: 0 };
const keys = ["destination", "travelers", "startDate", "endDate", "budget", "accommodation", "travelMode", "requirements", "name", "email", "phone"].sort();
const server = http.createServer(async (request, response) => {
  const origin = request.headers.origin;
  if (origin && !origins.has(origin)) {
    response.writeHead(403).end();
    return;
  }
  if (origin) response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Vary", "Origin");
  response.setHeader("Access-Control-Allow-Methods", "OPTIONS,POST,GET");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Cache-Control", "no-store");

  if (request.method === "GET" && request.url === "/stats") {
    response.end(JSON.stringify(stats));
    return;
  }
  if (request.url !== "/quotes") {
    response.writeHead(404).end(JSON.stringify({ statusCode: 404 }));
    return;
  }
  if (request.method === "OPTIONS") {
    response.writeHead(204).end();
    return;
  }
  if (request.method !== "POST") {
    response.writeHead(405).end(JSON.stringify({ statusCode: 405 }));
    return;
  }
  stats.post_requests += 1;
  let payload;
  try {
    let body = "";
    for await (const chunk of request) {
      body += chunk;
      if (body.length > 16000) throw new Error("Too large");
    }
    payload = JSON.parse(body);
    if (!payload || JSON.stringify(Object.keys(payload).sort()) !== JSON.stringify(keys)) throw new Error("Unexpected fields");
    if (!keys.filter(key => !["travelers", "budget"].includes(key)).every(key => typeof payload[key] === "string")) throw new Error("Expected strings");
    if (!Number.isInteger(payload.travelers) || payload.travelers < 1 || payload.travelers > 100) throw new Error("Invalid travelers");
    if (!Number.isFinite(payload.budget) || payload.budget < 1000) throw new Error("Invalid budget");
    if (!payload.destination.trim() || !payload.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || !/^\d{8,15}$/.test(payload.phone)) throw new Error("Invalid contact");
    if ((!payload.startDate || !payload.endDate) && !payload.requirements.includes("dates are flexible")) throw new Error("Missing dates");
  } catch {
    stats.invalid_payloads += 1;
    response.writeHead(400).end(JSON.stringify({ statusCode: 400, error: "Invalid mock payload" }));
    return;
  }
  payload = null;
  if (mode === "timeout") {
    const timer = setTimeout(() => response.end(JSON.stringify({ statusCode: 504 })), 25000);
    response.on("close", () => clearTimeout(timer));
    return;
  }
  if (mode === "failure") {
    response.writeHead(503).end(JSON.stringify({ statusCode: 503 }));
    return;
  }
  if (mode === "malformed") {
    response.end(JSON.stringify({ message: "No accepted status" }));
    return;
  }
  if (mode === "rejected") {
    response.end(JSON.stringify({ statusCode: 200, body: JSON.stringify({ success: false }) }));
    return;
  }
  stats.accepted_requests += 1;
  response.end(JSON.stringify({ statusCode: 200, body: JSON.stringify({ message: "Mock accepted" }) }));
});
server.listen(4174, "127.0.0.1", () => {
  console.log(`Local quote mock (${mode}): http://127.0.0.1:4174/quotes; counters at /stats. No live leads are sent.`);
});
