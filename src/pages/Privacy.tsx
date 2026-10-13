import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/siteConfig";

const Privacy = () => (
  <PageLayout title="Privacy and quote enquiries" description="This page explains the information collected by the travel enquiry forms and how it is used to process a quote request.">
    <div className="max-w-3xl space-y-8 text-muted-foreground leading-relaxed">
      <section><h2 className="text-xl font-semibold text-foreground mb-3">Information you provide</h2><p>The quote form collects your name, email address, phone number and trip details, including destination, number of travellers, travel dates, approximate budget and any preferences or special requirements you choose to enter.</p><p className="mt-3">Please provide only what is needed to discuss your trip. Do not enter payment card details, passport numbers or identity documents in the enquiry form.</p></section>
      <section><h2 className="text-xl font-semibold text-foreground mb-3">Why this information is used</h2><p>Your travel requirements and contact details are used to process your enquiry, clarify your preferences and respond about a quotation. Submitting a form requests contact about your trip; it does not confirm a booking or make a payment.</p></section>
      <section><h2 className="text-xl font-semibold text-foreground mb-3">How an enquiry is sent</h2><p>When you submit a quote request, the form sends these details to Musafirnama's quote-processing service through Amazon Web Services (AWS). Website hosting and the quote-processing service are involved in delivering the website and handling the request.</p></section>
      <section><h2 className="text-xl font-semibold text-foreground mb-3">Website measurements</h2><p>If optional Google Analytics is configured and you accept it, page visits and actions such as opening a package or successfully submitting an enquiry may be measured to understand how the website is used. The website does not send names, email addresses, phone numbers or the free-text content of an enquiry in those analytics events.</p><p className="mt-3">Your analytics choice is saved in your browser's local storage. You can use the website and request a quote without accepting optional analytics.</p>{siteConfig.ga4Id && <Button type="button" variant="outline" className="mt-4" onClick={() => window.dispatchEvent(new Event("musafirnama:privacy-settings"))}>Manage analytics preferences</Button>}</section>
      <section><h2 className="text-xl font-semibold text-foreground mb-3">External links</h2><p>If you follow a link to a third-party service, such as WhatsApp, your use of that service is subject to its own privacy practices. Share only the information needed for your conversation.</p></section>
      <section><h2 className="text-xl font-semibold text-foreground mb-3">Questions about your information</h2><p>Use the available options on our <Link to="/contact" className="text-primary underline underline-offset-4">contact page</Link> for questions about information you submitted, including corrections or removal requests. Identify the relevant enquiry without sending unnecessary personal documents.</p></section>
    </div>
  </PageLayout>
);

export default Privacy;
