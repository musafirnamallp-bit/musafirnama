// Production-like local preview: clean URLs, redirects and genuine HTTP 404s.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve("dist");
const aliases = { "/get-quotes": "/quotes", "/customize-trip": "/customize", "/blog": "/travel-guides", "/login": "/quotes" };
const mime = { ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".css": "text/css", ".xml": "application/xml", ".txt": "text/plain", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".ico": "image/x-icon", ".woff2": "font/woff2" };
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    let path = decodeURIComponent(url.pathname);
    if (path.length > 1 && path.endsWith("/")) { res.writeHead(308, { Location: path.slice(0, -1) + url.search }); return res.end(); }
    if (aliases[path]) { res.writeHead(308, { Location: aliases[path] + url.search }); return res.end(); }
    let filename = resolve(root, path === "/" ? "index.html" : path.slice(1));
    if (!filename.startsWith(root + sep)) throw new Error("Invalid path");
    let code = 200;
    if (!extname(filename)) filename += ".html";
    try { if (!(await stat(filename)).isFile()) throw new Error("Not a file"); }
    catch { filename = resolve(root, "404.html"); code = 404; }
    const data = await readFile(filename);
    res.writeHead(code, { "Content-Type": mime[extname(filename)] || "application/octet-stream", "Cache-Control": path.startsWith("/assets/") ? "public, max-age=31536000, immutable" : "no-cache", "X-Content-Type-Options": "nosniff" });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch { res.writeHead(400); res.end("Bad request"); }
});
server.listen(Number(process.env.PORT || 4173), "127.0.0.1", () => console.log(`Preview: http://127.0.0.1:${server.address().port}`));
