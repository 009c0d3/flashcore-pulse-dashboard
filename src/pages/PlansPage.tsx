
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, LogIn, UserPlus, CheckCircle, Star, ArrowRight } from "lucide-react";

const PlansPage = () => {
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
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/plans" className="text-flashcore-purple font-medium">
                Plans
              </Link>
              <Link to="/features" className="text-foreground hover:text-flashcore-green transition-colors">
                Features
              </Link>
              <Link to="/contact" className="text-foreground hover:text-flashcore-orange transition-colors">
                Contact
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="flex items-center gap-2">
                <Link to="/login">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              </Button>
              <Button asChild className="flex items-center gap-2">
                <Link to="/register">
                  <UserPlus className="w-4 h-4" />
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Plans Content */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-flashcore-purple via-flashcore-green to-flashcore-orange bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Select the perfect plan for your digital service management needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm relative">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">Basic</CardTitle>
              <div className="text-4xl font-bold text-flashcore-purple mb-2">$9</div>
              <CardDescription className="text-lg">per month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flashcore-green" />
                <span>Up to 5 services</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flashcore-green" />
                <span>Basic analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flashcore-green" />
                <span>Email support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flashcore-green" />
                <span>Mobile access</span>
              </div>
              <Button className="w-full mt-6" variant="outline">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm relative border-flashcore-green">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-flashcore-green text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            </div>
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-2xl mb-2">Pro</CardTitle>
              <div className="text-4xl font-bold text-flashcore-green mb-2">$29</div>
              <CardDescription className="text-lg">per month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flashcore-green" />
                <span>Unlimited services</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flashcore-green" />
                <span>Advanced analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flashcore-green" />
                <span>Priority support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flashcore-green" />
                <span>API access</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flashcore-green" />
                <span>Custom integrations</span>
              </div>
              <Button className="w-full mt-6">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm relative">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">Enterprise</CardTitle>
              <div className="text-4xl font-bold text-flashcore-orange mb-2">$99</div>
              <CardDescription className="text-lg">per month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flashcore-green" />
                <span>Everything in Pro</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flashcore-green" />
                <span>Dedicated support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flashcore-green" />
                <span>SLA guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flashcore-green" />
                <span>Custom branding</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-flashcore-green" />
                <span>On-premise option</span>
              </div>
              <Button className="w-full mt-6" variant="outline">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 FLASHCORE. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-muted-foreground ml-2">Rated 5.0 by 1000+ users</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PlansPage;
