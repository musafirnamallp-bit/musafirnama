import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { packages } from "@/lib/packageData";
import { trackEvent } from "@/lib/analytics";

const TopPackages = () => (
  <section id="packages" aria-labelledby="packages-title" className="bg-muted/40 py-16 sm:py-24">
    <div className="container">
      <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="section-kicker">Find your next escape</p>
          <h2 id="packages-title" className="section-title">A world of possibilities.</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">Beaches, backwaters, city breaks, and mountain air. Start with a destination and make the journey your own.</p>
        </div>
        <a href="/destinations" className="inline-flex shrink-0 items-center gap-2 py-2 text-sm font-semibold text-primary">All destinations <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(packages).map(([slug, pkg]) => (
          <Card key={slug} className="group flex h-full flex-col overflow-hidden border-border/80 bg-card shadow-sm transition-shadow hover:shadow-lg">
            <a href={`/destination/${slug}`} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
              <img src={pkg.image} alt="" width={640} height={640} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
            </a>
            <CardContent className="flex flex-1 flex-col p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{pkg.location.country}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{pkg.duration}</span>
              </div>
              <h3 className="text-lg font-semibold leading-7"><a href={`/destination/${slug}`} className="hover:text-primary">{pkg.packageName}</a></h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{pkg.pickAndDrop}</p>
              <div className="mb-5 mt-3 flex flex-wrap gap-1.5">{pkg.tags.slice(0, 2).map((tag) => <Badge key={tag} variant="secondary" className="font-normal">{tag.replace(/^#/, "")}</Badge>)}</div>
              <div className="mt-auto border-t pt-4">
                <p className="mb-4 flex flex-wrap items-baseline gap-x-2"><span className="text-lg font-semibold text-primary">{pkg.packageRate}</span><span className="text-xs text-muted-foreground">Indicative price per person</span></p>
                <Button asChild variant="outline" className="w-full"><a href={`/destination/${slug}`} aria-label={`View ${pkg.packageName}`} onClick={() => trackEvent("select_item", { item_id: slug, item_name: pkg.packageName, source: "home_packages" })}>View trip details <ArrowRight aria-hidden="true" /></a></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-sm leading-6 text-muted-foreground">Displayed prices are indicative. Confirm the final price, inclusions, travel dates, and availability in your personalized quote.</p>
    </div>
  </section>
);

export default TopPackages;
