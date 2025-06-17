
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Lock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface LicenseRestrictionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

const LicenseRestrictionPopup: React.FC<LicenseRestrictionPopupProps> = ({
  isOpen,
  onClose,
  feature
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Shield className="w-16 h-16 text-destructive" />
              <Lock className="w-6 h-6 text-destructive absolute -bottom-1 -right-1 bg-background rounded-full p-1" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl font-bold text-destructive">
            License Activation Required
          </DialogTitle>
          <DialogDescription className="text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
              <span>Access to <strong>{feature}</strong> is restricted</span>
            </div>
            You need an active license to access this feature. Please activate your license to continue.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          <Button asChild className="w-full bg-gradient-to-r from-flashcore-purple to-flashcore-green">
            <Link to="/activation">
              Activate License Now
            </Link>
          </Button>
          
          <Button variant="outline" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LicenseRestrictionPopup;
