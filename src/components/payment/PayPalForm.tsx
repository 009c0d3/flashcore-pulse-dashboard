
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const paypalSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
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
        
        <Button type="submit" className="w-full bg-[#0070ba] hover:bg-[#005ea6]" disabled={isLoading}>
          {isLoading ? "Connecting..." : "Pay with PayPal"}
        </Button>
      </form>
    </Form>
  );
};

export default PayPalForm;
