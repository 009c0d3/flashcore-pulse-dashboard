
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  message?: string;
  duration?: number;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  message = "Login successful!", 
  duration = 8000
}) => {
  const [isOpen, setIsOpen] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);
  
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex flex-col items-center py-4">
        <CheckCircle size={64} className="text-flashcore-green mb-4" />
        <h2 className="text-xl font-semibold mb-2">{message}</h2>
        <p className="text-sm text-muted-foreground">
          Welcome back to your FLASHCORE dashboard
        </p>
      </div>
    </Modal>
  );
};

export default SuccessModal;
