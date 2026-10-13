import React from "react";
import { CheckCircle2, Globe2, ThumbsUp, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import customer from "@/assets/customer.jpg";

const stats = [
  { icon: CheckCircle2, label: "650+ Verified Travel Agents" },
  { icon: ThumbsUp, label: "99% Positive Reviews" },
  { icon: Globe2, label: "100+ Domestic & International Destinations" },
];

const testimonials = [
  {
    name: "Aarav Patel",
    role: "Solo Traveler",
    quote:
      "Got multiple tailored itineraries within hours. Booked an amazing budget-friendly trip!",
    rating: 5,
    avatar: "/placeholder.svg",
  },
  {
    name: "Sophia Martinez",
    role: "Honeymooner",
    quote:
      "Loved the customization options. We tweaked the plan and everything was flawless!",
    rating: 5,
    avatar: "/placeholder.svg",
  },
  {
    name: "Liam Chen",
    role: "Family Trip",
    quote:
      "Agents were responsive and transparent. The best part was comparing quotes easily.",
    rating: 4,
    avatar: "/placeholder.svg",
  },
  {
    name: "Mia Johnson",
    role: "Adventure Seeker",
    quote: "Super smooth experience and great value. Highly recommend!",
    rating: 5,
    avatar: "/placeholder.svg",
  },
];

const Stars = ({ value }: { value: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={i < value ? "text-primary" : "text-muted-foreground"}
        size={16}
        strokeWidth={2}
        fill={i < value ? "currentColor" : "none"}
      />
    ))}
  </div>
);

const TestimonialSection = () => {
  return (
    <section aria-labelledby="reviews-title" className="container mx-auto mt-16 px-4">
      <header className="mb-8 text-center">
        <h2 id="reviews-title" className="text-2xl font-bold tracking-tight md:text-3xl">
          What Travelers Are Saying
        </h2>
        <p className="mt-2 text-muted-foreground">
          Real reviews from trips planned through our verified agents
        </p>
      </header>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:mx-12">
        {stats.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm transition-transform duration-200 hover:translate-y-[-2px] hover:shadow"
          >
            <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            <p className="text-sm font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Carousel */}
      <Carousel className="relative">
        <CarouselContent>
          {testimonials.map((t) => (
            <CarouselItem key={t.name} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-4 p-3 md:p-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={customer} alt={`${t.name} profile photo`} />
                      <AvatarFallback>{t.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold leading-tight">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                  <Stars value={t.rating} />
                  <p className="text-sm text-muted-foreground">“{t.quote}”</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default TestimonialSection;
