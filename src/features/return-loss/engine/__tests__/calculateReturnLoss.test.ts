import { describe, it, expect } from 'vitest';
import { calculateReturnLoss } from '../calculateReturnLoss';
import { calculateBreakEvenAdCPA, calculateMaxAffiliatePercent, calculateBreakEvenSalePrice } from '../breakEven';
import { OrderInput } from '../../types';
import { serializeStateToUrl, deserializeStateFromUrl } from '../../../../lib/url';

describe('Financial Engine Tests', () => {
  const baseInput: OrderInput = {
    platform: 'shopee',
    salePrice: 100000,
    productCost: 40000,
    platformFeePercent: 10,
    affiliatePercent: 5,
    adCost: 10000,
    packagingCost: 2000,
    outboundShippingCost: 3000,
    returnShippingCost: 5000,
    nonRefundableFees: 0,
    reimbursementAmount: 0,
    resaleRecoveryPercent: 100,
  };

  it('1. Normal profitable order', () => {
    const res = calculateReturnLoss(baseInput);
    // platformFee = 10k, affiliate = 5k
    // totalCost = 40k + 10k + 5k + 10k + 2k + 3k = 70k
    // profit = 100k - 70k = 30k
    expect(res.platformFee).toBe(10000);
    expect(res.affiliateFee).toBe(5000);
    expect(res.successfulProfit).toBe(30000);
    expect(res.successfulMarginPercent).toBe(30);
  });

  it('2. Loss-making order', () => {
    const input: OrderInput = {
      ...baseInput,
      salePrice: 50000, // Total cost = 40k + 5k + 2.5k + 10k + 2k + 3k = 62.5k -> profit = -12.5k
    };
    const res = calculateReturnLoss(input);
    expect(res.successfulProfit).toBeLessThan(0);
    expect(res.warnings.some(w => w.id === 'negative-margin')).toBe(true);
  });

  it('3. Sale price = 0', () => {
    const input: OrderInput = {
      ...baseInput,
      salePrice: 0,
    };
    const res = calculateReturnLoss(input);
    expect(res.successfulMarginPercent).toBe(0);
    expect(res.successfulProfit).toBeLessThan(0);
  });

  it('4. Variable fee >= 100%', () => {
    const input: OrderInput = {
      ...baseInput,
      platformFeePercent: 60,
      affiliatePercent: 50, // 110%
    };
    const breakEvenPrice = calculateBreakEvenSalePrice(input);
    expect(breakEvenPrice).toBeNull();
  });

  it('5. Resale recovery 100%', () => {
    const input: OrderInput = {
      ...baseInput,
      resaleRecoveryPercent: 100,
    };
    const res = calculateReturnLoss(input);
    expect(res.inventoryDamageLoss).toBe(0);
  });

  it('6. Resale recovery 0%', () => {
    const input: OrderInput = {
      ...baseInput,
      productCost: 50000,
      resaleRecoveryPercent: 0,
    };
    const res = calculateReturnLoss(input);
    expect(res.inventoryDamageLoss).toBe(50000);
  });

  it('7. With reimbursement', () => {
    const input: OrderInput = {
      ...baseInput,
      reimbursementAmount: 15000,
    };
    const resWithReimbursement = calculateReturnLoss(input);
    const resWithout = calculateReturnLoss(baseInput);

    expect(resWithReimbursement.returnedOrderLoss).toBe(resWithout.returnedOrderLoss - 15000);
  });

  it('8. Break-even CPA', () => {
    const cpa = calculateBreakEvenAdCPA(baseInput);
    // nonAdCost = 40k (product) + 10k (fee) + 5k (aff) + 2k (pack) + 3k (ship) = 60k
    // breakEven CPA = 100k - 60k = 40k
    expect(cpa).toBe(40000);
  });

  it('9. Max affiliate', () => {
    const maxAff = calculateMaxAffiliatePercent(baseInput);
    // profit without affiliate = 100k - 40k - 10k - 10k - 2k - 3k = 35k
    // max affiliate % = 35k / 100k * 100 = 35%
    expect(maxAff).toBe(35);
  });

  it('10. Query param serialize/deserialize', () => {
    // Mock global window object for test environment
    if (typeof globalThis.window === 'undefined') {
      (globalThis as unknown as { window: unknown }).window = {
        location: { pathname: '/', search: '' },
      };
    }

    const urlStr = serializeStateToUrl(baseInput);
    expect(urlStr).toContain('price=100000');
    expect(urlStr).toContain('cost=40000');
    expect(urlStr).toContain('p=shopee');

    // Simulate window.location.search parsing
    const searchPart = urlStr.split('?')[1];
    (globalThis.window.location as { search: string }).search = `?${searchPart}`;

    const parsed = deserializeStateFromUrl();
    expect(parsed?.salePrice).toBe(100000);
    expect(parsed?.productCost).toBe(40000);
    expect(parsed?.platform).toBe('shopee');
  });
});
