import React from "react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/logo.jpeg";

const Navigation = () => {
  const navItems = [
    { label: "Home", href: "#top" },
    { label: "Destinations", href: "#packages" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Packages", href: "#packages" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex font-semibold tracking-tight">
          <img src={logoImg} alt="Musafirnama Logo" className="h-12 w-auto" />
        </a>
        <nav aria-label="Main Navigation" className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground story-link"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.href = '/login'}
          >
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
