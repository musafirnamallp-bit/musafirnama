import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Hotel, MapPin, Calendar, Users, DollarSign } from "lucide-react";

const CustomizationSection = () => {
  const customizationOptions = [
    { icon: Plane, label: "Flights", options: ["Economy", "Business", "Direct Routes"] },
    { icon: Hotel, label: "Hotels", options: ["5-Star", "Boutique", "Local Stays"] },
    { icon: MapPin, label: "Sightseeing", options: ["Must-See", "Hidden Gems", "Local Tours"] },
    { icon: Calendar, label: "Activities", options: ["Adventure", "Cultural", "Relaxation"] },
    { icon: Users, label: "Group Size", options: ["Solo", "Couple", "Family", "Friends"] },
    { icon: DollarSign, label: "Budget", options: ["Budget", "Mid-Range", "Luxury"] }
  ];

  return (
    <section className="py-20 md:px-6 bg-background">
      <div className="container mx-auto md:max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                No Two Trips Should Be the Same
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Every traveler is unique, and so should be their journey. Customize every aspect 
                of your trip - from flights and hotels to sightseeing and activities - to match 
                your personal preferences and budget. Our platform puts you in control of creating 
                your perfect travel experience.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Choose from multiple flight options and classes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Select accommodations that match your style</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Build your itinerary with activities you love</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Adjust everything to fit your budget perfectly</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4"
                onClick={() => window.location.href = '/customize'}
              >
                Start Customizing
              </Button>
            </div>
          </div>

          {/* Right Side - Interactive Mockup */}
          <div className="relative">
            <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-4 md:p-8 border">
              <h3 className="text-2xl font-semibold mb-6 text-center">Customize Your Trip</h3>
              
              <div className="grid gap-4">
                {customizationOptions.map((option, index) => {
                  const IconComponent = option.icon;
                  return (
                    <Card key={index} className="transition-all duration-300 hover:shadow-md hover:scale-102 bg-card/80 backdrop-blur-sm">
                      <CardContent className="p-2 md:p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-2">{option.label}</h4>
                            <div className="flex flex-wrap gap-1">
                              {option.options.map((opt, optIndex) => (
                                <Badge 
                                  key={optIndex} 
                                  variant={optIndex === 0 ? "default" : "secondary"} 
                                  className="text-xs"
                                >
                                  {opt}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Estimated Total:</span>
                  <span className="text-2xl font-bold text-primary">₹1,25,999</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on your selections • Get exact quotes from agents
                </p>
              </div>
            </div>

            {/* Floating elements for visual appeal */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary/30 rounded-full animate-pulse delay-100"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomizationSection;