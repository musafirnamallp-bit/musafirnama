import assert from "node:assert/strict";
import { before, test } from "node:test";
import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = resolve(projectRoot, "dist");
const origin = "https://www.musafirnama.in";
let pages;
let sitemapUrls;
let vercel;
let builtFiles;

function decodeEntities(value) {
  const names = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, key) => {
    if (key.startsWith("#")) {
      const hex = key[1].toLowerCase() === "x";
      return String.fromCodePoint(parseInt(key.slice(hex ? 2 : 1), hex ? 16 : 10));
    }
    return names[key.toLowerCase()] ?? entity;
  });
}

// The build emits quoted HTML attributes. This small reader avoids adding a DOM dependency.
function attributes(tag) {
  const result = {};
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    result[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3]);
  }
  return result;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(match => attributes(match[0]));
}

function visibleText(html) {
  return decodeEntities(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ").trim();
}

function metadata(html) {
  return Object.fromEntries(tags(html, "meta").map(tag => [tag.name || tag.property, tag.content]));
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    files.push(...(entry.isDirectory() ? await walk(path) : [path]));
  }
  return files;
}

function pathForFile(file) {
  const relativePath = relative(distRoot, file).replaceAll("\\", "/");
  if (relativePath === "index.html") return "/";
  return `/${relativePath.replace(/\.html$/, "")}`;
}

function resolveLocal(url, visited = new Set()) {
  assert.equal(url.origin, origin, `Unexpected local origin: ${url.href}`);
  assert.ok(!visited.has(url.pathname), `Redirect cycle for ${url.href}`);
  visited.add(url.pathname);
  const redirect = (vercel.redirects || []).find(rule => rule.source === url.pathname);
  if (redirect) {
    const destination = new URL(redirect.destination, url);
    if (!destination.hash) destination.hash = url.hash;
    if (destination.origin !== origin) return { external: true, url: destination };
    return resolveLocal(destination, visited);
  }
  const pathname = decodeURIComponent(url.pathname).replace(/\/$/, "") || "/";
  const candidates = pathname === "/"
    ? [resolve(distRoot, "index.html")]
    : [resolve(distRoot, `.${pathname}`), resolve(distRoot, `.${pathname}.html`), resolve(distRoot, `.${pathname}/index.html`)];
  const file = candidates.find(candidate => builtFiles.has(candidate));
  return { file, url };
}

before(async () => {
  try {
    await stat(resolve(distRoot, "sitemap.xml"));
  } catch {
    assert.fail("Built site is missing. Run npm run build before node --test tests/site-build.test.mjs.");
  }
  const files = await walk(distRoot);
  builtFiles = new Set(files);
  pages = new Map(await Promise.all(files.filter(file => extname(file) === ".html")
    .map(async file => [file, { path: pathForFile(file), html: await readFile(file, "utf8") }])));
  const sitemap = await readFile(resolve(distRoot, "sitemap.xml"), "utf8");
  sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => decodeEntities(match[1]));
  vercel = JSON.parse(await readFile(resolve(projectRoot, "vercel.json"), "utf8"));
});

test("sitemap contains every indexable generated page, once, using the canonical HTTPS host", () => {
  assert.ok(sitemapUrls.length > 0, "Sitemap must contain public pages");
  assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, "Sitemap contains duplicate URLs");
  const expected = [...pages.values()]
    .filter(page => !/\bnoindex\b/i.test(metadata(page.html).robots || ""))
    .map(page => new URL(page.path, origin).href).sort();
  assert.deepEqual([...sitemapUrls].sort(), expected, "Sitemap and indexable generated pages differ");
  for (const entry of sitemapUrls) {
    const url = new URL(entry);
    assert.equal(url.origin, origin, `${entry}: incorrect canonical host`);
    assert.equal(url.search, "", `${entry}: query strings do not belong in this sitemap`);
    assert.equal(url.hash, "", `${entry}: fragments do not belong in the sitemap`);
    assert.ok(url.pathname === "/" || !url.pathname.endsWith("/"), `${entry}: unexpected trailing slash`);
    assert.ok(resolveLocal(url).file, `${entry}: no generated HTML`);
  }
});

