import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { packages } from "@/lib/packageData";

const TopPackages = () => {
  const packageList = Object.entries(packages).map(([slug, pkg]) => ({
    slug,
    ...pkg
  }));

  return (
    <section id="packages" className="py-20 md:px-6 bg-muted/30">
      <div className="container mx-auto md:max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Top Packages for Every Kind of Traveler
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover handcrafted journeys tailored to your travel style
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packageList.map((pkg) => (
            <Card key={pkg.slug} className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card">
              <div className="relative">
                <img 
                  src={pkg.image} 
                  alt={pkg.packageName}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary text-primary-foreground">
                    {pkg.packageRate}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-1 line-clamp-1">{pkg.packageName}</h3>
                
                <div className="flex items-center gap-3 text-muted-foreground text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {pkg.location.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {pkg.duration}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{pkg.pickAndDrop}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {pkg.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => {
                    window.location.href = `/destination/${pkg.slug}`;
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopPackages;
