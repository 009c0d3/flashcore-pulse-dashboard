
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
  onOpenChange: (isOpen: boolean) => void;
}

export const FlashBillingModal: React.FC<FlashBillingModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
