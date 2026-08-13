import { FEE_CATEGORIES, PLATFORM_BASE_FEES } from './data';
import { FeeCategory, ResolvedPlatformFee, SellerType } from './types';
import { Platform } from '../return-loss/types';

export function getFeeCategories(platform: Platform): FeeCategory[] {
  return FEE_CATEGORIES.filter((category) => category.platform === platform);
}

export function getFeeCategory(categoryId: string): FeeCategory | null {
  return FEE_CATEGORIES.find((category) => category.id === categoryId) ?? null;
}

export function resolvePlatformFee(
  platform: Platform,
  sellerType: SellerType,
  categoryId: string,
): ResolvedPlatformFee | null {
  const category = getFeeCategory(categoryId);
  if (!category || category.platform !== platform) return null;

  const baseFee = PLATFORM_BASE_FEES.find((fee) => fee.platform === platform);
  if (!baseFee) return null;

  const commissionRate =
    sellerType === 'mall'
      ? category.mallCommissionRate
      : category.standardCommissionRate;

  return {
    category,
    sellerType,
    commissionRate,
    transactionRate: baseFee.transactionRate,
    totalVariableRate: Number(
      (commissionRate + baseFee.transactionRate).toFixed(2),
    ),
    orderProcessingFee: baseFee.orderProcessingFee,
  };
}
