import { packages } from "./packageData";
import { travelGuides } from "./travelGuides";
import { siteConfig } from "./siteConfig";

export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  image: string;
  noindex?: boolean;
  type?: "website" | "article";
  breadcrumbs?: { name: string; path: string }[];
}
const defaults = {
  image: "/social-cover.jpg",
  title: "Customized Holiday Packages & Travel Quotes | Musafirnama",
  description: "Explore India and international holiday ideas with Musafirnama. Compare destinations, personalize your itinerary and request a quote for your travel dates and budget.",
};
const pages: Record<string, { title: string; description: string; noindex?: boolean }> = {
  "/": defaults,
  "/destinations": { title: "India & International Holiday Packages | Musafirnama", description: "Explore Goa, Kerala, Rajasthan, Bali, Paris, Tokyo, the Swiss Alps and Santorini. Compare sample itineraries and plan a holiday around your budget." },
  "/travel-guides": { title: "Travel Planning Guides & Holiday Checklists | Musafirnama", description: "Practical guides for planning Goa and Kerala trips, setting a holiday budget and comparing travel quotes before you book." },
  "/about": { title: "About Musafirnama | Holidays Planned Around You", description: "Get to know Musafirnama's approach to customized holidays: explore destinations, share your requirements and review a trip quote before deciding." },
  "/contact": { title: "Contact Musafirnama | Plan Your Next Holiday", description: "Have a holiday in mind? Contact Musafirnama or send your destination, travel dates and budget to start planning a personalized trip." },
  "/faq": { title: "Holiday Planning & Quote FAQs | Musafirnama", description: "Answers to common questions about customized itineraries, indicative package prices, travel quotes and what to confirm before booking." },
  "/privacy": { title: "Privacy Information | Musafirnama", description: "How enquiry information is used when you request travel planning help through the Musafirnama website." },
  "/quotes": { title: "Request a Holiday Quote | Musafirnama", description: "Tell us where you want to go, your dates, budget and travel preferences to request a personalized holiday quote.", noindex: true },
  "/customize": { title: "Customize Your Holiday | Musafirnama", description: "Build your travel request around your destination, budget, trip length and preferences, then send it to Musafirnama.", noindex: true },
};

export const publicPaths = [
  ...Object.keys(pages).filter(path => !pages[path].noindex),
  ...Object.keys(packages).map(slug => `/destination/${slug}`),
  ...travelGuides.map(guide => `/travel-guides/${guide.slug}`),
];
export const prerenderPaths = [...publicPaths, "/quotes", "/customize", "/404"];

export function getPageMetadata(pathname: string): PageMetadata {
  const path = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  if (Object.prototype.hasOwnProperty.call(pages, path)) return { ...defaults, ...pages[path], path };
  const destination = path.match(/^\/destination\/([^/]+)$/)?.[1];
  if (destination && Object.prototype.hasOwnProperty.call(packages, destination)) {
    const item = packages[destination];
    const name = destination === "swiss-alps" ? "Swiss Alps" : destination === "kerala-india" ? "Kerala" : destination === "rajasthan-india" ? "Rajasthan" : item.location.city;
    return {
      title: `${name} Tour Package – ${item.duration.replace(/ - /g, "/")} | Musafirnama`,
      description: `${item.packageName}: ${item.overview.description} Explore the sample itinerary and request a quote for your dates.`.slice(0, 170),
      path, image: item.image,
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations" }, { name, path }],
    };
  }
  const guide = travelGuides.find(item => path === `/travel-guides/${item.slug}`);
  if (guide) return { ...defaults, path, title: `${guide.title} | Musafirnama`, description: guide.description, type: "article", breadcrumbs: [{ name: "Home", path: "/" }, { name: "Travel guides", path: "/travel-guides" }, { name: guide.title, path }] };
  return { ...defaults, path: "/404", title: "Page Not Found | Musafirnama", description: "This page could not be found. Explore holiday destinations or return to the Musafirnama homepage.", noindex: true };
}

export function absoluteUrl(path: string) { return new URL(path, siteConfig.url).href; }
export function structuredData(meta: PageMetadata) {
  const organization = {
    "@type": "TravelAgency", "@id": `${siteConfig.url}/#organization`, name: siteConfig.name,
    url: siteConfig.url, logo: `${siteConfig.url}/favicon.jpeg`,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
  };
  const graph: unknown[] = [organization, {
    "@type": "WebSite", "@id": `${siteConfig.url}/#website`, url: siteConfig.url, name: siteConfig.name,
    publisher: { "@id": organization["@id"] },
  }];
  if (meta.breadcrumbs) graph.push({ "@type": "BreadcrumbList", itemListElement: meta.breadcrumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })) });
  if (meta.type === "article") graph.push({ "@type": "Article", headline: meta.title.replace(/ \| Musafirnama$/, ""), description: meta.description, mainEntityOfPage: absoluteUrl(meta.path), image: absoluteUrl(meta.image), author: { "@id": organization["@id"] }, publisher: { "@id": organization["@id"] } });
  return { "@context": "https://schema.org", "@graph": graph };
}
