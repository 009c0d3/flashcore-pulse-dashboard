
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  LogIn, 
  UserPlus, 
  Star, 
  TrendingUp, 
  Users, 
  Shield, 
  Globe, 
  Smartphone, 
  Lock,
  BarChart3,
  MessageSquare,
  Workflow,
  Database,
  Cloud,
  Palette
} from "lucide-react";

const FeaturesPage = () => {
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
              <Link to="/plans" className="text-foreground hover:text-flashcore-purple transition-colors">
                Plans
              </Link>
              <Link to="/features" className="text-flashcore-green font-medium">
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

      {/* Features Content */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-flashcore-purple via-flashcore-green to-flashcore-orange bg-clip-text text-transparent mb-4">
            Powerful Features
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Discover all the tools and capabilities that make FLASHCORE the ultimate digital service management platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-flashcore-purple/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-flashcore-purple" />
              </div>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Real-time insights with customizable dashboards, detailed reporting, and predictive analytics to optimize your service performance.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-flashcore-green/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-flashcore-green" />
              </div>
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>
                Built-in team management with role-based permissions, real-time collaboration tools, and seamless communication features.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-flashcore-orange/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-flashcore-orange" />
              </div>
              <CardTitle>Lightning Performance</CardTitle>
              <CardDescription>
                Optimized for speed with sub-second loading times, intelligent caching, and global CDN distribution for maximum performance.
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
                Bank-level security with end-to-end encryption, multi-factor authentication, and compliance with SOC 2 and GDPR standards.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-flashcore-green/20 rounded-lg flex items-center justify-center mb-4">
                <Workflow className="w-6 h-6 text-flashcore-green" />
              </div>
              <CardTitle>Automation Workflows</CardTitle>
              <CardDescription>
                Create custom automation workflows with drag-and-drop builder, triggers, and actions to streamline your operations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-flashcore-orange/20 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-flashcore-orange" />
              </div>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Comprehensive data management with backup, versioning, import/export capabilities, and seamless integrations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-flashcore-purple/20 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-flashcore-purple" />
              </div>
              <CardTitle>Mobile First Design</CardTitle>
              <CardDescription>
                Fully responsive design optimized for all devices with native mobile app experience and offline capabilities.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-flashcore-green/20 rounded-lg flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-flashcore-green" />
              </div>
              <CardTitle>Cloud Infrastructure</CardTitle>
              <CardDescription>
                Built on enterprise-grade cloud infrastructure with 99.9% uptime guarantee and automatic scaling capabilities.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-flashcore-orange/20 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-flashcore-orange" />
              </div>
              <CardTitle>Custom Branding</CardTitle>
              <CardDescription>
                White-label solutions with custom branding, themes, and domain configuration to match your brand identity.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience These Features?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your journey with FLASHCORE today and unlock the full potential of digital service management.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/register">
                Start Free Trial
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link to="/plans">View Plans</Link>
            </Button>
          </div>
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

export default FeaturesPage;
