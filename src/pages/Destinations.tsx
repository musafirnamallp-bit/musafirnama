import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { packages } from "@/lib/packageData";

const packageList = Object.entries(packages).map(([slug, pkg]) => ({ slug, ...pkg }));
const priceOf = (price: string) => Number(price.replace(/[^0-9]/g, ""));

const Destinations = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [budget, setBudget] = useState("all");
  const [sort, setSort] = useState("featured");
  const visible = useMemo(() => {
    const result = packageList.filter(pkg => {
      const matchSearch = `${pkg.packageName} ${pkg.location.city} ${pkg.location.state} ${pkg.location.country} ${pkg.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase().trim());
      const matchRegion = region === "all" || (region === "india" ? pkg.location.country === "India" : pkg.location.country !== "India");
      const price = priceOf(pkg.packageRate);
      const matchBudget = budget === "all" || (budget === "under50000" && price < 50000) || (budget === "50000to100000" && price >= 50000 && price <= 100000) || (budget === "over100000" && price > 100000);
      return matchSearch && matchRegion && matchBudget;
    });
    if (sort === "price-asc") result.sort((a, b) => priceOf(a.packageRate) - priceOf(b.packageRate));
    if (sort === "price-desc") result.sort((a, b) => priceOf(b.packageRate) - priceOf(a.packageRate));
    return result;
  }, [search, region, budget, sort]);
  const resetFilters = () => { setSearch(""); setRegion("all"); setBudget("all"); setSort("featured"); };
  const selectClass = "mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <PageLayout eyebrow="Find your next journey" title="Explore holiday destinations" description="Browse trip ideas in India and beyond. Compare routes, sample itineraries and indicative prices, then request a quote for your own dates.">
      <section aria-label="Filter holiday packages" className="rounded-xl border bg-card p-5 md:p-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="destination-search" className="text-sm font-medium">Search destinations</label>
            <div className="relative mt-2"><Search aria-hidden="true" className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" /><Input id="destination-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Try Goa, Bali or culture" className="h-11 pl-9" /></div>
          </div>
          <div><label htmlFor="destination-region" className="text-sm font-medium">Where to?</label><select id="destination-region" value={region} onChange={event => setRegion(event.target.value)} className={selectClass}><option value="all">All destinations</option><option value="india">India</option><option value="international">International</option></select></div>
          <div><label htmlFor="destination-budget" className="text-sm font-medium">Indicative price per person</label><select id="destination-budget" value={budget} onChange={event => setBudget(event.target.value)} className={selectClass}><option value="all">All prices</option><option value="under50000">Below ₹50,000</option><option value="50000to100000">₹50,000–₹1,00,000</option><option value="over100000">Above ₹1,00,000</option></select></div>
          <div><label htmlFor="destination-sort" className="text-sm font-medium">Sort packages</label><select id="destination-sort" value={sort} onChange={event => setSort(event.target.value)} className={selectClass}><option value="featured">Featured order</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></div>
        </div>
      </section>
      <div className="my-6 flex items-center justify-between gap-4">
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground">{visible.length} {visible.length === 1 ? "trip idea" : "trip ideas"} to explore</p>
        {(search || region !== "all" || budget !== "all" || sort !== "featured") && <Button variant="ghost" size="sm" onClick={resetFilters}>Clear filters</Button>}
      </div>
      {visible.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map(pkg => <article key={pkg.slug} className="overflow-hidden rounded-xl border bg-card flex flex-col transition-shadow hover:shadow-lg">
          <Link to={`/destination/${pkg.slug}`} tabIndex={-1} aria-hidden="true"><img src={pkg.image} alt="" loading="lazy" decoding="async" width={800} height={500} className="w-full aspect-[8/5] object-cover" /></Link>
          <div className="p-5 flex flex-1 flex-col">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">{pkg.location.country} · {pkg.duration}</p>
            <h2 className="text-xl font-semibold"><Link to={`/destination/${pkg.slug}`} className="hover:text-primary">{pkg.packageName}</Link></h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{pkg.overview.description}</p>
            <p className="mt-4 text-sm text-muted-foreground">{pkg.pickAndDrop}</p>
            <p className="mt-2 font-semibold text-xl">{pkg.packageRate}<span className="block text-xs font-normal text-muted-foreground">Indicative price per person</span></p>
            <Link to={`/destination/${pkg.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium text-primary underline-offset-4 hover:underline">Explore {pkg.location.city}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
        </article>)}
      </div> : <section className="rounded-xl border border-dashed p-10 text-center"><SlidersHorizontal aria-hidden="true" className="mx-auto h-8 w-8 text-muted-foreground" /><h2 className="mt-4 text-xl font-semibold">No matching trip ideas yet</h2><p className="mt-2 text-muted-foreground">Try a broader search or tell us the destination you have in mind.</p><div className="mt-6 flex justify-center flex-wrap gap-3"><Button variant="outline" onClick={resetFilters}>Reset filters</Button><Button asChild><Link to="/quotes">Request a custom quote</Link></Button></div></section>}
      <section className="mt-12 rounded-xl bg-muted/50 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"><div><h2 className="text-2xl font-semibold">Make the trip your own</h2><p className="mt-2 text-muted-foreground max-w-2xl">Dates, hotel choices and availability affect the final price. Share your preferences to request a personalized quotation.</p></div><Button asChild size="lg"><Link to="/quotes">Get a travel quote</Link></Button></section>
      <p className="mt-6 text-sm text-muted-foreground">Need help comparing options? Read our <Link to="/travel-guides/compare-holiday-quotes" className="text-primary underline underline-offset-4">holiday quote comparison guide</Link>.</p>
    </PageLayout>
  );
};

export default Destinations;
