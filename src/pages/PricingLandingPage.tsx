
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowLeft, Zap, ArrowRight } from "lucide-react";

const PricingLandingPage = () => {
  const plans = [
    {
      id: "starter",
      name: "Starter Plan",
      duration: "Monthly",
      price: "$29",
      originalPrice: "$39",
      savings: "Save $10",
      popular: false,
      description: "Perfect for individuals getting started",
      features: [
        "Up to 10,000 emails per month",
        "Basic email templates",
        "Email analytics dashboard",
        "Email support",
        "Standard delivery speed",
        "Basic automation"
      ]
    },
    {
      id: "professional",
      name: "Professional Plan",
      duration: "Monthly",
      price: "$59",
      originalPrice: "$79",
      savings: "Save $20",
      popular: true,
      description: "Ideal for growing businesses",
      features: [
        "Up to 50,000 emails per month",
        "Premium email templates",
        "Advanced analytics & reporting",
        "Priority email & chat support",
        "Fast delivery speed",
        "Advanced automation",
        "A/B testing",
        "Custom domains",
        "Integrations"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      duration: "Monthly",
      price: "$149",
      originalPrice: "$199",
      savings: "Save $50",
      popular: false,
      description: "For large-scale operations",
      features: [
        "Unlimited emails",
        "Custom email templates",
        "Enterprise analytics",
        "Dedicated account manager",
        "Premium delivery speed",
        "Enterprise automation",
        "Advanced A/B testing",
        "White-label options",
        "API access",
        "Custom integrations",
        "SSO support",
        "Priority phone support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-flashcore-purple to-flashcore-green rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <Link to="/" className="text-xl font-bold bg-gradient-to-r from-flashcore-purple via-flashcore-green to-flashcore-orange bg-clip-text text-transparent">
                FLASHCORE
              </Link>
            </div>
            
            <Button asChild variant="outline">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-flashcore-purple via-flashcore-green to-flashcore-orange bg-clip-text text-transparent mb-4">
            Simple Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative transition-all hover:scale-105 ${
                plan.popular ? 'border-flashcore-purple shadow-2xl' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-flashcore-purple text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                
                <div className="mt-6">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.duration.toLowerCase()}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-sm line-through text-muted-foreground">{plan.originalPrice}</span>
                    <Badge variant="secondary" className="text-xs">{plan.savings}</Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check size={16} className="text-flashcore-green flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link to="/register">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose FLASHCORE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-flashcore-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-flashcore-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Setup Fees</h3>
              <p className="text-muted-foreground">Get started immediately with no hidden costs or setup fees.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-flashcore-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-flashcore-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cancel Anytime</h3>
              <p className="text-muted-foreground">No long-term contracts. Cancel or change your plan anytime.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-flashcore-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-flashcore-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Our team is here to help you succeed around the clock.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-flashcore-purple/10 via-flashcore-green/10 to-flashcore-orange/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust FLASHCORE for their email marketing needs.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/register">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link to="/contact-landing">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 FLASHCORE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingLandingPage;
