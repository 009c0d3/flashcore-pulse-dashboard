
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useAnalytics } from "@/hooks/useAnalytics";
import { CircleIcon, Users, Activity, ArrowUpRight } from "lucide-react";

const AnalyticsPanel: React.FC = () => {
  const { analytics, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const metrics = [
    {
      title: "Total Users",
      value: analytics.totalUsers,
      icon: <Users className="h-4 w-4 text-blue-500" />,
      description: "Registered accounts"
    },
    {
      title: "Active Today",
      value: analytics.activeToday,
      icon: <Activity className="h-4 w-4 text-green-500" />,
      description: "Active users today"
    },
    {
      title: "New Signups",
      value: analytics.newSignups,
      icon: <ArrowUpRight className="h-4 w-4 text-purple-500" />,
      description: "Last 24 hours"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <CardDescription>{metric.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPanel;
