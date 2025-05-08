
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import DashboardModule from "@/components/DashboardModule";
import { DashboardData } from "@/types";

interface ActivityModuleProps {
  data: DashboardData | undefined;
}

const ActivityModule: React.FC<ActivityModuleProps> = ({ data }) => {
  return (
    <DashboardModule 
      title="Mail Activity" 
      icon="📈" 
      className="lg:col-span-2"
    >
      <div className="h-64">
        {data?.mailActivity && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.mailActivity}>
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
                dataKey="count" 
                strokeWidth={2}
                stroke="#a16bf7" 
                activeDot={{ r: 6, fill: '#4cd97b' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        <div className="bg-secondary rounded-lg p-2 text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Mails</p>
          <p className="font-semibold">{data?.totalMails?.toLocaleString() || 0}</p>
        </div>
        <div className="bg-secondary rounded-lg p-2 text-center">
          <p className="text-xs text-muted-foreground mb-1">Current Rank</p>
          <p className="font-semibold">{data?.user?.rank || "Beginner"}</p>
        </div>
        <div className="bg-secondary rounded-lg p-2 text-center">
          <p className="text-xs text-muted-foreground mb-1">Progress</p>
          <p className="font-semibold">{data?.progress || 0}%</p>
        </div>
      </div>
    </DashboardModule>
  );
};

export default ActivityModule;
