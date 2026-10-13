import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Check, ChevronRight, Clock, FileDown, MapPin, Route, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { packages } from "@/lib/packageData";
import { trackEvent } from "@/lib/analytics";
import { travelGuides } from "@/lib/travelGuides";

const DestinationDetail = () => {
  const { slug } = useParams();
  const pkg = slug && Object.prototype.hasOwnProperty.call(packages, slug) ? packages[slug] : undefined;
  const price = pkg ? Number(pkg.packageRate.replace(/[^0-9]/g, "")) : 0;

  useEffect(() => {
    if (pkg && slug) trackEvent("view_item", { item_id: slug, item_name: pkg.packageName, value: price, currency: "INR" });
  }, [slug, pkg, price]);

  if (!pkg) return <NotFound />;

  const query = new URLSearchParams({ destination: pkg.location.city, budget: String(price), package: slug!, packageName: pkg.packageName, duration: pkg.duration }).toString();
  const totalDays = Number(pkg.duration.match(/(\d+)D/)?.[1]) || pkg.itinerary.length;
  const related = Object.entries(packages).filter(([key]) => key !== slug).sort(([, first], [, second]) => Number(second.location.country === pkg.location.country) - Number(first.location.country === pkg.location.country)).slice(0, 3);
  const guides = travelGuides.filter(guide => guide.relatedPackages.includes(slug!) || guide.slug === "compare-holiday-quotes");
  const questions = [
    { question: `Is ${pkg.packageRate} the final price for this ${pkg.location.city} trip?`, answer: "This is an indicative price per person. Travel dates, availability, room occupancy and your choices affect the final price. Request a dated quote confirming the total for your group and any extra charges." },
    { question: `Can I customize this ${pkg.duration} itinerary?`, answer: "Yes, you can request a different pace, route, hotel preference or duration in the quote form. The final quotation should confirm which changes can be arranged and the resulting price." },
    { question: "Does the sample itinerary cover the whole trip?", answer: `The published highlights show ${pkg.itinerary.length} of the ${totalDays} days in the displayed trip duration. They are a starting point for planning. Request a complete day-by-day itinerary before booking.` },
    { question: "How do I know which activities and meals are included?", answer: "Read the proposed inclusion and exclusion lists together. An activity mentioned in the sample itinerary is not automatically included in the price. Ask for the final quotation to confirm hotels, transport, meal plans, tickets and optional activities." },
    { question: "What happens when I request a quote?", answer: "The form sends your travel requirements and contact details for a response about your trip. It does not take a payment or confirm a reservation. Review the complete itinerary, availability, payment schedule and cancellation conditions before booking." }
  ];
  const noteSections = pkg.otherInfo.filter(section => section.title !== "Important Notes");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <nav aria-label="Breadcrumb" className="container mx-auto max-w-6xl px-4 md:px-6 py-5 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-primary hover:underline">Home</Link></li>
            <li className="flex items-center gap-2"><ChevronRight aria-hidden="true" className="h-3 w-3" /><Link to="/destinations" className="hover:text-primary hover:underline">Destinations</Link></li>
            <li className="flex items-center gap-2"><ChevronRight aria-hidden="true" className="h-3 w-3" /><span aria-current="page" className="text-foreground">{pkg.packageName}</span></li>
          </ol>
        </nav>
        <section className="relative min-h-[360px] md:min-h-[420px] overflow-hidden flex items-end">
          <img src={pkg.image} alt={`${pkg.location.city}, ${pkg.location.country}`} {...{ fetchpriority: "high" }} width={1200} height={700} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <div className="relative container max-w-6xl mx-auto px-4 md:px-6 py-9 md:py-12 text-white">
            <div className="flex flex-wrap gap-2 mb-4">{pkg.tags.map(tag => <Badge key={tag} variant="secondary" className="bg-white/15 text-white border-white/20">{tag.replace(/^#/, "")}</Badge>)}</div>
            <h1 className="max-w-3xl text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">{pkg.packageName}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm md:text-base"><span className="flex items-center gap-2"><MapPin aria-hidden="true" className="h-4 w-4" />{pkg.location.city}, {pkg.location.country}</span><span className="flex items-center gap-2"><Clock aria-hidden="true" className="h-4 w-4" />{pkg.duration}</span><span className="flex items-center gap-2"><Route aria-hidden="true" className="h-4 w-4" />{pkg.pickAndDrop}</span></div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-6 py-10 md:py-12 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              <section className="rounded-xl border bg-card p-6 md:p-8" aria-labelledby="overview-heading">
                <h2 id="overview-heading" className="text-2xl font-semibold">Your trip at a glance</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{pkg.overview.description}</p>
                <div className="mt-5 rounded-lg bg-muted/50 p-4"><p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-2">Proposed route</p><p className="font-medium leading-relaxed">{pkg.overview.route}</p></div>
              </section>

              <section className="rounded-xl border bg-card p-6 md:p-8" aria-labelledby="itinerary-heading">
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Sample itinerary</p>
                <h2 id="itinerary-heading" className="text-2xl font-semibold">A taste of the journey</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">These highlights cover {pkg.itinerary.length} of {totalDays} days. Request a complete day-by-day plan for your dates before booking. Activities shown here are examples; confirm which are included in your quotation.</p>
                <div className="mt-6 space-y-3">{pkg.itinerary.map((day, index) => <details key={day.day} open={index === 0} className="rounded-lg border">
                  <summary className="cursor-pointer p-4 font-medium leading-relaxed focus-visible:ring-2 focus-visible:ring-ring rounded-lg"><span className="font-semibold text-primary">Day {day.day}</span><span className="ml-3">{day.title}</span></summary>
                  <ul className="px-5 pb-5 space-y-2">{day.activities.map(activity => <li key={activity} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"><span aria-hidden="true" className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />{activity}</li>)}</ul>
                </details>)}</div>
                <Button asChild variant="outline" className="mt-5"><Link to={`/quotes?${query}`}>Request the full itinerary</Link></Button>
              </section>

              <section aria-labelledby="inclusions-heading">
                <h2 id="inclusions-heading" className="text-2xl font-semibold">What's in the proposed package</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">Use these lists as a starting point. Your final quotation should confirm the included services and any additional charges.</p>
                <div className="grid md:grid-cols-2 gap-5 mt-5">
                  <div className="rounded-xl border bg-card p-6"><h3 className="text-lg font-semibold flex items-center gap-2"><Check aria-hidden="true" className="h-5 w-5 text-primary" />Proposed inclusions</h3><ul className="mt-4 space-y-3">{pkg.inclusions.map(item => <li key={item} className="flex items-start gap-2 text-sm leading-relaxed"><Check aria-hidden="true" className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />{item}</li>)}</ul></div>
                  <div className="rounded-xl border bg-card p-6"><h3 className="text-lg font-semibold flex items-center gap-2"><X aria-hidden="true" className="h-5 w-5 text-muted-foreground" />Listed exclusions</h3><ul className="mt-4 space-y-3">{pkg.exclusions.map(item => <li key={item} className="flex items-start gap-2 text-sm leading-relaxed"><X aria-hidden="true" className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />{item}</li>)}</ul></div>
                </div>
              </section>

              <section className="rounded-xl border bg-card p-6 md:p-8" aria-labelledby="planning-heading">
                <h2 id="planning-heading" className="text-2xl font-semibold">Before you confirm your trip</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">Ask for named accommodation, the complete itinerary, arrival and departure arrangements, the total cost and the applicable payment and cancellation terms in writing.</p>
                {noteSections.map(section => <div key={section.title} className="mt-5"><h3 className="font-semibold">{section.title === "Must Carry" ? "Packing and document reminders" : section.title}</h3><ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-muted-foreground">{section.info.map(item => <li key={item}>{item}</li>)}</ul></div>)}
                <p className="mt-5 text-sm text-muted-foreground leading-relaxed">Confirm check-in times and any document requirements for your chosen services. {pkg.location.country !== "India" && "For international travel, check current passport, visa, transit and entry requirements through official government or embassy information for your nationality and route."}</p>
              </section>

              <section aria-labelledby="package-faq-heading"><h2 id="package-faq-heading" className="text-2xl font-semibold">Questions about this trip</h2><div className="mt-5 space-y-3">{questions.map(question => <details key={question.question} className="rounded-xl border bg-card"><summary className="cursor-pointer p-5 font-medium leading-relaxed focus-visible:ring-2 focus-visible:ring-ring rounded-xl">{question.question}</summary><p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{question.answer}</p></details>)}</div></section>
            </div>

            <aside className="lg:sticky lg:top-24 space-y-5">
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">Indicative price per person</p>
                <p className="mt-2 text-3xl font-bold text-primary">{pkg.packageRate}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">Final pricing depends on your dates, availability, room occupancy and chosen services.</p>
                <dl className="mt-6 space-y-3 text-sm"><div className="flex gap-4 justify-between"><dt className="text-muted-foreground">Duration</dt><dd className="font-medium">{pkg.duration}</dd></div><div className="flex gap-4 justify-between"><dt className="text-muted-foreground">Pick-up and drop-off</dt><dd className="font-medium text-right">{pkg.pickAndDrop}</dd></div></dl>
                <div className="border-t mt-6 pt-6 space-y-3"><Button asChild className="w-full" size="lg"><Link to={`/quotes?${query}`} onClick={() => trackEvent("select_item", { item_id: slug, item_name: pkg.packageName, source: "package_quote" })}>Get a travel quote</Link></Button><Button asChild variant="outline" className="w-full" size="lg"><Link to={`/customize?${query}`}>Customize this trip</Link></Button></div>
                <p className="mt-4 text-xs text-muted-foreground text-center leading-relaxed">An enquiry starts the conversation. No payment is taken on this form.</p>
                {pkg.pdf && <Button asChild variant="secondary" className="w-full mt-4" size="sm"><a href={pkg.pdf} target="_blank" rel="noopener noreferrer"><FileDown aria-hidden="true" className="h-4 w-4 mr-2" />Download itinerary PDF<span className="sr-only"> (opens in a new tab)</span></a></Button>}
              </div>
              <div className="rounded-xl bg-muted/40 p-6"><h2 className="font-semibold">Plan with a little more clarity</h2><ul className="mt-4 space-y-4">{guides.map(guide => <li key={guide.slug}><Link to={`/travel-guides/${guide.slug}`} className="text-sm text-primary hover:underline underline-offset-4 leading-relaxed">{guide.title}</Link></li>)}<li><Link to="/contact" className="text-sm text-primary hover:underline underline-offset-4">Contact and enquiry options</Link></li></ul></div>
            </aside>
          </div>

          <section className="mt-16" aria-labelledby="related-heading"><div className="flex flex-wrap justify-between items-center gap-4"><h2 id="related-heading" className="text-2xl font-semibold">More journeys to consider</h2><Link to="/destinations" className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline">All destinations<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div><div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{related.map(([relatedSlug, trip]) => <article key={relatedSlug} className="rounded-xl border overflow-hidden bg-card"><img src={trip.image} alt="" loading="lazy" decoding="async" width={800} height={500} className="w-full aspect-[8/5] object-cover" /><div className="p-5"><p className="text-xs text-primary font-semibold uppercase tracking-wide">{trip.location.country} · {trip.duration}</p><h3 className="mt-2 text-lg font-semibold"><Link to={`/destination/${relatedSlug}`} className="hover:text-primary">{trip.packageName}</Link></h3><p className="mt-3 font-medium">{trip.packageRate}<span className="block text-xs font-normal text-muted-foreground">Indicative price per person</span></p><Link to={`/destination/${relatedSlug}`} className="mt-4 min-h-11 inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline">Explore {trip.location.city}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div></article>)}</div></section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DestinationDetail;
