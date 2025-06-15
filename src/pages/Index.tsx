import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowRight, Shield, Zap, Users, TrendingUp, Star, CheckCircle, Globe, Smartphone, Lock, LogIn, UserPlus, Menu } from "lucide-react";
import Logo from "@/components/Logo";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Simplified Header for Landing Page */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center">
                <Logo className="w-16 h-16 shadow-lg drop-shadow-lg" />
              </div>
              <Link to="/" className="text-xl font-bold bg-gradient-to-r from-flashcore-purple via-flashcore-green to-flashcore-orange bg-clip-text text-transparent">
                FLASHCORE
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button asChild className="flex items-center gap-2">
                <Link to="/register">
                  <UserPlus className="w-4 h-4" />
                  Get Started
                </Link>
              </Button>
              
              {/* Hamburger Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/plans" className="w-full">
                      Plans
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/features" className="w-full">
                      Features
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/pricing-landing" className="w-full">
                      Pricing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/contact-landing" className="w-full">
                      Contact
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="w-full flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and features designed to streamline your digital operations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-flashcore-purple/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-flashcore-purple" />
              </div>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Deep insights into your service performance with real-time monitoring and detailed reporting.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-flashcore-green/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-flashcore-green" />
              </div>
              <CardTitle>Referral System</CardTitle>
              <CardDescription>
                Earn rewards and grow your network with our comprehensive referral program and tracking system.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-flashcore-orange/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-flashcore-orange" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Optimized performance with instant loading times and real-time updates across all features.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-flashcore-purple/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-flashcore-purple" />
              </div>
              <CardTitle>Enterprise Security</CardTitle>
              <CardDescription>
                Bank-level security with end-to-end encryption and compliance with industry standards.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-flashcore-green/20 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-flashcore-green" />
              </div>
              <CardTitle>Global Reach</CardTitle>
              <CardDescription>
                Worldwide accessibility with multi-region support and localized experiences.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-flashcore-orange/20 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-flashcore-orange" />
              </div>
              <CardTitle>Mobile First</CardTitle>
              <CardDescription>
                Responsive design optimized for all devices with native mobile app experience.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-flashcore-purple/10 via-flashcore-green/10 to-flashcore-orange/10 rounded-2xl p-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-flashcore-purple mb-2">10K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-flashcore-green mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-flashcore-orange mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-flashcore-purple mb-2">150+</div>
              <div className="text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Custom Footer for Landing Page */}
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center">
                  <Logo className="w-16 h-16 shadow-lg drop-shadow-lg" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-flashcore-purple via-flashcore-green to-flashcore-orange bg-clip-text text-transparent">
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
    </div>
  );
};

export default Index;
