/** Public business details only. Never put credentials in VITE_* variables. */
export const siteConfig = {
  name: "Musafirnama",
  url: "https://www.musafirnama.in",
  phone: (import.meta.env.VITE_BUSINESS_PHONE || "").trim(),
  whatsapp: (import.meta.env.VITE_WHATSAPP_NUMBER || "").replace(/\D/g, ""),
  email: (import.meta.env.VITE_BUSINESS_EMAIL || "").trim(),
  ga4Id: /^G-[A-Z0-9]+$/.test(import.meta.env.VITE_GA4_MEASUREMENT_ID || "")
    ? import.meta.env.VITE_GA4_MEASUREMENT_ID : "",
};
