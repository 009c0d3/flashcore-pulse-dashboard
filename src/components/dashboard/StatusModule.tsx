
import React from "react";
import DashboardModule from "@/components/DashboardModule";
import ProgressBar from "@/components/ProgressBar";
import { DashboardData } from "@/types";

interface StatusModuleProps {
  data: DashboardData | undefined;
}

const StatusModule: React.FC<StatusModuleProps> = ({ data }) => {
  return (
    <DashboardModule 
      title="Status" 
      icon="🏆" 
      className="lg:col-span-1"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xl font-semibold">{data?.user?.rank}</h4>
          <span className="text-sm text-muted-foreground">{data?.progress}%</span>
        </div>
        <ProgressBar progress={data?.progress || 0} />
        <p className="text-sm text-muted-foreground mt-2">
          {data?.mailsNeeded} more mails to reach {data?.nextLevel}
        </p>
        <div className="mt-3 py-2 px-3 bg-secondary rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm">Mails Sent</span>
            <span className="font-semibold">{data?.user?.mailsSent || 0}</span>
          </div>
        </div>
      </div>
    </DashboardModule>
  );
};

export default StatusModule;