test("each public URL has rendered main content and unique title, description, canonical and valid JSON-LD", () => {
  const titles = new Set();
  const descriptions = new Set();
  const canonicals = new Set();
  for (const entry of sitemapUrls) {
    const resolved = resolveLocal(new URL(entry));
    const page = pages.get(resolved.file);
    assert.ok(page, `${entry}: generated target is not HTML`);
    const { html } = page;
    assert.doesNotMatch(html, /<!--app-(?:html|head)-->/, `${entry}: unresolved prerender marker`);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    assert.ok(main, `${entry}: missing rendered main landmark`);
    const headings = [...main.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    assert.equal(headings.length, 1, `${entry}: must contain one rendered H1`);
    assert.ok(visibleText(headings[0][1]).length > 3, `${entry}: H1 is empty`);
    assert.ok(visibleText(main).length > 120, `${entry}: main content is only an app shell`);
    const titleMatches = [...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)];
    assert.equal(titleMatches.length, 1, `${entry}: must contain exactly one title`);
    const title = visibleText(titleMatches[0][1]);
    assert.ok(title.length > 10 && !titles.has(title), `${entry}: empty or duplicate title: ${title}`);
    titles.add(title);
    const meta = metadata(html);
    assert.match(meta.robots || "", /(?:^|,)index(?:,|$)/, `${entry}: missing indexable robots directive`);
    assert.ok(meta.description?.length > 40 && !descriptions.has(meta.description), `${entry}: missing or duplicate description`);
    descriptions.add(meta.description);
    const canonicalLinks = tags(html, "link").filter(tag => tag.rel === "canonical");
    assert.equal(canonicalLinks.length, 1, `${entry}: needs one canonical`);
    assert.equal(canonicalLinks[0].href, entry, `${entry}: canonical points elsewhere`);
    assert.ok(!canonicals.has(canonicalLinks[0].href), `${entry}: duplicate canonical`);
    canonicals.add(canonicalLinks[0].href);
    assert.equal(meta["og:url"], entry, `${entry}: Open Graph URL differs from canonical`);
    assert.equal(meta["og:title"], title, `${entry}: Open Graph title differs`);
    assert.equal(meta["twitter:card"], "summary_large_image", `${entry}: missing social card`);
    const schemas = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
      .filter(match => attributes(match[1]).type === "application/ld+json");
    assert.ok(schemas.length > 0, `${entry}: missing JSON-LD metadata`);
    for (const schema of schemas) {
      const json = JSON.parse(schema[2]);
      assert.equal(json["@context"], "https://schema.org", `${entry}: unexpected schema context`);
      assert.ok(Array.isArray(json["@graph"]) && json["@graph"].length > 0, `${entry}: empty schema graph`);
      assert.doesNotMatch(schema[2], /"(?:aggregateRating|reviewCount|ratingValue)"/, `${entry}: unverified rating structured data`);
    }
  }
});

test("all local navigation links resolve and all fragment targets exist", () => {
  for (const { path, html } of pages.values()) {
    for (const anchor of tags(html, "a")) {
      assert.ok(anchor.href?.trim(), `${path}: anchor has no destination`);
      assert.notEqual(anchor.href.trim(), "#", `${path}: dead href=# link`);
      assert.doesNotMatch(anchor.href, /^javascript:/i, `${path}: script-only navigation`);
      const url = new URL(anchor.href, new URL(path, origin));
      if (url.origin !== origin || !["http:", "https:"].includes(url.protocol)) continue;
      const resolved = resolveLocal(url);
      if (resolved.external) continue;
      assert.ok(resolved.file, `${path}: broken local link ${anchor.href}`);
      if (resolved.url.hash) {
        const target = pages.get(resolved.file);
        assert.ok(target, `${path}: HTML fragment on a non-HTML destination: ${anchor.href}`);
        const ids = new Set([...target.html.matchAll(/<[a-z][^>]*>/gi)].map(match => attributes(match[0]).id).filter(Boolean));
        const fragment = decodeURIComponent(resolved.url.hash.slice(1));
        assert.ok(ids.has(fragment), `${path}: missing #${fragment} in ${resolved.url.pathname}`);
      }
    }
  }
});

