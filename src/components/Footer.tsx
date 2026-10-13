import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { trackEvent } from "@/lib/analytics";
import logoImg from "@/assets/logo.webp";

const Footer = () => (
  <footer className="border-t bg-muted/40">
    <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
      <div className="max-w-sm">
        <a href="/" className="mb-5 inline-flex items-center gap-3 rounded-md">
          <img src={logoImg} alt="" width={48} height={48} loading="lazy" decoding="async" className="h-12 w-12 rounded-lg" />
          <span className="text-xl font-bold tracking-tight">Musafirnama</span>
        </a>
        <p className="text-sm leading-7 text-muted-foreground">A little inspiration. A plan that fits. Explore holidays in India and beyond, and tell us how you like to travel.</p>
        <a href="/quotes" className="mt-5 inline-flex items-center gap-2 py-2 text-sm font-semibold text-primary">Start planning your trip <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
      </div>
      <div>
        <h2 className="mb-4 text-sm font-semibold">Explore</h2>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li><a href="/destinations" className="inline-block py-2 hover:text-primary">All destinations</a></li>
          <li><a href="/#packages" className="inline-block py-2 hover:text-primary">Holiday packages</a></li>
          <li><a href="/customize" className="inline-block py-2 hover:text-primary">Customize a trip</a></li>
          <li><a href="/travel-guides" className="inline-block py-2 hover:text-primary">Travel guides</a></li>
        </ul>
      </div>
      <div>
        <h2 className="mb-4 text-sm font-semibold">Plan with confidence</h2>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li><a href="/about" className="inline-block py-2 hover:text-primary">About Musafirnama</a></li>
          <li><a href="/#how-it-works" className="inline-block py-2 hover:text-primary">How it works</a></li>
          <li><a href="/faq" className="inline-block py-2 hover:text-primary">Frequently asked questions</a></li>
          <li><a href="/privacy" className="inline-block py-2 hover:text-primary">Privacy policy</a></li>
        </ul>
      </div>
      <div>
        <h2 className="mb-4 text-sm font-semibold">Let's talk travel</h2>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li><a href="/contact" className="inline-block py-2 hover:text-primary">Contact us</a></li>
          <li><a href="/quotes" className="inline-block py-2 hover:text-primary">Request a quote</a></li>
          {siteConfig.phone && <li><a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} onClick={() => trackEvent("contact_click", { method: "phone", source: "footer" })} className="inline-flex items-center gap-2 py-2 hover:text-primary"><Phone className="h-4 w-4" aria-hidden="true" />{siteConfig.phone}</a></li>}
          {siteConfig.whatsapp && <li><a href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`} onClick={() => trackEvent("contact_click", { method: "whatsapp", source: "footer" })} className="inline-flex items-center gap-2 py-2 hover:text-primary"><MessageCircle className="h-4 w-4" aria-hidden="true" />WhatsApp us</a></li>}
          {siteConfig.email && <li><a href={`mailto:${siteConfig.email}`} onClick={() => trackEvent("contact_click", { method: "email", source: "footer" })} className="inline-flex items-center gap-2 break-all py-2 hover:text-primary"><Mail className="h-4 w-4 shrink-0" aria-hidden="true" />{siteConfig.email}</a></li>}
        </ul>
      </div>
    </div>
    <div className="border-t"><div className="container flex flex-col gap-3 py-6 text-xs leading-6 text-muted-foreground sm:flex-row sm:justify-between">
      <p>© {new Date().getFullYear()} Musafirnama. All rights reserved.</p>
      <p>Final pricing and availability are confirmed in your quote.</p>
    </div></div>
  </footer>
);

export default Footer;
