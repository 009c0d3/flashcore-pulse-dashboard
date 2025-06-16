
import React from "react";
import DashboardModule from "@/components/DashboardModule";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MailActivity } from "@/types";

interface MailActivityModuleProps {
  mailActivity: MailActivity[];
  totalMails: number;
  userRank: string;
  progress: number;
  isActivated: boolean;
}

const MailActivityModule: React.FC<MailActivityModuleProps> = ({ 
  mailActivity, 
  totalMails, 
  userRank, 
  progress, 
  isActivated 
}) => {
  const displayData = isActivated ? mailActivity : [];
  
  return (
    <DashboardModule title="Mail Activity" icon="📈" className="lg:col-span-2">
      <div className="h-64">
        {displayData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={displayData}>
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return `${d.getMonth() + 1}/${d.getDate()}`;
                }}
              />
              <YAxis />
              <Tooltip 
                contentStyle={{ background: '#1e1e1e', border: '1px solid rgba(255,255,255,0.1)' }} 
                formatter={(value) => [`${value} emails`, 'Sent']}
              />
              <Line 
                type="monotone" 
                dataKey="sent" 
                stroke="#a16bf7" 
                strokeWidth={2}
                activeDot={{ r: 6, fill: '#4cd97b' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              {isActivated ? 'No mail activity data' : 'License activation required to view mail activity'}
            </p>
          </div>
        )}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        <div className="bg-secondary rounded-lg p-2 text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Mails</p>
          <p className="font-semibold">{isActivated ? totalMails.toLocaleString() : 0}</p>
        </div>
        <div className="bg-secondary rounded-lg p-2 text-center">
          <p className="text-xs text-muted-foreground mb-1">Current Rank</p>
          <p className="font-semibold">{isActivated ? userRank : 'N/A'}</p>
        </div>
        <div className="bg-secondary rounded-lg p-2 text-center">
          <p className="text-xs text-muted-foreground mb-1">Progress</p>
          <p className="font-semibold">{isActivated ? progress : 0}%</p>
        </div>
      </div>
    </DashboardModule>
  );
};

export default MailActivityModule;
