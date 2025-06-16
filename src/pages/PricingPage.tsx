
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PricingPage = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: "$9.99",
      interval: "per month",
      description: "Perfect for getting started",
      features: [
        "Up to 5 services",
        "Basic analytics",
        "Email support",
        "Mobile access"
      ]
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: "$29.99",
      interval: "per month",
      description: "Most popular choice",
      popular: true,
      features: [
        "Unlimited services",
        "Advanced analytics",
        "Priority support",
        "API access",
        "Custom integrations"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: "$99.99",
      interval: "per month",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "Dedicated support",
        "SLA guarantee",
        "Custom branding",
        "On-premise option"
      ]
    }
  ];

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe to a plan",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    setLoading(planId);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan: planId }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create checkout session",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Select the perfect plan for your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative transition-all hover:shadow-lg ${
              plan.popular ? 'border-primary ring-2 ring-primary/20' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <div className="text-4xl font-bold">{plan.price}</div>
                <div className="text-sm text-muted-foreground">{plan.interval}</div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {loading === plan.id ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Subscribe Now
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          All plans include a 30-day money-back guarantee. Cancel anytime.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
