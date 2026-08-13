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
    name: 'Áo 19k (demo)',
    description: 'Ví dụ minh họa case áo 19.000đ; hãy chỉnh phí theo shop thực tế',
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
    name: 'Thời trang Shopee (demo)',
    description: 'Ví dụ minh họa; các tỷ lệ phí không phải biểu phí chính thức',
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
    name: 'Mỹ phẩm TikTok (demo)',
    description: 'Ví dụ minh họa Ads + Affiliate; hãy thay bằng chi phí thực tế của shop',
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
    name: 'Hàng dễ vỡ (demo)',
    description: 'Ví dụ hàng bị hỏng hoàn toàn khi quay về; số phí chỉ để minh họa',
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
