
import React from "react";
import Modal from "./Modal";
import { MessageCircle, ExternalLink } from "lucide-react";

interface TelegramPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TelegramPopup: React.FC<TelegramPopupProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join Our Community">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
          <MessageCircle size={24} className="text-blue-500" />
        </div>
        
        <h3 className="text-xl font-semibold mb-1">Join Our Telegram Channel</h3>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Get exclusive tips, updates, and connect with other FLASHCORE users
        </p>
        
        <a 
          href="https://t.me/flashcore"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <ExternalLink size={18} />
          Join Telegram Channel
        </a>
        
        <button 
          onClick={onClose}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Maybe later
        </button>
      </div>
    </Modal>
  );
};

export default TelegramPopup;
