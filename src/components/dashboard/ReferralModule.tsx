
import React from "react";
import DashboardModule from "@/components/DashboardModule";
import { Button } from "@/components/ui/button";

interface ReferralModuleProps {
  user: {
    referralCount: number;
    referralEarnings: number;
  };
  onInviteFriends: () => void;
  isActivated: boolean;
}

const ReferralModule: React.FC<ReferralModuleProps> = ({ 
  user, 
  onInviteFriends, 
  isActivated 
}) => {
  return (
    <DashboardModule title="Referrals" icon="🔗" className="lg:col-span-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-secondary rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-flashcore-purple">
              {isActivated ? (user.referralCount || 0) : 0}
            </p>
            <p className="text-xs text-muted-foreground">Total Referrals</p>
          </div>
          <div className="bg-secondary rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-flashcore-green">
              ${isActivated ? (user.referralEarnings || 0) : 0}
            </p>
            <p className="text-xs text-muted-foreground">Earnings</p>
          </div>
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-flashcore-purple to-flashcore-green hover:opacity-90"
          onClick={onInviteFriends}
          disabled={!isActivated}
        >
          Invite Friends
        </Button>
        {!isActivated && (
          <p className="text-xs text-destructive mt-2 text-center">
            License activation required
          </p>
        )}
      </div>
    </DashboardModule>
  );
};

export default ReferralModule;
