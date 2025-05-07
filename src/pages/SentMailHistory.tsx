
import React, { useState } from "react";
import { Funnel, Wallet, CoinStack, Envelope, Clock } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MotivationPopup from "@/components/MotivationPopup";

const mailHistoryData = [
  {
    id: 1,
    walletName: "Coinbase",
    amount: "20000 ETH",
    email: "Handdrinavalona@gmail.com",
    sentAt: "Apr 20 2025 02:38 PM"
  },
  {
    id: 2,
    walletName: "Binance",
    amount: "12000 ETH",
    email: "crypto_trader98@gmail.com",
    sentAt: "Apr 18 2025 11:22 AM"
  }
];

const SentMailHistory: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [motivationOpen, setMotivationOpen] = useState<boolean>(false);
  
  return (
    <div className="flex min-h-screen bg-background">
      <ParticleBackground />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          openMotivationPopup={() => setMotivationOpen(true)}
        />
        
        <main className="flex-1 p-4 md:p-6 flex flex-col items-center justify-center">
          <Card className="w-full max-w-3xl border-l-4 border-l-flashcore-green">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">SENT MAIL HISTORY</h1>
                <Button 
                  variant="ghost" 
                  className="text-flashcore-green hover:text-flashcore-green/80 hover:bg-secondary"
                >
                  <Funnel size={16} className="mr-2" />
                  FILTER
                </Button>
              </div>
              
              <div className="space-y-4">
                {mailHistoryData.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-secondary rounded-lg p-4 hover:bg-muted transition-colors"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Wallet size={16} className="text-flashcore-green" />
                        <div>
                          <p className="text-xs text-muted-foreground">Wallet Name</p>
                          <p>{item.walletName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <CoinStack size={16} className="text-flashcore-orange" />
                        <div>
                          <p className="text-xs text-muted-foreground">Amount</p>
                          <p>{item.amount}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Envelope size={16} className="text-flashcore-purple" />
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-sm overflow-hidden text-ellipsis">{item.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-blue-400" />
                        <div>
                          <p className="text-xs text-muted-foreground">Sent At</p>
                          <p>{item.sentAt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Message Us Button */}
          <Button 
            className="mt-6 bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <span className="mr-2">✈️</span>
            Message Us
          </Button>
        </main>
      </div>
      
      {/* Motivation Popup */}
      <MotivationPopup 
        isOpen={motivationOpen} 
        onClose={() => setMotivationOpen(false)} 
      />
    </div>
  );
};

export default SentMailHistory;
