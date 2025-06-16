
import React, { useState } from "react";
import { Zap, Clock, TrendingUp, BarChart3, Mail, Receipt, CreditCard, Users, Target, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardModule from "@/components/DashboardModule";
import { GenerateTransactionModal } from "@/components/flash/GenerateTransactionModal";
import { FlashBillingModal } from "@/components/flash/FlashBillingModal";
import { GenerateReceiptModal } from "@/components/flash/GenerateReceiptModal";

const flashFeatures = [
  {
    title: "Generate Transaction",
    desc: "Instantly send wallet transaction emails to your users with all the details, in a flash.",
    button: "Generate",
    icon: "⚡",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Flash Billing",
    desc: "Send billing emails instantly and manage all your invoices from one place.",
    button: "Flash Bill",
    icon: "💰",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Generate Receipts",
    desc: "Quickly create transaction receipts for any wallet transaction.",
    button: "Create Receipt",
    icon: "🧾",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Bulk Operations",
    desc: "Process multiple transactions and send bulk emails to hundreds of users simultaneously.",
    button: "Start Bulk",
    icon: "📦",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Analytics Dashboard",
    desc: "Real-time insights into your email campaigns, delivery rates, and user engagement.",
    button: "View Analytics",
    icon: "📊",
    color: "from-indigo-500 to-blue-500"
  },
  {
    title: "Template Manager",
    desc: "Create, customize, and manage email templates for all your communication needs.",
    button: "Manage Templates",
    icon: "📝",
    color: "from-teal-500 to-green-500"
  },
];

const quickStats = [
  { label: "Emails Sent Today", value: "1,247", icon: Mail, change: "+12%" },
  { label: "Success Rate", value: "98.5%", icon: Target, change: "+2.1%" },
  { label: "Active Templates", value: "24", icon: Receipt, change: "+3" },
  { label: "Processing Time", value: "0.8s", icon: Clock, change: "-15%" },
];

const FlashPage = () => {
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [isBillingModalOpen, setBillingModalOpen] = useState(false);
  const [isReceiptModalOpen, setReceiptModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
          ⚡ Flash Tools
        </h1>
        <p className="text-muted-foreground">
          Quick access to your most powerful automation tools. Process transactions, send emails, and manage receipts in seconds.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map(({ label, value, icon: Icon, change }) => (
          <Card key={label} className="border-l-4 border-l-flashcore-purple">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-xs text-flashcore-green">{change}</p>
                </div>
                <Icon className="h-8 w-8 text-flashcore-purple" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Overview
          </CardTitle>
          <CardDescription>
            Your flash tools performance metrics for the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-flashcore-green mb-2">15,847</div>
              <p className="text-sm text-muted-foreground">Total Transactions Processed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-flashcore-purple mb-2">2.3s</div>
              <p className="text-sm text-muted-foreground">Average Processing Time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-flashcore-blue mb-2">99.2%</div>
              <p className="text-sm text-muted-foreground">System Uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Flash Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {flashFeatures.map(({ title, desc, button, icon, color }) => (
          <DashboardModule 
            key={title}
            title={title} 
            icon={icon}
            className="lg:col-span-1"
          >
            <div className="flex flex-col h-full">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow">
                {desc}
              </p>
              
              {title === 'Generate Transaction' ? (
                 <Button 
                   onClick={() => setTransactionModalOpen(true)}
                   className={`w-full bg-gradient-to-r ${color} hover:opacity-90 transition-opacity font-medium`}
                 >
                   {button}
                   <Zap className="ml-2 h-4 w-4" />
                 </Button>
              ) : title === 'Flash Billing' ? (
                 <Button 
                   onClick={() => setBillingModalOpen(true)}
                   className={`w-full bg-gradient-to-r ${color} hover:opacity-90 transition-opacity font-medium`}
                 >
                   {button}
                   <Zap className="ml-2 h-4 w-4" />
                 </Button>
              ) : title === 'Generate Receipts' ? (
                <Button 
                  onClick={() => setReceiptModalOpen(true)}
                  className={`w-full bg-gradient-to-r ${color} hover:opacity-90 transition-opacity font-medium`}
                >
                  {button}
                  <Zap className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  className={`w-full bg-gradient-to-r ${color} hover:opacity-90 transition-opacity font-medium`}
                  variant="outline"
                >
                  {button}
                  <Zap className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </DashboardModule>
        ))}
      </div>

      {/* Security & Compliance */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Compliance
          </CardTitle>
          <CardDescription>
            Your data is protected with enterprise-grade security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">SSL Encryption</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">99.9% Uptime</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Recent Flash Activity
          </CardTitle>
          <CardDescription>
            Your latest flash tool usage and results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: "Transaction Email Sent", details: "Batch of 150 emails", time: "2 minutes ago", status: "success" },
              { action: "Receipt Generated", details: "Invoice #INV-2024-001", time: "5 minutes ago", status: "success" },
              { action: "Billing Campaign", details: "Monthly subscription reminders", time: "1 hour ago", status: "success" },
              { action: "Bulk Operation", details: "500 transaction notifications", time: "3 hours ago", status: "success" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.details}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-500 capitalize">{activity.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Need help getting started? Check out our{" "}
          <span className="text-flashcore-green hover:underline cursor-pointer">
            tutorial section
          </span>{" "}
          for step-by-step guides and best practices.
        </p>
      </div>

      <GenerateTransactionModal isOpen={isTransactionModalOpen} onOpenChange={setTransactionModalOpen} />
      <FlashBillingModal isOpen={isBillingModalOpen} onOpenChange={setBillingModalOpen} />
      <GenerateReceiptModal isOpen={isReceiptModalOpen} onOpenChange={setReceiptModalOpen} />
    </div>
  );
};

export default FlashPage;
