import { OrderInput } from '../types';

export function calculateBreakEvenSalePrice(input: OrderInput): number | null {
  const variableRate =
    (input.platformFeePercent + input.affiliatePercent) / 100;

  if (variableRate >= 1) {
    return null;
  }

  const fixedCosts =
    input.productCost +
    input.platformOrderFee +
    input.adCost +
    input.packagingCost +
    input.outboundShippingCost;

  const breakEven = fixedCosts / (1 - variableRate);
  return Math.max(0, Math.round(breakEven));
}

export function calculateBreakEvenAdCPA(input: OrderInput): number {
  const platformFee =
    input.salePrice * (input.platformFeePercent / 100);
  const affiliateFee =
    input.salePrice * (input.affiliatePercent / 100);

  const nonAdCost =
    input.productCost +
    platformFee +
    input.platformOrderFee +
    affiliateFee +
    input.packagingCost +
    input.outboundShippingCost;

  return Math.round(input.salePrice - nonAdCost);
}

export function calculateMaxAffiliatePercent(input: OrderInput): number {
  if (input.salePrice <= 0) return 0;

  const platformFee =
    input.salePrice * (input.platformFeePercent / 100);

  const profitWithoutAffiliate =
    input.salePrice -
    input.productCost -
    platformFee -
    input.platformOrderFee -
    input.adCost -
    input.packagingCost -
    input.outboundShippingCost;

  const maxAffiliate =
    (profitWithoutAffiliate / input.salePrice) * 100;

  return Math.max(0, Number(maxAffiliate.toFixed(2)));
}
