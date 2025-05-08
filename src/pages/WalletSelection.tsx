
import React, { useState } from "react";
import { useWalletData } from "@/hooks/useWalletData";
import WalletCard from "@/components/WalletCard";
import ParticleBackground from "@/components/ParticleBackground";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Search } from "lucide-react";
import { toast } from "sonner";

const WalletSelection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isMotivationPopupOpen, setIsMotivationPopupOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openMotivationPopup = () => {
    setIsMotivationPopupOpen(true);
  };

  const { wallets = [], isLoading, error } = useWalletData();

  // Add a null check for wallets
  const filteredWallets = wallets ? wallets.filter(
    (wallet) =>
      wallet && wallet.name && wallet.name.toLowerCase().includes(search.toLowerCase()) ||
      wallet && wallet.tags && wallet.tags.some((tag) => tag.label.toLowerCase().includes(search.toLowerCase()))
  ) : [];

  if (error) {
    toast.error("Failed to load wallets. Please try again.");
  }

  return (
    <div className="min-h-screen flex bg-background">
      <ParticleBackground />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
          openMotivationPopup={openMotivationPopup}
        />
        
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full relative z-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Select Wallet To Flash
            </h1>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-xl h-48 glass-card animate-pulse">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 bg-white/10 rounded-full mb-4"></div>
                    <div className="h-5 bg-white/10 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-white/10 rounded w-1/4"></div>
                  </div>
                </div>
              ))
            ) : filteredWallets.length > 0 ? (
              filteredWallets.map((wallet) => (
                wallet ? <WalletCard key={wallet.id} wallet={wallet} /> : null
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-2xl text-muted-foreground mb-2">No wallets found</h3>
                <p className="text-muted-foreground">Try a different search term</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default WalletSelection;
