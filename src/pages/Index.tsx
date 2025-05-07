
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="relative">
      <ParticleBackground />
      <Dashboard />
      
      <div className="fixed bottom-6 right-6 z-50">
        <Link to="/wallets">
          <Button className="bg-gradient-to-r from-flashcore-green to-flashcore-purple hover:opacity-90 transition">
            Select Wallet
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
