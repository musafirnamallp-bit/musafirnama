import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, MapPin, Clock, Route, Check, X, Info, FileDown, Plane, Hotel } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { packages } from "@/lib/packageData";

const DestinationDetail = () => {
  const { slug } = useParams();
  const pkg = packages[slug as keyof typeof packages];

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Package not found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.packageName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute inset-0 flex items-end justify-start p-8">
          <div className="text-white max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-3">
              {pkg.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-white/20 text-white border-none">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{pkg.packageName}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base opacity-90">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {pkg.location.city}, {pkg.location.country}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {pkg.duration}
              </span>
              <span className="flex items-center gap-1">
                <Plane className="h-4 w-4" />
                {pkg.pickAndDrop}
              </span>
            </div>
          </div>
        </div>
        <Link
          to="/"
          className="absolute top-6 left-6 bg-black/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/40 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5 text-primary" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Route</p>
                  <p className="font-medium">{pkg.overview.route}</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">{pkg.overview.description}</p>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Day-wise Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {pkg.itinerary.map((day, index) => (
                    <AccordionItem key={index} value={`day-${day.day}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                            Day {day.day}
                          </span>
                          <span className="font-medium">{day.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pl-4 pt-2">
                          {day.activities.map((activity, actIndex) => (
                            <li key={actIndex} className="flex items-start gap-2 text-muted-foreground">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Check className="h-5 w-5" />
                    Inclusions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <X className="h-5 w-5" />
                    Exclusions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <X className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Other Info */}
            {pkg.otherInfo.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pkg.otherInfo.map((section, index) => (
                    <div key={index}>
                      <h4 className="font-semibold mb-2">{section.title}</h4>
                      <ul className="space-y-1">
                        {section.info.map((item, infoIndex) => (
                          <li key={infoIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="sticky top-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-center">
                  <span className="text-3xl font-bold text-primary">{pkg.packageRate}</span>
                  <span className="text-sm text-muted-foreground block">per person</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{pkg.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pick & Drop</span>
                    <span className="font-medium">{pkg.pickAndDrop}</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <Link to="/get-quotes" className="block">
                    <Button className="w-full" size="lg">
                      Get Free Quotes
                    </Button>
                  </Link>
                  <Link to="/customize-trip" className="block">
                    <Button variant="outline" className="w-full" size="lg">
                      Customize This Trip
                    </Button>
                  </Link>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2">
                      <Plane className="h-4 w-4" />
                      Transfers
                    </span>
                    <span className="text-green-600 font-medium">Included</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2">
                      <Hotel className="h-4 w-4" />
                      Accommodation
                    </span>
                    <span className="text-green-600 font-medium">Included</span>
                  </div>
                </div>

                {pkg.pdf && (
                  <Button variant="secondary" className="w-full mt-4" size="sm">
                    <FileDown className="h-4 w-4 mr-2" />
                    Download Itinerary PDF
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationDetail;
