import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import TopPackages from "@/components/TopPackages";
import CustomizationSection from "@/components/CustomizationSection";
import TestimonialSection from "@/components/TestimonialSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { pathname } = useLocation();
  return (
  <div className="min-h-screen">
    <Navigation />
    <main id="main-content" data-page-path={pathname} tabIndex={-1}>
      <HeroSection />
      <TopPackages />
      <HowItWorks />
      <CustomizationSection />
      <TestimonialSection />
      <CTASection />
    </main>
    <Footer />
  </div>
);
};

export default Index;
