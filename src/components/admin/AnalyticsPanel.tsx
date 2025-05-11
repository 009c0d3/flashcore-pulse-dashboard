
import React from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useAnalytics } from "@/hooks/useAnalytics";
import { CircleOctagon, Users, Activity, ArrowUpRight } from "lucide-react";

const AnalyticsPanel: React.FC = () => {
  const { analytics, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>Loading analytics data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 border rounded-lg animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const statsItems = [
    {
      title: "Total Users",
      value: analytics.totalUsers,
      icon: Users,
      change: "+12%",
      positive: true
    },
    {
      title: "Active Today",
      value: analytics.activeToday,
      icon: Activity,
      change: "+5%",
      positive: true
    },
    {
      title: "New Signups",
      value: analytics.newSignups,
      icon: CircleOctagon,
      change: "-3%",
      positive: false
    }
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Overview of user activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statsItems.map((item) => (
            <div
              key={item.title}
              className="p-6 border rounded-lg bg-card shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="p-2 rounded-md bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className={`flex items-center text-xs font-medium ${
                  item.positive ? "text-emerald-600" : "text-rose-600"
                }`}>
                  {item.change}
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsPanel;
