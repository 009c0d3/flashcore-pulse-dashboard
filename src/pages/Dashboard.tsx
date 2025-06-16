
import React, { useState, useEffect } from "react";
import { useUserData } from "@/hooks/useUserData";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PlanModule from "@/components/dashboard/PlanModule";
import WalletModule from "@/components/dashboard/WalletModule";
import StatusModule from "@/components/dashboard/StatusModule";
import MailActivityModule from "@/components/dashboard/MailActivityModule";
import ReferralModule from "@/components/dashboard/ReferralModule";
import SuccessModal from "@/components/SuccessModal";
import MotivationPopup from "@/components/MotivationPopup";
import ReferralPopup from "@/components/ReferralPopup";
import TelegramPopup from "@/components/TelegramPopup";

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useUserData();
  const { isActivated, loading: subscriptionLoading } = useSubscriptionStatus();
  const [showSuccessModal, setShowSuccessModal] = useState(true);
  const [showMotivationPopup, setShowMotivationPopup] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [showTelegramPopup, setShowTelegramPopup] = useState(false);

  // Check localStorage for popup history
  useEffect(() => {
    if (!isActivated) return; // Don't show popups for non-activated users
    
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
  }, [isActivated]);

  if (isLoading || subscriptionLoading) {
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
      <DashboardHeader />

      {!isActivated && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg mb-6">
          <p className="text-destructive font-medium">
            Your license is not activated. Some features may be limited. 
            <a href="/activation" className="underline ml-1">Activate your license here</a>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <PlanModule plan={data?.plan} isActivated={isActivated} />
        <WalletModule walletBalance={data?.walletBalance} isActivated={isActivated} />
        <StatusModule 
          user={data?.user} 
          progress={data?.progress} 
          mailsNeeded={data?.mailsNeeded} 
          nextLevel={data?.nextLevel}
          isActivated={isActivated}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <MailActivityModule 
          mailActivity={data?.mailActivity || []} 
          totalMails={data?.totalMails || 0}
          userRank={data?.user?.rank || ''}
          progress={data?.progress || 0}
          isActivated={isActivated}
        />
        <ReferralModule 
          user={data?.user} 
          onInviteFriends={() => setShowReferralPopup(true)}
          isActivated={isActivated}
        />
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
