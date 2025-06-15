
import React from 'react';

export interface Wallet {
  name: string;
  icon: React.ReactNode;
  color: string;
  hasAI: boolean;
  isHot?: boolean;
  hasBulkFlashing?: boolean;
  isTrending?: boolean;
  isSpecial?: boolean;
  isNew?: boolean;
}
