import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-neutral-800/80 bg-neutral-950 py-8 mt-12 text-center text-xs text-neutral-500">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-3">
        <p className="font-medium text-neutral-400">
          ShopGuard V0 — Công cụ phát hiện mất tiền đơn hàng cho người bán Shopee & TikTok Shop
        </p>
        <p className="max-w-2xl leading-relaxed text-[11px] text-neutral-500">
          *Lưu ý: Công cụ tính toán dựa trên các số liệu chi phí do người dùng tự nhập. Kết quả nhằm mục đích tham khảo và tối ưu hóa tài chính cho cửa hàng, không thay thế cho số liệu đối soát chính thức từ sàn.
        </p>
        <div className="flex items-center gap-4 text-[11px] text-neutral-400 font-mono mt-1">
          <span>Client-Side Only</span>
          <span>•</span>
          <span>100% Bảo mật dữ liệu</span>
          <span>•</span>
          <span>V0.1.0</span>
        </div>
      </div>
    </footer>
  );
};
