
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Upload } from "lucide-react";

const cryptoSchema = z.object({
  walletAddress: z.string().min(26, "Please enter a valid wallet address"),
  cryptoCurrency: z.string().min(1, "Please select a cryptocurrency"),
  paymentProof: z.any().optional(),
});

interface CryptoFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const CryptoForm: React.FC<CryptoFormProps> = ({ onSubmit, isLoading }) => {
  // Admin-specified wallet addresses for each cryptocurrency
  const adminWalletAddresses = {
    bitcoin: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    ethereum: "0x742d35Cc6634C0532925a3b8D3Ac92Cf2c3A5b5B",
    litecoin: "LdP8Qox1VAhCzLJNqrr74YovaWYyNBUWvL",
    dogecoin: "DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L",
  };

  const form = useForm<z.infer<typeof cryptoSchema>>({
    resolver: zodResolver(cryptoSchema),
    defaultValues: {
      walletAddress: adminWalletAddresses.bitcoin,
      cryptoCurrency: "bitcoin",
    },
  });

  const cryptoOptions = [
    { value: "bitcoin", label: "Bitcoin (BTC)", symbol: "₿" },
    { value: "ethereum", label: "Ethereum (ETH)", symbol: "Ξ" },
    { value: "litecoin", label: "Litecoin (LTC)", symbol: "Ł" },
    { value: "dogecoin", label: "Dogecoin (DOGE)", symbol: "Ð" },
  ];

  const handleCryptoChange = (cryptoValue: string) => {
    form.setValue("cryptoCurrency", cryptoValue);
    form.setValue("walletAddress", adminWalletAddresses[cryptoValue as keyof typeof adminWalletAddresses]);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(form.getValues("walletAddress"));
      // You could add a toast notification here if needed
      console.log("Wallet address copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

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
                onClick={() => handleCryptoChange(crypto.value)}
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
              <FormLabel>Admin Wallet Address</FormLabel>
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
                    onClick={copyToClipboard}
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
            1. Send the exact amount to the generated address<br/>
            2. Include the payment reference in the transaction<br/>
            3. Upload proof of payment above<br/>
            4. Payment will be confirmed within 3-6 confirmations
          </p>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting Receipt..." : "Send Payment Receipt/Proof"}
        </Button>
      </form>
    </Form>
  );
};

export default CryptoForm;
