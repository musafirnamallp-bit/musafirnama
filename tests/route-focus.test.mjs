import assert from "node:assert/strict";
import test from "node:test";
import { focusRouteContent } from "../src/components/routeFocus.ts";

function fakePage(pagePath, { id = "main-content", visible = true, ready = true, busy = false } = {}) {
  return {
    id, dataset: { pagePath }, visible, ready, busy, children: [], tabIndex: -1, focuses: 0, scrolls: 0,
    getClientRects() { return this.visible ? [{}] : []; },
    getAttribute(name) { return name === "aria-busy" && this.busy ? "true" : null; },
    hasAttribute() { return false; },
    querySelector() { return this.ready ? {} : null; },
    querySelectorAll() { return this.children; },
    focus() { this.focuses += 1; },
    scrollIntoView() { this.scrolls += 1; },
  };
}

function withDom(t) {
  const originals = new Map(["document", "window", "MutationObserver"].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => { for (const [key, descriptor] of originals) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key]; });
  const pages = [];
  const observers = [];
  const listeners = new Map();
  const timers = new Map();
  let nextTimer = 1;
  globalThis.document = {
    querySelectorAll: () => pages,
    getElementById: () => ({}),
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: name => listeners.delete(name),
  };
  globalThis.window = {
    setTimeout: callback => { const id = nextTimer++; timers.set(id, callback); return id; },
    clearTimeout: id => timers.delete(id),
  };
  globalThis.MutationObserver = class {
    constructor(callback) { this.callback = callback; this.active = false; observers.push(this); }
    observe() { this.active = true; }
    disconnect() { this.active = false; }
  };
  return { pages, listeners, timers, mutate: () => observers.filter(observer => observer.active).forEach(observer => observer.callback()) };
}

test("lazy navigation never focuses the previous visible page or loading fallback and focuses new content only once", t => {
  const dom = withDom(t);
  const previous = fakePage("/destinations");
  const loading = fakePage("/destination/goa-india", { ready: false, busy: true });
  dom.pages.push(previous, loading);
  focusRouteContent("/destination/goa-india", "");
  dom.mutate();
  assert.equal(previous.focuses, 0);
  assert.equal(loading.focuses, 0);
  const destination = fakePage("/destination/goa-india");
  dom.pages.push(destination);
  dom.mutate();
  dom.mutate();
  assert.equal(destination.focuses, 1, "Later page mutations must not repeatedly move focus");
  assert.equal(previous.focuses, 0);
  assert.equal(dom.listeners.size, 0);
  assert.equal(dom.timers.size, 0);
});

test("route cleanup prevents stale focus and a fragment waits for its visible target on the matching page", t => {
  const dom = withDom(t);
  const cancel = focusRouteContent("/slow-page", "");
  cancel();
  const stale = fakePage("/slow-page");
  dom.pages.push(stale);
  dom.mutate();
  assert.equal(stale.focuses, 0);
  const guide = fakePage("/travel-guides/example");
  const fragment = fakePage("", { id: "section one", visible: false });
  guide.children.push(fragment);
  dom.pages.push(guide);
  focusRouteContent("/travel-guides/example", "#section%20one");
  dom.mutate();
  assert.equal(fragment.focuses, 0);
  fragment.visible = true;
  dom.mutate();
  dom.mutate();
  assert.equal(fragment.focuses, 1);
  assert.equal(fragment.scrolls, 1);
  assert.equal(guide.focuses, 0);
  assert.equal(dom.timers.size, 0);
});

test("a visitor's new interaction cancels deferred focus and malformed fragments are harmless", t => {
  const dom = withDom(t);
  focusRouteContent("/contact", "");
  dom.listeners.get("keydown")();
  const contact = fakePage("/contact");
  dom.pages.push(contact);
  dom.mutate();
  assert.equal(contact.focuses, 0);
  assert.equal(dom.listeners.size, 0);
  assert.equal(dom.timers.size, 0);
  assert.doesNotThrow(() => focusRouteContent("/contact", "#%E0%A4%A"));
  assert.equal(contact.focuses, 0);
});
