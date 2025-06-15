
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const cryptoSchema = z.object({
  walletAddress: z.string().min(26, "Please enter a valid wallet address"),
  cryptoCurrency: z.string().min(1, "Please select a cryptocurrency"),
});

interface CryptoFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const CryptoForm: React.FC<CryptoFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<z.infer<typeof cryptoSchema>>({
    resolver: zodResolver(cryptoSchema),
    defaultValues: {
      walletAddress: "",
      cryptoCurrency: "bitcoin",
    },
  });

  const cryptoOptions = [
    { value: "bitcoin", label: "Bitcoin (BTC)", symbol: "₿" },
    { value: "ethereum", label: "Ethereum (ETH)", symbol: "Ξ" },
    { value: "litecoin", label: "Litecoin (LTC)", symbol: "Ł" },
    { value: "dogecoin", label: "Dogecoin (DOGE)", symbol: "Ð" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <FormLabel>Select Cryptocurrency</FormLabel>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {cryptoOptions.map((crypto) => (
              <Badge
                key={crypto.value}
                variant={form.watch("cryptoCurrency") === crypto.value ? "default" : "outline"}
                className="cursor-pointer p-2 justify-center"
                onClick={() => form.setValue("cryptoCurrency", crypto.value)}
              >
                {crypto.symbol} {crypto.label}
              </Badge>
            ))}
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="walletAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your wallet address" 
                  {...field}
                  className="font-mono text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="bg-secondary/20 p-3 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">Payment Instructions:</h4>
          <p className="text-xs text-muted-foreground">
            1. Send the exact amount to the generated address<br/>
            2. Include the payment reference in the transaction<br/>
            3. Payment will be confirmed within 3-6 confirmations
          </p>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Generating Address..." : "Generate Payment Address"}
        </Button>
      </form>
    </Form>
  );
};

export default CryptoForm;
