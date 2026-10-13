import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { buildSync } from "esbuild";
import { fileURLToPath } from "node:url";

// Execute the real browser module with inert DOM/storage doubles. Injected tag
// scripts are recorded as objects; no script or network request is executed.
const compiled = buildSync({
  entryPoints: [fileURLToPath(new URL("../src/lib/analytics.ts", import.meta.url))],
  bundle: true,
  write: false,
  platform: "node",
  format: "cjs",
  define: { "import.meta.env": JSON.stringify({ VITE_GA4_MEASUREMENT_ID: "G-TEST123" }) },
}).outputFiles[0].text;

function browserHarness() {
  const storage = new Map();
  const scripts = [];
  const document = {
    title: "Travel quote",
    referrer: "https://referrer.example/path?email=traveler%40example.com",
    getElementById: id => scripts.find(script => script.id === id) || null,
    createElement: () => ({}),
    head: { appendChild: script => scripts.push(script) },
  };
  const window = {
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
    location: { pathname: "/quotes", search: "?email=traveler%40example.com" },
  };
  const module = { exports: {} };
  vm.runInNewContext(compiled, { module, exports: module.exports, window, document, URL });
  const commands = () => Array.from(window.dataLayer || [], command => Array.from(command));
  return { analytics: module.exports, window, scripts, commands };
}

test("analytics waits for consent, stops on withdrawal, and resumes after renewed acceptance without sharing enquiry PII", () => {
  const { analytics, window, scripts, commands } = browserHarness();
  analytics.initializeAnalytics();
  analytics.trackEvent("generate_lead", { form_name: "travel_quote" });
  assert.equal(scripts.length, 0, "No Google tag may load before consent");
  assert.equal(commands().length, 0, "No measurement commands may queue before consent");

  analytics.saveAnalyticsConsent("accepted");
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, "https://www.googletagmanager.com/gtag/js?id=G-TEST123");
  analytics.trackEvent("generate_lead", {
    form_name: "travel_quote", budget: 125999, travelers: 2,
    name: "Test Traveler", email: "traveler@example.com", phone: "919876543210",
    requirements: "Private enquiry notes", page_location: "https://example.com/?email=traveler@example.com",
  });
  const firstLead = commands().find(command => command[0] === "event" && command[1] === "generate_lead");
  assert.ok(firstLead, "Accepted analytics should receive a lead event");
  assert.deepEqual(Object.keys(firstLead[2]).sort(), ["budget", "form_name", "travelers"]);

  analytics.saveAnalyticsConsent("declined");
  assert.equal(window["ga-disable-G-TEST123"], true);
  const revokedCount = commands().length;
  analytics.trackEvent("generate_lead", { form_name: "travel_quote" });
  analytics.trackPageView("/quotes", "Travel quote");
  analytics.initializeAnalytics();
  assert.equal(commands().length, revokedCount, "Withdrawal must stop all manual tracking");
  assert.equal(scripts.length, 1);

  analytics.saveAnalyticsConsent("accepted");
  assert.equal(window["ga-disable-G-TEST123"], false);
  assert.equal(scripts.length, 1, "Renewed consent must not inject a second Google tag");
  const consentUpdates = commands().filter(command => command[0] === "consent" && command[1] === "update");
  assert.deepEqual(consentUpdates.map(command => command[2].analytics_storage), ["granted", "denied", "granted"]);
  for (const [, , consent] of consentUpdates) {
    for (const key of ["ad_storage", "ad_user_data", "ad_personalization"]) assert.equal(consent[key], "denied");
  }
  const leadCount = commands().filter(command => command[0] === "event" && command[1] === "generate_lead").length;
  analytics.trackEvent("generate_lead", { form_name: "travel_quote" });
  assert.equal(commands().filter(command => command[0] === "event" && command[1] === "generate_lead").length, leadCount + 1);

  const pageViews = commands().filter(command => command[0] === "event" && command[1] === "page_view");
  assert.ok(pageViews.length > 0);
  for (const [, , event] of pageViews) {
    assert.equal(event.page_location, "https://www.musafirnama.in/quotes");
    assert.equal(event.page_referrer, "https://referrer.example");
  }
  assert.doesNotMatch(JSON.stringify(commands()), /traveler@example|traveler%40|Test Traveler|919876543210|Private enquiry notes/);
});
