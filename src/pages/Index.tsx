
import React from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import StatsSection from "@/components/landing/StatsSection";
import CtaSection from "@/components/landing/CtaSection";
import LandingFooter from "@/components/landing/LandingFooter";
import CoinSliderSection from "@/components/landing/CoinSliderSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <LandingHeader />
      <main>
        <HeroSection />
        <CoinSliderSection />
        <FeaturesSection />
        <StatsSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Index;
