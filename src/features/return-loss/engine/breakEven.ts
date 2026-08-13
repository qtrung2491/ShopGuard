import { OrderInput } from '../types';

/**
 * Calculate Break-even Sale Price
 * Formula:
 *   salePrice * (1 - (platformFeePercent + affiliatePercent) / 100) = productCost + adCost + packagingCost + outboundShippingCost
 * Returns null if total variable fee % >= 100%.
 */
export function calculateBreakEvenSalePrice(input: OrderInput): number | null {
  const variableRate = (input.platformFeePercent + input.affiliatePercent) / 100;
  if (variableRate >= 1) {
    return null; // Impossible to reach break-even if platform + affiliate fees >= 100%
  }

  const fixedCosts = input.productCost + input.adCost + input.packagingCost + input.outboundShippingCost;
  const breakEven = fixedCosts / (1 - variableRate);

  return Math.max(0, Math.round(breakEven));
}

/**
 * Calculate Break-even Ad CPA
 * Formula:
 *   Max Ad Cost where successfulProfit = 0
 *   breakEvenAdCPA = salePrice - productCost - platformFee - affiliateFee - packagingCost - outboundShippingCost
 */
export function calculateBreakEvenAdCPA(input: OrderInput): number {
  const platformFee = input.salePrice * (input.platformFeePercent / 100);
  const affiliateFee = input.salePrice * (input.affiliatePercent / 100);

  const nonAdCost = input.productCost + platformFee + affiliateFee + input.packagingCost + input.outboundShippingCost;
  const cpa = input.salePrice - nonAdCost;

  return Math.round(cpa);
}

/**
 * Calculate Max Affiliate Percent
 * Formula:
 *   Max Affiliate % where successfulProfit = 0
 *   profitWithoutAffiliate = salePrice - productCost - platformFee - adCost - packagingCost - outboundShippingCost
 *   maxAffiliatePercent = (profitWithoutAffiliate / salePrice) * 100
 */
export function calculateMaxAffiliatePercent(input: OrderInput): number {
  if (input.salePrice <= 0) return 0;

  const platformFee = input.salePrice * (input.platformFeePercent / 100);
  const profitWithoutAffiliate = input.salePrice - input.productCost - platformFee - input.adCost - input.packagingCost - input.outboundShippingCost;

  const maxAffiliate = (profitWithoutAffiliate / input.salePrice) * 100;

  return Math.max(0, Number(maxAffiliate.toFixed(2)));
}
