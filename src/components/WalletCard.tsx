
import React from "react";
import { Wallet } from "@/types";
import { cn } from "@/lib/utils";

interface WalletCardProps {
  wallet: Wallet;
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet }) => {
  const tagColorMap = {
    hot: "from-red-500 to-orange-500",
    new: "from-blue-500 to-indigo-500",
    trending: "from-purple-500 to-pink-500",
    bulk: "from-green-500 to-teal-500",
    ai: "from-flashcore-purple to-blue-500",
  };

  const statusBadgeClass = {
    active: "bg-green-500",
    maintenance: "bg-yellow-500",
    disabled: "bg-red-500",
  };

  const statusText = {
    active: "Active",
    maintenance: "Maintenance",
    disabled: "Disabled",
  };

  return (
    <a 
      href={wallet.url} 
      className={cn(
        "wallet-card group relative overflow-hidden backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center transition-all duration-300 hover:-translate-y-1",
        wallet.gradientClass
      )}
    >
      {/* Status indicator */}
      {wallet.status && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <span className={cn("w-2 h-2 rounded-full", statusBadgeClass[wallet.status])}></span>
          <span className="text-xs text-muted-foreground">{statusText[wallet.status]}</span>
        </div>
      )}

      {/* Logo */}
      <div className="w-20 h-20 rounded-full bg-card/80 p-2 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
        <img 
          src={wallet.logo} 
          alt={`${wallet.name} logo`}
          className="w-16 h-16 object-contain"
          loading="lazy"
        />
      </div>
      
      {/* Wallet name */}
      <h3 className="text-xl font-semibold mb-3">{wallet.name}</h3>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 justify-center">
        {wallet.tags.map((tag, index) => (
          <span 
            key={index} 
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r", 
              tagColorMap[tag.type]
            )}
          >
            {tag.label}
          </span>
        ))}
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 bg-gradient-to-r from-flashcore-green via-flashcore-purple to-flashcore-orange rounded-xl blur-md transition-opacity z-[-1]"></div>
    </a>
  );
};

export default WalletCard;
