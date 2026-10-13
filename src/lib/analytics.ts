import { siteConfig } from "./siteConfig";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: Gtag; [key: `ga-disable-${string}`]: boolean | undefined; }
}

export type AnalyticsConsent = "accepted" | "declined";
const consentKey = "musafirnama-analytics-consent";
const parameterKeys = new Set(["destination", "package_name", "item_id", "item_name", "currency", "value", "form_name", "method", "source", "link_type", "budget", "travelers"]);
let enabled = false;

/** Override the tag's URL defaults before configuration and on every route/event. */
function updatePageContext(pathname = window.location.pathname, title = document.title) {
  let path = "/";
  let referrer = "";
  try { path = new URL(pathname, siteConfig.url).pathname; } catch { /* Use a safe path. */ }
  try {
    const url = new URL(document.referrer);
    if (url.protocol === "https:" || url.protocol === "http:") referrer = url.origin;
  } catch { /* An empty or invalid referrer must not interrupt tracking. */ }
  const context = {
    page_title: title,
    page_location: `${siteConfig.url}${path}`,
    page_path: path,
    page_referrer: referrer,
  };
  window.gtag?.("set", context);
  return context;
}

export function readAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(consentKey);
    return value === "accepted" || value === "declined" ? value : null;
  } catch { return null; }
}

export function saveAnalyticsConsent(value: AnalyticsConsent) {
  try { window.localStorage.setItem(consentKey, value); } catch { /* Site works without storage. */ }
  if (value === "accepted") initializeAnalytics();
  else {
    enabled = false;
    if (siteConfig.ga4Id) window[`ga-disable-${siteConfig.ga4Id}`] = true;
    window.gtag?.("consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  }
}

export function initializeAnalytics() {
  if (!siteConfig.ga4Id || typeof window === "undefined" || readAnalyticsConsent() !== "accepted") return;
  if (enabled) return;
  enabled = true;
  window[`ga-disable-${siteConfig.ga4Id}`] = false;
  window.dataLayer = window.dataLayer || [];
  // Google tag's documented queue API requires an Arguments object.
  // eslint-disable-next-line prefer-rest-params
  window.gtag = window.gtag || function (..._args: unknown[]) { window.dataLayer?.push(arguments); };
  const firstLoad = !document.getElementById("musafirnama-analytics");
  if (firstLoad) {
    window.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  }
  // An explicit update is needed when a visitor accepts again after revoking.
  // Repeating a default cannot replace the previous denied consent update.
  window.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  const context = updatePageContext();
  if (firstLoad) {
    window.gtag("js", new Date());
    window.gtag("config", siteConfig.ga4Id, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
    const script = document.createElement("script");
    script.id = "musafirnama-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga4Id}`;
    document.head.appendChild(script);
  }
  window.gtag("event", "page_view", context);
}

/** Deliberately excludes email, phone, names, free text and URL query strings. */
export function trackEvent(name: string, parameters: Record<string, unknown> = {}) {
  if (!enabled || !siteConfig.ga4Id || readAnalyticsConsent() !== "accepted") return;
  if (!/^[a-z][a-z0-9_]{0,39}$/.test(name)) return;
  const safe = Object.fromEntries(Object.entries(parameters).filter(([key, value]) =>
    parameterKeys.has(key) && (typeof value === "number" || typeof value === "boolean" || typeof value === "string" && value.length <= 100)
  ));
  const context = updatePageContext();
  window.gtag?.("event", name, { ...safe, ...context });
}

export function trackPageView(pathname: string, title: string) {
  if (!enabled || readAnalyticsConsent() !== "accepted") return;
  const context = updatePageContext(pathname, title);
  window.gtag?.("event", "page_view", context);
}
