import { ArrowRight, CalendarDays, Hotel, IndianRupee, MapPin, Plane, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const preferences = [
  { icon: MapPin, title: "Your destination", detail: "One place or a journey through several" },
  { icon: CalendarDays, title: "Your dates", detail: "A long weekend or a longer escape" },
  { icon: Users, title: "Your people", detail: "Solo, together, or with the whole family" },
  { icon: Hotel, title: "Your stay", detail: "Share your preferred hotel style" },
  { icon: Plane, title: "Your journey", detail: "Tell us where you will start from" },
  { icon: IndianRupee, title: "Your budget", detail: "A plan built around what works for you" },
];

const CustomizationSection = () => (
  <section id="customize" aria-labelledby="customize-title" className="bg-muted/40 py-16 sm:py-24">
    <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <div className="max-w-xl">
        <p className="section-kicker">Made around you</p>
        <h2 id="customize-title" className="section-title">No two travelers.<br />No two identical trips.</h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">A slower morning. An extra day by the sea. Room for the whole family. Tell us what matters, and use it as the starting point for your holiday.</p>
        <p className="mt-4 leading-7 text-muted-foreground">Already have a destination in mind? Share your preferences to request a tailored plan and quote.</p>
        <Button asChild size="lg" className="mt-8"><a href="/customize">Customize my trip <ArrowRight aria-hidden="true" /></a></Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {preferences.map(({ icon: Icon, title, detail }) => (
          <div key={title} className="rounded-xl border border-border/80 bg-background p-5">
            <Icon className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
            <h3 className="mb-2 font-semibold">{title}</h3>
            <p className="text-sm leading-6 text-muted-foreground">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CustomizationSection;
