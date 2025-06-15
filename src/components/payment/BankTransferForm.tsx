
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const bankTransferSchema = z.object({
  accountNumber: z.string().min(8, "Account number must be at least 8 digits"),
  routingNumber: z.string().min(9, "Routing number must be 9 digits").max(9, "Routing number must be 9 digits"),
  accountHolderName: z.string().min(2, "Account holder name is required"),
  bankName: z.string().min(2, "Bank name is required"),
  paymentProof: z.any().optional(),
});

interface BankTransferFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const BankTransferForm: React.FC<BankTransferFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<z.infer<typeof bankTransferSchema>>({
    resolver: zodResolver(bankTransferSchema),
    defaultValues: {
      accountNumber: "",
      routingNumber: "",
      accountHolderName: "",
      bankName: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="Chase Bank" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="accountHolderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Holder Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input placeholder="12345678901234" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="routingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Routing Number</FormLabel>
              <FormControl>
                <Input placeholder="123456789" {...field} maxLength={9} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentProof"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Upload Payment Proof</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    {...field}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => onChange(e.target.files?.[0])}
                    className="file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80"
                  />
                  <Upload size={16} className="text-muted-foreground" />
                </div>
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Upload screenshot or receipt of your payment (JPG, PNG, PDF)
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="bg-secondary/20 p-3 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Payment Instructions:</h4>
          <p className="text-xs text-muted-foreground">
            1. Use the bank details above to initiate the transfer<br/>
            2. Include the payment reference in the transfer description<br/>
            3. Upload proof of payment above<br/>
            4. Payment will be confirmed within 1-3 business days
          </p>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting Receipt..." : "Send Payment Receipt/Proof"}
        </Button>
      </form>
    </Form>
  );
};

export default BankTransferForm;
