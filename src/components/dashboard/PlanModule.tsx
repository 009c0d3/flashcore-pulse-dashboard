
import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardModule from "@/components/DashboardModule";
import { DashboardData } from "@/types";

interface PlanModuleProps {
  data: DashboardData | undefined;
}

const PlanModule: React.FC<PlanModuleProps> = ({ data }) => {
  return (
    <DashboardModule 
      title="Current Plan" 
      icon="💎" 
      className="lg:col-span-1"
    >
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1 mb-2">
          <h4 className="text-2xl font-bold gradient-text">{data?.plan?.name}</h4>
          <span className="text-muted-foreground">{data?.plan?.amount || "$0"}/mo</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Expires on {new Date(data?.plan?.expires || Date.now()).toLocaleDateString()}
        </p>
        <Button variant="outline" className="w-full justify-between">
          <span>Upgrade Plan</span>
          <ExternalLink size={16} />
        </Button>
      </div>
    </DashboardModule>
  );
};

export default PlanModule;
