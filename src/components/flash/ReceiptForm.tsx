
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const formSchema = z.object({
  recipientEmail: z.string().email({ message: "Invalid email address." }),
  transactionId: z.string().min(1, { message: "Transaction ID is required." }),
});

type ReceiptFormValues = z.infer<typeof formSchema>;

export const ReceiptForm = () => {
  const form = useForm<ReceiptFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientEmail: "",
      transactionId: "",
    },
    mode: 'onChange',
  });

  const { formState: { isSubmitting } } = form;

  const prefillForm = () => {
    form.reset({
      recipientEmail: "customer@example.com",
      transactionId: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
    });
    toast.info("Form has been prefilled with example data.");
  };

  async function onSubmit(data: ReceiptFormValues) {
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 5000));
    toast.success("Receipt has been sent successfully!");
    form.reset();
  }
  
  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[250px] gap-4 text-center">
        <Loader className="w-16 h-16 animate-spin text-primary" />
        <div>
          <p className="text-xl font-medium text-foreground">Generating Receipt</p>
          <p className="text-muted-foreground">Please wait, this may take a moment...</p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="recipientEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Email</FormLabel>
              <FormControl>
                <Input placeholder="customer@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transactionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction ID</FormLabel>
              <FormControl>
                <Input placeholder="Transaction hash" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end items-center pt-4 gap-2">
            <Button type="button" variant="outline" onClick={prefillForm}>
              Prefill Example
            </Button>
            <Button type="submit">Send Receipt</Button>
        </div>
      </form>
    </Form>
  );
};
