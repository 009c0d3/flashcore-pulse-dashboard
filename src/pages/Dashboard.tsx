import React, { useState } from "react";
import { useUserData } from "@/hooks/useUserData";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MotivationPopup from "@/components/MotivationPopup";
import TelegramPopup from "@/components/TelegramPopup";
import ParticleBackground from "@/components/ParticleBackground";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMotivationPopupOpen, setIsMotivationPopupOpen] = useState(false);
  const [isTelegramPopupOpen, setIsTelegramPopupOpen] = useState(false);
  
  const { data: dashboardData, isLoading, error } = useUserData();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openMotivationPopup = () => {
    setIsMotivationPopupOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      
      <Header 
        toggleSidebar={toggleSidebar} 
        openMotivationPopup={openMotivationPopup} 
      />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div>Loading dashboard data...</div>
          ) : error ? (
            <div>Error loading dashboard data</div>
          ) : (
            <div>
              {/* Dashboard content goes here */}
              <h1 className="text-2xl font-semibold">Welcome to your dashboard</h1>
            </div>
          )}
        </div>
      </main>
      
      <MotivationPopup 
        isOpen={isMotivationPopupOpen} 
        onClose={() => setIsMotivationPopupOpen(false)} 
      />
      
      <TelegramPopup 
        isOpen={isTelegramPopupOpen} 
        onClose={() => setIsTelegramPopupOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
