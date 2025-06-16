
import React from "react";
import DashboardModule from "@/components/DashboardModule";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface WalletModuleProps {
  walletBalance: string;
  isActivated: boolean;
}

const WalletModule: React.FC<WalletModuleProps> = ({ walletBalance, isActivated }) => {
  return (
    <DashboardModule title="Wallet" icon="💰" className="lg:col-span-1">
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1 mb-2">
          <h4 className="text-2xl font-bold gradient-text">{walletBalance}</h4>
          <span className="text-muted-foreground">Available</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Last transaction: May 5, 2025
        </p>
        <Button 
          variant="outline" 
          className="w-full justify-between"
          disabled={!isActivated}
        >
          <span>Manage Wallet</span>
          <ExternalLink size={16} />
        </Button>
        {!isActivated && (
          <p className="text-xs text-destructive mt-2">
            License activation required
          </p>
        )}
      </div>
    </DashboardModule>
  );
};

export default WalletModule;
