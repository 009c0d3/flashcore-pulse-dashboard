
import React, { useState } from "react";
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
import { cn } from "@/lib/utils";

const formSchema = z.object({
  recipientEmail: z.string().email({ message: "Invalid email address." }),
  transactionId: z.string().min(1, { message: "Transaction ID is required." }),
});

type ReceiptFormValues = z.infer<typeof formSchema>;

const steps = [
  { name: 'Recipient', fields: ['recipientEmail'] },
  { name: 'Transaction', fields: ['transactionId'] },
];

export const ReceiptForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
    setCurrentStep(0);
  }

  type FieldName = keyof ReceiptFormValues;

  const handleNext = async () => {
    const fields = steps[currentStep].fields as FieldName[];
    const output = await form.trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };
  
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
    <div className="pt-4">
      <div className="mb-8">
        <ol className="flex items-center w-full">
          {steps.map((step, index) => (
            <li
              key={step.name}
              className={cn(
                "flex w-full items-center",
                index !== steps.length - 1 && "after:content-[''] after:w-full after:h-1 after:border-b after:border-border after:border-4 after:inline-block",
                index <= currentStep && "after:border-primary"
              )}
            >
              <span className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0",
                index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                <p>{index + 1}</p>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          {currentStep === 0 && (
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
          )}
          {currentStep === 1 && (
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
          )}
          
          <div className="flex justify-between items-center pt-4 gap-2">
            <div>
              <Button type="button" variant="outline" onClick={prefillForm}>
                Prefill Example
              </Button>
            </div>
            <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button type="button" variant="ghost" onClick={handlePrev}>
                    Previous
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    Send Receipt
                  </Button>
                )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
