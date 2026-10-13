import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RouteEffects from "./components/RouteEffects";
import AnalyticsConsent from "./components/AnalyticsConsent";

const DestinationDetail = lazy(() => import("./pages/DestinationDetail"));
const Destinations = lazy(() => import("./pages/Destinations"));
const CustomizeTrip = lazy(() => import("./pages/CustomizeTrip"));
const GetQuotes = lazy(() => import("./pages/GetQuotes"));
const TravelGuides = lazy(() => import("./pages/TravelGuides"));
const TravelGuide = lazy(() => import("./pages/TravelGuide"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const Privacy = lazy(() => import("./pages/Privacy"));

export default function App() {
  return <>
    <RouteEffects />
    <Suspense fallback={<main id="main-content" className="container mx-auto min-h-screen px-6 py-20" aria-busy="true"><p role="status">Loading your next journey…</p></main>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destination/:slug" element={<DestinationDetail />} />
        <Route path="/customize" element={<CustomizeTrip />} />
        <Route path="/quotes" element={<GetQuotes />} />
        <Route path="/travel-guides" element={<TravelGuides />} />
        <Route path="/travel-guides/:slug" element={<TravelGuide />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/get-quotes" element={<Navigate replace to="/quotes" />} />
        <Route path="/customize-trip" element={<Navigate replace to="/customize" />} />
        <Route path="/blog" element={<Navigate replace to="/travel-guides" />} />
        <Route path="/login" element={<Navigate replace to="/quotes" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <AnalyticsConsent />
  </>;
}
