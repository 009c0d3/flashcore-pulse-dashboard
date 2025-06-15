
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import Logo from "@/components/Logo";

const LandingFooter = () => {
  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm glow-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Logo className="w-16 h-16" />
              <span className="text-xl font-bold bg-gradient-to-r from-flashcore-purple via-flashcore-green to-flashcore-orange bg-clip-text text-transparent -ml-2">
                FLASHCORE
              </span>
            </div>
            <p className="text-muted-foreground">
              Empowering businesses with next-generation digital solutions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <div className="space-y-2">
              <Link to="/dashboard" className="block text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
              <Link to="/features" className="block text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link to="/pricing-landing" className="block text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <Link to="/tutorials" className="block text-muted-foreground hover:text-foreground transition-colors">Tutorials</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <Link to="/contact-landing" className="block text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
              <Link to="/world-chat" className="block text-muted-foreground hover:text-foreground transition-colors">Community</Link>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Documentation</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">API Reference</a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Careers</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
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
  );
};

export default LandingFooter;
