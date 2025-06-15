
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MotivationPopup from "@/components/MotivationPopup";

const wallets = [
  {
    name: "Binance",
    icon: "🔶",
    color: "from-yellow-400 to-orange-500",
    hasAI: true,
    isHot: true,
    hasBulkFlashing: true
  },
  {
    name: "Coinbase",
    icon: "🔵",
    color: "from-blue-500 to-blue-600",
    hasAI: true,
    hasBulkFlashing: true
  },
  {
    name: "Cashapp",
    icon: "💲",
    color: "from-green-400 to-green-500",
    hasAI: true,
    isTrending: true
  },
  {
    name: "Trust Wallet",
    icon: "🛡️",
    color: "from-blue-400 to-blue-600",
    hasAI: true,
    hasBulkFlashing: true
  },
  {
    name: "Bybit",
    icon: "⚫",
    color: "from-yellow-400 to-orange-500",
    hasAI: true,
    hasBulkFlashing: true
  },
  {
    name: "PayPal",
    icon: "🅿️",
    color: "from-blue-500 to-blue-700",
    hasAI: true
  },
  {
    name: "Message Us",
    icon: "✈️",
    color: "from-blue-400 to-cyan-500",
    hasAI: true,
    isSpecial: true
  },
  {
    name: "Zelle",
    icon: "💜",
    color: "from-purple-500 to-purple-700",
    hasAI: true,
    isNew: true
  }
];

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
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Select Wallet To Flash</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-flashcore-green to-flashcore-purple mx-auto rounded-full" />
            </div>

            {/* Wallet Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {wallets.map((wallet) => (
                <div
                  key={wallet.name}
                  className={`relative bg-gradient-to-br ${wallet.color} rounded-2xl p-6 cursor-pointer transition-transform hover:scale-105 hover:shadow-2xl`}
                >
                  {/* AI Badge */}
                  {wallet.hasAI && (
                    <div className="absolute top-3 left-3 flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-xs font-semibold">AI</span>
                      <span className="text-pink-300">🧠</span>
                    </div>
                  )}

                  {/* Status Badges */}
                  <div className="absolute top-3 right-3 flex flex-col space-y-1">
                    {wallet.isHot && (
                      <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">
                        HOT 🔥
                      </Badge>
                    )}
                    {wallet.isTrending && (
                      <Badge className="bg-pink-500 hover:bg-pink-600 text-white text-xs px-2 py-1">
                        TRENDING 🚀
                      </Badge>
                    )}
                    {wallet.isNew && (
                      <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">
                        NEW
                      </Badge>
                    )}
                  </div>

                  {/* Wallet Icon */}
                  <div className="flex justify-center mb-4 mt-8">
                    <div className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center text-2xl">
                      {wallet.icon}
                    </div>
                  </div>

                  {/* Wallet Name */}
                  <h3 className="text-white text-xl font-bold text-center mb-4">
                    {wallet.name}
                  </h3>

                  {/* Bulk Flashing Badge */}
                  {wallet.hasBulkFlashing && (
                    <div className="absolute bottom-3 right-3">
                      <Badge className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1">
                        BULK FLASHING
                      </Badge>
                    </div>
                  )}

                  {/* Special handling for Message Us card */}
                  {wallet.isSpecial && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-xl">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message Us
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

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
