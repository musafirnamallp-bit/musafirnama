/** Focus a committed route once, after any lazy content has arrived. */
export function focusRouteContent(pagePath: string, hash: string): () => void {
  let id = "main-content";
  try { if (hash) id = decodeURIComponent(hash.slice(1)); } catch { return () => {}; }

  const isVisible = (element: HTMLElement) => element.getClientRects().length > 0 && element.getAttribute("aria-busy") !== "true";
  const moveToContent = () => {
    // React can retain the visible previous route while a new route suspends.
    // Match the route marker, rather than focusing whichever main appears first.
    const main = Array.from(document.querySelectorAll<HTMLElement>("main[data-page-path]"))
      .find(element => element.dataset.pagePath === pagePath && isVisible(element) && element.querySelector("h1"));
    if (!main) return false;
    const target = hash ? [main, ...Array.from(main.querySelectorAll<HTMLElement>("[id]"))]
      .find(element => element.id === id && isVisible(element)) : main;
    if (!target) return false;
    if (!target.hasAttribute("tabindex") && target.tabIndex < 0) target.tabIndex = -1;
    target.focus({ preventScroll: true });
    if (hash) target.scrollIntoView({ block: "start" });
    return true;
  };
  if (moveToContent()) return () => {};
  const root = document.getElementById("root");
  if (!root) return () => {};

  const stop = () => {
    observer.disconnect();
    window.clearTimeout(timer);
    document.removeEventListener("pointerdown", stop, true);
    document.removeEventListener("keydown", stop, true);
  };
  const observer = new MutationObserver(() => { if (moveToContent()) stop(); });
  observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "hidden", "aria-busy", "data-page-path"] });
  const timer = window.setTimeout(stop, 15000);
  // If the visitor starts another interaction while waiting, do not steal
  // focus later when a slow route or fragment eventually becomes available.
  document.addEventListener("pointerdown", stop, true);
  document.addEventListener("keydown", stop, true);
  return stop;
}
