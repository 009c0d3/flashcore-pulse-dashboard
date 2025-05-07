
import React, { useEffect } from "react";
import Modal from "./Modal";
import { useMotivationQuote } from "@/hooks/useMotivationQuote";
import { Lightbulb, RefreshCw } from "lucide-react";

interface MotivationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const MotivationPopup: React.FC<MotivationPopupProps> = ({ isOpen, onClose }) => {
  const { quote, isLoading, refreshQuote } = useMotivationQuote();
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Daily Motivation">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-flashcore-orange/20 flex items-center justify-center mb-4">
          <Lightbulb size={24} className="text-flashcore-orange" />
        </div>
        
        <div className="text-center mb-6">
          {isLoading ? (
            <p className="text-muted-foreground">Loading your motivation...</p>
          ) : (
            <p className="text-lg">{quote}</p>
          )}
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <button 
            onClick={refreshQuote}
            className="flex items-center gap-1 px-3 py-1 text-sm rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <RefreshCw size={14} />
            New Quote
          </button>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border w-full text-center">
          <span className="text-xs px-2 py-1 rounded bg-flashcore-purple/20 text-flashcore-purple">
            FLASHCORE AI
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default MotivationPopup;
