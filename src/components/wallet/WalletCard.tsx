
import React from 'react';
import { Wallet } from '@/lib/walletTypes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface WalletCardProps {
  wallet: Wallet;
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet }) => {
  return (
    <div
      className="group"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative rounded-2xl p-6 cursor-pointer h-full transition-all duration-300 group-hover:shadow-2xl [transform-style:preserve-3d] group-hover:[transform:rotateX(5deg)_rotateY(-10deg)]"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${wallet.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10"></div>
        
        <div className="relative flex flex-col justify-between h-full min-h-[220px]">
          {/* Top section: Badges */}
          <div className="flex justify-between items-start">
            {wallet.hasAI ? (
              <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 text-xs z-10">
                <span className="font-semibold">AI</span>
                <span className="text-pink-300">🧠</span>
              </div>
            ) : <div />}
            <div className="flex flex-col items-end space-y-1 z-10">
              {wallet.isHot && <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">HOT 🔥</Badge>}
              {wallet.isTrending && <Badge className="bg-pink-500 hover:bg-pink-600 text-white text-xs px-2 py-1">TRENDING 🚀</Badge>}
              {wallet.isNew && <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">NEW</Badge>}
            </div>
          </div>

          {/* Middle section: Icon and Name */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center text-white">
              {wallet.icon}
            </div>
            <h3 className="text-white text-xl font-bold mt-4">
              {wallet.name}
            </h3>
          </div>

          {/* Bottom section: Bulk Flashing / Message button */}
          <div className="h-10 flex items-center">
            {wallet.isSpecial ? (
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-xl">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message Us
              </Button>
            ) : wallet.hasBulkFlashing ? (
              <div className="w-full flex justify-end">
                <Badge className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1">
                  BULK FLASHING
                </Badge>
              </div>
            ) : <div className="w-full" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
