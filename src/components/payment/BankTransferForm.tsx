import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Upload } from "lucide-react";

const bankTransferSchema = z.object({
  accountNumber: z.string(),
  routingNumber: z.string(),
  accountHolderName: z.string(),
  bankName: z.string(),
  paymentProof: z.any().optional(),
});

interface BankTransferFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const BankTransferForm: React.FC<BankTransferFormProps> = ({ onSubmit, isLoading }) => {
  // Admin-specified bank details
  const adminBankDetails = {
    bankName: "FlashCore Bank",
    accountHolderName: "FlashCore Admin",
    accountNumber: "1234567890123456",
    routingNumber: "123456789",
  };

  const form = useForm<z.infer<typeof bankTransferSchema>>({
    resolver: zodResolver(bankTransferSchema),
    defaultValues: {
      accountNumber: adminBankDetails.accountNumber,
      routingNumber: adminBankDetails.routingNumber,
      accountHolderName: adminBankDetails.accountHolderName,
      bankName: adminBankDetails.bankName,
    },
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied to clipboard:", text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

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
                <div className="flex gap-2">
                  <Input
                    {...field}
                    readOnly
                    className="font-mono text-sm bg-secondary/20"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(field.value)}
                    className="shrink-0"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
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
                <div className="flex gap-2">
                  <Input
                    {...field}
                    readOnly
                    className="font-mono text-sm bg-secondary/20"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(field.value)}
                    className="shrink-0"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
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
                <div className="flex gap-2">
                  <Input
                    {...field}
                    readOnly
                    className="font-mono text-sm bg-secondary/20"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(field.value)}
                    className="shrink-0"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
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
                <div className="flex gap-2">
                  <Input
                    {...field}
                    readOnly
                    className="font-mono text-sm bg-secondary/20"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(field.value)}
                    className="shrink-0"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
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
