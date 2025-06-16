
import React from "react";
import DashboardModule from "@/components/DashboardModule";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface PlanModuleProps {
  plan: {
    name: string;
    amount: string;
    expires: string;
  };
  isActivated: boolean;
}

const PlanModule: React.FC<PlanModuleProps> = ({ plan, isActivated }) => {
  return (
    <DashboardModule title="Current Plan" icon="💎" className="lg:col-span-1">
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1 mb-2">
          <h4 className="text-2xl font-bold gradient-text">{plan.name}</h4>
          <span className="text-muted-foreground">{plan.amount}/mo</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Expires on {new Date(plan.expires).toLocaleDateString()}
        </p>
        <Button 
          variant="outline" 
          className="w-full justify-between"
          disabled={!isActivated}
        >
          <span>Upgrade Plan</span>
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

export default PlanModule;
