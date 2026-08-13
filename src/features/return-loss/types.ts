export type Platform = 'shopee' | 'tiktok';

export interface OrderInput {
  platform: Platform;
  salePrice: number;
  productCost: number;
  platformFeePercent: number;
  platformOrderFee: number;
  affiliatePercent: number;
  adCost: number;
  packagingCost: number;
  outboundShippingCost: number;
  returnShippingCost: number;
  nonRefundableFees: number;
  reimbursementAmount: number;
  resaleRecoveryPercent: number;
}

export type Severity = 'critical' | 'warning' | 'info';

export interface AnalysisWarning {
  id: string;
  severity: Severity;
  title: string;
  message: string;
}

export interface OrderAnalysis {
  platformFee: number;
  platformOrderFee: number;
  affiliateFee: number;
  totalSuccessfulOrderCost: number;
  successfulProfit: number;
  successfulMarginPercent: number;
  inventoryDamageLoss: number;
  grossReturnLoss: number;
  reimbursementApplied: number;
  returnedOrderLoss: number;
  breakEvenSalePrice: number | null;
  breakEvenAdCPA: number;
  maxAffiliatePercent: number;
  warnings: AnalysisWarning[];
}
