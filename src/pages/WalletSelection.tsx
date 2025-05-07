
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWallets } from "@/utils/api";
import { Wallet } from "@/types";
import { Search } from "lucide-react";
import WalletCard from "@/components/WalletCard";

const WalletSelection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: wallets, isLoading, error } = useQuery<Wallet[]>({
    queryKey: ["wallets"],
    queryFn: fetchWallets,
    staleTime: 60000, // 1 minute
  });
  
  const filteredWallets = wallets?.filter(wallet => 
    wallet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wallet.tags.some(tag => tag.label.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text text-center">
          Select Your Wallet
        </h1>
        <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl">
          Choose from our selection of supported wallets for flashing and transactions
        </p>
        
        {/* Search bar */}
        <div className="relative w-full max-w-md mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search wallets by name or tag..."
            className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-flashcore-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="h-64 rounded-xl bg-secondary/50"
            />
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-destructive py-10">
          <p>Failed to load wallets. Please try again.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWallets?.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WalletSelection;
