import { ArrowRight, Check } from "lucide-react";

const checklist = [
  { title: "The places you will stay", detail: "Hotel names or categories, room type, meal plan, and check-in details." },
  { title: "What your price includes", detail: "Flights, transfers, activities, taxes, and any costs paid separately." },
  { title: "A plan for each day", detail: "Your route, travel time, sightseeing, and time to explore at your own pace." },
  { title: "The booking conditions", detail: "Payment dates, cancellation terms, and who to contact about your trip." },
];

// This section intentionally uses a useful booking checklist instead of unverified testimonials.
const TestimonialSection = () => (
  <section aria-labelledby="confidence-title" className="py-16 sm:py-24">
    <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
      <div>
        <p className="section-kicker">Travel with clarity</p>
        <h2 id="confidence-title" className="section-title">Great memories start with clear details.</h2>
        <p className="mt-5 max-w-lg leading-7 text-muted-foreground">Before you confirm your holiday, ask for a written quote covering the things that matter. Use this checklist to guide the conversation.</p>
        <a href="/faq" className="mt-6 inline-flex items-center gap-2 py-2 font-semibold text-primary">Your planning questions, answered <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
        <a href="/travel-guides" className="mt-1 block w-fit py-2 text-sm text-muted-foreground underline underline-offset-4 hover:text-primary">Explore our travel guides</a>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2">
        {checklist.map(({ title, detail }) => (
          <li key={title} className="border-t pt-5">
            <Check className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
            <h3 className="mb-2 font-semibold">{title}</h3>
            <p className="text-sm leading-7 text-muted-foreground">{detail}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default TestimonialSection;
