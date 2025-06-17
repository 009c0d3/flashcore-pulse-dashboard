
import React, { useState } from "react";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import LicenseRestrictionPopup from "./LicenseRestrictionPopup";
import { useDashboardLogger } from "@/hooks/useDashboardLogger";

interface LicenseProtectedWrapperProps {
  children: React.ReactNode;
  feature: string;
  fallback?: React.ReactNode;
}

const LicenseProtectedWrapper: React.FC<LicenseProtectedWrapperProps> = ({
  children,
  feature,
  fallback
}) => {
  const { isActivated } = useSubscriptionStatus();
  const [showRestriction, setShowRestriction] = useState(false);
  const { logActivity } = useDashboardLogger();

  const handleClick = (e: React.MouseEvent) => {
    if (!isActivated) {
      e.preventDefault();
      e.stopPropagation();
      setShowRestriction(true);
      logActivity('license_restriction_triggered', { feature });
    }
  };

  if (!isActivated && fallback) {
    return (
      <>
        {fallback}
        <LicenseRestrictionPopup
          isOpen={showRestriction}
          onClose={() => setShowRestriction(false)}
          feature={feature}
        />
      </>
    );
  }

  return (
    <div onClick={handleClick} className={!isActivated ? 'cursor-not-allowed' : ''}>
      {isActivated ? children : (
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
      )}
      <LicenseRestrictionPopup
        isOpen={showRestriction}
        onClose={() => setShowRestriction(false)}
        feature={feature}
      />
    </div>
  );
};

export default LicenseProtectedWrapper;
