
import React, { useState, useEffect } from "react";
import { useWalletData } from "@/hooks/useWalletData";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Search } from "lucide-react";
import { toast } from "sonner";
import MotivationPopup from "@/components/MotivationPopup";
import { TagType } from "@/types";
import ParticleBackground from "@/components/ParticleBackground";

const WalletSelection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isMotivationPopupOpen, setIsMotivationPopupOpen] = useState(false);
  const [showTelegramPopup, setShowTelegramPopup] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openMotivationPopup = () => {
    setIsMotivationPopupOpen(true);
  };

  const { wallets = [], isLoading, error } = useWalletData();

  // Check for lastShown telegram popup
  useEffect(() => {
    const lastShown = localStorage.getItem("telegramPopupShown");
    const now = new Date().getTime();
    
    if (!lastShown || now - parseInt(lastShown) > 86400000) { // 24 hours
      setTimeout(() => {
        setShowTelegramPopup(true);
        localStorage.setItem("telegramPopupShown", now.toString());
      }, 5000);
    }
  }, []);

  // Handle telegram popup close
  const closeTelegramPopup = () => {
    setShowTelegramPopup(false);
  };

  // Add a null check for wallets
  const filteredWallets = wallets ? wallets.filter(
    (wallet) =>
      wallet && wallet.name && wallet.name.toLowerCase().includes(search.toLowerCase()) ||
      wallet && wallet.tags && wallet.tags.some((tag) => tag.label.toLowerCase().includes(search.toLowerCase()))
  ) : [];

  if (error) {
    toast.error("Failed to load wallets. Please try again.");
  }

  // Helper function to get the tag class based on tag type
  const getTagClass = (type: TagType) => {
    switch (type) {
      case TagType.Hot:
        return "tag-hot";
      case TagType.New:
        return "tag-new";
      case TagType.Trending:
        return "tag-trending";
      case TagType.Bulk:
        return "tag-bulk";
      case TagType.AI:
        return "tag-ai";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Animated Background */}
      <ParticleBackground />
      
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <Header 
          toggleSidebar={toggleSidebar} 
          openMotivationPopup={openMotivationPopup}
        />
        
        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto relative z-10">
          <div className="wallet-header text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Select Wallet To Flash
            </h2>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-flashcore-purple via-flashcore-green to-flashcore-orange rounded-full"></div>
          </div>
          
          {/* Search Bar */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search wallets by name or tag..."
                className="w-full pl-10 pr-4 py-3 bg-card/50 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-flashcore-green/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          {/* Wallet Grid */}
          <div className="wallet-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="wallet-item animate-pulse">
                  <div className="wallet-info">
                    <div className="wallet-logo bg-white/10"></div>
                    <div className="h-4 w-24 bg-white/10 rounded mt-4"></div>
                  </div>
                </div>
              ))
            ) : filteredWallets.length > 0 ? (
              filteredWallets.map((wallet) => (
                wallet && (
                  <a 
                    key={wallet.id} 
                    href={wallet.url} 
                    className={`wallet-item ${wallet.gradientClass}`}
                    style={{transform: "rotateX(10deg) rotateY(0deg)"}}
                  >
                    {/* Tags */}
                    {wallet.tags.map((tag, index) => {
                      if (tag.type === TagType.Hot || tag.type === TagType.New || tag.type === TagType.Trending) {
                        return (
                          <span key={index} className={`wallet-tag ${getTagClass(tag.type)}`}>
                            {tag.label} {tag.type === TagType.Hot ? '🔥' : tag.type === TagType.New ? '' : tag.type === TagType.Trending ? '🚀' : ''}
                          </span>
                        );
                      } else if (tag.type === TagType.Bulk) {
                        return (
                          <span key={index} className={`wallet-tag-bulk ${getTagClass(tag.type)}`}>
                            {tag.label}
                          </span>
                        );
                      } else if (tag.type === TagType.AI) {
                        return (
                          <span key={index} className={`wallet-tag-ai ${getTagClass(tag.type)}`}>
                            {tag.label} 🧠
                          </span>
                        );
                      }
                      return null;
                    })}
                    
                    <div className="wallet-info">
                      <div className="wallet-logo">
                        <img src={wallet.logo} alt={`${wallet.name} logo`} loading="lazy" />
                      </div>
                      <p className="wallet-name">{wallet.name}</p>
                    </div>
                    
                    {/* Reflection animation element */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12"></div>
                  </a>
                )
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-2xl text-muted-foreground mb-2">No wallets found</h3>
                <p className="text-muted-foreground">Try a different search term</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Popups */}
      <MotivationPopup 
        isOpen={isMotivationPopupOpen} 
        onClose={() => setIsMotivationPopupOpen(false)} 
      />
      
      {/* Telegram Popup */}
      {showTelegramPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-white/10 rounded-xl p-6 max-w-md w-full shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Join Our Telegram! 🔥</h3>
              <button 
                onClick={closeTelegramPopup}
                className="text-muted-foreground hover:text-foreground"
              >
                &times;
              </button>
            </div>
            <p className="mb-6">Stay updated and get free activation keys by joining our Telegram channel 🎁</p>
            <a 
              href="https://t.me/onetoolz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full py-3 bg-[#0088cc] hover:bg-[#0099dd] text-white font-medium rounded-lg text-center transition-colors"
            >
              💬 Join Channel
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletSelection;
