import { Link } from "react-router-dom";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/siteConfig";
import { trackEvent } from "@/lib/analytics";

const Contact = () => {
  const whatsappNumber = siteConfig.whatsapp?.replace(/\D/g, "");
  const hasContacts = Boolean(siteConfig.phone || whatsappNumber || siteConfig.email);
  return (
    <PageLayout eyebrow="Let's plan a journey" title="Contact Musafirnama" description="Share your travel idea through the quote form. Include your destination, dates and preferences so your request has the details needed for a useful response.">
      <div className="grid md:grid-cols-2 gap-8">
        <section className="rounded-xl border bg-card p-6 md:p-8"><Send aria-hidden="true" className="h-8 w-8 text-primary" /><h2 className="mt-5 text-2xl font-semibold">Request a travel quote</h2><p className="mt-4 text-muted-foreground leading-relaxed">Planning a holiday, adjusting a route or comparing options? Use the quote form to share your requirements and contact details.</p><Button asChild size="lg" className="mt-6"><Link to="/quotes">Open quote form</Link></Button><p className="mt-4 text-sm text-muted-foreground">Submitting a request does not confirm a booking or take a payment.</p></section>
        <section className="rounded-xl border p-6 md:p-8"><h2 className="text-2xl font-semibold">Include these details</h2><ul className="mt-5 space-y-4 text-muted-foreground leading-relaxed"><li>Where you want to go and your departure city.</li><li>Your preferred dates and whether they are flexible.</li><li>Number of travellers and any room preferences.</li><li>Approximate budget per person and must-have experiences.</li></ul><p className="mt-6 text-sm text-muted-foreground">Use the special requirements field for a question about your trip. Please avoid including identity documents or payment card details.</p></section>
      </div>
      {hasContacts && <section className="mt-10" aria-labelledby="direct-contact-heading"><h2 id="direct-contact-heading" className="text-2xl font-semibold">Contact us directly</h2><p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">Need help with an existing enquiry, having trouble with the quote form, or asking a privacy question? Use the contact options below. You do not need to complete a new travel request.</p><div className={`mt-5 grid gap-4 ${whatsappNumber ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {siteConfig.phone && <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} onClick={() => trackEvent("click_to_call", { source: "contact_page" })} className="rounded-xl border p-5 flex items-start gap-4 hover:bg-muted/40"><Phone aria-hidden="true" className="h-5 w-5 text-primary shrink-0" /><span><span className="block font-semibold">Call</span><span className="mt-1 block text-sm text-muted-foreground break-all">{siteConfig.phone}</span></span></a>}
        {whatsappNumber && <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("whatsapp_click", { source: "contact_page" })} className="rounded-xl border p-5 flex items-start gap-4 hover:bg-muted/40"><MessageCircle aria-hidden="true" className="h-5 w-5 text-primary shrink-0" /><span><span className="block font-semibold">WhatsApp</span><span className="mt-1 block text-sm text-muted-foreground">Discuss your trip<span className="sr-only"> (opens in a new tab)</span></span></span></a>}
        {siteConfig.email && <a href={`mailto:${siteConfig.email}`} onClick={() => trackEvent("email_click", { source: "contact_page" })} className="rounded-xl border p-5 flex items-start gap-4 hover:bg-muted/40"><Mail aria-hidden="true" className="h-5 w-5 text-primary shrink-0" /><span><span className="block font-semibold">Email</span><span className="mt-1 block text-sm text-muted-foreground break-all">{siteConfig.email}</span></span></a>}
      </div></section>}
      <section className="mt-10 rounded-xl bg-muted/40 p-6"><h2 className="text-xl font-semibold">Looking for an answer before enquiring?</h2><p className="mt-3 text-muted-foreground leading-relaxed">Our <Link to="/faq" className="text-primary underline underline-offset-4">frequently asked questions</Link> explain quote requests and indicative pricing. The <Link to="/travel-guides/compare-holiday-quotes" className="text-primary underline underline-offset-4">quote comparison guide</Link> helps you review an offer before booking.</p></section>
    </PageLayout>
  );
};

export default Contact;
