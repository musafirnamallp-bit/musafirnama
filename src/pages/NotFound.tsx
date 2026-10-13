import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <><Navigation /><main id="main-content" data-page-path="/404" tabIndex={-1} className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">404 · A small detour</p>
    <h1 className="mb-4 text-4xl font-bold">This page is off the map.</h1>
    <p className="mb-8 max-w-md text-muted-foreground">The link may have changed. Find your next destination or head back to the homepage.</p>
    <div className="flex flex-wrap justify-center gap-3"><Button asChild><a href="/destinations">Explore destinations</a></Button><Button variant="outline" asChild><a href="/">Back to home</a></Button></div>
  </main><Footer /></>;
}
