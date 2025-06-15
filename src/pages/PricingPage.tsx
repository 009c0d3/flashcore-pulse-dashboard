import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, CreditCard, Smartphone, Building, Bitcoin } from "lucide-react";

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("3months");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const plans = [
    {
      id: "1month",
      name: "Monthly Plan",
      duration: "1 Month",
      price: "$29.99",
      originalPrice: "$39.99",
      savings: "Save $10",
      popular: false,
      features: [
        "Unlimited mail sending",
        "Basic analytics",
        "Email support",
        "Basic templates",
        "Standard delivery speed"
      ]
    },
    {
      id: "3months",
      name: "Quarterly Plan",
      duration: "3 Months",
      price: "$24.99",
      originalPrice: "$29.99",
      savings: "Save $15/month",
      popular: true,
      features: [
        "Everything in Monthly",
        "Advanced analytics",
        "Priority support",
        "Premium templates",
        "Faster delivery",
        "Custom domains"
      ]
    },
    {
      id: "1year",
      name: "Annual Plan",
      duration: "12 Months",
      price: "$19.99",
      originalPrice: "$29.99",
      savings: "Save $120/year",
      popular: false,
      features: [
        "Everything in Quarterly",
        "White-label options",
        "API access",
        "Advanced integrations",
        "Dedicated support",
        "Custom branding",
        "Bulk operations"
      ]
    }
  ];

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard, American Express" },
    { id: "paypal", name: "PayPal", icon: Smartphone, description: "Pay with your PayPal account" },
    { id: "bank", name: "Bank Transfer", icon: Building, description: "Direct bank transfer" },
    { id: "crypto", name: "Cryptocurrency", icon: Bitcoin, description: "Bitcoin, Ethereum, and other cryptocurrencies" }
  ];

  const handleSubscribe = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    console.log(`Subscribing to ${plan?.name} with ${paymentMethod} payment method`);
    // Here you would integrate with your payment processor
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Select the perfect plan for your email marketing needs
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative cursor-pointer transition-all hover:shadow-lg ${
              selectedPlan === plan.id ? 'ring-2 ring-flashcore-purple' : ''
            } ${plan.popular ? 'border-flashcore-purple' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-flashcore-purple text-white">Most Popular</Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.duration}</CardDescription>
              <div className="mt-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">per month</span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-sm line-through text-muted-foreground">{plan.originalPrice}</span>
                  <Badge variant="secondary" className="text-xs">{plan.savings}</Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-flashcore-green" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6">
                <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={plan.id} id={plan.id} />
                    <Label htmlFor={plan.id}>Select this plan</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Methods */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Choose how you'd like to pay for your subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                <RadioGroupItem value={method.id} id={method.id} />
                <method.icon size={24} className="text-muted-foreground" />
                <div className="flex-1">
                  <Label htmlFor={method.id} className="font-medium cursor-pointer">
                    {method.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>

          {/* Summary */}
          <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="flex justify-between items-center">
              <span>Selected Plan:</span>
              <span className="font-medium">
                {plans.find(p => p.id === selectedPlan)?.name} - {plans.find(p => p.id === selectedPlan)?.price}/month
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span>Payment Method:</span>
              <span className="font-medium">
                {paymentMethods.find(m => m.id === paymentMethod)?.name}
              </span>
            </div>
          </div>

          {/* Subscribe Button */}
          <Button 
            onClick={handleSubscribe}
            className="w-full mt-6 bg-flashcore-purple hover:bg-flashcore-purple/90"
            size="lg"
          >
            Subscribe Now - {plans.find(p => p.id === selectedPlan)?.price}/month
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            You can cancel your subscription at any time. No setup fees or hidden charges.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingPage;
