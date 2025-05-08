
import React from "react";
import { Button } from "@/components/ui/button";
import DashboardModule from "@/components/DashboardModule";
import { DashboardData } from "@/types";

interface ReferralModuleProps {
  data: DashboardData | undefined;
  openReferralPopup: () => void;
}

const ReferralModule: React.FC<ReferralModuleProps> = ({ data, openReferralPopup }) => {
  return (
    <DashboardModule 
      title="Referrals" 
      icon="🔗" 
      className="lg:col-span-1"
    >
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-secondary rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-flashcore-purple">
              {data?.user?.referralCount || 0}
            </p>
            <p className="text-xs text-muted-foreground">Total Referrals</p>
          </div>
          <div className="bg-secondary rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-flashcore-green">
              ${data?.user?.referralEarnings || 0}
            </p>
            <p className="text-xs text-muted-foreground">Earnings</p>
          </div>
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-flashcore-purple to-flashcore-green hover:opacity-90"
          onClick={openReferralPopup}
        >
          Invite Friends
        </Button>
      </div>
    </DashboardModule>
  );
};

export default ReferralModule;
