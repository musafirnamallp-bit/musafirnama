import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { travelGuides } from "@/lib/travelGuides";
import { packages } from "@/lib/packageData";
import NotFound from "@/pages/NotFound";

const TravelGuide = () => {
  const { slug } = useParams();
  const guide = travelGuides.find(item => item.slug === slug);
  if (!guide) return <NotFound />;

  return (
    <PageLayout title={guide.title} description={guide.description} eyebrow={`${guide.category} · ${guide.readMinutes} min read`} parent={{ label: "Travel guides", to: "/travel-guides" }}>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-10 lg:gap-14">
        <article className="min-w-0">
          <nav aria-label="In this guide" className="rounded-xl border bg-muted/30 p-6 mb-10"><h2 className="font-semibold">In this guide</h2><ol className="mt-4 space-y-3 list-decimal pl-5 text-sm">{guide.sections.map((section, index) => <li key={section.title}><a href={`#section-${index + 1}`} className="text-primary underline-offset-4 hover:underline">{section.title}</a></li>)}</ol></nav>
          <div className="space-y-10">{guide.sections.map((section, index) => <section key={section.title} id={`section-${index + 1}`} className="scroll-mt-24"><h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2><div className="mt-4 space-y-4 text-muted-foreground leading-7">{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>{section.checklist && <ul className="mt-5 space-y-3 rounded-xl bg-muted/40 p-6 text-sm leading-relaxed">{section.checklist.map(item => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{item}</li>)}</ul>}</section>)}</div>
          <section className="mt-12 rounded-xl border bg-primary/5 p-6 md:p-8"><h2 className="text-2xl font-semibold">Ready to plan your trip?</h2><p className="mt-3 text-muted-foreground leading-relaxed">Tell us where you would like to go, your dates and what matters most. A quote request starts the planning conversation.</p><Button asChild className="mt-5" size="lg"><Link to="/quotes">Request a travel quote</Link></Button></section>
        </article>
        <aside className="space-y-8">
          <section><h2 className="font-semibold text-xl">Explore trip ideas</h2><div className="mt-4 space-y-4">{guide.relatedPackages.map(packageSlug => {
            const pkg = packages[packageSlug];
            return <Link key={packageSlug} to={`/destination/${packageSlug}`} className="block overflow-hidden rounded-xl border bg-card hover:shadow-md transition-shadow"><img src={pkg.image} alt="" loading="lazy" decoding="async" width={800} height={500} className="w-full aspect-[8/5] object-cover" /><div className="p-4"><h3 className="font-semibold">{pkg.packageName}</h3><p className="mt-1 text-sm text-muted-foreground">{pkg.duration} · {pkg.location.country}</p><p className="mt-2 text-sm font-medium">{pkg.packageRate}<span className="block font-normal text-xs text-muted-foreground">Indicative price per person</span></p></div></Link>;
          })}</div></section>
          <section><h2 className="font-semibold text-xl">More planning help</h2><ul className="mt-4 space-y-4">{travelGuides.filter(item => item.slug !== guide.slug).map(item => <li key={item.slug}><Link to={`/travel-guides/${item.slug}`} className="text-sm text-primary leading-relaxed hover:underline underline-offset-4">{item.title}</Link></li>)}<li><Link to="/faq" className="text-sm text-primary inline-flex items-center gap-2 hover:underline">Common travel questions<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></li></ul></section>
        </aside>
      </div>
    </PageLayout>
  );
};

export default TravelGuide;
