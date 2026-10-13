import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Share Your Trip Plan",
      description: "Fill out your travel requirements (destination, dates, budget, preferences).",
      color: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
    },
    {
      icon: Users,
      title: "Get Multiple Quotes",
      description: "Receive tailored itineraries and prices from verified agents.",
      color: "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
    },
    {
      icon: CheckCircle,
      title: "Customize & Book",
      description: "Compare, tweak, and book your dream trip with ease.",
      color: "bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800"
    }
  ];

  return (
    <section className="py-20 md:px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your perfect trip in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className={`${step.color} transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-sm font-medium">
                      Step {index + 1}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;