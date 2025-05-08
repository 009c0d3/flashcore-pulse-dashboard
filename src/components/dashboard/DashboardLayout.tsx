
import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openMotivationPopup: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  isSidebarOpen,
  toggleSidebar,
  openMotivationPopup
}) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => toggleSidebar()} />
      
      <div className="flex-1">
        <Header 
          toggleSidebar={toggleSidebar} 
          openMotivationPopup={openMotivationPopup} 
        />
        
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
