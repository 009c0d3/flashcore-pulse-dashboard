
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-flashcore-purple via-flashcore-green to-flashcore-orange bg-clip-text text-transparent">
          Welcome to FLASHCORE
        </h1>
        <p className="text-xl max-w-2xl text-muted-foreground">
          Your all-in-one dashboard solution for managing your digital services and assets.
        </p>
        
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <Button size="lg" asChild>
            <Link to="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/tutorials">Learn More</Link>
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-xl font-semibold mb-3">Powerful Analytics</h3>
            <p className="text-muted-foreground">Get insights into your service usage and performance metrics.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-xl font-semibold mb-3">Referral Program</h3>
            <p className="text-muted-foreground">Earn rewards by referring new users to our platform.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-xl font-semibold mb-3">Easy Integration</h3>
            <p className="text-muted-foreground">Connect and manage all your services in one place.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
