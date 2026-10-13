import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/logo.webp";

const navItems = [
  { label: "Destinations", href: "/destinations" },
  { label: "Packages", href: "/#packages" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Travel guides", href: "/travel-guides" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="container flex h-20 items-center justify-between gap-4">
        <a href="/" aria-label="Musafirnama home" className="flex shrink-0 items-center gap-2.5 rounded-md">
          <img src={logoImg} alt="" width={48} height={48} className="h-11 w-11 rounded-lg sm:h-12 sm:w-12" />
          <span>
            <span className="block text-lg font-bold tracking-tight">Musafirnama</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Your trip. Your way.</span>
          </span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}
              className="py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary aria-[current=page]:text-primary">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex"><a href="/quotes">Plan a trip <ArrowUpRight aria-hidden="true" /></a></Button>
          <Button ref={menuButton} variant="ghost" className="h-11 w-11 p-0 lg:hidden" type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}
            aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!menuOpen} className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t bg-background lg:hidden">
        <div className="container grid gap-1 py-4">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className="rounded-md px-3 py-3 text-base font-medium hover:bg-muted aria-[current=page]:bg-muted">
              {item.label}
            </a>
          ))}
          <Button asChild className="mt-3 h-12"><a href="/quotes" onClick={() => setMenuOpen(false)}>Plan a trip <ArrowUpRight aria-hidden="true" /></a></Button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
