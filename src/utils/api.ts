
export const fetchMotivationalQuote = async (): Promise<string> => {
  // This is a mock function - in a real app, this would call an API
  const quotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts. 💪",
    "Believe you can and you're halfway there. 🚀",
    "The only way to do great work is to love what you do. ❤️",
    "Your time is limited, don't waste it living someone else's life. 🕰️",
    "The future belongs to those who believe in the beauty of their dreams. ✨",
    "It always seems impossible until it's done. 🔮",
    "The best way to predict the future is to create it. 🛠️"
  ];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return a random quote
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const fetchWallets = async (): Promise<any[]> => {
  // This is a mock function that would be replaced with a real API call
  const mockWallets = [
    {
      id: "binance",
      name: "Binance",
      logo: "/wallet-images/binance.png",
      url: "/wallets/binance",
      gradientClass: "gradient-binance",
      tags: [
        { label: "HOT 🔥", type: "hot" },
        { label: "BULK FLASHING", type: "bulk" }
      ],
      status: "active"
    },
    {
      id: "paypal",
      name: "PayPal",
      logo: "/wallet-images/paypal.png",
      url: "/wallets/paypal",
      gradientClass: "gradient-paypal",
      tags: [
        { label: "TRENDING 🚀", type: "trending" }
      ],
      status: "active"
    },
    {
      id: "zelle",
      name: "Zelle",
      logo: "/wallet-images/zelle.png",
      url: "/wallets/zelle",
      gradientClass: "gradient-zelle",
      tags: [
        { label: "NEW", type: "new" },
        { label: "AI 🧠", type: "ai" }
      ],
      status: "maintenance"
    },
    {
      id: "metamask",
      name: "MetaMask",
      logo: "/wallet-images/metamask.png",
      url: "/wallets/metamask",
      gradientClass: "gradient-metamask",
      tags: [
        { label: "HOT 🔥", type: "hot" }
      ],
      status: "active"
    },
    {
      id: "coinbase",
      name: "Coinbase",
      logo: "/wallet-images/coinbase.png",
      url: "/wallets/coinbase",
      gradientClass: "gradient-coinbase",
      tags: [
        { label: "BULK FLASHING", type: "bulk" }
      ],
      status: "active"
    },
    {
      id: "cashapp",
      name: "Cash App",
      logo: "/wallet-images/cashapp.png",
      url: "/wallets/cashapp",
      gradientClass: "gradient-cashapp",
      tags: [
        { label: "AI 🧠", type: "ai" }
      ],
      status: "disabled"
    }
  ];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return mockWallets;
};

export const fetchDashboardData = async (): Promise<any> => {
  // This is a mock function that would be replaced with a real API call
  const mockDashboardData = {
    username: "alex_mitchell",
    avatar: "/images/avatar.png",
    rank: "Power User",
    stats: {
      salesThisMonth: 12500,
      salesLastMonth: 10800,
      totalSales: 45600,
      activeUsers: 237
    }
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return mockDashboardData;
};
