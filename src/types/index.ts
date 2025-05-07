
export interface SidebarLink {
  label: string;
  icon: string;
  path: string;
  isNew?: boolean;
  subLinks?: Array<{
    label: string;
    icon: string;
    path: string;
  }>;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export enum TagType {
  Hot = 'hot',
  New = 'new',
  Trending = 'trending',
  Bulk = 'bulk',
  AI = 'ai'
}

export interface WalletTag {
  label: string;
  type: string;
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

export interface User {
  username: string;
  avatar: string;
  rank: string;
  email: string;
}

export interface MailHistoryItem {
  id: number;
  walletName: string;
  amount: string;
  email: string;
  sentAt: string;
}

export interface FeatureRequest {
  description: string;
  imageFile?: File;
}
