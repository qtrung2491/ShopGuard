import { OrderInput, OrderAnalysis } from '../types';
import {
  calculateBreakEvenSalePrice,
  calculateBreakEvenAdCPA,
  calculateMaxAffiliatePercent,
} from './breakEven';
import { detectMoneyLeaks } from './moneyLeakDetector';

const nonNegative = (value: number): number =>
  Number.isFinite(value) ? Math.max(0, value) : 0;

const percent = (value: number): number =>
  Math.min(100, nonNegative(value));

export function calculateReturnLoss(input: OrderInput): OrderAnalysis {
  const safeInput: OrderInput = {
    ...input,
    salePrice: nonNegative(input.salePrice),
    productCost: nonNegative(input.productCost),
    platformFeePercent: percent(input.platformFeePercent),
    platformOrderFee: nonNegative(input.platformOrderFee),
    affiliatePercent: percent(input.affiliatePercent),
    adCost: nonNegative(input.adCost),
    packagingCost: nonNegative(input.packagingCost),
    outboundShippingCost: nonNegative(input.outboundShippingCost),
    returnShippingCost: nonNegative(input.returnShippingCost),
    nonRefundableFees: nonNegative(input.nonRefundableFees),
    reimbursementAmount: nonNegative(input.reimbursementAmount),
    resaleRecoveryPercent: percent(input.resaleRecoveryPercent),
  };

  const {
    salePrice,
    productCost,
    platformFeePercent,
    platformOrderFee,
    affiliatePercent,
    adCost,
    packagingCost,
    outboundShippingCost,
    returnShippingCost,
    nonRefundableFees,
    reimbursementAmount,
    resaleRecoveryPercent,
  } = safeInput;

  const platformFee = Math.round(salePrice * (platformFeePercent / 100));
  const safePlatformOrderFee = Math.round(platformOrderFee);
  const affiliateFee = Math.round(salePrice * (affiliatePercent / 100));

  const totalSuccessfulOrderCost = Math.round(
    productCost +
      platformFee +
      safePlatformOrderFee +
      affiliateFee +
      adCost +
      packagingCost +
      outboundShippingCost,
  );

  const successfulProfit = Math.round(salePrice - totalSuccessfulOrderCost);
  const successfulMarginPercent =
    salePrice > 0 ? (successfulProfit / salePrice) * 100 : 0;

  const inventoryDamageLoss = Math.round(
    productCost * (1 - resaleRecoveryPercent / 100),
  );

  // Fixed platform/order fees are intentionally NOT copied into return loss here.
  // Whether those fees are refundable depends on platform policy and order state.
  // Sellers can enter any non-refundable amount explicitly in nonRefundableFees.
  const grossReturnLoss = Math.round(
    adCost +
      packagingCost +
      outboundShippingCost +
      returnShippingCost +
      nonRefundableFees +
      inventoryDamageLoss,
  );

  const reimbursementApplied = Math.min(
    grossReturnLoss,
    Math.round(reimbursementAmount),
  );
  const returnedOrderLoss = Math.max(
    0,
    grossReturnLoss - reimbursementApplied,
  );

  const breakEvenSalePrice = calculateBreakEvenSalePrice(safeInput);
  const breakEvenAdCPA = calculateBreakEvenAdCPA(safeInput);
  const maxAffiliatePercent = calculateMaxAffiliatePercent(safeInput);

  const warnings = detectMoneyLeaks(
    safeInput,
    successfulProfit,
    successfulMarginPercent,
    returnedOrderLoss,
    breakEvenAdCPA,
    maxAffiliatePercent,
  );

  return {
    platformFee,
    platformOrderFee: safePlatformOrderFee,
    affiliateFee,
    totalSuccessfulOrderCost,
    successfulProfit,
    successfulMarginPercent: Number(successfulMarginPercent.toFixed(2)),
    inventoryDamageLoss,
    grossReturnLoss,
    reimbursementApplied,
    returnedOrderLoss,
    breakEvenSalePrice,
    breakEvenAdCPA,
    maxAffiliatePercent,
    warnings,
  };
}
