
import React from "react";
import { zap } from "lucide-react/icons";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const flashFeatures = [
  {
    title: "Generate Transaction",
    desc: "Instantly send wallet transaction emails.",
    button: "Generate",
  },
  {
    title: "Flash Billing",
    desc: "Send billing emails in an instant.",
    button: "Flash",
  },
  {
    title: "Generate Receipts",
    desc: "Generate transaction receipts of any wallet",
    button: "Generate",
  },
];

const FlashPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl font-medium mb-8 mt-3 text-left w-full max-w-2xl">
        What tool will you be using today?
      </h2>
      <div className="flex flex-col gap-8 w-full max-w-2xl">
        {flashFeatures.map(({ title, desc, button }, i) => (
          <div
            key={title}
            className="relative rounded-2xl flex items-center px-8 py-7 bg-gradient-to-br from-green-700 via-green-600 to-green-500 shadow-lg"
            style={{ minHeight: "180px", overflow: "hidden" }}
          >
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-semibold mb-2">{title}</h3>
              <p className="text-base text-white/80 mb-6">{desc}</p>
              <Button 
                className="bg-[#191825] text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-[#23223d]"
                asChild={false}
              >
                <span className="flex items-center gap-2 text-base">
                  {button}
                  <span aria-hidden>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 9h8m0 0-3-3m3 3-3 3"></path>
                    </svg>
                  </span>
                </span>
              </Button>
            </div>
            <div className="flex-shrink-0 ml-4 md:ml-12">
              <Zap 
                size={70} 
                className="text-white drop-shadow-lg"
                style={{ filter: "drop-shadow(0 2px 24px #d1fae5)" }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Optional: floating Telegram or action button */}
      {/* <button className="fixed bottom-6 right-6 rounded-full bg-blue-400 p-3 shadow-lg">...</button> */}
    </div>
  );
};

export default FlashPage;
