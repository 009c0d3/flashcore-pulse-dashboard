import { DashboardData, Wallet } from "@/types";

export const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data
  return {
    username: "alex_mitchell",
    avatar: "/images/avatar.png",
    rank: "Power User",
    stats: {
      salesThisMonth: 12450,
      salesLastMonth: 10800,
      totalSales: 45600,
      activeUsers: 237
    },
    // Add the missing properties used in Dashboard.tsx and ReferralPopup.tsx
    user: {
      username: "alex_mitchell",
      avatar: "/images/avatar.png",
      rank: "Power User",
      email: "alex@example.com",
      referralLink: "https://flashcore.app/ref/alex_mitchell",
      referralCount: 12,
      referralEarnings: 240,
      mailsSent: 88
    },
    plan: {
      name: "Pro",
      features: ["Unlimited access", "Priority support", "Custom branding"],
      amount: "$49.99",
      expires: "2025-12-31"
    },
    walletBalance: 2750,
    progress: 65,
    mailsNeeded: 35,
    nextLevel: "Expert",
    mailActivity: [
      { date: "Mon", count: 12 },
      { date: "Tue", count: 18 },
      { date: "Wed", count: 10 },
      { date: "Thu", count: 15 },
      { date: "Fri", count: 20 },
      { date: "Sat", count: 8 },
      { date: "Sun", count: 5 }
    ],
    totalMails: 88
  };
};

export const fetchWallets = async (): Promise<Wallet[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock wallet data
  return [
    {
      id: "1",
      name: "MetaMask",
      logo: "/images/metamask.png",
      url: "https://metamask.io/",
      gradientClass: "purple-blue",
      tags: [
        { label: "Hot", type: "hot" },
        { label: "New", type: "new" },
      ],
      status: "active",
    },
    {
      id: "2",
      name: "Coinbase Wallet",
      logo: "/images/coinbase.png",
      url: "https://www.coinbase.com/wallet",
      gradientClass: "blue-green",
      tags: [
        { label: "Trending", type: "trending" },
        { label: "Bulk", type: "bulk" },
      ],
      status: "maintenance",
    },
    {
      id: "3",
      name: "Trust Wallet",
      logo: "/images/trustwallet.png",
      url: "https://trustwallet.com/",
      gradientClass: "green-purple",
      tags: [
        { label: "AI", type: "ai" },
      ],
      status: "disabled",
    },
    {
      id: "4",
      name: "Phantom",
      logo: "/images/phantom.png",
      url: "https://phantom.app/",
      gradientClass: "orange-red",
      tags: [
        { label: "Hot", type: "hot" },
        { label: "AI", type: "ai" },
      ],
      status: "active",
    },
    {
      id: "5",
      name: "Rainbow",
      logo: "/images/rainbow.png",
      url: "https://rainbow.me/",
      gradientClass: "purple-orange",
      tags: [
        { label: "New", type: "new" },
        { label: "Trending", type: "trending" },
      ],
      status: "active",
    },
    {
      id: "6",
      name: "Argent",
      logo: "/images/argent.png",
      url: "https://www.argent.xyz/",
      gradientClass: "blue-purple",
      tags: [
        { label: "Bulk", type: "bulk" },
        { label: "AI", type: "ai" },
      ],
      status: "active",
    },
  ];
};
