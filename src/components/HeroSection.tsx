import { ArrowRight, Check, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import heroSmall from "@/assets/hero-travel-768.webp";
import heroMedium from "@/assets/hero-travel-1280.webp";
import heroLarge from "@/assets/hero-travel-1920.webp";

const HeroSection = () => (
  <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[600px] items-center overflow-hidden bg-primary py-16 sm:min-h-[650px] sm:py-24">
    <picture className="absolute inset-0 -z-20">
      <source type="image/webp" srcSet={`${heroSmall} 768w, ${heroMedium} 1280w, ${heroLarge} 1920w`} sizes="100vw" />
      <img src={heroLarge} alt="" width={1920} height={1080} {...{ fetchpriority: "high" }} loading="eager" className="h-full w-full object-cover object-[60%_center]" />
    </picture>
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
    <div className="container text-white">
      <div className="max-w-3xl">
        <p className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90"><Compass className="h-4 w-4 shrink-0" aria-hidden="true" />India &amp; international holidays</p>
        <h1 id="hero-title" className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">Your trip.<br /><span className="text-[hsl(var(--sand))]">Your way.</span></h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/90 sm:text-xl">India getaways and international holidays, planned around your dates, your budget, and the things you love.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-[52px] border-0 bg-white px-7 text-base font-semibold text-primary hover:bg-white/90">
            <a href="/quotes" onClick={() => trackEvent("cta_click", { source: "home_hero", method: "quote" })}>Plan my trip <ArrowRight aria-hidden="true" /></a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-[52px] border-white/60 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white">
            <a href="/#packages">Explore holiday packages</a>
          </Button>
        </div>
        <ul className="mt-9 flex flex-col gap-3 text-sm text-white/90 sm:flex-row sm:flex-wrap sm:gap-x-6">
          {["Share your travel wishlist", "Choose your budget", "Review your trip details"].map((label) => <li key={label} className="flex items-center gap-2"><Check className="h-4 w-4 text-[hsl(var(--sand))]" aria-hidden="true" />{label}</li>)}
        </ul>
      </div>
    </div>
  </section>
);

export default HeroSection;
