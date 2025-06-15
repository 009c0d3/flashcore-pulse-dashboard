
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-flashcore-purple via-flashcore-green to-flashcore-orange bg-clip-text text-transparent">
            Power Your Digital Future
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Experience the next generation of digital service management with FLASHCORE's comprehensive dashboard solution.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link to="/dashboard">
              Launch Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
            <Link to="/tutorials">Watch Demo</Link>
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground pt-8">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-flashcore-green" />
            <span>No Setup Required</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-flashcore-green" />
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-flashcore-green" />
            <span>Enterprise Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
