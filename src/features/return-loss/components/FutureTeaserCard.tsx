import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { Store, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const FutureTeaserCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full rounded-2xl border border-lime-500/30 bg-gradient-to-r from-neutral-900 via-neutral-900 to-lime-950/20 p-6 shadow-xl shadow-lime-950/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-lime-950 text-lime-400 border border-lime-800/50">
              <Store className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold font-mono text-lime-400 uppercase tracking-wider">
              Tính năng cho Shop Quy Mô Lớn
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-white">
            Bạn có hàng trăm hoặc hàng nghìn đơn?
          </h3>

          <p className="text-xs text-neutral-300 leading-relaxed">
            ShopGuard đang xây dựng công cụ quét tự động toàn bộ cửa hàng để phát hiện:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>Các đơn hàng bán bị lỗ âm vốn</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>SKU bán càng nhiều càng mất tiền</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>Tổng chi phí rò rỉ từ đơn hoàn</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>Affiliate & Ads vượt trần hòa vốn</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>Các khoản chênh lệch đối soát bất thường</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <Button
            variant="lime"
            size="lg"
            className="w-full md:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            <span>Phân tích toàn bộ shop — Sắp ra mắt</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Modal on click */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tính năng đang được phát triển"
      >
        <div className="flex flex-col gap-4 text-center py-2">
          <div className="w-12 h-12 rounded-full bg-lime-950/80 text-lime-400 border border-lime-800/50 flex items-center justify-center mx-auto">
            <Store className="w-6 h-6" />
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="text-base font-bold text-white">Quét & Audit Toàn Bộ Cửa Hàng</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Tính năng phân tích tự động bằng file CSV/Excel xuất từ sàn đang được xây dựng cho phiên bản V1.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-left text-xs text-neutral-300">
            <p className="font-semibold text-lime-400 mb-1">💡 Bạn muốn thử nghiệm sớm?</p>
            <p>
              Hãy sử dụng máy tính Return Loss V0 này để kiểm tra ngay các đơn hàng nghi ngờ rò rỉ lợi nhuận cao nhất trong shop của bạn!
            </p>
          </div>

          <Button variant="secondary" className="w-full mt-2" onClick={() => setIsModalOpen(false)}>
            Đã hiểu, quay lại tính toán
          </Button>
        </div>
      </Modal>
    </>
  );
};
