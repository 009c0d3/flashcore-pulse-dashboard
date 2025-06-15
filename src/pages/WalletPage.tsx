
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Coins,
  CircleDollarSign,
  DollarSign,
  Shield,
  CandlestickChart,
  CreditCard,
  Zap,
  Wallet,
  Ghost,
  Globe,
  Milestone,
  Box,
  Lock,
  Waves,
  Users,
} from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MotivationPopup from "@/components/MotivationPopup";

const WalletPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMotivationOpen, setIsMotivationOpen] = useState(false);

  const wallets = [
    {
      name: "Binance",
      icon: <Coins className="w-8 h-8 text-yellow-400" />,
      color: "from-yellow-400 to-orange-500",
      hasAI: true,
      isHot: true,
      hasBulkFlashing: true,
    },
    {
      name: "Coinbase",
      icon: <CircleDollarSign className="w-8 h-8 text-blue-500" />,
      color: "from-blue-500 to-blue-600",
      hasAI: true,
      hasBulkFlashing: true,
    },
    {
      name: "Cashapp",
      icon: <DollarSign className="w-8 h-8 text-green-400" />,
      color: "from-green-400 to-green-500",
      hasAI: true,
      isTrending: true,
    },
    {
      name: "Trust Wallet",
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      color: "from-blue-400 to-blue-600",
      hasAI: true,
      hasBulkFlashing: true,
    },
    {
      name: "Bybit",
      icon: <CandlestickChart className="w-8 h-8 text-yellow-500" />,
      color: "from-yellow-400 to-orange-500",
      hasAI: true,
      hasBulkFlashing: true,
    },
    {
      name: "PayPal",
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      color: "from-blue-500 to-blue-700",
      hasAI: true,
    },
    {
      name: "Message Us",
      icon: <MessageCircle className="w-8 h-8 text-cyan-400" />,
      color: "from-blue-400 to-cyan-500",
      hasAI: true,
      isSpecial: true,
    },
    {
      name: "Zelle",
      icon: <Zap className="w-8 h-8 text-purple-500" />,
      color: "from-purple-500 to-purple-700",
      hasAI: true,
      isNew: true,
    },
    {
      name: "MetaMask",
      icon: <Wallet className="w-8 h-8 text-orange-500" />,
      color: "from-orange-500 to-red-600",
      hasAI: true,
      hasBulkFlashing: true,
      isHot: true,
    },
    {
      name: "Phantom",
      icon: <Ghost className="w-8 h-8 text-purple-400" />,
      color: "from-purple-400 to-indigo-500",
      hasAI: true,
      hasBulkFlashing: true,
    },
    {
      name: "Revolut",
      icon: <Globe className="w-8 h-8 text-gray-400" />,
      color: "from-gray-700 to-black",
      hasAI: true,
      isNew: true,
    },
    {
      name: "Skrill",
      icon: <Milestone className="w-8 h-8 text-purple-500" />,
      color: "from-purple-600 to-pink-600",
      hasAI: true,
    },
    {
      name: "Exodus",
      icon: <Box className="w-8 h-8 text-pink-500" />,
      color: "from-purple-500 to-pink-500",
      hasAI: true,
      hasBulkFlashing: true,
    },
    {
      name: "Ledger",
      icon: <Lock className="w-8 h-8 text-gray-400" />,
      color: "from-gray-800 to-black",
      hasAI: true,
      hasBulkFlashing: true,
      isHot: true,
    },
    {
      name: "Kraken",
      icon: <Waves className="w-8 h-8 text-indigo-500" />,
      color: "from-purple-600 to-indigo-700",
      hasAI: true,
      hasBulkFlashing: true,
    },
    {
      name: "Venmo",
      icon: <Users className="w-8 h-8 text-blue-400" />,
      color: "from-blue-400 to-blue-500",
      hasAI: true,
    },
  ];

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {wallets.map((wallet) => (
                <div
                  key={wallet.name}
                  className="group"
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className="relative rounded-2xl p-6 cursor-pointer h-full transition-all duration-300 group-hover:shadow-2xl [transform-style:preserve-3d] group-hover:[transform:rotateX(5deg)_rotateY(-10deg)]"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${wallet.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10"></div>
                    
                    <div className="relative flex flex-col justify-between h-full min-h-[220px]">
                      {/* Top section: Badges */}
                      <div className="flex justify-between items-start">
                        {wallet.hasAI ? (
                          <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 text-xs z-10">
                            <span className="font-semibold">AI</span>
                            <span className="text-pink-300">🧠</span>
                          </div>
                        ) : <div />}
                        <div className="flex flex-col items-end space-y-1 z-10">
                          {wallet.isHot && <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">HOT 🔥</Badge>}
                          {wallet.isTrending && <Badge className="bg-pink-500 hover:bg-pink-600 text-white text-xs px-2 py-1">TRENDING 🚀</Badge>}
                          {wallet.isNew && <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">NEW</Badge>}
                        </div>
                      </div>

                      {/* Middle section: Icon and Name */}
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center text-white">
                          {wallet.icon}
                        </div>
                        <h3 className="text-white text-xl font-bold mt-4">
                          {wallet.name}
                        </h3>
                      </div>

                      {/* Bottom section: Bulk Flashing / Message button */}
                      <div className="h-10 flex items-center">
                        {wallet.isSpecial ? (
                          <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-xl">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message Us
                          </Button>
                        ) : wallet.hasBulkFlashing ? (
                          <div className="w-full flex justify-end">
                            <Badge className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1">
                              BULK FLASHING
                            </Badge>
                          </div>
                        ) : <div className="w-full" />}
                      </div>
                    </div>
                  </div>
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
