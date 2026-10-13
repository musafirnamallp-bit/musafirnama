import { useEffect, useState } from "react";
import { initializeAnalytics, readAnalyticsConsent, saveAnalyticsConsent } from "@/lib/analytics";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";

export default function AnalyticsConsent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!siteConfig.ga4Id) return;
    setOpen(readAnalyticsConsent() === null);
    initializeAnalytics();
    const show = () => setOpen(true);
    window.addEventListener("musafirnama:privacy-settings", show);
    return () => window.removeEventListener("musafirnama:privacy-settings", show);
  }, []);
  if (!open) return null;
  return <section aria-label="Analytics preferences" className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl border bg-background p-5 shadow-xl">
    <h2 className="font-semibold">Help us improve your travel search</h2>
    <p className="my-2 text-sm text-muted-foreground">With your permission, we use Google Analytics to understand how the site is used. Your enquiry works either way. <a className="underline" href="/privacy">Privacy information</a></p>
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => { saveAnalyticsConsent("accepted"); setOpen(false); }}>Allow analytics</Button>
      <Button variant="outline" onClick={() => { saveAnalyticsConsent("declined"); setOpen(false); }}>No thanks</Button>
    </div>
  </section>;
}
