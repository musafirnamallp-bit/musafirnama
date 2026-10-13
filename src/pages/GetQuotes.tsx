import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CheckCircle, Users, MapPin } from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import submitData from "@/lib/musafirnama";

const GetQuotes = () => {
  // --- form state ---
  const [destination, setDestination] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [budget, setBudget] = useState([20000]);
  const [accommodation, setAccommodation] = useState("");
  const [travelMode, setTravelMode] = useState("");
  const [requirements, setRequirements] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState(false);

  // --- travelers control ---
  const increment = () => travelers < 100 && setTravelers(travelers + 1);
  const decrement = () => travelers > 1 && setTravelers(travelers - 1);

  // --- validation ---
  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
      destination.trim() !== "" &&
      travelers > 0 &&
      !!startDate &&
      !!endDate &&
      budget[0] >= 1000 &&
      name.trim() !== "" &&
      email.trim() !== "" &&
      emailRegex.test(email) &&
      phone.trim() !== "" &&
      (phone.length >= 8 && phone.length <= 15)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) return;

    const formData = {
      destination,
      travelers,
      startDate: startDate ? format(startDate, "PPP") : "",
      endDate: endDate ? format(endDate, "PPP") : "",
      budget: budget[0],
      accommodation,
      travelMode,
      requirements,
      name,
      email,
      phone,
    };

    const response = await submitData(formData);
    if (response.statusCode === 200) {
      setSubmitted("success");
    } else {
      setSubmitted("error");
    }
  };

  // ✅ Success screen
  if (submitted !== null) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-6 py-20 max-w-4xl text-center">
          <div className="space-y-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div>
              {submitted === "success" ?
                <>
                  <h1 className="text-4xl font-bold mb-4">Request Submitted Successfully!</h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Thank you for your request. We will review your requirements
                    and send you personalized quotes within 24 hours.
                  </p>
                </> :
                <>
                  <h1 className="text-4xl font-bold mb-4">Something Went Wrong!</h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    There's been an error submitting your request. Please try again later.
                  </p>
                </>
              }
            </div>

            {submitted === "success" && <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>What happens next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Review</h3>
                    <p className="text-sm text-muted-foreground">
                      We will review your travel requirements and preferences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Receive Quotes</h3>
                    <p className="text-sm text-muted-foreground">
                      Get 3-5 personalized quotes with detailed itineraries via email.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Compare & Choose</h3>
                    <p className="text-sm text-muted-foreground">
                      Compare options and choose the agent that best fits your needs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>}

            <Button size="lg" onClick={() => window.location.href = "/"}>
              Back to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get Free Travel Quotation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Share your travel requirements and receive personalized quotes within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Trip Details */}
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
                  <Label htmlFor="destination">Destination *</Label>
                  <Input
                    id="destination"
                    placeholder="Where do you want to go?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                    className="mt-1"
                  />
                  {error && destination.length == 0 && <div className="text-xs text-red-600 mt-2 ml-1">Please Enter Place.</div>}
                </div>
                <div>
                  <Label htmlFor="travelers">Number of travelers *</Label>
                  <div className="flex items-center mt-1 space-x-2">
                    <Button type="button" variant="outline" onClick={decrement} disabled={travelers <= 1}>
                      -
                    </Button>
                    <input
                      id="travelers"
                      name="travelers"
                      type="number"
                      value={travelers}
                      readOnly
                      className="w-16 text-center border rounded-md py-2"
                    />
                    <Button type="button" variant="outline" onClick={increment} disabled={travelers >= 100}>
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Travel Start Date *</Label>
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
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} fromDate={new Date()} initialFocus />
                    </PopoverContent>
                  </Popover>
                  {error && !startDate && <div className="text-xs text-red-600 mt-2 ml-1">Please Enter Start Date.</div>}
                </div>
                <div>
                  <Label>Travel End Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full mt-1 justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} fromDate={startDate || undefined} initialFocus />
                    </PopoverContent>
                  </Popover>
                  {error && !endDate && <div className="text-xs text-red-600 mt-2 ml-1">Please Enter End Date.</div>}
                </div>
              </div>

              <div>
                <Label htmlFor="budget">Approximate budget per person (INR) *</Label>
                <div className="mt-2">
                  <Slider
                    id="budget"
                    min={1000}
                    max={100000}
                    step={1000}
                    value={budget}
                    onValueChange={setBudget}
                    className="md:w-1/2"
                  />
                  <div className="mt-2 text-sm font-medium">
                    Selected: ₹{budget[0].toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader><CardTitle>Travel Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Accommodation Type</Label>
                  <Select onValueChange={setAccommodation}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select accommodation" /></SelectTrigger>
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
                  <Label>Mode of Travel</Label>
                  <Select onValueChange={setTravelMode}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select Mode of Travel" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bus">Bus</SelectItem>
                      <SelectItem value="cab">Cab</SelectItem>
                      <SelectItem value="train">Train</SelectItem>
                      <SelectItem value="flight">Flight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="requirements">Special Requirements</Label>
                <Textarea
                  id="requirements"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Tell us about your interests, dietary restrictions, accessibility needs..."
                  className="mt-1"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Contact Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1" />
                  {error && !name && <div className="text-xs text-red-600 mt-2 ml-1">Please Enter Your Name.</div>}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1" />
                  {error && !email && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) && <div className="text-xs text-red-600 mt-2 ml-1">Please Enter Valid Email.</div>}
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" placeholder="+91 9XXXX XXXXX" value={phone} onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) {   // allow only digits
                    setPhone(e.target.value)
                  }
                }} required className="mt-1" />
                {error && !phone && (phone.length < 8 || phone.length > 15) && <div className="text-xs text-red-600 mt-2 ml-1">Please Enter Valid Phone Number.</div>}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-6">
                <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Free quotes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>No commitment</span>
                  </div>
                </div>

                <Button type="submit" size="lg" className={`px-12 ${!isFormValid() && "opacity-50"}`} onClick={() => setError(true)} >
                  Get Free Quotes
                </Button>

                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  By submitting this form, you agree to receive personalized travel quotes via email and phone.
                </p>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default GetQuotes;