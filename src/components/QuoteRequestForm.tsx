import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, Loader2, MapPin, SlidersHorizontal, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/siteConfig";
import submitData, { QuoteSubmissionError } from "@/lib/musafirnama";
import {
  addTripDays, emptyQuote, localDateString, quoteFromSearch, quoteInterests,
  quotePayload, tripDays, validateQuote, type QuoteErrors, type QuoteValues,
} from "@/lib/quoteForm";

const selectClass = "mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const money = (value: string) => Number.isFinite(Number(value)) && Number(value) > 0
  ? `₹${Number(value).toLocaleString("en-IN")}` : "Not specified";

export default function QuoteRequestForm({ customize = false }: { customize?: boolean }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();
  const [values, setValues] = useState<QuoteValues>(emptyQuote);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [today, setToday] = useState("");
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [preferencesOpen, setPreferencesOpen] = useState(customize);
  const inFlight = useRef(false);
  const accepted = useRef(false);
  const requestVersion = useRef(0);
  const started = useRef(false);
  const mounted = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const formName = customize ? "customize_trip" : "travel_quote";

  // Keep initial client/server renders identical, then apply package prefills.
  useEffect(() => {
    requestVersion.current += 1;
    controller.current?.abort();
    inFlight.current = false;
    accepted.current = false;
    started.current = false;
    setValues(quoteFromSearch(new URLSearchParams(query)));
    setErrors({});
    setSubmitted(false);
    setSubmitError("");
    setPending(false);
    setToday(localDateString());
  }, [query]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      controller.current?.abort();
    };
  }, []);

  function startForm() {
    if (started.current) return;
    started.current = true;
    trackEvent("form_start", { form_name: formName });
  }

  function update<K extends keyof QuoteValues>(field: K, value: QuoteValues[K]) {
    startForm();
    setValues(previous => {
      const next = { ...previous, [field]: value };
      if ((field === "startDate" || field === "duration") && next.startDate && next.duration) {
        next.endDate = addTripDays(next.startDate, Number(next.duration));
      }
      if (field === "endDate") {
        const days = tripDays(next.startDate, next.endDate);
        if (days) next.duration = String(days);
      }
      return next;
    });
    setErrors(previous => ({ ...previous, [field]: undefined, ...(field === "flexibleDates" ? { startDate: undefined, endDate: undefined } : {}) }));
    setSubmitError("");
  }

  const fieldProps = (field: keyof QuoteValues) => ({
    "aria-invalid": errors[field] ? true as const : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });
  const errorFor = (field: keyof QuoteValues) => errors[field]
    ? <p id={`${field}-error`} className="mt-2 text-sm text-destructive">{errors[field]}</p> : null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || accepted.current) return;
    startForm();
    const nextErrors = validateQuote(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      if (nextErrors.requirements) setPreferencesOpen(true);
      // Run after the error messages render so assistive tech receives the description.
      requestAnimationFrame(() => document.getElementById(Object.keys(nextErrors)[0])?.focus());
      return;
    }
    inFlight.current = true;
    setPending(true);
    setSubmitError("");
    controller.current = new AbortController();
    const version = requestVersion.current;
    try {
      await submitData(quotePayload(values), controller.current.signal);
      if (!mounted.current || version !== requestVersion.current) return;
      accepted.current = true;
      setSubmitted(true);
      trackEvent("generate_lead", { form_name: formName, currency: "INR", budget: Number(values.budget), travelers: Number(values.travelers) });
      requestAnimationFrame(() => document.getElementById("quote-success")?.focus());
    } catch (error) {
      if (!mounted.current || version !== requestVersion.current) return;
      setSubmitError(error instanceof QuoteSubmissionError && error.kind === "rejected"
        ? "We couldn't confirm that your enquiry was accepted. Your details are still here; please try again."
        : "We couldn't confirm your request. It may have reached us. Your details are still here; check your connection before trying again.");
    } finally {
      if (version === requestVersion.current) {
        inFlight.current = false;
        if (mounted.current) setPending(false);
      }
    }
  }

  const preferredDays = Number.isInteger(Number(values.duration)) && Number(values.duration) >= 1 && Number(values.duration) <= 365 ? Number(values.duration) : null;
  const days = values.flexibleDates ? preferredDays : tripDays(values.startDate, values.endDate) || preferredDays;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" tabIndex={-1} className="container mx-auto max-w-6xl px-4 py-10 outline-none md:py-14">
        {submitted ? (
          <section className="mx-auto max-w-2xl py-12 text-center">
            <CheckCircle2 className="mx-auto mb-6 h-14 w-14 text-primary" aria-hidden="true" />
            <h1 id="quote-success" tabIndex={-1} className="text-3xl font-bold outline-none md:text-4xl">Your enquiry has been submitted</h1>
            <p role="status" className="mt-4 text-lg text-muted-foreground">Thank you for sharing your plans. We'll review your trip details and contact you to discuss the options.</p>
            <div className="my-8 rounded-xl border bg-muted/40 p-6 text-left">
              <h2 className="font-semibold">Your trip request</h2>
              <p className="mt-2">{values.destination} · {values.travelers} travelers{days ? ` · ${days} days` : ""}</p>
              <p className="mt-1 text-sm text-muted-foreground">Budget: {money(values.budget)} per person. An enquiry does not reserve a trip or confirm a booking.</p>
            </div>
            <Button asChild size="lg"><Link to="/">Explore more trips<ArrowRight aria-hidden="true" /></Link></Button>
          </section>
        ) : (
          <>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground"><Link to="/" className="hover:underline">Home</Link><span aria-hidden="true" className="px-2">/</span><span aria-current="page">{customize ? "Customize your trip" : "Get a quote"}</span></nav>
            <header className="mb-8 max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Your next journey</p>
              <h1 className="text-3xl font-bold leading-tight md:text-5xl">{customize ? "Make the trip your own" : "Let's plan your holiday"}</h1>
              <p className="mt-4 text-lg text-muted-foreground">Share your destination, dates and budget for a personalized travel quote. There is no booking commitment.</p>
            </header>
            <form onSubmit={handleSubmit} noValidate onFocusCapture={startForm} aria-busy={pending} className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
              <fieldset disabled={pending} className="min-w-0 space-y-6">
                <legend className="sr-only">Travel quote request</legend>
                <Card><CardContent className="space-y-5 pt-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold"><MapPin className="h-5 w-5" aria-hidden="true" />Trip details</h2>
                  {values.packageName && <p className="rounded-lg bg-primary/5 p-3 text-sm">Interested in: <strong>{values.packageName}</strong>. You can change the details below.</p>}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div><Label htmlFor="destination">Destination <span aria-hidden="true">*</span></Label><Input id="destination" name="destination" className="mt-2 h-11" placeholder="e.g. Goa, Kerala or Bali" value={values.destination} onChange={e => update("destination", e.target.value)} maxLength={160} required {...fieldProps("destination")} />{errorFor("destination")}</div>
                    <div><Label htmlFor="travelers">Number of travelers <span aria-hidden="true">*</span></Label><Input id="travelers" name="travelers" className="mt-2 h-11" type="number" inputMode="numeric" min={1} max={100} step={1} value={values.travelers} onChange={e => update("travelers", e.target.value)} required {...fieldProps("travelers")} />{errorFor("travelers")}</div>
                  </div>
                  <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm"><input id="flexibleDates" type="checkbox" className="h-4 w-4 accent-primary" checked={values.flexibleDates} onChange={e => update("flexibleDates", e.target.checked)} />My travel dates are flexible</label>
                  {!values.flexibleDates && <div className="grid gap-5 sm:grid-cols-2">
                    <div><Label htmlFor="startDate">Start date <span aria-hidden="true">*</span></Label><Input id="startDate" name="startDate" className="mt-2 h-11" type="date" min={today || undefined} value={values.startDate} onChange={e => update("startDate", e.target.value)} required {...fieldProps("startDate")} />{errorFor("startDate")}</div>
                    <div><Label htmlFor="endDate">End date <span aria-hidden="true">*</span></Label><Input id="endDate" name="endDate" className="mt-2 h-11" type="date" min={values.startDate || today || undefined} value={values.endDate} onChange={e => update("endDate", e.target.value)} required {...fieldProps("endDate")} />{errorFor("endDate")}</div>
                  </div>}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div><Label htmlFor="duration">Trip length in days (optional)</Label><Input id="duration" name="duration" className="mt-2 h-11" type="number" inputMode="numeric" min={1} max={365} step={1} placeholder="e.g. 5" value={values.duration} onChange={e => update("duration", e.target.value)} {...fieldProps("duration")} />{errorFor("duration")}</div>
                    <div><Label htmlFor="budget">Budget per person in ₹ <span aria-hidden="true">*</span></Label><Input id="budget" name="budget" className="mt-2 h-11" type="number" inputMode="decimal" min={1000} max={10000000} step="any" value={values.budget} onChange={e => update("budget", e.target.value)} required {...fieldProps("budget")} />{errorFor("budget")}<p className="mt-2 text-xs text-muted-foreground">Enter any amount, including budgets above ₹1 lakh.</p></div>
                  </div>
                </CardContent></Card>

                <Card><CardContent className="pt-6">
                  <details open={preferencesOpen} onToggle={e => setPreferencesOpen(e.currentTarget.open)}>
                    <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 font-semibold"><span className="flex items-center gap-2"><SlidersHorizontal className="h-5 w-5" aria-hidden="true" />Personalize your trip</span><span className="text-sm font-normal text-muted-foreground">Optional</span></summary>
                    <div className="mt-5 space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div><Label htmlFor="accommodation">Stay preference</Label><select id="accommodation" name="accommodation" className={selectClass} value={values.accommodation} onChange={e => update("accommodation", e.target.value)}><option value="">Help me choose</option><option value="budget">Budget hotels</option><option value="mid">3–4 star hotels</option><option value="luxury">5 star hotels</option><option value="boutique">Boutique hotels</option><option value="resort">Resorts</option></select></div>
                        <div><Label htmlFor="travelMode">Travel preference</Label><select id="travelMode" name="travelMode" className={selectClass} value={values.travelMode} onChange={e => update("travelMode", e.target.value)}><option value="">Help me choose</option><option value="bus">Bus</option><option value="cab">Cab</option><option value="train">Train</option><option value="flight">Flight</option></select></div>
                      </div>
                      <fieldset><legend className="mb-3 text-sm font-medium">What do you enjoy?</legend><div className="flex flex-wrap gap-2">{quoteInterests.map(interest => <label key={interest} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-3 text-sm ${values.interests.includes(interest) ? "border-primary bg-primary/10" : "border-border"}`}><input type="checkbox" className="accent-primary" checked={values.interests.includes(interest)} onChange={e => update("interests", e.target.checked ? [...values.interests, interest] : values.interests.filter(item => item !== interest))} />{interest}</label>)}</div></fieldset>
                      <div><Label htmlFor="requirements">Anything else we should plan for?</Label><Textarea id="requirements" name="requirements" className="mt-2" rows={4} maxLength={2000} placeholder="Traveling with children, accessibility needs, preferred hotels or experiences…" value={values.requirements} onChange={e => update("requirements", e.target.value)} {...fieldProps("requirements")} />{errorFor("requirements")}<p className="mt-2 text-xs text-muted-foreground">Your preferred pace and experiences help us tailor the itinerary.</p></div>
                    </div>
                  </details>
                </CardContent></Card>

                <Card><CardContent className="space-y-5 pt-6">
                  <h2 className="flex items-center gap-2 text-xl font-semibold"><Users className="h-5 w-5" aria-hidden="true" />How can we reach you?</h2>
                  <div><Label htmlFor="name">Your name <span aria-hidden="true">*</span></Label><Input id="name" name="name" autoComplete="name" className="mt-2 h-11" value={values.name} onChange={e => update("name", e.target.value)} maxLength={100} required {...fieldProps("name")} />{errorFor("name")}</div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div><Label htmlFor="email">Email <span aria-hidden="true">*</span></Label><Input id="email" name="email" type="email" autoComplete="email" className="mt-2 h-11" placeholder="you@example.com" value={values.email} onChange={e => update("email", e.target.value)} maxLength={254} required {...fieldProps("email")} />{errorFor("email")}</div>
                    <div><Label htmlFor="phone">Phone with country code <span aria-hidden="true">*</span></Label><Input id="phone" name="phone" type="tel" autoComplete="tel" className="mt-2 h-11" placeholder="e.g. +91 98765 43210" value={values.phone} onChange={e => update("phone", e.target.value)} maxLength={30} required {...fieldProps("phone")} />{errorFor("phone")}</div>
                  </div>
                  <div><Label htmlFor="preferredContact">Preferred way to contact you</Label><select id="preferredContact" name="preferredContact" className={selectClass} value={values.preferredContact} onChange={e => update("preferredContact", e.target.value)}><option value="either">Email or phone</option><option value="email">Email</option><option value="phone">Phone</option></select></div>
                  <p className="text-xs text-muted-foreground">Fields marked * are required. By submitting, you ask Musafirnama to contact you about this trip. Read our <Link to="/privacy" className="underline underline-offset-2">privacy notice</Link>.</p>
                  {Object.values(errors).some(Boolean) && <p role="alert" className="text-sm text-destructive">Please check the highlighted fields above.</p>}
                  {submitError && <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm"><p>{submitError}</p>{siteConfig.email && <a href={`mailto:${siteConfig.email}`} className="mt-2 inline-block underline">Contact us by email</a>}</div>}
                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>{pending ? <><Loader2 className="animate-spin" aria-hidden="true" />Sending your request…</> : <>Get my travel quote<ArrowRight aria-hidden="true" /></>}</Button>
                </CardContent></Card>
              </fieldset>

              <aside className="order-last rounded-2xl border bg-muted/30 p-6 lg:sticky lg:top-24 lg:order-none" aria-label="Your trip summary">
                <h2 className="text-xl font-semibold">Your trip, at a glance</h2>
                <dl className="mt-5 space-y-4 text-sm">
                  <div><dt className="text-muted-foreground">Destination</dt><dd className="mt-1 break-words font-medium">{values.destination || "Choose your destination"}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Travelers</dt><dd className="font-medium">{values.travelers || "Not specified"}</dd></div>
                  <div><dt className="text-muted-foreground">Dates</dt><dd className="mt-1 font-medium">{values.flexibleDates ? "Flexible — let's discuss" : values.startDate && values.endDate ? `${values.startDate} to ${values.endDate}` : "Choose your dates"}</dd></div>
                  {days !== null && <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Duration</dt><dd className="font-medium">{days} {days === 1 ? "day" : "days"}</dd></div>}
                  <div><dt className="text-muted-foreground">Budget per person</dt><dd className="mt-1 text-lg font-semibold">{money(values.budget)}</dd></div>
                  {values.interests.length > 0 && <div><dt className="text-muted-foreground">Interests</dt><dd className="mt-1">{values.interests.join(", ")}</dd></div>}
                </dl>
                <p className="mt-5 border-t pt-4 text-xs leading-relaxed text-muted-foreground">Your budget helps us plan options. Final pricing depends on dates, availability and the services you choose.</p>
              </aside>
            </form>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
