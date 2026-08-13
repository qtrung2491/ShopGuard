import { OrderInput, OrderAnalysis } from '../types';
import { calculateBreakEvenSalePrice, calculateBreakEvenAdCPA, calculateMaxAffiliatePercent } from './breakEven';
import { detectMoneyLeaks } from './moneyLeakDetector';

export function calculateReturnLoss(input: OrderInput): OrderAnalysis {
  // Ensure non-negative numbers for input fields
  const salePrice = Math.max(0, input.salePrice || 0);
  const productCost = Math.max(0, input.productCost || 0);
  const platformFeePercent = Math.max(0, input.platformFeePercent || 0);
  const affiliatePercent = Math.max(0, input.affiliatePercent || 0);
  const adCost = Math.max(0, input.adCost || 0);
  const packagingCost = Math.max(0, input.packagingCost || 0);
  const outboundShippingCost = Math.max(0, input.outboundShippingCost || 0);
  const returnShippingCost = Math.max(0, input.returnShippingCost || 0);
  const nonRefundableFees = Math.max(0, input.nonRefundableFees || 0);
  const reimbursementAmount = Math.max(0, input.reimbursementAmount || 0);
  const resaleRecoveryPercent = Math.min(100, Math.max(0, input.resaleRecoveryPercent ?? 100));

  const safeInput: OrderInput = {
    ...input,
    salePrice,
    productCost,
    platformFeePercent,
    affiliatePercent,
    adCost,
    packagingCost,
    outboundShippingCost,
    returnShippingCost,
    nonRefundableFees,
    reimbursementAmount,
    resaleRecoveryPercent,
  };

  // 1. Successful order fees
  const platformFee = Math.round(salePrice * (platformFeePercent / 100));
  const affiliateFee = Math.round(salePrice * (affiliatePercent / 100));

  const totalSuccessfulOrderCost = Math.round(
    productCost + platformFee + affiliateFee + adCost + packagingCost + outboundShippingCost
  );

  const successfulProfit = Math.round(salePrice - totalSuccessfulOrderCost);
  const successfulMarginPercent = salePrice > 0 ? (successfulProfit / salePrice) * 100 : 0;

  // 2. Return order loss
  const inventoryDamageLoss = Math.round(productCost * (1 - resaleRecoveryPercent / 100));
  const returnedOrderLoss = Math.round(
    adCost +
    packagingCost +
    outboundShippingCost +
    returnShippingCost +
    nonRefundableFees +
    inventoryDamageLoss -
    reimbursementAmount
  );

  // 3. Break-even analysis
  const breakEvenSalePrice = calculateBreakEvenSalePrice(safeInput);
  const breakEvenAdCPA = calculateBreakEvenAdCPA(safeInput);
  const maxAffiliatePercent = calculateMaxAffiliatePercent(safeInput);

  // 4. Money Leak Warnings
  const warnings = detectMoneyLeaks(
    safeInput,
    successfulProfit,
    successfulMarginPercent,
    returnedOrderLoss,
    breakEvenAdCPA,
    maxAffiliatePercent
  );

  return {
    platformFee,
    affiliateFee,
    totalSuccessfulOrderCost,
    successfulProfit,
    successfulMarginPercent: Number(successfulMarginPercent.toFixed(2)),
    inventoryDamageLoss,
    returnedOrderLoss,
    breakEvenSalePrice,
    breakEvenAdCPA,
    maxAffiliatePercent,
    warnings,
  };
}
