
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Users, TrendingUp, Globe, Smartphone } from "lucide-react";

const FeaturesSection = () => {
  return (
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
  );
};

export default FeaturesSection;
