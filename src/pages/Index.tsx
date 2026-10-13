import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import TopPackages from "@/components/TopPackages";
import CustomizationSection from "@/components/CustomizationSection";
import TestimonialSection from "@/components/TestimonialSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="top">
          <HeroSection />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="packages">
          <TopPackages />
        </section>
        <section id="customize">
          <CustomizationSection />
        </section>
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
