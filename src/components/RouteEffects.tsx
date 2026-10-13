import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { absoluteUrl, getPageMetadata, structuredData } from "@/lib/seo";
import { trackPageView } from "@/lib/analytics";
import { focusRouteContent } from "./routeFocus";

export default function RouteEffects() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    const meta = getPageMetadata(pathname);
    document.title = meta.title;
    const tags: Record<string, string> = {
      description: meta.description, robots: meta.noindex ? "noindex,follow" : "index,follow",
      "og:title": meta.title, "og:description": meta.description, "og:type": meta.type || "website",
      "og:url": absoluteUrl(meta.path), "og:image": absoluteUrl(meta.image), "og:site_name": "Musafirnama",
      "twitter:card": "summary_large_image", "twitter:title": meta.title, "twitter:description": meta.description, "twitter:image": absoluteUrl(meta.image),
    };
    for (const [key, value] of Object.entries(tags)) {
      const attr = key.startsWith("og:") ? "property" : "name";
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!tag) { tag = document.createElement("meta"); tag.setAttribute(attr, key); document.head.appendChild(tag); }
      tag.content = value;
    }
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = absoluteUrl(meta.path);
    let schema = document.getElementById("site-schema");
    if (!schema) { schema = document.createElement("script"); schema.id = "site-schema"; schema.setAttribute("type", "application/ld+json"); document.head.appendChild(schema); }
    schema.textContent = JSON.stringify(structuredData(meta));
    trackPageView(pathname, meta.title);
  }, [pathname]);
  useEffect(() => {
    const routeChanged = previousPath.current !== pathname;
    previousPath.current = pathname;
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
    // A document load already establishes reading order. Move focus only for
    // a client-side page change or an explicitly requested fragment.
    if (!routeChanged && !hash) return;
    // A shared static 404 document must keep the same marker when hydrated at
    // an unknown URL; using the unknown pathname there would mismatch its HTML.
    const pagePath = getPageMetadata(pathname).path === "/404" ? "/404" : pathname;
    return focusRouteContent(pagePath, hash);
  }, [pathname, hash]);
  return null;
}
