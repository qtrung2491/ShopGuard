import { OrderInput } from './types';

export const DEFAULT_SHOPEE_INPUT: OrderInput = {
  platform: 'shopee',
  salePrice: 150000,
  productCost: 65000,
  platformFeePercent: 10,
  affiliatePercent: 5,
  adCost: 20000,
  packagingCost: 4000,
  outboundShippingCost: 5000,
  returnShippingCost: 10000,
  nonRefundableFees: 0,
  reimbursementAmount: 0,
  resaleRecoveryPercent: 80,
};

export const DEFAULT_TIKTOK_INPUT: OrderInput = {
  platform: 'tiktok',
  salePrice: 180000,
  productCost: 75000,
  platformFeePercent: 11,
  affiliatePercent: 6,
  adCost: 25000,
  packagingCost: 5000,
  outboundShippingCost: 6000,
  returnShippingCost: 12000,
  nonRefundableFees: 0,
  reimbursementAmount: 0,
  resaleRecoveryPercent: 70,
};
