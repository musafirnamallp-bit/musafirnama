import React from "react";
import hero from "@/assets/hero-travel-2.jpg";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section aria-labelledby="cta-title" className="relative mt-16 overflow-hidden rounded-xl border">
      <img
        src={hero}
        alt="Panoramic travel landscape"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/70 to-background/40" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 id="cta-title" className="text-3xl font-bold tracking-tight md:text-4xl">
          Ready to Plan Your Dream Trip?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-muted-foreground">
          Share your wishlist and get curated proposals from trusted travel experts.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button 
            size="lg"
            onClick={() => window.location.href = '/quotes'}
          >
            Get Free Quotes
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Packages
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