test("rendered images, picture sources, and social preview images exist in the deployment", () => {
  const checkAsset = (value, path) => {
    if (!value || /^(?:data:|blob:)/i.test(value)) return;
    const url = new URL(value, new URL(path, origin));
    if (url.origin !== origin) return;
    const file = resolveLocal(url).file;
    assert.ok(file && !file.endsWith(".html"), `${path}: image asset missing or resolving to HTML: ${value}`);
  };
  for (const { path, html } of pages.values()) {
    for (const image of tags(html, "img")) {
      assert.ok(image.src, `${path}: image has no src`);
      checkAsset(image.src, path);
    }
    for (const image of [...tags(html, "img"), ...tags(html, "source")]) {
      if (!image.srcset || image.srcset.startsWith("data:")) continue;
      for (const candidate of image.srcset.split(",")) checkAsset(candidate.trim().split(/\s+/)[0], path);
    }
    const meta = metadata(html);
    checkAsset(meta["og:image"], path);
    checkAsset(meta["twitter:image"], path);
  }
});

test("quote forms and the real 404 are noindex, with no catch-all app-shell rewrite", () => {
  for (const path of ["/quotes", "/customize", "/404"]) {
    const page = pages.get(resolveLocal(new URL(path, origin)).file);
    assert.ok(page, `${path}: missing generated page`);
    assert.match(metadata(page.html).robots || "", /\bnoindex\b/, `${path}: must be noindex`);
    assert.ok(!sitemapUrls.includes(new URL(path, origin).href), `${path}: excluded pages must not be in sitemap`);
  }
  for (const { path, html } of pages.values()) {
    if (/<form\b/i.test(html)) assert.match(metadata(html).robots || "", /\bnoindex\b/, `${path}: enquiry form is indexable`);
  }
  const rewrites = Array.isArray(vercel.rewrites) ? vercel.rewrites : Object.values(vercel.rewrites || {}).flat();
  for (const rule of [...rewrites, ...(vercel.routes || [])]) {
    const source = rule.source || rule.src || "";
    const destination = rule.destination || rule.dest || "";
    const catchesAll = ["/(.*)", "/:path*", "/:path(.*)", "/.*", "^/.*$", "(.*)"].includes(source);
    assert.ok(!(catchesAll && ["/", "/index.html"].includes(destination)), "Catch-all SPA rewrite hides genuine 404s");
  }
});

test("published copy does not restore the removed fake social proof", () => {
  for (const { path, html } of pages.values()) {
    assert.doesNotMatch(visibleText(html), /50\s*k\+?\s*travelers|650\s*\+?\s*verified|99\s*%\s*positive|best price guarantee|verified (?:travel )?agents|Aarav Patel|Sophia Martinez|Liam Chen|Mia Johnson/i,
      `${path}: removed unsupported trust claim has returned`);
  }
});

test("prerendered enquiries cannot submit personal details as URL parameters before hydration", () => {
  for (const path of ["/quotes", "/customize"]) {
    const { html } = pages.get(resolveLocal(new URL(path, origin)).file);
    const form = html.match(/<form\b[^>]*>[\s\S]*?<\/form>/i)?.[0];
    assert.ok(form, `${path}: missing enquiry form`);
    assert.equal(tags(form, "form")[0].method, "post", `${path}: native fallback must never use GET`);
    assert.match(form, /<fieldset\b[^>]*\bdisabled(?:="")?/, `${path}: inputs must wait for the submit handler`);
    const submit = tags(form, "button").find(button => button.type === "submit");
    assert.ok(submit && Object.hasOwn(submit, "disabled"), `${path}: submit must be disabled before hydration`);
    assert.match(html, /<noscript>[\s\S]*?Enable JavaScript[\s\S]*?<\/noscript>/i, `${path}: no-script users need a fallback`);
  }
});
