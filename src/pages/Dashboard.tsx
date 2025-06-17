
import React, { useState, useEffect } from "react";
import { useRealDashboardData } from "@/hooks/useRealDashboardData";
import { useDashboardLogger } from "@/hooks/useDashboardLogger";
import { useAuth } from "@/hooks/useAuth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PlanModule from "@/components/dashboard/PlanModule";
import WalletModule from "@/components/dashboard/WalletModule";
import StatusModule from "@/components/dashboard/StatusModule";
import MailActivityModule from "@/components/dashboard/MailActivityModule";
import ReferralModule from "@/components/dashboard/ReferralModule";
import EmailComposer from "@/components/EmailComposer";
import SuccessModal from "@/components/SuccessModal";
import MotivationPopup from "@/components/MotivationPopup";
import ReferralPopup from "@/components/ReferralPopup";
import TelegramPopup from "@/components/TelegramPopup";

const Dashboard: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { data, isLoading, error } = useRealDashboardData();
  const { logActivity } = useDashboardLogger();
  const [showEmailComposer, setShowEmailComposer] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(true);
  const [showMotivationPopup, setShowMotivationPopup] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [showTelegramPopup, setShowTelegramPopup] = useState(false);

  // Log dashboard access
  useEffect(() => {
    if (user) {
      logActivity('dashboard_accessed');
    }
  }, [user, logActivity]);

  // Check localStorage for popup history
  useEffect(() => {
    const lastReferralPopup = localStorage.getItem('lastReferralPopup');
    const lastTelegramPopup = localStorage.getItem('lastTelegramPopup');
    
    // Show referral popup once daily
    if (!lastReferralPopup || Date.now() - parseInt(lastReferralPopup) > 24 * 60 * 60 * 1000) {
      const timer = setTimeout(() => {
        setShowReferralPopup(true);
        localStorage.setItem('lastReferralPopup', Date.now().toString());
      }, 120000);
      
      return () => clearTimeout(timer);
    }
    
    // Show telegram popup once daily
    if (!lastTelegramPopup || Date.now() - parseInt(lastTelegramPopup) > 24 * 60 * 60 * 1000) {
      const timer = setTimeout(() => {
        setShowTelegramPopup(true);
        localStorage.setItem('lastTelegramPopup', Date.now().toString());
      }, 300000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenEmailComposer = () => {
    setShowEmailComposer(true);
    logActivity('email_composer_opened');
  };

  // Show loading while auth is loading or while data is being fetched
  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-flashcore-purple border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    console.error('Dashboard error:', error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="p-6 bg-card rounded-xl border border-destructive max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Dashboard</h2>
          <p className="text-muted-foreground mb-4">
            {error.message || 'Please try refreshing the page'}
          </p>
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

  // If no data but no error, show empty state
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="p-6 bg-card rounded-xl border max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Setting up your dashboard...</h2>
          <p className="text-muted-foreground">Please wait while we initialize your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-background min-h-screen">
      <DashboardHeader />

      <div className="container mx-auto px-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <PlanModule plan={data.plan} isActivated={true} />
          <WalletModule walletBalance={data.walletBalance} isActivated={true} />
          <StatusModule 
            user={data.user} 
            progress={data.progress} 
            mailsNeeded={data.mailsNeeded} 
            nextLevel={data.nextLevel}
            isActivated={true}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <MailActivityModule 
            mailActivity={data.mailActivity || []} 
            totalMails={data.totalMails || 0}
            userRank={data.user?.rank || ''}
            progress={data.progress || 0}
            isActivated={true}
          />
          
          <ReferralModule 
            user={data.user} 
            onInviteFriends={() => setShowReferralPopup(true)}
            isActivated={true}
          />
        </div>

        {/* Floating Email Button */}
        <button
          onClick={handleOpenEmailComposer}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-flashcore-purple to-flashcore-green text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      
      {/* Modals */}
      {showSuccessModal && <SuccessModal />}
      <MotivationPopup isOpen={showMotivationPopup} onClose={() => setShowMotivationPopup(false)} />
      <ReferralPopup isOpen={showReferralPopup} onClose={() => setShowReferralPopup(false)} />
      <TelegramPopup isOpen={showTelegramPopup} onClose={() => setShowTelegramPopup(false)} />
      <EmailComposer isOpen={showEmailComposer} onClose={() => setShowEmailComposer(false)} />
    </div>
  );
};

export default Dashboard;
