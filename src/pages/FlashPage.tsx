
import React, { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardModule from "@/components/DashboardModule";
import { Link } from "react-router-dom";
import { GenerateTransactionModal } from "@/components/flash/GenerateTransactionModal";
import { FlashBillingModal } from "@/components/flash/FlashBillingModal";
import { GenerateReceiptModal } from "@/components/flash/GenerateReceiptModal";

const flashFeatures = [
  {
    title: "Generate Transaction",
    desc: "Instantly send wallet transaction emails to your users with all the details, in a flash.",
    button: "Generate",
    icon: "⚡"
  },
  {
    title: "Flash Billing",
    desc: "Send billing emails instantly and manage all your invoices from one place.",
    button: "Flash Bill",
    icon: "💰"
  },
  {
    title: "Generate Receipts",
    desc: "Quickly create transaction receipts for any wallet transaction.",
    button: "Create Receipt",
    icon: "🧾"
  },
];

const FlashPage = () => {
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [isBillingModalOpen, setBillingModalOpen] = useState(false);
  const [isReceiptModalOpen, setReceiptModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <div className="flex-1">
        <main className="p-4 md:p-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              ⚡ Flash Tools
            </h1>
            <p className="text-muted-foreground">
              Quick access to your most powerful automation tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flashFeatures.map(({ title, desc, button, icon }) => (
              <DashboardModule 
                key={title}
                title={title} 
                icon={icon}
                className="lg:col-span-1"
              >
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {desc}
                  </p>
                  
                  {title === 'Generate Transaction' ? (
                     <Button 
                       onClick={() => setTransactionModalOpen(true)}
                       className="w-full bg-gradient-to-r from-flashcore-purple to-flashcore-green hover:opacity-90 transition-opacity font-medium"
                     >
                       {button}
                       <Zap className="ml-2 h-4 w-4" />
                     </Button>
                  ) : title === 'Flash Billing' ? (
                     <Button 
                       onClick={() => setBillingModalOpen(true)}
                       className="w-full bg-gradient-to-r from-flashcore-purple to-flashcore-green hover:opacity-90 transition-opacity font-medium"
                     >
                       {button}
                       <Zap className="ml-2 h-4 w-4" />
                     </Button>
                  ) : (
                    <Button 
                      onClick={() => setReceiptModalOpen(true)}
                      className="w-full bg-gradient-to-r from-flashcore-purple to-flashcore-green hover:opacity-90 transition-opacity font-medium"
                    >
                      {button}
                      <Zap className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </DashboardModule>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Need help getting started? Check out our{" "}
              <span className="text-flashcore-green hover:underline cursor-pointer">
                tutorial section
              </span>{" "}
              for step-by-step guides.
            </p>
          </div>
        </main>
      </div>
      <GenerateTransactionModal isOpen={isTransactionModalOpen} onOpenChange={setTransactionModalOpen} />
      <FlashBillingModal isOpen={isBillingModalOpen} onOpenChange={setBillingModalOpen} />
      <GenerateReceiptModal isOpen={isReceiptModalOpen} onOpenChange={setReceiptModalOpen} />
    </div>
  );
};

export default FlashPage;
