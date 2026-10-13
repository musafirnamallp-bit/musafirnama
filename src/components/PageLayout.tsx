import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  title: string;
  description: string;
  eyebrow?: string;
  parent?: { label: string; to: string };
  children: ReactNode;
}

const PageLayout = ({ title, description, eyebrow, parent, children }: PageLayoutProps) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Navigation />
    <main id="main-content" tabIndex={-1} className="flex-1">
      <header className="border-b bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-primary underline-offset-4 hover:underline">Home</Link></li>
              {parent && <li className="flex items-center gap-2"><ChevronRight aria-hidden="true" className="h-3 w-3" /><Link to={parent.to} className="hover:text-primary underline-offset-4 hover:underline">{parent.label}</Link></li>}
              <li className="flex items-center gap-2"><ChevronRight aria-hidden="true" className="h-3 w-3" /><span aria-current="page" className="text-foreground">{title}</span></li>
            </ol>
          </nav>
          {eyebrow && <p className="mb-3 text-sm font-semibold tracking-widest uppercase text-primary">{eyebrow}</p>}
          <h1 className="max-w-4xl text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </header>
      <div className="container max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">{children}</div>
    </main>
    <Footer />
  </div>
);

export default PageLayout;
