
export interface User {
  username: string;
  avatar: string;
  rank: string;
  mailsSent: number;
  referralCount: number;
  referralEarnings: number;
  referralLink: string;
}

export interface Plan {
  name: string;
  amount: string;
  expires: string;
}

export interface DashboardData {
  user: User;
  plan: Plan;
  progress: number;
  nextLevel: string;
  mailsNeeded: number;
  walletBalance: string;
  totalMails: number;
  mailActivity: MailActivity[];
}

export interface MailActivity {
  date: string;
  sent: number;
}

export interface SidebarLink {
  label: string;
  icon: string;
  path: string;
  isNew?: boolean;
  subLinks?: SidebarLink[];
}

export interface DashboardModuleProps {
  title: string;
  icon: string;
  className?: string;
  children: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export interface ProgressBarProps {
  progress: number;
  height?: string;
}

// Wallet-related interfaces
export enum TagType {
  Hot = 'hot',
  New = 'new',
  Trending = 'trending',
  Bulk = 'bulk',
  AI = 'ai',
}

export interface WalletTag {
  label: string;
  type: TagType;
}

export interface Wallet {
  id: string;
  name: string;
  logo: string;
  url: string;
  gradientClass: string;
  tags: WalletTag[];
  status: 'active' | 'maintenance' | 'disabled';
}
