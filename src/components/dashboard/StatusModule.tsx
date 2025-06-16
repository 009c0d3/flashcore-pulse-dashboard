
import React from "react";
import DashboardModule from "@/components/DashboardModule";
import ProgressBar from "@/components/ProgressBar";

interface StatusModuleProps {
  user: {
    rank: string;
    mailsSent: number;
  };
  progress: number;
  mailsNeeded: number;
  nextLevel: string;
  isActivated: boolean;
}

const StatusModule: React.FC<StatusModuleProps> = ({ 
  user, 
  progress, 
  mailsNeeded, 
  nextLevel, 
  isActivated 
}) => {
  return (
    <DashboardModule title="Status" icon="🏆" className="lg:col-span-1">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xl font-semibold">{user.rank}</h4>
          <span className="text-sm text-muted-foreground">{progress}%</span>
        </div>
        <ProgressBar progress={isActivated ? progress : 0} />
        <p className="text-sm text-muted-foreground mt-2">
          {isActivated ? `${mailsNeeded} more mails to reach ${nextLevel}` : 'License activation required'}
        </p>
        <div className="mt-3 py-2 px-3 bg-secondary rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm">Mails Sent</span>
            <span className="font-semibold">{isActivated ? user.mailsSent : 0}</span>
          </div>
        </div>
      </div>
    </DashboardModule>
  );
};

export default StatusModule;
