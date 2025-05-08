
import React, { useState, useEffect } from "react";
import { useUserData } from "@/hooks/useUserData";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import DashboardError from "@/components/dashboard/DashboardError";
import PlanModule from "@/components/dashboard/PlanModule";
import WalletModule from "@/components/dashboard/WalletModule";
import StatusModule from "@/components/dashboard/StatusModule";
import ActivityModule from "@/components/dashboard/ActivityModule";
import ReferralModule from "@/components/dashboard/ReferralModule";

import SuccessModal from "@/components/SuccessModal";
import MotivationPopup from "@/components/MotivationPopup";
import ReferralPopup from "@/components/ReferralPopup";
import TelegramPopup from "@/components/TelegramPopup";

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useUserData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (error) {
    return <DashboardError />;
  }

  return (
    <DashboardLayout 
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
      openMotivationPopup={() => setShowMotivationPopup(true)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <PlanModule data={data} />
        <WalletModule data={data} />
        <StatusModule data={data} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ActivityModule data={data} />
        <ReferralModule data={data} openReferralPopup={() => setShowReferralPopup(true)} />
      </div>
      
      {/* Modals */}
      {showSuccessModal && <SuccessModal />}
      <MotivationPopup isOpen={showMotivationPopup} onClose={() => setShowMotivationPopup(false)} />
      <ReferralPopup isOpen={showReferralPopup} onClose={() => setShowReferralPopup(false)} />
      <TelegramPopup isOpen={showTelegramPopup} onClose={() => setShowTelegramPopup(false)} />
    </DashboardLayout>
  );
};

export default Dashboard;
