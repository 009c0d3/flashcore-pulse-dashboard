
import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardModule from "@/components/DashboardModule";
import { DashboardData } from "@/types";

interface WalletModuleProps {
  data: DashboardData | undefined;
}

const WalletModule: React.FC<WalletModuleProps> = ({ data }) => {
  return (
    <DashboardModule 
      title="Wallet" 
      icon="💰" 
      className="lg:col-span-1"
    >
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1 mb-2">
          <h4 className="text-2xl font-bold gradient-text">{data?.walletBalance}</h4>
          <span className="text-muted-foreground">Available</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Last transaction: May 5, 2025
        </p>
        <Button variant="outline" className="w-full justify-between">
          <span>Manage Wallet</span>
          <ExternalLink size={16} />
        </Button>
      </div>
    </DashboardModule>
  );
};

export default WalletModule;
