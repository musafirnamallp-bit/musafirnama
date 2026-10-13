import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { travelGuides } from "@/lib/travelGuides";
import { packages } from "@/lib/packageData";

const TravelGuides = () => (
  <PageLayout eyebrow="Travel with a plan" title="Practical travel guides" description="Useful planning checklists to help you choose a route, set a budget and ask better questions before booking a holiday.">
    <div className="grid md:grid-cols-3 gap-6">
      {travelGuides.map(guide => <article key={guide.slug} className="overflow-hidden rounded-xl border bg-card flex flex-col">
        <img src={packages[guide.relatedPackages[0]].image} alt="" loading="lazy" decoding="async" width={800} height={500} className="w-full aspect-[8/5] object-cover" />
        <div className="p-6 flex flex-1 flex-col">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{guide.category} · {guide.readMinutes} min read</p>
          <h2 className="mt-3 text-xl font-semibold leading-snug"><Link to={`/travel-guides/${guide.slug}`} className="hover:text-primary">{guide.title}</Link></h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{guide.description}</p>
          <Link to={`/travel-guides/${guide.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-primary font-medium hover:underline underline-offset-4">Read guide<span className="sr-only">: {guide.title}</span><ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </article>)}
    </div>
    <aside className="mt-12 rounded-xl border bg-muted/40 p-6 flex items-start gap-4"><BookOpen aria-hidden="true" className="h-6 w-6 shrink-0 text-primary" /><div><h2 className="font-semibold text-lg">Turn a useful idea into your own itinerary</h2><p className="mt-2 text-muted-foreground leading-relaxed">Start with our <Link to="/destinations" className="text-primary underline underline-offset-4">destination ideas</Link>, then share your travel dates and preferences in a <Link to="/quotes" className="text-primary underline underline-offset-4">quote request</Link>. Current prices, availability and entry requirements should be confirmed for your trip.</p></div></aside>
  </PageLayout>
);

export default TravelGuides;
