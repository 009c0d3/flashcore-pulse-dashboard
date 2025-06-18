
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { BillingForm } from "./BillingForm";

interface FlashBillingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FlashBillingModal: React.FC<FlashBillingModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle>Generate Billing Email</DialogTitle>
          <DialogDescription>
            Fill in the details below to send a billing email.
          </DialogDescription>
        </DialogHeader>
        <div>
          <BillingForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlashBillingModal;
