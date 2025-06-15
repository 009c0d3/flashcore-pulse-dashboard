
import React from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const flashFeatures = [
  {
    title: "Generate Transaction",
    desc: "Instantly send wallet transaction emails to your users with all the details, in a flash.",
    button: "Generate",
  },
  {
    title: "Flash Billing",
    desc: "Send billing emails instantly and manage all your invoices from one place.",
    button: "Flash Bill",
  },
  {
    title: "Generate Receipts",
    desc: "Quickly create transaction receipts for any wallet transaction.",
    button: "Create Receipt",
  },
];

const FlashPage = () => {
  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-10">
        Flash Tools
      </h1>
      <div className="grid gap-8">
        {flashFeatures.map(({ title, desc, button }, i) => (
          <Card
            key={title}
            className="overflow-hidden relative group transition-shadow duration-200 hover:shadow-xl"
          >
            <CardContent className="flex items-center gap-4 py-8 px-6 md:py-10 md:px-10">
              <div className="flex-shrink-0">
                <div className="bg-flashcore-green/70 rounded-full p-3 shadow-lg">
                  <Zap size={48} className="text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">{title}</h2>
                <p className="text-muted-foreground mb-5">{desc}</p>
                <Button
                  variant="default"
                  className="mt-1 bg-flashcore-green/90 hover:bg-flashcore-green text-foreground font-semibold px-6 py-2 rounded-lg shadow"
                >
                  <span className="flex items-center gap-2">
                    {button}
                    <span aria-hidden>
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 9h8m0 0-3-3m3 3-3 3"></path>
                      </svg>
                    </span>
                  </span>
                </Button>
              </div>
            </CardContent>
            {/* Optional: subtle background gradient accent */}
            <div
              className="absolute inset-0 pointer-events-none opacity-15 group-hover:opacity-25 transition-opacity"
              style={{
                background:
                  "linear-gradient(135deg, #4cd97b33 0%, #a16bf732 100%)",
              }}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlashPage;
