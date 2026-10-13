export const productionQuoteEndpoint = "https://48zw367s12.execute-api.ap-south-1.amazonaws.com/first/";

/** The local mock override is excluded from production behavior. */
export function quoteEndpoint(development: boolean, override?: string): string {
  if (!development || !override) return productionQuoteEndpoint;
  let url: URL;
  try {
    url = new URL(override);
  } catch {
    throw new Error("VITE_QUOTE_API_URL must be a local HTTP mock endpoint.");
  }
  if (url.protocol !== "http:" || !["localhost", "127.0.0.1"].includes(url.hostname) || url.username || url.password || url.hash) {
    // Fail closed: a mistyped test setting must never fall back to the real API.
    throw new Error("VITE_QUOTE_API_URL is restricted to localhost or 127.0.0.1 in development.");
  }
  return url.href;
}
