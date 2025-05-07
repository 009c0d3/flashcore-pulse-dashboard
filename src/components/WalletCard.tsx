
import React from "react";
import { Link } from "react-router-dom";
import { Wallet, TagType } from "@/types";
import { cn } from "@/lib/utils";

interface WalletCardProps {
  wallet: Wallet;
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet }) => {
  const getTagClass = (type: TagType) => {
    switch (type) {
      case TagType.Hot:
        return "bg-gradient-to-r from-red-500 to-red-600";
      case TagType.New:
        return "bg-gradient-to-r from-flashcore-purple to-blue-500";
      case TagType.Trending:
        return "bg-gradient-to-r from-flashcore-orange to-yellow-500";
      case TagType.Bulk:
        return "bg-gradient-to-r from-green-500 to-flashcore-green";
      case TagType.AI:
        return "bg-gradient-to-r from-blue-600 to-purple-600";
      default:
        return "bg-secondary";
    }
  };

  const getStatusClass = (status: 'active' | 'maintenance' | 'disabled') => {
    switch (status) {
      case "active":
        return "bg-flashcore-green";
      case "maintenance":
        return "bg-flashcore-orange";
      case "disabled":
        return "bg-red-500";
      default:
        return "bg-secondary";
    }
  };

  const getStatusText = (status: 'active' | 'maintenance' | 'disabled') => {
    switch (status) {
      case "active":
        return "Active";
      case "maintenance":
        return "Maintenance";
      case "disabled":
        return "Disabled";
      default:
        return "Unknown";
    }
  };

  return (
    <Link 
      to={wallet.url} 
      className={cn(
        "wallet-card block p-5 rounded-xl glass-card relative overflow-hidden transition-transform duration-300 border border-white/10 hover:scale-105 group",
        `gradient-${wallet.gradientClass}`
      )}
    >
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      
      {/* Status Indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${getStatusClass(wallet.status)} animate-pulse`}></span>
        <span className="text-xs text-muted-foreground">{getStatusText(wallet.status)}</span>
      </div>
      
      <div className="relative z-10">
        {/* Wallet Logo */}
        <div className="mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-black/50 to-black/20 p-1 backdrop-blur-sm mx-auto transition-transform duration-300 group-hover:scale-110">
          <img 
            src={wallet.logo} 
            alt={`${wallet.name} logo`} 
            className="w-full h-full object-cover rounded-full"
            loading="lazy"
          />
        </div>
        
        {/* Wallet Name */}
        <h3 className="text-xl font-semibold text-center mb-3 text-white">
          {wallet.name}
        </h3>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {wallet.tags.map((tag, index) => (
            <span 
              key={index} 
              className={cn(
                "px-2 py-0.5 text-xs font-semibold rounded-full text-white",
                getTagClass(tag.type)
              )}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
      
      {/* Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skeleton-shine -skew-x-12"></div>
    </Link>
  );
};

export default WalletCard;
