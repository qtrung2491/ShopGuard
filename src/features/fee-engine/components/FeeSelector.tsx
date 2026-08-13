import React, { useEffect, useMemo } from 'react';
import { Platform } from '../../return-loss/types';
import { getFeeCategories, resolvePlatformFee } from '../resolveFee';
import { SellerType } from '../types';
import { BadgeCheck, Calculator, ExternalLink, Pencil } from 'lucide-react';

export type FeeMode = 'auto' | 'manual';

interface FeeSelectorProps {
  platform: Platform;
  mode: FeeMode;
  sellerType: SellerType;
  categoryId: string;
  onModeChange: (mode: FeeMode) => void;
  onSellerTypeChange: (sellerType: SellerType) => void;
  onCategoryChange: (categoryId: string) => void;
  onApplyFee: (totalVariableRate: number, orderProcessingFee: number) => void;
}

export const FeeSelector: React.FC<FeeSelectorProps> = ({
  platform,
  mode,
  sellerType,
  categoryId,
  onModeChange,
  onSellerTypeChange,
  onCategoryChange,
  onApplyFee,
}) => {
  const categories = useMemo(() => getFeeCategories(platform), [platform]);
  const resolvedFee = useMemo(
    () => resolvePlatformFee(platform, sellerType, categoryId),
    [platform, sellerType, categoryId],
  );

  const groupedCategories = useMemo(() => {
    const groups = new Map<string, typeof categories>();
    for (const category of categories) {
      const items = groups.get(category.group) ?? [];
      items.push(category);
      groups.set(category.group, items);
    }
    return [...groups.entries()];
  }, [categories]);

  useEffect(() => {
    if (mode !== 'auto' || !resolvedFee) return;
    onApplyFee(resolvedFee.totalVariableRate, resolvedFee.orderProcessingFee);
  }, [mode, resolvedFee, onApplyFee]);

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-950/80 text-sky-400 border border-sky-800/50">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-100">Tự động áp biểu phí</h3>
            <p className="text-[11px] text-neutral-400">
              Chọn loại shop + ngành hàng, ShopGuard tự điền phí sàn.
            </p>
          </div>
        </div>

        <div className="flex rounded-lg border border-neutral-800 bg-neutral-950 p-1 text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => onModeChange('auto')}
            className={`rounded-md px-2.5 py-1.5 transition-colors ${
              mode === 'auto'
                ? 'bg-lime-400 text-neutral-950'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Tự động
          </button>
          <button
            type="button"
            onClick={() => onModeChange('manual')}
            className={`rounded-md px-2.5 py-1.5 transition-colors ${
              mode === 'manual'
                ? 'bg-neutral-700 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Thủ công
          </button>
        </div>
      </div>

      {mode === 'auto' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-neutral-300">Loại shop</span>
              <select
                value={sellerType}
                onChange={(event) =>
                  onSellerTypeChange(event.target.value as SellerType)
                }
                className="rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-100 outline-none focus:border-lime-400"
              >
                <option value="standard">
                  {platform === 'shopee' ? 'Shop thường' : 'Nhà bán hàng tiêu chuẩn'}
                </option>
                <option value="mall">
                  {platform === 'shopee' ? 'Shopee Mall' : 'TikTok Shop Mall'}
                </option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-neutral-300">Ngành hàng</span>
              <select
                value={categoryId}
                onChange={(event) => onCategoryChange(event.target.value)}
                className="rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-100 outline-none focus:border-lime-400"
              >
                <option value="">-- Chọn ngành hàng --</option>
                {groupedCategories.map(([group, items]) => (
                  <optgroup key={group} label={group}>
                    {items.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
          </div>

          {resolvedFee ? (
            <div className="rounded-xl border border-lime-900/50 bg-lime-950/20 p-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="block text-neutral-500 mb-1">Hoa hồng ngành</span>
                  <strong className="font-mono text-lime-300">
                    {resolvedFee.commissionRate.toFixed(2).replace(/\.00$/, '')}%
                  </strong>
                </div>
                <div>
                  <span className="block text-neutral-500 mb-1">Phí giao dịch</span>
                  <strong className="font-mono text-lime-300">
                    {resolvedFee.transactionRate}%
                  </strong>
                </div>
                <div>
                  <span className="block text-neutral-500 mb-1">Phí cố định / đơn</span>
                  <strong className="font-mono text-lime-300">
                    {resolvedFee.orderProcessingFee.toLocaleString('vi-VN')}đ
                  </strong>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-lime-900/40 pt-3">
                <div className="flex items-center gap-2 text-xs">
                  <BadgeCheck className="w-4 h-4 text-lime-400" />
                  <span className="text-neutral-300">
                    Tổng phí biến đổi tự áp: <strong className="text-white">{resolvedFee.totalVariableRate}%</strong>
                  </span>
                </div>
                <a
                  href={resolvedFee.category.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-300"
                >
                  {resolvedFee.category.sourceStatus === 'official'
                    ? 'Nguồn chính thức'
                    : 'Nguồn đối chiếu'}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <p className="mt-2 text-[10px] leading-relaxed text-neutral-500">
                Hiệu lực từ {resolvedFee.category.effectiveFrom}. Chưa tự áp ưu đãi seller mới, mission, Voucher Xtra, PiShip, affiliate hoặc chương trình riêng của shop.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 px-3.5 py-3 text-[11px] text-neutral-400">
              Chọn ngành hàng để ShopGuard tự tính. Nếu ngành của bạn chưa có trong V1, chuyển sang <strong className="text-neutral-200">Thủ công</strong> để nhập đúng mức phí Seller Center đang hiển thị.
            </div>
          )}
        </>
      ) : (
        <div className="flex items-start gap-2 rounded-xl border border-amber-900/50 bg-amber-950/20 px-3.5 py-3 text-[11px] leading-relaxed text-amber-200/90">
          <Pencil className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Chế độ thủ công: bạn tự nhập tổng % phí sàn và phí cố định theo đơn. Dùng khi shop có ưu đãi riêng hoặc ngành hàng chưa có trong snapshot.
          </span>
        </div>
      )}
    </div>
  );
};
