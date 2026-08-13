import React from 'react';
import { OrderAnalysis, OrderInput } from '../../features/return-loss/types';
import { formatVND, formatPercent } from '../../lib/currency';
import { WarningBanner } from '../ui/WarningBanner';
import { CheckCircle2, AlertOctagon, Scale, ShieldAlert, Sparkles } from 'lucide-react';

interface ResultPanelProps {
  analysis: OrderAnalysis;
  input: OrderInput;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ analysis, input }) => {
  const isProfitable = analysis.successfulProfit > 0;

  return (
    <div className="flex flex-col gap-5 sticky top-20">
      {/* CARD 1: KẾT QUẢ GIAO THÀNH CÔNG */}
      <div className={`rounded-2xl border p-5 transition-all duration-200 ${
        isProfitable
          ? 'bg-neutral-900/90 border-lime-500/40 shadow-lg shadow-lime-950/20'
          : 'bg-neutral-900/90 border-red-800/40'
      }`}>
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-4 h-4 ${isProfitable ? 'text-lime-400' : 'text-red-400'}`} />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Nếu Giao Thành Công
            </span>
          </div>
          <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
            isProfitable ? 'bg-lime-950/80 text-lime-400 border border-lime-800/50' : 'bg-red-950/80 text-red-400 border border-red-800/50'
          }`}>
            Margin {formatPercent(analysis.successfulMarginPercent)}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-neutral-400 font-medium">Lợi nhuận ròng:</span>
            <span className={`text-3xl font-black font-mono tracking-tight ${
              isProfitable ? 'text-lime-400' : 'text-red-400'
            }`}>
              {formatVND(analysis.successfulProfit, { showSign: true })}
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 text-right">
            Doanh thu {formatVND(input.salePrice)} - Tổng chi phí {formatVND(analysis.totalSuccessfulOrderCost)}
          </p>
        </div>
      </div>

      {/* CARD 2: KHI KHÁCH TRẢ HÀNG (RETURN LOSS) - HIGHLIGHT */}
      <div className="rounded-2xl border border-red-800/60 bg-gradient-to-br from-red-950/40 via-neutral-900 to-neutral-900 p-5 shadow-xl shadow-red-950/20">
        <div className="flex items-center justify-between pb-3 border-b border-red-900/40">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-red-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-300">
              Nếu Khách Trả Hàng (Return Loss)
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-900/60 text-red-200 uppercase">
            Tổn thất thực tế
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-red-300 font-medium">Số tiền shop bị mất:</span>
            <span className="text-3xl sm:text-4xl font-black font-mono text-red-400 tracking-tight">
              -{formatVND(analysis.returnedOrderLoss)}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/40 mt-1">
            <p className="text-xs font-semibold text-red-200 leading-snug">
              ⚠️ Đơn này làm shop mất khoảng <span className="text-red-400 font-extrabold underline">{formatVND(analysis.returnedOrderLoss)}</span>!
            </p>
            {isProfitable && analysis.returnedOrderLoss > 0 && (
              <p className="text-[11px] text-red-300/80 mt-1">
                Cần khoảng <span className="font-bold text-white">{(analysis.returnedOrderLoss / analysis.successfulProfit).toFixed(1)}</span> đơn giao thành công để bù khoản lỗ của 1 đơn hoàn này.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CARD 3: CHỈ SỐ HÒA VỐN (BREAK-EVEN METRICS) */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
          <Scale className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            Chỉ Số Hòa Vốn An Toàn
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 text-xs">
          {/* Break even sale price */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
            <span className="text-neutral-400">Giá bán hòa vốn:</span>
            <span className="font-mono font-bold text-neutral-100">
              {analysis.breakEvenSalePrice !== null
                ? formatVND(analysis.breakEvenSalePrice)
                : 'Không thể hòa vốn (Phí > 100%)'}
            </span>
          </div>

          {/* Break even CPA */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
            <span className="text-neutral-400">CPA Ads hòa vốn:</span>
            <span className={`font-mono font-bold ${analysis.breakEvenAdCPA < 0 ? 'text-red-400' : 'text-lime-400'}`}>
              {formatVND(analysis.breakEvenAdCPA)}
            </span>
          </div>

          {/* Max affiliate % */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
            <span className="text-neutral-400">Affiliate tối đa trả được:</span>
            <span className="font-mono font-bold text-amber-400">
              {formatPercent(analysis.maxAffiliatePercent)}
            </span>
          </div>
        </div>
      </div>

      {/* WARNINGS / MONEY LEAKS DETECTOR */}
      {analysis.warnings.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-300 px-1">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Phát Hiện Rò Rỉ Lợi Nhuận (Money Leak Detector):</span>
          </div>
          {analysis.warnings.map((warning) => (
            <WarningBanner key={warning.id} warning={warning} />
          ))}
        </div>
      )}
    </div>
  );
};
