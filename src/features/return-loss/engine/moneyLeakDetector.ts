import { OrderInput, AnalysisWarning } from '../types';
import { formatVND, formatPercent } from '../../../lib/currency';

export function detectMoneyLeaks(
  input: OrderInput,
  successfulProfit: number,
  successfulMarginPercent: number,
  returnedOrderLoss: number,
  breakEvenAdCPA: number,
  maxAffiliatePercent: number
): AnalysisWarning[] {
  const warnings: AnalysisWarning[] = [];

  // 1. Negative Margin
  if (successfulProfit < 0) {
    warnings.push({
      id: 'negative-margin',
      severity: 'critical',
      title: 'Đơn hàng đang bán lỗ!',
      message: `Đơn này đang bán càng nhiều càng lỗ. Bạn đang lỗ ${formatVND(Math.abs(successfulProfit))} cho mỗi đơn giao thành công.`,
    });
  }
  // 2. Low Margin
  else if (successfulMarginPercent >= 0 && successfulMarginPercent <= 5) {
    warnings.push({
      id: 'low-margin',
      severity: 'warning',
      title: 'Biên lợi nhuận rất thấp',
      message: `Biên lợi nhuận chỉ đạt ${formatPercent(successfulMarginPercent)}. Một khoản phí ẩn hoặc hoàn hàng nhỏ có thể làm chuyển sang lỗ.`,
    });
  }

  // 3. Affiliate nguy hiểm
  if (maxAffiliatePercent > 0 && input.affiliatePercent > 0.8 * maxAffiliatePercent) {
    warnings.push({
      id: 'high-affiliate',
      severity: 'warning',
      title: 'Chi phí Affiliate gần mức hòa vốn',
      message: `Tỷ lệ Affiliate hiện tại (${formatPercent(input.affiliatePercent)}) đã chiếm hơn 80% mức hòa vốn cho phép (${formatPercent(maxAffiliatePercent)}).`,
    });
  }

  // 4. Ads nguy hiểm
  if (breakEvenAdCPA > 0 && input.adCost > 0.8 * breakEvenAdCPA) {
    const ratio = Math.round((input.adCost / breakEvenAdCPA) * 100);
    warnings.push({
      id: 'high-ad-cpa',
      severity: 'warning',
      title: 'Chi phí quảng cáo quá sát trần hòa vốn',
      message: `Chi phí Ads (${formatVND(input.adCost)}) đã chạm ${ratio}% CPA hòa vốn (${formatVND(breakEvenAdCPA)}).`,
    });
  }

  // 5. Return loss lớn
  if (successfulProfit > 0 && returnedOrderLoss > successfulProfit) {
    const ordersToCover = (returnedOrderLoss / successfulProfit).toFixed(1);
    warnings.push({
      id: 'large-return-loss',
      severity: 'warning',
      title: 'Một đơn hoàn xóa sạch lợi nhuận nhiều đơn thành công',
      message: `1 đơn hoàn (${formatVND(returnedOrderLoss)}) sẽ ăn hết lợi nhuận của ${ordersToCover} đơn giao thành công!`,
    });
  }

  return warnings;
}
