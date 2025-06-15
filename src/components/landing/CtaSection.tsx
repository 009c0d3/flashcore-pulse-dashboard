
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center space-y-8">
        <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join thousands of users who trust FLASHCORE for their digital service management needs.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link to="/register">
              Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
            <Link to="/contact-landing">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
