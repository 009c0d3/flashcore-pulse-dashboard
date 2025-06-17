
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
