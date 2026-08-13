import React from 'react';
import { OrderAnalysis, OrderInput } from '../../features/return-loss/types';
import { formatVND } from '../../lib/currency';
import { Layers } from 'lucide-react';

interface CostBreakdownProps {
  analysis: OrderAnalysis;
  input: OrderInput;
}

export const CostBreakdown: React.FC<CostBreakdownProps> = ({ analysis, input }) => {
  const breakdownItems = [
    { label: 'Giá bán niêm yết', amount: input.salePrice, type: 'revenue' },
    { label: 'Giá vốn hàng bán (COGS)', amount: -input.productCost, type: 'cost' },
    { label: `Phí sàn biến đổi (${input.platformFeePercent}%)`, amount: -analysis.platformFee, type: 'cost' },
    { label: 'Phí cố định / xử lý đơn', amount: -analysis.platformOrderFee, type: 'cost' },
    { label: `Affiliate / KOC (${input.affiliatePercent}%)`, amount: -analysis.affiliateFee, type: 'cost' },
    { label: 'Quảng cáo (Ad CPA)', amount: -input.adCost, type: 'cost' },
    { label: 'Chi phí đóng gói', amount: -input.packagingCost, type: 'cost' },
    { label: 'Ship chiều đi shop trả', amount: -input.outboundShippingCost, type: 'cost' },
    { label: 'Ship hoàn lượt quay về', amount: -input.returnShippingCost, type: 'returnCost' },
    { label: 'Phí không hoàn trả', amount: -input.nonRefundableFees, type: 'returnCost' },
    {
      label: `Mất mát giá trị sản phẩm (${100 - input.resaleRecoveryPercent}% hỏng)`,
      amount: -analysis.inventoryDamageLoss,
      type: 'returnCost',
    },
    {
      label: 'Bồi hoàn được tính vào đơn hoàn',
      amount: analysis.reimbursementApplied,
      type: 'reimbursement',
    },
  ];

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-lime-400" />
          <h3 className="text-sm font-bold text-neutral-100">Bảng Bóc Tách Chi Phí Chi Tiết</h3>
        </div>
        <span className="text-[11px] text-neutral-400">1 Đơn hàng</span>
      </div>

      <div className="divide-y divide-neutral-800/60 text-xs">
        {breakdownItems.map((item) => {
          if (item.amount === 0 && item.type !== 'revenue') return null;

          const isPositive = item.amount > 0;
          const isReturnCost = item.type === 'returnCost';

          return (
            <div key={item.label} className="py-2 flex items-center justify-between gap-4">
              <span className={`font-medium ${isReturnCost ? 'text-red-300' : 'text-neutral-300'}`}>
                {item.label}
              </span>
              <span
                className={`font-mono font-bold shrink-0 ${
                  item.type === 'revenue'
                    ? 'text-white'
                    : item.type === 'reimbursement'
                      ? 'text-lime-400'
                      : isReturnCost
                        ? 'text-red-400'
                        : 'text-neutral-400'
                }`}
              >
                {isPositive ? `+${formatVND(item.amount)}` : formatVND(item.amount)}
              </span>
            </div>
          );
        })}
      </div>

      {input.reimbursementAmount > analysis.reimbursementApplied && (
        <p className="text-[11px] leading-relaxed text-neutral-500">
          Bồi hoàn nhập vào lớn hơn tổn thất trực tiếp. ShopGuard chỉ áp tối đa {formatVND(analysis.grossReturnLoss)} để Return Loss không âm.
        </p>
      )}
    </div>
  );
};
