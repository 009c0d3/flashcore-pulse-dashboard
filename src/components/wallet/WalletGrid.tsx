
import React from 'react';
import { wallets } from '@/data/wallets';
import WalletCard from './WalletCard';

const WalletGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {wallets.map((wallet) => (
        <WalletCard key={wallet.name} wallet={wallet} />
      ))}
    </div>
  );
};

export default WalletGrid;
