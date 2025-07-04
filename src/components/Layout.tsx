
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MotivationPopup from "./MotivationPopup";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isMotivationOpen, setIsMotivationOpen] = useState(false);
  
  // Update sidebar state when screen size changes
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);
  
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
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
          openMotivationPopup={openMotivationPopup}
        />
        
        <main className="flex-1 overflow-auto p-4 pt-16">
          {children}
        </main>
      </div>
      
      <MotivationPopup 
        isOpen={isMotivationOpen} 
        onClose={closeMotivationPopup} 
      />
    </div>
  );
};

export default Layout;
