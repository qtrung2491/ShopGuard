import { OrderInput, Platform } from '../features/return-loss/types';
import { parseNumberInput } from './number';

const PARAM_MAP: Record<keyof OrderInput, string> = {
  platform: 'p',
  salePrice: 'price',
  productCost: 'cost',
  platformFeePercent: 'fee',
  platformOrderFee: 'orderfee',
  affiliatePercent: 'aff',
  adCost: 'ad',
  packagingCost: 'pack',
  outboundShippingCost: 'outship',
  returnShippingCost: 'retship',
  nonRefundableFees: 'nonref',
  reimbursementAmount: 'reimb',
  resaleRecoveryPercent: 'recover',
};

export function serializeStateToUrl(input: OrderInput): string {
  const params = new URLSearchParams();

  params.set(PARAM_MAP.platform, input.platform);
  params.set(PARAM_MAP.salePrice, input.salePrice.toString());
  params.set(PARAM_MAP.productCost, input.productCost.toString());
  params.set(PARAM_MAP.platformFeePercent, input.platformFeePercent.toString());
  params.set(PARAM_MAP.platformOrderFee, input.platformOrderFee.toString());
  params.set(PARAM_MAP.affiliatePercent, input.affiliatePercent.toString());
  params.set(PARAM_MAP.adCost, input.adCost.toString());
  params.set(PARAM_MAP.packagingCost, input.packagingCost.toString());
  params.set(PARAM_MAP.outboundShippingCost, input.outboundShippingCost.toString());
  params.set(PARAM_MAP.returnShippingCost, input.returnShippingCost.toString());
  params.set(PARAM_MAP.nonRefundableFees, input.nonRefundableFees.toString());
  params.set(PARAM_MAP.reimbursementAmount, input.reimbursementAmount.toString());
  params.set(PARAM_MAP.resaleRecoveryPercent, input.resaleRecoveryPercent.toString());

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  return `${pathname}?${params.toString()}`;
}

export function deserializeStateFromUrl(): Partial<OrderInput> | null {
  if (typeof window === 'undefined') return null;

  const searchParams = new URLSearchParams(window.location.search);
  if ([...searchParams.keys()].length === 0) return null;

  const result: Partial<OrderInput> = {};

  const platform = searchParams.get(PARAM_MAP.platform);
  if (platform === 'shopee' || platform === 'tiktok') {
    result.platform = platform as Platform;
  }

  const numericKeys: (keyof Omit<OrderInput, 'platform'>)[] = [
    'salePrice',
    'productCost',
    'platformFeePercent',
    'platformOrderFee',
    'affiliatePercent',
    'adCost',
    'packagingCost',
    'outboundShippingCost',
    'returnShippingCost',
    'nonRefundableFees',
    'reimbursementAmount',
    'resaleRecoveryPercent',
  ];

  let hasAnyKey = false;
  for (const key of numericKeys) {
    const val = searchParams.get(PARAM_MAP[key]);
    if (val !== null) {
      result[key] = parseNumberInput(val);
      hasAnyKey = true;
    }
  }

  return hasAnyKey ? result : null;
}
