import { OrderInput } from './types';

export interface Preset {
  id: string;
  name: string;
  description: string;
  input: OrderInput;
}

export const PRESETS: Preset[] = [
  {
    id: 'ao-19k',
    name: 'Áo 19k (Rủi ro hoàn)',
    description: 'Trường hợp thực tế seller bán áo 19.000đ khi bị khách hoàn trả',
    input: {
      platform: 'shopee',
      salePrice: 19000,
      productCost: 9000,
      platformFeePercent: 10,
      affiliatePercent: 5,
      adCost: 3000,
      packagingCost: 1000,
      outboundShippingCost: 2700,
      returnShippingCost: 5000,
      nonRefundableFees: 0,
      reimbursementAmount: 0,
      resaleRecoveryPercent: 50,
    },
  },
  {
    id: 'thoi-trang-shopee',
    name: 'Thời trang Shopee chuẩn',
    description: 'Sản phẩm thời trang 150.000đ bán trên Shopee',
    input: {
      platform: 'shopee',
      salePrice: 150000,
      productCost: 60000,
      platformFeePercent: 10.5,
      affiliatePercent: 5,
      adCost: 20000,
      packagingCost: 4000,
      outboundShippingCost: 5000,
      returnShippingCost: 10000,
      nonRefundableFees: 0,
      reimbursementAmount: 0,
      resaleRecoveryPercent: 80,
    },
  },
  {
    id: 'my-pham-tiktok',
    name: 'Mỹ phẩm TikTok Shop',
    description: 'Sản phẩm mỹ phẩm 250.000đ chạy Ads + Affiliate TikTok',
    input: {
      platform: 'tiktok',
      salePrice: 250000,
      productCost: 80000,
      platformFeePercent: 11,
      affiliatePercent: 10,
      adCost: 45000,
      packagingCost: 6000,
      outboundShippingCost: 0,
      returnShippingCost: 12000,
      nonRefundableFees: 0,
      reimbursementAmount: 0,
      resaleRecoveryPercent: 90,
    },
  },
  {
    id: 'cong-kenh-hong-100',
    name: 'Đồ gia dụng (Hoàn hỏng 100%)',
    description: 'Hàng cồng kềnh/dễ vỡ bị hỏng hoàn toàn khi vận chuyển hoàn',
    input: {
      platform: 'shopee',
      salePrice: 320000,
      productCost: 160000,
      platformFeePercent: 10,
      affiliatePercent: 3,
      adCost: 35000,
      packagingCost: 12000,
      outboundShippingCost: 15000,
      returnShippingCost: 25000,
      nonRefundableFees: 5000,
      reimbursementAmount: 0,
      resaleRecoveryPercent: 0,
    },
  },
];
