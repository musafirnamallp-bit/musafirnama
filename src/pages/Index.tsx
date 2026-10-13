import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import TopPackages from "@/components/TopPackages";
import CustomizationSection from "@/components/CustomizationSection";
import TestimonialSection from "@/components/TestimonialSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navigation />
    <main id="main-content" tabIndex={-1}>
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

export default Index;
