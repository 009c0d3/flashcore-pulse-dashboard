
import React from "react";
import { Menu, Bell, ChevronDown, Lightbulb } from "lucide-react";
import { useMotivationQuote } from "@/hooks/useMotivationQuote";

interface HeaderProps {
  toggleSidebar: () => void;
  openMotivationPopup: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, openMotivationPopup }) => {
  return (
    <header className="h-16 bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 h-full">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-md hover:bg-secondary transition-colors lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-semibold hidden sm:block">Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={openMotivationPopup}
            className="p-2 rounded-full hover:bg-secondary relative transition-colors"
            aria-label="Get motivation"
          >
            <Lightbulb size={18} className="text-flashcore-orange" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-flashcore-purple rounded-full animate-pulse"></span>
          </button>
          
          <button
            className="p-2 rounded-full hover:bg-secondary relative transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-flashcore-green rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-2 ml-2">
            <div className="w-8 h-8 rounded-full bg-flashcore-purple flex items-center justify-center">
              <span className="text-sm font-medium text-white">AM</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">alex_mitchell</p>
            </div>
            <ChevronDown size={16} className="hidden sm:block text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
