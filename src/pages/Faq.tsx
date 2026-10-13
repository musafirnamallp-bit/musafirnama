import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";

export const faqItems = [
  { question: "How do I request a holiday quote?", answer: "Open the quote form and share your destination, travel dates, number of travellers, approximate budget and contact details. Add your preferences or questions in the special requirements field. Review the details before sending your request." },
  { question: "Does submitting the form confirm a booking?", answer: "No. The form is a request for a quotation. It does not take a payment or reserve flights, accommodation or activities. A booking needs a separate confirmation of the itinerary, price, availability and applicable terms." },
  { question: "Are the prices on package pages final?", answer: "The displayed prices are indicative amounts per person. Your dates, availability, room occupancy, accommodation and transport choices can affect the final amount. Request a dated quotation for the exact total for your group." },
  { question: "Can I change a package's route or duration?", answer: "Use Customize this trip or the quote form to explain the changes you would like. Include the places you want to visit, your preferred pace and the number of nights available. The quotation should confirm which requested changes can be arranged." },
  { question: "Are flights, meals and sightseeing included?", answer: "Inclusions vary by package. Read the inclusion and exclusion lists on the destination page and confirm them in your final quotation. An activity mentioned in a sample itinerary is not automatically part of the price." },
  { question: "Why do package pages show a sample itinerary?", answer: "The published itinerary highlights are an introduction to the route and do not cover every day of the displayed trip duration. Request a complete day-by-day plan covering arrival, overnight stays, transfers, activities and departure before booking." },
  { question: "What if I am still deciding on my travel dates?", answer: "Use the quote form's flexible-date option and explain your preferred month or date range in the requirements field. Mention any fixed commitments so the proposed trip can account for them." },
  { question: "How are cancellations and refunds handled?", answer: "The conditions can depend on the services and providers in your final booking. Ask for the applicable cancellation charges, change fees, refund conditions and payment schedule in writing before making a payment." },
  { question: "Do international packages guarantee a visa or entry?", answer: "No. A travel quotation does not establish eligibility for a visa or entry to a country. Check current passport, visa, transit and entry requirements through official government or embassy sources for your nationality and route." },
  { question: "What details should I avoid putting in the enquiry form?", answer: "The enquiry form needs your travel preferences and contact details. Please do not add payment card numbers, passport numbers, identity documents or other unnecessary sensitive information. The privacy page explains the information sent when you request a quote." }
];

const Faq = () => (
  <PageLayout eyebrow="Before you travel" title="Frequently asked questions" description="Clear answers about quote requests, package prices, custom trips and the details to confirm before booking.">
    <div className="max-w-3xl space-y-4">
      {faqItems.map((item, index) => <details key={item.question} open={index === 0} className="group rounded-xl border bg-card"><summary className="cursor-pointer px-6 py-5 font-semibold leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">{item.question}</summary><p className="px-6 pb-6 text-muted-foreground leading-relaxed">{item.answer}</p></details>)}
    </div>
    <section className="mt-10 max-w-3xl rounded-xl bg-muted/50 p-6 md:p-8"><h2 className="text-2xl font-semibold">Have a question about your own trip?</h2><p className="mt-3 text-muted-foreground">Add it to your quote request along with your destination and preferred travel dates.</p><div className="mt-5 flex flex-wrap gap-3"><Button asChild><Link to="/quotes">Request a quote</Link></Button><Button asChild variant="outline"><Link to="/contact">Contact options</Link></Button></div></section>
  </PageLayout>
);

export default Faq;
