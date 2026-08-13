import React from 'react';
import { ShieldAlert, Share2, RotateCcw } from 'lucide-react';
import { Platform } from '../../features/return-loss/types';
import { Button } from '../ui/Button';

interface HeaderProps {
  platform: Platform;
  onPlatformChange: (p: Platform) => void;
  onCopyLink: () => void;
  onReset: () => void;
  isCopied: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  platform,
  onPlatformChange,
  onCopyLink,
  onReset,
  isCopied,
}) => {
  return (
    <header className="w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand logo & tagline */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lime-400 to-lime-500 text-neutral-950 flex items-center justify-center font-black shadow-md shadow-lime-950/30">
              <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">ShopGuard</span>
                <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-lime-950/80 text-lime-400 border border-lime-800/50 uppercase">
                  Return Loss Calculator
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium hidden sm:block">
                Công cụ kiểm soát chi phí & tổn thất đơn hoàn sàn TMĐT
              </p>
            </div>
          </div>

          {/* Mobile quick actions */}
          <div className="flex items-center gap-1.5 md:hidden">
            <Button variant="outline" size="sm" onClick={onCopyLink} title="Sao chép link">
              <Share2 className="w-3.5 h-3.5" />
              {isCopied ? 'Đã chép!' : 'Chia sẻ'}
            </Button>
          </div>
        </div>

        {/* Platform Selector & Desktop Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Platform tabs */}
          <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
            <button
              type="button"
              onClick={() => onPlatformChange('shopee')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                platform === 'shopee'
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-950/50'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-orange-300" />
              Shopee
            </button>
            <button
              type="button"
              onClick={() => onPlatformChange('tiktok')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                platform === 'tiktok'
                  ? 'bg-cyan-500 text-neutral-950 shadow-sm shadow-cyan-950/50 font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-950" />
              TikTok Shop
            </button>
          </div>

          {/* Desktop Reset & Copy Link */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onReset} title="Đặt lại mặc định">
              <RotateCcw className="w-3.5 h-3.5" />
              Đặt lại
            </Button>
            <Button
              variant={isCopied ? 'lime' : 'outline'}
              size="sm"
              onClick={onCopyLink}
            >
              <Share2 className="w-3.5 h-3.5" />
              {isCopied ? 'Đã chép link!' : 'Sao chép link kết quả'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
