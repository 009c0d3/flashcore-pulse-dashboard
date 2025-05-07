
import { DashboardData } from "@/types";

// Mock data for the dashboard
const mockDashboardData: DashboardData = {
  user: {
    username: "alex_mitchell",
    avatar: "https://ui-avatars.com/api/?name=Alex+Mitchell&background=a16bf7&color=fff",
    rank: "Power User",
    mailsSent: 850,
    referralCount: 12,
    referralEarnings: 240,
    referralLink: "https://flashcore.app/ref/alex_mitchell"
  },
  plan: {
    name: "Pro",
    amount: "$49.99",
    expires: "2025-06-15"
  },
  progress: 75,
  nextLevel: "Elite User",
  mailsNeeded: 150,
  walletBalance: "$399.50",
  totalMails: 16425,
  mailActivity: [
    { date: "2025-04-01", sent: 65 },
    { date: "2025-04-02", sent: 85 },
    { date: "2025-04-03", sent: 125 },
    { date: "2025-04-04", sent: 75 },
    { date: "2025-04-05", sent: 55 },
    { date: "2025-04-06", sent: 90 },
    { date: "2025-04-07", sent: 110 }
  ]
};

// Mock API function to fetch dashboard data
export const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockDashboardData;
};

// Mock function to fetch motivational quotes
export const fetchMotivationalQuote = async (): Promise<string> => {
  const quotes = [
    "Every email sent is one step closer to success! 🚀",
    "Small progress compounds into massive achievements. 💪",
    "Today's effort is tomorrow's reward. Keep going! ✨",
    "Actions become habits, habits become results. 🌟",
    "Your potential exceeds your imagination. Believe it! 🔥"
  ];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Return a random quote
  return quotes[Math.floor(Math.random() * quotes.length)];
};
