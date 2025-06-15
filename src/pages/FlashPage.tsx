
import React from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Card-specific gradient color configs:
const cardGradients = [
  "from-[#43e97b] via-[#38f9d7] to-[#4cd97b]", // Green/Cyan
  "from-[#a16bf7] via-[#f89b29] to-[#ff9f40]",   // Purple/Orange
  "from-[#43cea2] via-[#185a9d] to-[#2af598]",   // Aqua/Blue-green
];

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
    <div
      className="min-h-screen w-full py-12 px-2 sm:px-8"
      style={{
        background: "linear-gradient(135deg, #15161b 65%, #2af59822 100%)",
      }}
    >
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-12 text-center">
          ⚡ Flash Tools
        </h1>
        <div className="grid gap-8">
          {flashFeatures.map(({ title, desc, button }, i) => (
            <Card
              key={title}
              className="overflow-hidden relative hover-scale shadow-lg border-0"
              style={{
                background:
                  `linear-gradient(105deg, var(--tw-gradient-stops))`,
              }}
            >
              {/* Card gradient - use with Tailwind's bg-gradient-to-tr */}
              <div className={`absolute inset-0 z-0 bg-gradient-to-tr opacity-80 ${cardGradients[i]} pointer-events-none`} />

              <CardContent className="relative flex items-center gap-5 py-8 px-4 sm:py-10 sm:px-10 z-10">
                <div className="flex-shrink-0">
                  <div className="bg-white/10 rounded-full p-4 shadow-xl border border-white/10">
                    <Zap size={54} className="text-white drop-shadow-lg" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white drop-shadow">
                    {title}
                  </h2>
                  <p className="text-base text-white/90 mb-5">
                    {desc}
                  </p>
                  <Button
                    variant="default"
                    className="mt-1 font-semibold px-6 py-2 rounded-lg text-white"
                    style={{
                      background: "linear-gradient(90deg, #4cd97b 5%, #8CBE06 100%)",
                      boxShadow: "0 2px 16px 0 #4cd97b44",
                    }}
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
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashPage;
