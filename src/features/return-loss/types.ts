export type Platform = 'shopee' | 'tiktok';

export interface OrderInput {
  platform: Platform;

  salePrice: number;            // Giá bán
  productCost: number;          // Giá vốn hàng bán

  platformFeePercent: number;   // Phí sàn %
  affiliatePercent: number;     // Affiliate %

  adCost: number;               // Quảng cáo / đơn
  packagingCost: number;        // Chi phí đóng gói

  outboundShippingCost: number; // Phí ship chiều đi shop chịu
  returnShippingCost: number;   // Phí ship hoàn shop chịu

  nonRefundableFees: number;    // Phí không được hoàn
  reimbursementAmount: number;  // Tiền được bồi hoàn từ sàn/đơn vị vận chuyển

  resaleRecoveryPercent: number;// % giá trị hàng có thể recover (0% = hỏng hoàn toàn, 100% = bán lại bình thường)
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
  affiliateFee: number;

  totalSuccessfulOrderCost: number;
  successfulProfit: number;
  successfulMarginPercent: number;

  inventoryDamageLoss: number;
  returnedOrderLoss: number;

  breakEvenSalePrice: number | null;
  breakEvenAdCPA: number;
  maxAffiliatePercent: number;

  warnings: AnalysisWarning[];
}
