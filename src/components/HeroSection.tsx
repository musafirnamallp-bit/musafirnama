import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Star } from "lucide-react";
import heroImage1 from "@/assets/hero-travel-1.jpg";
import heroImage2 from "@/assets/hero-travel-2.jpg";
import heroImage3 from "@/assets/hero-travel-3.jpg";

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Headlines */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-fade-in">
              Your Trip. Your Way.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Tell us your travel dream — get multiple customized quotes from verified agents 
              and choose the perfect one for your budget.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
              onClick={() => window.location.href = '/quotes'}
            >
              Get Free Quotes
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Packages
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium">
              <Shield className="h-4 w-4 mr-2" />
              Verified Agents
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium">
              <Star className="h-4 w-4 mr-2" />
              Best Price Guarantee
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium">
              <CheckCircle className="h-4 w-4 mr-2" />
              Trusted by 50K+ Travelers
            </Badge>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 pt-8">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? "bg-white scale-110" 
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;