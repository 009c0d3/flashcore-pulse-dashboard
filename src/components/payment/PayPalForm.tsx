
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const paypalSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  paymentProof: z.any().optional(),
});

interface PayPalFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const PayPalForm: React.FC<PayPalFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<z.infer<typeof paypalSchema>>({
    resolver: zodResolver(paypalSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PayPal Email</FormLabel>
              <FormControl>
                <Input placeholder="your-email@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PayPal Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your PayPal password" type="password" {...field} />
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
            1. Log in to your PayPal account using the credentials above<br/>
            2. Complete the payment transaction<br/>
            3. Upload proof of payment above<br/>
            4. Payment will be confirmed within 24 hours
          </p>
        </div>
        
        <Button type="submit" className="w-full bg-[#0070ba] hover:bg-[#005ea6]" disabled={isLoading}>
          {isLoading ? "Submitting Receipt..." : "Send Payment Receipt/Proof"}
        </Button>
      </form>
    </Form>
  );
};

export default PayPalForm;
