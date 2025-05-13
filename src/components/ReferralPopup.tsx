
import React, { useState } from "react";
import Modal from "./Modal";
import { Gift, Copy, Check, ExternalLink } from "lucide-react";
import { useUserData } from "@/hooks/useUserData";
import { useToast } from "@/hooks/use-toast";

interface ReferralPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferralPopup: React.FC<ReferralPopupProps> = ({ isOpen, onClose }) => {
  const { data } = useUserData();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const referralLink = data?.user.referralLink || "https://flashcore.app/ref/user";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Link copied",
      description: "Referral link copied to clipboard",
      duration: 3000,
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Refer & Earn">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-flashcore-purple/20 flex items-center justify-center mb-4">
          <Gift size={24} className="text-flashcore-purple" />
        </div>
        
        <h3 className="text-xl font-semibold mb-1">Invite Friends, Earn Rewards</h3>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Share your unique link and earn $20 for each friend who signs up
        </p>
        
        <div className="relative w-full mb-6">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="w-full px-3 py-2 bg-secondary rounded-lg pr-10 focus:outline-none focus:ring-1 focus:ring-flashcore-purple"
          />
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-md transition-colors"
            aria-label="Copy referral link"
          >
            {copied ? <Check size={18} className="text-flashcore-green" /> : <Copy size={18} />}
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          <div className="bg-secondary rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-flashcore-purple">{data?.user.referralCount || 0}</p>
            <p className="text-xs text-muted-foreground">Friends Invited</p>
          </div>
          <div className="bg-secondary rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-flashcore-green">${data?.user.referralEarnings || 0}</p>
            <p className="text-xs text-muted-foreground">Total Earned</p>
          </div>
        </div>
        
        <button 
          className="w-full py-3 bg-gradient-to-r from-flashcore-purple to-flashcore-green rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          onClick={onClose}
        >
          <ExternalLink size={18} />
          Start Earning Now
        </button>
      </div>
    </Modal>
  );
};

export default ReferralPopup;
