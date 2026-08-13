import { Platform } from '../return-loss/types';

export type SellerType = 'standard' | 'mall';
export type FeeSourceStatus = 'official' | 'reference-snapshot';

export interface FeeCategory {
  id: string;
  platform: Platform;
  group: string;
  label: string;
  standardCommissionRate: number;
  mallCommissionRate: number;
  effectiveFrom: string;
  sourceStatus: FeeSourceStatus;
  sourceLabel: string;
  sourceUrl: string;
  note?: string;
}

export interface PlatformBaseFee {
  platform: Platform;
  transactionRate: number;
  orderProcessingFee: number;
  effectiveFrom: string;
  sourceLabel: string;
  sourceUrl: string;
}

export interface ResolvedPlatformFee {
  category: FeeCategory;
  sellerType: SellerType;
  commissionRate: number;
  transactionRate: number;
  totalVariableRate: number;
  orderProcessingFee: number;
}
