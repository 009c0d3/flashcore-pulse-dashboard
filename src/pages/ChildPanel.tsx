
import React, { useState } from "react";
import { Rocket, PointerIcon } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import MotivationPopup from "@/components/MotivationPopup";

const ChildPanel: React.FC = () => {
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
          <div className="max-w-3xl w-full glow-effect rounded-xl p-8 bg-card/80 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="flex items-center space-x-3">
                <Rocket size={32} className="text-flashcore-green animate-pulse" />
                <h1 className="text-2xl md:text-3xl font-bold gradient-text">
                  Launch Your Own Crypto Mailing / Flashing Website with DoomPanel
                </h1>
              </div>
              
              <p className="text-muted-foreground text-base md:text-lg">
                DoomPanel lets you create your own Mailing & Flashing website in seconds! 
                No hosting stress. No coding required. Just bring your domain – and start 
                earning 💸 by selling activation keys.
              </p>
              
              <Button 
                className="mt-6 px-8 py-6 text-lg bg-gradient-to-br from-flashcore-green to-flashcore-purple hover:from-flashcore-green/90 hover:to-flashcore-purple/90"
              >
                <PointerIcon className="mr-2" />
                Get Started
              </Button>
            </div>
            
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4 text-center">Benefits of DoomPanel</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-medium mb-2">🚀 Quick Setup</h3>
                  <p className="text-sm text-muted-foreground">Be online and making money in less than 10 minutes</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-medium mb-2">💻 No Technical Skills</h3>
                  <p className="text-sm text-muted-foreground">User-friendly interface for easy management</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-medium mb-2">💰 Full Profit Control</h3>
                  <p className="text-sm text-muted-foreground">Set your own prices and keep 100% of your earnings</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-medium mb-2">🔧 24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">Our team is always available to help you succeed</p>
                </div>
              </div>
            </div>
          </div>
          
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

export default ChildPanel;
