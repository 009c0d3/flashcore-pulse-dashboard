
import React, { useState } from "react";
import { Filter, FrownIcon } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MotivationPopup from "@/components/MotivationPopup";

const ActivationHistory: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [motivationOpen, setMotivationOpen] = useState<boolean>(false);
  
  return (
    <div className="flex min-h-screen bg-background">
      <ParticleBackground />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          openMotivationPopup={() => setMotivationOpen(true)}
        />
        
        <main className="flex-1 p-4 md:p-6 flex flex-col items-center justify-center">
          <Card className="w-full max-w-2xl border-l-4 border-l-flashcore-green">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">ACTIVATION HISTORY</h1>
                <Button 
                  variant="ghost" 
                  className="text-flashcore-green hover:text-flashcore-green/80 hover:bg-secondary"
                >
                  <Filter size={16} className="mr-2" />
                  FILTER
                </Button>
              </div>
              
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FrownIcon size={48} className="text-muted-foreground mb-4" />
                <p className="text-lg">No activation history to display</p>
                <p className="text-muted-foreground mt-2">
                  Your activation records will appear here once you've activated any services
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Message Us Button */}
          <Button 
            className="mt-6 bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <span className="mr-2">✈️</span>
            Message Us
          </Button>
        </main>
      </div>
      
      {/* Motivation Popup */}
      <MotivationPopup 
        isOpen={motivationOpen} 
        onClose={() => setMotivationOpen(false)} 
      />
    </div>
  );
};

export default ActivationHistory;
