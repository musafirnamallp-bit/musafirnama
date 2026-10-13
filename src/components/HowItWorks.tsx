import { ClipboardList, MessageSquare, Route } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Tell us your idea", description: "Share where you want to go, your travel dates, the people joining you, and a comfortable budget." },
  { icon: Route, title: "Shape your itinerary", description: "Discuss the places, pace, stays, and activities that make the trip feel right for you." },
  { icon: MessageSquare, title: "Review the details", description: "Confirm availability, the final price, inclusions, and cancellation terms before you book." },
];

const HowItWorks = () => (
  <section id="how-it-works" aria-labelledby="how-title" className="py-16 sm:py-24">
    <div className="container">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="section-kicker">Less guesswork. More getting away.</p>
        <h2 id="how-title" className="section-title">A good trip starts with a conversation.</h2>
        <p className="mt-4 leading-7 text-muted-foreground">You bring the wishlist. We help you work through the plan.</p>
      </div>
      <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
        {steps.map(({ icon: Icon, title, description }, index) => (
          <li key={title} className="relative rounded-xl border bg-card p-7">
            <div className="mb-7 flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"><Icon className="h-6 w-6 text-primary" aria-hidden="true" /></span><span className="text-3xl font-light text-primary/35" aria-hidden="true">0{index + 1}</span></div>
            <h3 className="mb-3 text-xl font-semibold">{title}</h3>
            <p className="text-sm leading-7 text-muted-foreground">{description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
