
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Mail, CreditCard } from "lucide-react";

const HistoryPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">History</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-flashcore-purple/10 to-flashcore-purple/20">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-flashcore-purple" /> Mail History
                </CardTitle>
                <CardDescription>Track all your email communications</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/history/mail">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                { subject: "Your monthly report is ready", date: "May 15, 2023", status: "Delivered" },
                { subject: "Account verification", date: "May 10, 2023", status: "Opened" },
                { subject: "Welcome to FlashCore", date: "May 5, 2023", status: "Clicked" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between pb-2 border-b last:border-0">
                  <div>
                    <h4 className="font-medium">{item.subject}</h4>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded ${
                    item.status === "Delivered" ? "bg-blue-100 text-blue-800" :
                    item.status === "Opened" ? "bg-green-100 text-green-800" :
                    "bg-purple-100 text-purple-800"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-flashcore-green/10 to-flashcore-green/20">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-flashcore-green" /> Payment History
                </CardTitle>
                <CardDescription>View your payment and billing history</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/history/payment">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                { description: "Premium Subscription", date: "May 1, 2023", amount: "$49.99" },
                { description: "API Credits", date: "Apr 15, 2023", amount: "$19.99" },
                { description: "Premium Subscription", date: "Apr 1, 2023", amount: "$49.99" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between pb-2 border-b last:border-0">
                  <div>
                    <h4 className="font-medium">{item.description}</h4>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                  <span className="font-medium">{item.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-flashcore-orange/10 to-flashcore-orange/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-flashcore-orange" /> Activity Timeline
              </CardTitle>
              <CardDescription>Recent activities on your account</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="relative pl-6 border-l space-y-6">
            {[
              { action: "Logged in from new device", date: "May 16, 2023", time: "09:45 AM", device: "iPhone 12, iOS 15.5" },
              { action: "Changed password", date: "May 14, 2023", time: "02:30 PM", device: "Chrome, Windows 10" },
              { action: "Updated profile information", date: "May 12, 2023", time: "11:20 AM", device: "Firefox, macOS" },
              { action: "Added new API key", date: "May 10, 2023", time: "04:15 PM", device: "Chrome, Windows 10" },
              { action: "Created child panel", date: "May 8, 2023", time: "10:05 AM", device: "Safari, macOS" },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-9 mt-1.5 h-3 w-3 rounded-full border-2 border-flashcore-orange bg-background"></div>
                <div>
                  <h4 className="font-medium">{item.action}</h4>
                  <p className="text-sm text-muted-foreground">{item.date} at {item.time}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.device}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPage;
