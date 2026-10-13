import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { render, getPageMetadata, structuredData, publicPaths, prerenderPaths, absoluteUrl } from "../dist-ssr/entry-server.js";

const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const template = await readFile("dist/index.html", "utf8");
if (!template.includes("<!--app-html-->") || !template.includes("<!--app-head-->")) throw new Error("Missing prerender template markers");
for (const path of prerenderPaths) {
  const meta = getPageMetadata(path);
  const tags = {
    description: meta.description, robots: meta.noindex ? "noindex,follow" : "index,follow",
    "og:title": meta.title, "og:description": meta.description, "og:type": meta.type || "website",
    "og:url": absoluteUrl(meta.path), "og:image": absoluteUrl(meta.image), "og:site_name": "Musafirnama",
    "twitter:card": "summary_large_image", "twitter:title": meta.title, "twitter:description": meta.description, "twitter:image": absoluteUrl(meta.image),
  };
  const head = [
    `<title>${escape(meta.title)}</title>`,
    `<link rel="canonical" href="${escape(absoluteUrl(meta.path))}" />`,
    ...Object.entries(tags).map(([key, value]) => `<meta ${key.startsWith("og:") ? "property" : "name"}="${key}" content="${escape(value)}" />`),
    `<script id="site-schema" type="application/ld+json">${JSON.stringify(structuredData(meta)).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
  const html = template.replace("<!--app-head-->", head).replace("<!--app-html-->", await render(path));
  const filename = resolve("dist", path === "/" ? "index.html" : `${path.slice(1)}.html`);
  await mkdir(dirname(filename), { recursive: true });
  await writeFile(filename, html);
}
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicPaths.map(path => `  <url><loc>${escape(absoluteUrl(path))}</loc></url>`).join("\n")}\n</urlset>\n`);
await writeFile("dist/robots.txt", "User-agent: *\nAllow: /\n\nSitemap: https://www.musafirnama.in/sitemap.xml\n");
console.log(`Prerendered ${prerenderPaths.length} pages; sitemap includes ${publicPaths.length} indexable URLs.`);
