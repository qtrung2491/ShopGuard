import React from 'react';
import { OrderInput } from '../../features/return-loss/types';
import { FeeMode } from '../../features/fee-engine/components/FeeSelector';
import { NumberInput } from '../ui/NumberInput';
import { Slider } from '../ui/Slider';
import { ShoppingCart, RotateCcw, LockKeyhole } from 'lucide-react';

interface CalculatorFormProps {
  input: OrderInput;
  feeMode: FeeMode;
  onChange: (updated: OrderInput) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  input,
  feeMode,
  onChange,
}) => {
  const updateField = <K extends keyof OrderInput>(field: K, val: OrderInput[K]) => {
    onChange({
      ...input,
      [field]: val,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
          <div className="p-1.5 rounded-lg bg-lime-950/80 text-lime-400 border border-lime-800/50">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-100">1. Thông tin Đơn hàng & Chi phí</h3>
            <p className="text-[11px] text-neutral-400">Doanh thu, giá vốn và phí khi giao thành công</p>
          </div>
        </div>

        {feeMode === 'auto' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl border border-neutral-800 bg-neutral-950/60 p-3.5">
            <div>
              <span className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                <LockKeyhole className="w-3 h-3" />
                Phí biến đổi đang tự áp
              </span>
              <strong className="mt-1 block font-mono text-sm text-lime-300">
                {input.platformFeePercent}%
              </strong>
            </div>
            <div>
              <span className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                <LockKeyhole className="w-3 h-3" />
                Phí cố định / đơn
              </span>
              <strong className="mt-1 block font-mono text-sm text-lime-300">
                {input.platformOrderFee.toLocaleString('vi-VN')}đ
              </strong>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberInput
              id="platformFeePercent"
              label={`Tổng phí sàn biến đổi (${input.platform === 'shopee' ? 'Shopee' : 'TikTok'}) %`}
              value={input.platformFeePercent}
              onChange={(v) => updateField('platformFeePercent', v)}
              isPercent
              suffix="%"
              helpText="Hoa hồng ngành + phí giao dịch áp dụng cho shop"
              quickStep={1}
              max={100}
            />

            <NumberInput
              id="platformOrderFee"
              label="Phí cố định / xử lý đơn"
              value={input.platformOrderFee}
              onChange={(v) => updateField('platformOrderFee', v)}
              helpText="Ví dụ phí hạ tầng / phí xử lý đơn"
              quickStep={1000}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput
            id="salePrice"
            label="Giá bán sản phẩm"
            value={input.salePrice}
            onChange={(v) => updateField('salePrice', v)}
            helpText="Giá khách thanh toán trên sàn"
            quickStep={10000}
          />

          <NumberInput
            id="productCost"
            label="Giá vốn hàng bán (COGS)"
            value={input.productCost}
            onChange={(v) => updateField('productCost', v)}
            helpText="Chi phí nhập / sản xuất 1 sản phẩm"
            quickStep={10000}
          />

          <NumberInput
            id="affiliatePercent"
            label="Chi phí Affiliate (KOL/KOC) %"
            value={input.affiliatePercent}
            onChange={(v) => updateField('affiliatePercent', v)}
            isPercent
            suffix="%"
            helpText="Tỷ lệ hoa hồng trả cho KOC / Tiếp thị"
            quickStep={1}
            max={100}
          />

          <NumberInput
            id="adCost"
            label="Quảng cáo / đơn thành công (Ad CPA)"
            value={input.adCost}
            onChange={(v) => updateField('adCost', v)}
            helpText="Chi phí quảng cáo trung bình 1 đơn"
            quickStep={5000}
          />

          <NumberInput
            id="packagingCost"
            label="Chi phí đóng gói / đơn"
            value={input.packagingCost}
            onChange={(v) => updateField('packagingCost', v)}
            helpText="Túi gói, hộp carton, băng keo, tem"
            quickStep={1000}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
          <div className="p-1.5 rounded-lg bg-orange-950/80 text-orange-400 border border-orange-800/50">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-100">2. Khi Khách Trả Hàng (Return Loss)</h3>
            <p className="text-[11px] text-neutral-400">Các chi phí phát sinh thực tế khi bị hoàn trả</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput
            id="outboundShippingCost"
            label="Ship chiều đi shop chịu"
            value={input.outboundShippingCost}
            onChange={(v) => updateField('outboundShippingCost', v)}
            helpText="Phí ship chiều đi shop tự trả/trợ giá"
            quickStep={1000}
          />

          <NumberInput
            id="returnShippingCost"
            label="Phí ship hoàn shop chịu"
            value={input.returnShippingCost}
            onChange={(v) => updateField('returnShippingCost', v)}
            helpText="Phí vận chuyển lượt quay về shop trả"
            quickStep={2000}
          />

          <NumberInput
            id="nonRefundableFees"
            label="Phí không được sàn hoàn trả"
            value={input.nonRefundableFees}
            onChange={(v) => updateField('nonRefundableFees', v)}
            helpText="Nhập phần phí thực tế không được hoàn ở trạng thái này"
            quickStep={1000}
          />

          <NumberInput
            id="reimbursementAmount"
            label="Tiền bồi hoàn nhận được"
            value={input.reimbursementAmount}
            onChange={(v) => updateField('reimbursementAmount', v)}
            helpText="Khoản bồi hoàn liên quan trực tiếp tới đơn hoàn"
            quickStep={5000}
          />
        </div>

        <div className="mt-2">
          <Slider
            id="resaleRecoveryPercent"
            label="Tỷ lệ khôi phục hàng hóa khi quay về"
            value={input.resaleRecoveryPercent}
            onChange={(v) => updateField('resaleRecoveryPercent', v)}
            helpText="0% nếu hàng hỏng/mất hoàn toàn; 100% nếu sản phẩm quay về và bán lại bình thường."
          />
        </div>
      </div>
    </div>
  );
};
