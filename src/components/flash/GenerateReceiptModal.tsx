
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ReceiptForm } from "./ReceiptForm";

interface GenerateReceiptModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const GenerateReceiptModal: React.FC<GenerateReceiptModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle>Generate Receipt</DialogTitle>
          <DialogDescription>
            Fill in the details below to generate and send a receipt.
          </DialogDescription>
        </DialogHeader>
        <div>
          <ReceiptForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
