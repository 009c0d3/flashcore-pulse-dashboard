
import { DashboardData } from "@/types";

// This function is kept for backward compatibility but deprecated
// Use useRealDashboardData hook instead for real database integration
export const fetchDashboardData = async (): Promise<DashboardData> => {
  console.warn('fetchDashboardData is deprecated. Use useRealDashboardData hook instead.');
  
  // Return mock data as fallback
  return {
    user: {
      username: "User",
      avatar: "/placeholder.svg",
      rank: "Bronze",
      mailsSent: 0,
      referralCount: 0,
      referralEarnings: 0,
      referralLink: "https://flashcore.com/ref/demo"
    },
    plan: {
      name: "Free",
      amount: "$0",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    progress: 0,
    nextLevel: "Silver",
    mailsNeeded: 100,
    walletBalance: "$0.00",
    totalMails: 0,
    mailActivity: []
  };
};

// Array of motivational quotes
const motivationalQuotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The way to get started is to quit talking and begin doing.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Believe it. Build it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don't stop when you're tired. Stop when you're done."
];

export const fetchMotivationalQuote = async (): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return a random quote
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};
