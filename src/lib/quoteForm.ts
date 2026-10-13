export interface QuoteValues {
  destination: string;
  travelers: string;
  startDate: string;
  endDate: string;
  flexibleDates: boolean;
  duration: string;
  budget: string;
  accommodation: string;
  travelMode: string;
  interests: string[];
  requirements: string;
  preferredContact: string;
  name: string;
  email: string;
  phone: string;
  packageName: string;
}

export interface QuotePayload {
  destination: string;
  travelers: number;
  startDate: string;
  endDate: string;
  budget: number;
  accommodation: string;
  travelMode: string;
  requirements: string;
  name: string;
  email: string;
  phone: string;
}

export type QuoteErrors = Partial<Record<keyof QuoteValues, string>>;
export const quoteInterests = ["Adventure", "Culture", "Beach", "Food", "Nature", "Photography", "Shopping", "Wellness"];

export function emptyQuote(): QuoteValues {
  return {
    destination: "", travelers: "2", startDate: "", endDate: "", flexibleDates: false,
    duration: "", budget: "20000", accommodation: "", travelMode: "", interests: [],
    requirements: "", preferredContact: "either", name: "", email: "", phone: "", packageName: "",
  };
}

export function localDateString(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function dateParts(value: string): number[] | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
    ? [year, month, day] : null;
}

export function tripDays(start: string, end: string): number | null {
  const a = dateParts(start);
  const b = dateParts(end);
  if (!a || !b) return null;
  const days = (Date.UTC(b[0], b[1] - 1, b[2]) - Date.UTC(a[0], a[1] - 1, a[2])) / 86400000 + 1;
  return days > 0 ? days : null;
}

export function addTripDays(start: string, days: number): string {
  const parts = dateParts(start);
  if (!parts || !Number.isInteger(days) || days < 1 || days > 365) return "";
  const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + days - 1));
  return date.toISOString().slice(0, 10);
}

export function quoteFromSearch(search: URLSearchParams): QuoteValues {
  const values = emptyQuote();
  values.destination = (search.get("destination") || "").slice(0, 160);
  values.packageName = (search.get("packageName") || search.get("package") || "").slice(0, 160);
  const budget = (search.get("budget") || "").replace(/[^\d.]/g, "");
  if (Number(budget) >= 1000 && Number(budget) <= 10000000) values.budget = budget;
  const duration = search.get("duration") || "";
  const days = /^\d+$/.test(duration) ? duration : duration.match(/(\d+)\s*(?:D|days?)/i)?.[1];
  if (Number(days) >= 1 && Number(days) <= 365) values.duration = String(Number(days));
  const travelers = Number(search.get("travelers"));
  if (Number.isInteger(travelers) && travelers >= 1 && travelers <= 100) values.travelers = String(travelers);
  return values;
}

export function validateQuote(values: QuoteValues, today = localDateString()): QuoteErrors {
  const errors: QuoteErrors = {};
  if (values.destination.trim().length < 2 || values.destination.length > 160) errors.destination = "Enter a destination (2–160 characters).";
  if (!Number.isInteger(Number(values.travelers)) || Number(values.travelers) < 1 || Number(values.travelers) > 100) errors.travelers = "Enter between 1 and 100 travelers.";
  if (!Number.isFinite(Number(values.budget)) || Number(values.budget) < 1000 || Number(values.budget) > 10000000) errors.budget = "Enter a budget between ₹1,000 and ₹1,00,00,000 per person.";
  if (values.duration && (!Number.isInteger(Number(values.duration)) || Number(values.duration) < 1 || Number(values.duration) > 365)) errors.duration = "Enter a trip length between 1 and 365 days.";
  if (!values.flexibleDates) {
    if (!dateParts(values.startDate) || values.startDate < today) errors.startDate = "Choose a start date today or later.";
    if (!dateParts(values.endDate)) errors.endDate = "Choose an end date.";
    else if (values.endDate < values.startDate) errors.endDate = "The end date must be on or after the start date.";
    else if ((tripDays(values.startDate, values.endDate) || 0) > 365) errors.endDate = "For this enquiry, choose a trip of up to 365 days.";
  }
  if (values.name.trim().length < 2 || values.name.length > 100) errors.name = "Enter your name (2–100 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || values.email.length > 254) errors.email = "Enter a valid email address.";
  const digits = values.phone.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]+$/.test(values.phone.trim()) || digits.length < 8 || digits.length > 15) errors.phone = "Enter a phone number with 8–15 digits, including your country code.";
  if (values.requirements.length > 2000) errors.requirements = "Keep your requirements within 2,000 characters.";
  return errors;
}

// Match the previous date-fns PPP format used by the existing API contract.
function apiDate(value: string): string {
  const parts = dateParts(value);
  if (!parts) return "";
  const [year, month, day] = parts;
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day)));
  const suffix = day >= 11 && day <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[day % 10] || "th");
  return `${monthName} ${day}${suffix}, ${year}`;
}

export function quotePayload(values: QuoteValues): QuotePayload {
  const notes = [
    values.packageName && `Interested package: ${values.packageName}`,
    values.flexibleDates && "Travel dates are flexible; please discuss suitable dates.",
    values.duration && `Preferred trip length: ${values.duration} days.`,
    values.interests.length && `Interests: ${values.interests.join(", ")}.`,
    values.preferredContact !== "either" && `Preferred contact: ${values.preferredContact}.`,
    values.requirements.trim(),
  ].filter(Boolean);
  return {
    destination: values.destination.trim(), travelers: Number(values.travelers),
    startDate: values.flexibleDates ? "" : apiDate(values.startDate),
    endDate: values.flexibleDates ? "" : apiDate(values.endDate), budget: Number(values.budget),
    accommodation: values.accommodation, travelMode: values.travelMode, requirements: notes.join("\n"),
    name: values.name.trim(), email: values.email.trim(), phone: values.phone.replace(/\D/g, ""),
  };
}
