
import { DashboardData, Wallet, TagType } from "@/types";

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
        { label: "Hot", type: TagType.Hot },
        { label: "New", type: TagType.New },
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
        { label: "Trending", type: TagType.Trending },
        { label: "Bulk", type: TagType.Bulk },
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
        { label: "AI", type: TagType.AI },
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
        { label: "Hot", type: TagType.Hot },
        { label: "AI", type: TagType.AI },
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
        { label: "New", type: TagType.New },
        { label: "Trending", type: TagType.Trending },
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
        { label: "Bulk", type: TagType.Bulk },
        { label: "AI", type: TagType.AI },
      ],
      status: "active",
    },
  ];
};

export const fetchMotivationalQuote = async (): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Futuristic, tech-focused, and motivational quotes
  const quotes = [
    "Innovation is the edge between imagination and reality.",
    "The future belongs to those who code it.",
    "Every breakthrough begins with a single line of code.",
    "Technology transforms ideas into digital realities.",
    "Success is the sum of small efforts repeated day after day.",
    "Embrace the glitch; it leads to innovation.",
    "Digital dreams become virtual realities.",
    "The impossible is just code that hasn't been written yet.",
    "Your mind is the most powerful computer.",
    "In the matrix of possibilities, you are the architect.",
    "Quantum thinking creates exponential results.",
    "Today's innovation is tomorrow's foundation.",
    "Code your way to the future you envision.",
    "Break the algorithm of doubt with persistent execution.",
    "The future is written in binary and determination.",
  ];
  
  // Return a random quote
  return quotes[Math.floor(Math.random() * quotes.length)];
};
