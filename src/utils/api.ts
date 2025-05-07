
import { DashboardData } from "@/types";

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Dashboard data fetch function
export const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulate API call with delay
  await delay(800);
  
  // Mock data that would normally come from a real API
  return {
    user: {
      username: "alex_mitchell",
      avatar: "/avatar.png",
      rank: "Power User",
      mailsSent: 7845,
      referralCount: 12,
      referralEarnings: 240,
      referralLink: "https://flashcore.io/ref/alexm"
    },
    plan: {
      name: "Pro",
      amount: "$29.99",
      expires: "2024-08-15"
    },
    progress: 78,
    nextLevel: "Expert",
    mailsNeeded: 2155,
    walletBalance: "$124.50",
    totalMails: 10000,
    mailActivity: [
      { date: "2024-04-01", sent: 320 },
      { date: "2024-04-02", sent: 280 },
      { date: "2024-04-03", sent: 350 },
      { date: "2024-04-04", sent: 410 },
      { date: "2024-04-05", sent: 290 },
      { date: "2024-04-06", sent: 180 },
      { date: "2024-04-07", sent: 220 }
    ]
  };
};

// Mock motivational quotes
export const fetchMotivationalQuote = async (): Promise<string> => {
  await delay(600);
  
  const quotes = [
    "Dream big, work hard, stay focused! ✨",
    "Every email sent is a step closer to success 📧",
    "Your dedication today creates results tomorrow 🔥",
    "Consistency is the key to reaching your goals 🚀",
    "Small progress is still progress! Keep going 💪",
    "Success is built one email at a time 📈",
    "You've got this! Your potential is limitless ⭐"
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
};

// Fetch wallets function
export const fetchWallets = async () => {
  await delay(800);
  
  return [
    {
      id: "binance",
      name: "Binance",
      logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
      url: "/wallets/binance",
      gradientClass: "bg-gradient-to-br from-yellow-900/30 to-yellow-600/30",
      tags: [
        { label: "HOT 🔥", type: "hot" },
        { label: "BULK FLASHING", type: "bulk" }
      ],
      status: "active"
    },
    {
      id: "paypal",
      name: "PayPal",
      logo: "https://logodownload.org/wp-content/uploads/2014/10/paypal-logo-0.png",
      url: "/wallets/paypal",
      gradientClass: "bg-gradient-to-br from-blue-900/30 to-blue-600/30",
      tags: [
        { label: "TRENDING 📈", type: "trending" }
      ],
      status: "active"
    },
    {
      id: "zelle",
      name: "Zelle",
      logo: "https://play-lh.googleusercontent.com/htBG0-UgFsLsD2losjEhkTGqhQhZ0jGR-OpGHLyPHUzrGS4XIkHqWIIUQT-czhRbi-U",
      url: "/wallets/zelle",
      gradientClass: "bg-gradient-to-br from-purple-900/30 to-purple-600/30",
      tags: [
        { label: "NEW ✨", type: "new" }
      ],
      status: "active"
    },
    {
      id: "metamask",
      name: "MetaMask",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.png",
      url: "/wallets/metamask",
      gradientClass: "bg-gradient-to-br from-orange-900/30 to-orange-600/30",
      tags: [
        { label: "AI SUPPORT 🧠", type: "ai" }
      ],
      status: "maintenance"
    },
    {
      id: "coinbase",
      name: "Coinbase",
      logo: "https://www.coinbase.com/img/favicon/apple-icon-180x180.png",
      url: "/wallets/coinbase",
      gradientClass: "bg-gradient-to-br from-blue-900/30 to-blue-600/30",
      tags: [
        { label: "TRENDING 📈", type: "trending" },
        { label: "BULK FLASHING", type: "bulk" }
      ],
      status: "active"
    },
    {
      id: "cashapp",
      name: "Cash App",
      logo: "https://play-lh.googleusercontent.com/hojqRYMADOzItnGOSR5n0uh_TBquWUbQbkiQOUZ1VsCULLzGNwKS9Rl-0KunSbY4UQ",
      url: "/wallets/cashapp",
      gradientClass: "bg-gradient-to-br from-green-900/30 to-green-600/30",
      tags: [
        { label: "HOT 🔥", type: "hot" }
      ],
      status: "active"
    },
    {
      id: "venmo",
      name: "Venmo",
      logo: "https://cdn.icon-icons.com/icons2/2699/PNG/512/venmo_logo_icon_169278.png",
      url: "/wallets/venmo",
      gradientClass: "bg-gradient-to-br from-blue-900/30 to-blue-700/30",
      tags: [
        { label: "NEW ✨", type: "new" }
      ],
      status: "active"
    },
    {
      id: "trustwallet",
      name: "Trust Wallet",
      logo: "https://trustwallet.com/assets/images/media/assets/trust-wallet-token.png",
      url: "/wallets/trustwallet",
      gradientClass: "bg-gradient-to-br from-blue-900/30 to-blue-600/30",
      tags: [
        { label: "AI SUPPORT 🧠", type: "ai" }
      ],
      status: "active"
    },
    {
      id: "bitcoinwallet",
      name: "Bitcoin Wallet",
      logo: "https://bitcoin.org/img/icons/opengraph.png",
      url: "/wallets/bitcoin",
      gradientClass: "bg-gradient-to-br from-orange-900/30 to-orange-600/30",
      tags: [
        { label: "HOT 🔥", type: "hot" },
      ],
      status: "active"
    },
    {
      id: "stripe",
      name: "Stripe",
      logo: "https://stripe.com/img/v3/home/social.png",
      url: "/wallets/stripe",
      gradientClass: "bg-gradient-to-br from-purple-900/30 to-purple-600/30",
      tags: [
        { label: "BULK FLASHING", type: "bulk" }
      ],
      status: "maintenance"
    },
    {
      id: "americanexpress",
      name: "American Express",
      logo: "https://logodownload.org/wp-content/uploads/2014/04/amex-american-express-logo-0.png",
      url: "/wallets/amex",
      gradientClass: "bg-gradient-to-br from-slate-900/30 to-slate-600/30",
      tags: [
        { label: "NEW ✨", type: "new" }
      ],
      status: "disabled"
    },
    {
      id: "mastercard",
      name: "Mastercard",
      logo: "https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png",
      url: "/wallets/mastercard",
      gradientClass: "bg-gradient-to-br from-red-900/30 to-red-600/30",
      tags: [
        { label: "HOT 🔥", type: "hot" }
      ],
      status: "active"
    }
  ];
};
