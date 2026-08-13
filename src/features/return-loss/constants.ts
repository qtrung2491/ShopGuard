import { OrderInput } from './types';

const BASE_INPUT: Omit<OrderInput, 'platform'> = {
  salePrice: 150000,
  productCost: 65000,
  platformFeePercent: 0,
  platformOrderFee: 0,
  affiliatePercent: 0,
  adCost: 20000,
  packagingCost: 4000,
  outboundShippingCost: 5000,
  returnShippingCost: 10000,
  nonRefundableFees: 0,
  reimbursementAmount: 0,
  resaleRecoveryPercent: 80,
};

export const DEFAULT_SHOPEE_INPUT: OrderInput = {
  ...BASE_INPUT,
  platform: 'shopee',
};

export const DEFAULT_TIKTOK_INPUT: OrderInput = {
  ...BASE_INPUT,
  platform: 'tiktok',
};
