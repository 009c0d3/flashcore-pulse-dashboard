import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Upload } from "lucide-react";

const creditCardSchema = z.object({
  cardNumber: z.string(),
  expiryDate: z.string(),
  cvv: z.string(),
  cardholderName: z.string(),
  paymentProof: z.any().optional(),
});

interface CreditCardFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ onSubmit, isLoading }) => {
  // Admin-specified credit card details
  const adminCardDetails = {
    cardNumber: "4532 1234 5678 9012",
    expiryDate: "12/28",
    cvv: "123",
    cardholderName: "FlashCore Admin",
  };

  const form = useForm<z.infer<typeof creditCardSchema>>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardNumber: adminCardDetails.cardNumber,
      expiryDate: adminCardDetails.expiryDate,
      cvv: adminCardDetails.cvv,
      cardholderName: adminCardDetails.cardholderName,
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
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
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
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
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
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
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
        </div>
        
        <FormField
          control={form.control}
          name="cardholderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cardholder Name</FormLabel>
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
            1. Complete your card payment through the secure payment gateway<br/>
            2. Save the payment confirmation or receipt<br/>
            3. Upload proof of payment above<br/>
            4. Payment will be processed immediately upon verification
          </p>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting Receipt..." : "Send Payment Receipt/Proof"}
        </Button>
      </form>
    </Form>
  );
};

export default CreditCardForm;
