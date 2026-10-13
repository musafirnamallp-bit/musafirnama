import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="mb-3 text-base font-semibold">About Us</h3>
          <p className="text-sm text-muted-foreground">
            We connect travelers with verified agents to craft personalized trips
            worldwide.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-base font-semibold">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">FAQs</a></li>
            <li><a href="#" className="hover:text-foreground">Support</a></li>
            <li><a href="#" className="hover:text-foreground">Careers</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-base font-semibold">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Terms</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-base font-semibold">Follow Us</h3>
          <div className="flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="h-5 w-5" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-foreground"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-foreground"><Facebook className="h-5 w-5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Musafirnama. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
