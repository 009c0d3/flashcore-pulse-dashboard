
import React, { useState, useEffect } from "react";
import { useRealDashboardData } from "@/hooks/useRealDashboardData";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import { useDashboardLogger } from "@/hooks/useDashboardLogger";
import { useAuth } from "@/hooks/useAuth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PlanModule from "@/components/dashboard/PlanModule";
import WalletModule from "@/components/dashboard/WalletModule";
import StatusModule from "@/components/dashboard/StatusModule";
import MailActivityModule from "@/components/dashboard/MailActivityModule";
import ReferralModule from "@/components/dashboard/ReferralModule";
import EmailComposer from "@/components/EmailComposer";
import LicenseProtectedWrapper from "@/components/LicenseProtectedWrapper";
import SuccessModal from "@/components/SuccessModal";
import MotivationPopup from "@/components/MotivationPopup";
import ReferralPopup from "@/components/ReferralPopup";
import TelegramPopup from "@/components/TelegramPopup";

const Dashboard: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { data, isLoading, error } = useRealDashboardData();
  const { isActivated, loading: subscriptionLoading } = useSubscriptionStatus();
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

  // Check localStorage for popup history (only for activated users)
  useEffect(() => {
    if (!isActivated) return;
    
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
  }, [isActivated]);

  const handleOpenEmailComposer = () => {
    if (isActivated) {
      setShowEmailComposer(true);
      logActivity('email_composer_opened');
    }
  };

  // Show loading while auth is loading or while data is being fetched
  if (authLoading || isLoading || subscriptionLoading) {
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

      {!isActivated && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg mb-6">
          <p className="text-destructive font-medium">
            Your license is not activated. Most features are restricted. 
            <a href="/activation" className="underline ml-1">Activate your license here</a>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <LicenseProtectedWrapper feature="Plan Management">
          <PlanModule plan={data.plan} isActivated={isActivated} />
        </LicenseProtectedWrapper>
        
        <LicenseProtectedWrapper feature="Wallet">
          <WalletModule walletBalance={data.walletBalance} isActivated={isActivated} />
        </LicenseProtectedWrapper>
        
        <LicenseProtectedWrapper feature="Status Tracking">
          <StatusModule 
            user={data.user} 
            progress={data.progress} 
            mailsNeeded={data.mailsNeeded} 
            nextLevel={data.nextLevel}
            isActivated={isActivated}
          />
        </LicenseProtectedWrapper>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <LicenseProtectedWrapper feature="Mail Activity Analytics">
          <MailActivityModule 
            mailActivity={data.mailActivity || []} 
            totalMails={data.totalMails || 0}
            userRank={data.user?.rank || ''}
            progress={data.progress || 0}
            isActivated={isActivated}
          />
        </LicenseProtectedWrapper>
        
        <LicenseProtectedWrapper feature="Referral System">
          <ReferralModule 
            user={data.user} 
            onInviteFriends={() => isActivated && setShowReferralPopup(true)}
            isActivated={isActivated}
          />
        </LicenseProtectedWrapper>
      </div>

      {/* Floating Email Button */}
      <LicenseProtectedWrapper feature="Email Sending">
        <button
          onClick={handleOpenEmailComposer}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-flashcore-purple to-flashcore-green text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          disabled={!isActivated}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
      </LicenseProtectedWrapper>
      
      {/* Modals */}
      {showSuccessModal && <SuccessModal />}
      <MotivationPopup isOpen={showMotivationPopup} onClose={() => setShowMotivationPopup(false)} />
      {isActivated && <ReferralPopup isOpen={showReferralPopup} onClose={() => setShowReferralPopup(false)} />}
      {isActivated && <TelegramPopup isOpen={showTelegramPopup} onClose={() => setShowTelegramPopup(false)} />}
      <EmailComposer isOpen={showEmailComposer} onClose={() => setShowEmailComposer(false)} />
    </div>
  );
};

export default Dashboard;
