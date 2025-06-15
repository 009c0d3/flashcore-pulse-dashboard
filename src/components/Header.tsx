
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, ChevronDown, Lightbulb, User, Settings } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
  openMotivationPopup: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, openMotivationPopup }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    // You can add actual notification logic here
    console.log("Notifications clicked");
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="h-16 bg-card/50 backdrop-blur-sm border-b border-border fixed top-0 z-30 w-full">
      <div className="flex items-center justify-between px-4 h-full">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-md hover:bg-secondary transition-colors"
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
            title="Daily Motivation"
          >
            <Lightbulb size={18} className="text-flashcore-orange" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-flashcore-purple rounded-full animate-pulse"></span>
          </button>
          
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="p-2 rounded-full hover:bg-secondary relative transition-colors"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-flashcore-green rounded-full"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg p-4 z-50">
                <h3 className="font-semibold mb-2">Notifications</h3>
                <div className="space-y-2">
                  <div className="p-2 bg-secondary rounded text-sm">
                    <p className="font-medium">Welcome to FlashCore!</p>
                    <p className="text-muted-foreground text-xs">Complete your profile setup</p>
                  </div>
                  <div className="p-2 bg-secondary rounded text-sm">
                    <p className="font-medium">New referral bonus</p>
                    <p className="text-muted-foreground text-xs">You earned $5 from a referral</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={handleUserMenuClick}
              className="flex items-center gap-2 ml-2 hover:bg-secondary rounded-lg p-1 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-flashcore-purple flex items-center justify-center">
                <span className="text-sm font-medium text-white">AM</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">alex_mitchell</p>
              </div>
              <ChevronDown size={16} className="hidden sm:block text-muted-foreground" />
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 px-4 py-2 hover:bg-secondary transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User size={16} />
                  Profile
                </Link>
                <Link 
                  to="/features" 
                  className="flex items-center gap-2 px-4 py-2 hover:bg-secondary transition-colors"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings size={16} />
                  Settings
                </Link>
                <hr className="my-2 border-border" />
                <Link 
                  to="/logout" 
                  className="flex items-center gap-2 px-4 py-2 hover:bg-secondary transition-colors text-destructive"
                  onClick={() => setShowUserMenu(false)}
                >
                  <span>🚪</span>
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Click outside handler */}
      {(showNotifications || showUserMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
