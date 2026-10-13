import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { PassThrough } from "node:stream";
import App from "./App";
export { getPageMetadata, structuredData, publicPaths, prerenderPaths, absoluteUrl } from "./lib/seo";

export function render(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = "";
    const body = new PassThrough();
    body.on("data", chunk => { html += chunk.toString(); });
    body.on("end", () => { clearTimeout(timeout); resolve(html); });
    body.on("error", reject);
    const stream = renderToPipeableStream(<StaticRouter location={path}><App /></StaticRouter>, {
      onAllReady() { stream.pipe(body); },
      onShellError(error) { clearTimeout(timeout); reject(error); },
      onError(error) { clearTimeout(timeout); reject(error); },
    });
    const timeout = setTimeout(() => { stream.abort(); reject(new Error(`Prerender timed out: ${path}`)); }, 15000);
  });
}
