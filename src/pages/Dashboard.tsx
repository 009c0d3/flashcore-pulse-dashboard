
import React, { useState, useEffect } from "react";
import { useUserData } from "@/hooks/useUserData";
import DashboardModule from "@/components/DashboardModule";
import ProgressBar from "@/components/ProgressBar";
import SuccessModal from "@/components/SuccessModal";
import MotivationPopup from "@/components/MotivationPopup";
import ReferralPopup from "@/components/ReferralPopup";
import TelegramPopup from "@/components/TelegramPopup";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Gem, Wallet, BarChart, Mail, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useUserData();
  const [showSuccessModal, setShowSuccessModal] = useState(true);
  const [showMotivationPopup, setShowMotivationPopup] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [showTelegramPopup, setShowTelegramPopup] = useState(false);

  // Check localStorage for popup history
  useEffect(() => {
    const lastReferralPopup = localStorage.getItem('lastReferralPopup');
    const lastTelegramPopup = localStorage.getItem('lastTelegramPopup');
    
    // Show referral popup once daily
    if (!lastReferralPopup || Date.now() - parseInt(lastReferralPopup) > 24 * 60 * 60 * 1000) {
      const timer = setTimeout(() => {
        setShowReferralPopup(true);
        localStorage.setItem('lastReferralPopup', Date.now().toString());
      }, 120000); // Show after 2 minutes
      
      return () => clearTimeout(timer);
    }
    
    // Show telegram popup once daily
    if (!lastTelegramPopup || Date.now() - parseInt(lastTelegramPopup) > 24 * 60 * 60 * 1000) {
      const timer = setTimeout(() => {
        setShowTelegramPopup(true);
        localStorage.setItem('lastTelegramPopup', Date.now().toString());
      }, 300000); // Show after 5 minutes
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-flashcore-purple border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 bg-card rounded-xl border border-destructive max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Dashboard</h2>
          <p className="text-muted-foreground mb-4">Please try refreshing the page</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your account summary and recent activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Plan Module */}
        <DashboardModule 
          title="Current Plan" 
          icon="💎" 
          className="lg:col-span-1"
        >
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1 mb-2">
              <h4 className="text-2xl font-bold gradient-text">{data?.plan.name}</h4>
              <span className="text-muted-foreground">{data?.plan.amount}/mo</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Expires on {new Date(data?.plan.expires || "").toLocaleDateString()}
            </p>
            <Button variant="outline" className="w-full justify-between">
              <span>Upgrade Plan</span>
              <ExternalLink size={16} />
            </Button>
          </div>
        </DashboardModule>
        
        {/* Wallet Module */}
        <DashboardModule 
          title="Wallet" 
          icon="💰" 
          className="lg:col-span-1"
        >
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1 mb-2">
              <h4 className="text-2xl font-bold gradient-text">{data?.walletBalance}</h4>
              <span className="text-muted-foreground">Available</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Last transaction: May 5, 2025
            </p>
            <Button variant="outline" className="w-full justify-between">
              <span>Manage Wallet</span>
              <ExternalLink size={16} />
            </Button>
          </div>
        </DashboardModule>
        
        {/* Status Module */}
        <DashboardModule 
          title="Status" 
          icon="🏆" 
          className="lg:col-span-1"
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xl font-semibold">{data?.user.rank}</h4>
              <span className="text-sm text-muted-foreground">{data?.progress}%</span>
            </div>
            <ProgressBar progress={data?.progress || 0} />
            <p className="text-sm text-muted-foreground mt-2">
              {data?.mailsNeeded} more mails to reach {data?.nextLevel}
            </p>
            <div className="mt-3 py-2 px-3 bg-secondary rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm">Mails Sent</span>
                <span className="font-semibold">{data?.user.mailsSent}</span>
              </div>
            </div>
          </div>
        </DashboardModule>
      </div>
      
      {/* Stats and Referral Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Stats Module */}
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
                    dataKey="sent" 
                    stroke="#a16bf7" 
                    strokeWidth={2}
                    activeDot={{ r: 6, fill: '#4cd97b' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="bg-secondary rounded-lg p-2 text-center">
              <p className="text-xs text-muted-foreground mb-1">Total Mails</p>
              <p className="font-semibold">{data?.totalMails.toLocaleString()}</p>
            </div>
            <div className="bg-secondary rounded-lg p-2 text-center">
              <p className="text-xs text-muted-foreground mb-1">Current Rank</p>
              <p className="font-semibold">{data?.user.rank}</p>
            </div>
            <div className="bg-secondary rounded-lg p-2 text-center">
              <p className="text-xs text-muted-foreground mb-1">Progress</p>
              <p className="font-semibold">{data?.progress}%</p>
            </div>
          </div>
        </DashboardModule>
        
        {/* Referral Module */}
        <DashboardModule 
          title="Referrals" 
          icon="🔗" 
          className="lg:col-span-1"
        >
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-secondary rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-flashcore-purple">
                  {data?.user.referralCount || 0}
                </p>
                <p className="text-xs text-muted-foreground">Total Referrals</p>
              </div>
              <div className="bg-secondary rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-flashcore-green">
                  ${data?.user.referralEarnings || 0}
                </p>
                <p className="text-xs text-muted-foreground">Earnings</p>
              </div>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-flashcore-purple to-flashcore-green hover:opacity-90"
              onClick={() => setShowReferralPopup(true)}
            >
              Invite Friends
            </Button>
          </div>
        </DashboardModule>
      </div>
      
      {/* Modals */}
      {showSuccessModal && <SuccessModal />}
      <MotivationPopup isOpen={showMotivationPopup} onClose={() => setShowMotivationPopup(false)} />
      <ReferralPopup isOpen={showReferralPopup} onClose={() => setShowReferralPopup(false)} />
      <TelegramPopup isOpen={showTelegramPopup} onClose={() => setShowTelegramPopup(false)} />
    </div>
  );
};

export default Dashboard;
