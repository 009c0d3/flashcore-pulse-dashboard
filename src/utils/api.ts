import { DashboardData, Wallet, TagType } from "@/types";

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

// Mock wallet data
const mockWallets: Wallet[] = [
  {
    id: 'binance',
    name: 'Binance',
    logo: 'https://ui-avatars.com/api/?name=Binance&background=FF9900&color=fff&bold=true',
    url: '/wallets/binance',
    gradientClass: 'binance',
    tags: [
      { label: 'HOT 🔥', type: TagType.Hot },
      { label: 'BULK FLASHING', type: TagType.Bulk },
    ],
    status: 'active',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    logo: 'https://ui-avatars.com/api/?name=PayPal&background=003087&color=fff&bold=true',
    url: '/wallets/paypal',
    gradientClass: 'paypal',
    tags: [
      { label: 'TRENDING 🚀', type: TagType.Trending },
    ],
    status: 'active',
  },
  {
    id: 'zelle',
    name: 'Zelle',
    logo: 'https://ui-avatars.com/api/?name=Zelle&background=6D1ED4&color=fff&bold=true',
    url: '/wallets/zelle',
    gradientClass: 'zelle',
    tags: [
      { label: 'NEW', type: TagType.New },
      { label: 'AI 🧠', type: TagType.AI },
    ],
    status: 'active',
  },
  {
    id: 'metamask',
    name: 'MetaMask',
    logo: 'https://ui-avatars.com/api/?name=MetaMask&background=E2761B&color=fff&bold=true',
    url: '/wallets/metamask',
    gradientClass: 'metamask',
    tags: [
      { label: 'HOT 🔥', type: TagType.Hot },
    ],
    status: 'maintenance',
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    logo: 'https://ui-avatars.com/api/?name=Coinbase&background=0052FF&color=fff&bold=true',
    url: '/wallets/coinbase',
    gradientClass: 'coinbase',
    tags: [
      { label: 'BULK FLASHING', type: TagType.Bulk },
      { label: 'AI 🧠', type: TagType.AI },
    ],
    status: 'active',
  },
  {
    id: 'cashapp',
    name: 'Cash App',
    logo: 'https://ui-avatars.com/api/?name=Cash+App&background=00D632&color=fff&bold=true',
    url: '/wallets/cashapp',
    gradientClass: 'cashapp',
    tags: [
      { label: 'TRENDING 🚀', type: TagType.Trending },
    ],
    status: 'active',
  },
  {
    id: 'venmo',
    name: 'Venmo',
    logo: 'https://ui-avatars.com/api/?name=Venmo&background=3D95CE&color=fff&bold=true',
    url: '/wallets/venmo',
    gradientClass: 'venmo',
    tags: [
      { label: 'NEW', type: TagType.New },
    ],
    status: 'active',
  },
  {
    id: 'applepay',
    name: 'Apple Pay',
    logo: 'https://ui-avatars.com/api/?name=Apple+Pay&background=000000&color=fff&bold=true',
    url: '/wallets/applepay',
    gradientClass: 'applepay',
    tags: [
      { label: 'HOT 🔥', type: TagType.Hot },
    ],
    status: 'active',
  },
  {
    id: 'googlepay',
    name: 'Google Pay',
    logo: 'https://ui-avatars.com/api/?name=Google+Pay&background=4285F4&color=fff&bold=true',
    url: '/wallets/googlepay',
    gradientClass: 'googlepay',
    tags: [
      { label: 'BULK FLASHING', type: TagType.Bulk },
    ],
    status: 'disabled',
  },
  {
    id: 'trustwallet',
    name: 'Trust Wallet',
    logo: 'https://ui-avatars.com/api/?name=Trust+Wallet&background=3375BB&color=fff&bold=true',
    url: '/wallets/trustwallet',
    gradientClass: 'trustwallet',
    tags: [
      { label: 'AI 🧠', type: TagType.AI },
      { label: 'NEW', type: TagType.New },
    ],
    status: 'active',
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    logo: 'https://ui-avatars.com/api/?name=Blockchain&background=1D3657&color=fff&bold=true',
    url: '/wallets/blockchain',
    gradientClass: 'blockchain',
    tags: [
      { label: 'HOT 🔥', type: TagType.Hot },
      { label: 'TRENDING 🚀', type: TagType.Trending },
    ],
    status: 'active',
  },
  {
    id: 'skrill',
    name: 'Skrill',
    logo: 'https://ui-avatars.com/api/?name=Skrill&background=7B0041&color=fff&bold=true',
    url: '/wallets/skrill',
    gradientClass: 'skrill',
    tags: [
      { label: 'BULK FLASHING', type: TagType.Bulk },
    ],
    status: 'active',
  }
];

// Mock API function to fetch wallets
export const fetchWallets = async (): Promise<Wallet[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockWallets;
};
