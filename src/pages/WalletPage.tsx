
import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MotivationPopup from "@/components/MotivationPopup";
import WalletPageHeader from "@/components/wallet/WalletPageHeader";
import WalletGrid from "@/components/wallet/WalletGrid";

const WalletPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMotivationOpen, setIsMotivationOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const openMotivationPopup = () => {
    setIsMotivationOpen(true);
  };

  const closeMotivationPopup = () => {
    setIsMotivationOpen(false);
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
          openMotivationPopup={openMotivationPopup}
        />
        
        <main className="flex-1 overflow-y-auto relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-flashcore-purple/20 via-transparent to-flashcore-green/20" />
          </div>

          <div className="px-4 pt-24 pb-8">
            <WalletPageHeader />
            <WalletGrid />

            {/* Bottom spacing */}
            <div className="h-20" />
          </div>
        </main>
      </div>
      
      <MotivationPopup 
        isOpen={isMotivationOpen} 
        onClose={closeMotivationPopup} 
      />
    </div>
  );
};

export default WalletPage;
