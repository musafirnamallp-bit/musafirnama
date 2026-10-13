import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const CTASection = () => (
  <section aria-labelledby="cta-title" className="bg-primary py-16 text-primary-foreground sm:py-20">
    <div className="container flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
      <div className="max-w-2xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/75">The next story is yours</p>
        <h2 id="cta-title" className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Where would you like to go?</h2>
        <p className="mt-4 max-w-xl leading-7 text-primary-foreground/85">Share a destination, a date, or just the kind of holiday you have in mind. Let's turn it into a plan.</p>
      </div>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
        <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90"><a href="/quotes" onClick={() => trackEvent("cta_click", { method: "quote", source: "home_bottom" })}>Request my travel quote <ArrowRight aria-hidden="true" /></a></Button>
        <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"><a href="/destinations">Explore destinations</a></Button>
      </div>
    </div>
  </section>
);

export default CTASection;
