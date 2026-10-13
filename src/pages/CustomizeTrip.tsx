import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Users, DollarSign, Plane, Hotel, Camera, Utensils } from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const CustomizeTrip = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const preferences = [
    { id: "adventure", label: "Adventure", icon: "🏔️" },
    { id: "culture", label: "Culture", icon: "🏛️" },
    { id: "beach", label: "Beach", icon: "🏖️" },
    { id: "food", label: "Food", icon: "🍜" },
    { id: "nature", label: "Nature", icon: "🌿" },
    { id: "nightlife", label: "Nightlife", icon: "🌃" },
    { id: "photography", label: "Photography", icon: "📸" },
    { id: "shopping", label: "Shopping", icon: "🛍️" },
    { id: "wellness", label: "Wellness", icon: "🧘" },
    { id: "history", label: "History", icon: "📜" }
  ];

  const togglePreference = (id: string) => {
    setSelectedPreferences(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Customize Your Perfect Trip
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tell us about your dream vacation and we'll create a personalized itinerary 
            with quotes from verified travel agents.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="destination">Where do you want to go?</Label>
                    <Input 
                      id="destination" 
                      placeholder="e.g., Paris, Bali, Tokyo..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="travelers">Number of travelers</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select travelers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 person</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3">3 people</SelectItem>
                        <SelectItem value="4">4 people</SelectItem>
                        <SelectItem value="5+">5+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full mt-1 justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full mt-1 justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <Label htmlFor="budget">Budget per person (INR)</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">₹20,000 - ₹50,000</SelectItem>
                      <SelectItem value="mid">₹50,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="premium">₹1,00,000 - ₹2,00,000</SelectItem>
                      <SelectItem value="luxury">₹2,00,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Travel Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>What interests you?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {preferences.map((pref) => (
                    <button
                      key={pref.id}
                      onClick={() => togglePreference(pref.id)}
                      className={cn(
                        "p-4 rounded-lg border text-center transition-all hover:shadow-md",
                        selectedPreferences.includes(pref.id)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background hover:bg-muted"
                      )}
                    >
                      <div className="text-2xl mb-2">{pref.icon}</div>
                      <div className="text-sm font-medium">{pref.label}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Accommodation & Transport */}
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Accommodation Type</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select accommodation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget Hotels</SelectItem>
                        <SelectItem value="mid">3-4 Star Hotels</SelectItem>
                        <SelectItem value="luxury">5 Star Hotels</SelectItem>
                        <SelectItem value="boutique">Boutique Hotels</SelectItem>
                        <SelectItem value="resort">Resorts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Flight Class</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select flight class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="premium">Premium Economy</SelectItem>
                        <SelectItem value="business">Business Class</SelectItem>
                        <SelectItem value="first">First Class</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="special-requests">Special Requests or Requirements</Label>
                  <Textarea
                    id="special-requests"
                    placeholder="Any specific requirements, dietary restrictions, accessibility needs, or special occasions..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your full name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 98765 43210" className="mt-1" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Your Custom Trip</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Destination:</span>
                    <span>To be specified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>To be calculated</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Travelers:</span>
                    <span>To be specified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budget:</span>
                    <span>To be specified</span>
                  </div>
                </div>

                {selectedPreferences.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Selected Interests:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedPreferences.map(id => {
                        const pref = preferences.find(p => p.id === id);
                        return pref ? (
                          <Badge key={id} variant="secondary" className="text-xs">
                            {pref.icon} {pref.label}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t space-y-3">
                  <Button className="w-full" size="lg">
                    Get Free Quotes
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Receive personalized quotes from 3-5 verified travel agents within 24 hours
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>Get quotes from 3-5 verified agents</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>Compare prices and itineraries</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>Customize every detail</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>Best price guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomizeTrip;