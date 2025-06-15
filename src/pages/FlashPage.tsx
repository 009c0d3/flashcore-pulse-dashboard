
import React from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const flashFeatures = [
  {
    title: "Generate Transaction",
    desc: "Instantly send wallet transaction emails to your users with all the details, in a flash.",
    button: "Generate",
    borderColor: "border-flashcore-green",
    iconBg: "bg-flashcore-green/20",
    buttonGradient: "from-flashcore-green to-emerald-500"
  },
  {
    title: "Flash Billing",
    desc: "Send billing emails instantly and manage all your invoices from one place.",
    button: "Flash Bill",
    borderColor: "border-flashcore-orange",
    iconBg: "bg-flashcore-orange/20",
    buttonGradient: "from-flashcore-orange to-orange-500"
  },
  {
    title: "Generate Receipts",
    desc: "Quickly create transaction receipts for any wallet transaction.",
    button: "Create Receipt",
    borderColor: "border-flashcore-purple",
    iconBg: "bg-flashcore-purple/20",
    buttonGradient: "from-flashcore-purple to-purple-500"
  },
];

const FlashPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            ⚡ Flash Tools
          </h1>
          <p className="text-muted-foreground">
            Quick access to your most powerful automation tools
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {flashFeatures.map(({ title, desc, button, borderColor, iconBg, buttonGradient }, i) => (
            <Card
              key={title}
              className={`bg-card/50 backdrop-blur-sm border-2 ${borderColor} hover:bg-card/70 transition-all duration-300 hover:scale-[1.02]`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className={`${iconBg} rounded-xl p-4 flex-shrink-0`}>
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <CardTitle className="text-xl font-semibold text-white mb-2">
                        {title}
                      </CardTitle>
                      <p className="text-muted-foreground leading-relaxed">
                        {desc}
                      </p>
                    </div>
                    
                    <Button
                      className={`bg-gradient-to-r ${buttonGradient} hover:opacity-90 transition-opacity font-medium px-6 py-2 text-white border-0`}
                    >
                      {button}
                      <Zap className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
      </div>
    </div>
  );
};

export default FlashPage;
