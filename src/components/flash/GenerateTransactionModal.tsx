
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TransactionForm } from "./TransactionForm";

interface GenerateTransactionModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const GenerateTransactionModal: React.FC<GenerateTransactionModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle>Generate Transaction Email</DialogTitle>
          <DialogDescription>
            Fill in the details below to send a transaction email.
          </DialogDescription>
        </DialogHeader>
        <div>
          <TransactionForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
