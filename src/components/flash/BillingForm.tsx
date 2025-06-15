
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const formSchema = z.object({
  recipientEmail: z.string().email({ message: "Invalid email address." }),
  clientName: z.string().min(1, { message: "Client name is required." }),
  invoiceNumber: z.string().min(1, { message: "Invoice number is required." }),
  serviceDescription: z.string().min(1, { message: "Description is required." }),
  amount: z.coerce.number().positive({ message: "Amount must be positive." }),
  currency: z.string().min(1, { message: "Currency is required." }),
  dueDate: z.string().min(1, { message: "Due date is required." }),
});

type BillingFormValues = z.infer<typeof formSchema>;

const Stepper = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { id: 1, name: "Recipient" },
    { id: 2, name: "Invoice Details" },
  ];

  return (
    <div className="flex items-center w-full mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-colors ${
                currentStep >= step.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step.id}
            </div>
            <p className={`mt-2 text-sm font-medium ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}`}>{step.name}</p>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-1 mx-4 rounded ${currentStep > step.id ? 'bg-primary' : 'bg-border'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const BillingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const form = useForm<BillingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientEmail: "",
      clientName: "",
      invoiceNumber: "",
      serviceDescription: "",
      amount: undefined,
      currency: "USD",
      dueDate: "",
    },
    mode: 'onChange',
  });

  const { formState: { isSubmitting } } = form;

  const prefillForm = () => {
    form.reset({
      recipientEmail: "client@example.com",
      clientName: "Acme Corp",
      invoiceNumber: `INV-${new Date().getFullYear()}-001`,
      serviceDescription: "Web Development Services",
      amount: 2500,
      currency: "USD",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
    });
    toast.info("Form has been prefilled with example data.");
  };

  async function onSubmit(data: BillingFormValues) {
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 5000));
    toast.success("Billing email has been sent successfully!");
    form.reset();
    setCurrentStep(1);
  }

  const handleNext = async () => {
    let fields: (keyof BillingFormValues)[] = [];
    if (currentStep === 1) {
      fields = ["recipientEmail", "clientName", "invoiceNumber"];
    }
    const isValid = await form.trigger(fields);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
        <Loader className="w-16 h-16 animate-spin text-primary" />
        <div>
          <p className="text-xl font-medium text-foreground">Sending Invoice</p>
          <p className="text-muted-foreground">Please wait, this may take a moment...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Stepper currentStep={currentStep} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {currentStep === 1 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="recipientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Email</FormLabel>
                    <FormControl>
                      <Input placeholder="client@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Corp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input placeholder="INV-2025-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="serviceDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the service or product..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <Input placeholder="USD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          
          <div className="flex justify-between items-center pt-4">
            <div>
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={prefillForm}>
                Prefill Example
              </Button>

              {currentStep < totalSteps ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit">Send Invoice</Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
