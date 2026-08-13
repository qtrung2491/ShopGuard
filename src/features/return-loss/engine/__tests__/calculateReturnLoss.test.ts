import { describe, expect, it } from 'vitest';
import { calculateReturnLoss } from '../calculateReturnLoss';
import {
  calculateBreakEvenAdCPA,
  calculateBreakEvenSalePrice,
  calculateMaxAffiliatePercent,
} from '../breakEven';
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

  it('calculates a normal profitable order', () => {
    const result = calculateReturnLoss(baseInput);
    expect(result.platformFee).toBe(10000);
    expect(result.affiliateFee).toBe(5000);
    expect(result.successfulProfit).toBe(30000);
    expect(result.successfulMarginPercent).toBe(30);
  });

  it('detects a loss-making order', () => {
    const result = calculateReturnLoss({ ...baseInput, salePrice: 50000 });
    expect(result.successfulProfit).toBeLessThan(0);
    expect(result.warnings.some((warning) => warning.id === 'negative-margin')).toBe(true);
  });

  it('handles sale price = 0 without NaN margin', () => {
    const result = calculateReturnLoss({ ...baseInput, salePrice: 0 });
    expect(result.successfulMarginPercent).toBe(0);
    expect(Number.isFinite(result.successfulProfit)).toBe(true);
  });

  it('returns null break-even price when variable fees are >= 100%', () => {
    const result = calculateBreakEvenSalePrice({
      ...baseInput,
      platformFeePercent: 60,
      affiliatePercent: 50,
    });
    expect(result).toBeNull();
  });

  it('does not count inventory damage when recovery is 100%', () => {
    const result = calculateReturnLoss({ ...baseInput, resaleRecoveryPercent: 100 });
    expect(result.inventoryDamageLoss).toBe(0);
  });

  it('counts full product cost when recovery is 0%', () => {
    const result = calculateReturnLoss({
      ...baseInput,
      productCost: 50000,
      resaleRecoveryPercent: 0,
    });
    expect(result.inventoryDamageLoss).toBe(50000);
  });

  it('subtracts reimbursement from return loss', () => {
    const withoutReimbursement = calculateReturnLoss(baseInput);
    const withReimbursement = calculateReturnLoss({
      ...baseInput,
      reimbursementAmount: 15000,
    });

    expect(withReimbursement.returnedOrderLoss).toBe(
      withoutReimbursement.returnedOrderLoss - 15000,
    );
  });

  it('never lets reimbursement make return loss negative', () => {
    const result = calculateReturnLoss({
      ...baseInput,
      reimbursementAmount: 999999,
    });

    expect(result.returnedOrderLoss).toBe(0);
    expect(result.reimbursementApplied).toBe(result.grossReturnLoss);
  });

  it('calculates break-even ad CPA', () => {
    expect(calculateBreakEvenAdCPA(baseInput)).toBe(40000);
  });

  it('calculates max affiliate percent', () => {
    expect(calculateMaxAffiliatePercent(baseInput)).toBe(35);
  });

  it('normalizes negative and non-finite values', () => {
    const result = calculateReturnLoss({
      ...baseInput,
      salePrice: Number.NaN,
      productCost: -100,
      adCost: Number.POSITIVE_INFINITY,
      platformFeePercent: 150,
      affiliatePercent: -20,
    });

    expect(result.successfulMarginPercent).toBe(0);
    expect(result.platformFee).toBe(0);
    expect(result.affiliateFee).toBe(0);
    expect(Number.isFinite(result.returnedOrderLoss)).toBe(true);
  });

  it('clamps recovery percent above 100%', () => {
    const result = calculateReturnLoss({
      ...baseInput,
      resaleRecoveryPercent: 500,
    });
    expect(result.inventoryDamageLoss).toBe(0);
  });

  it('serializes and deserializes query parameters', () => {
    if (typeof globalThis.window === 'undefined') {
      (globalThis as unknown as { window: { location: { pathname: string; search: string } } }).window = {
        location: { pathname: '/', search: '' },
      };
    }

    const url = serializeStateToUrl(baseInput);
    expect(url).toContain('price=100000');
    expect(url).toContain('cost=40000');
    expect(url).toContain('p=shopee');

    const searchPart = url.split('?')[1] ?? '';
    (globalThis.window.location as unknown as { search: string }).search = `?${searchPart}`;

    const parsed = deserializeStateFromUrl();
    expect(parsed?.salePrice).toBe(100000);
    expect(parsed?.productCost).toBe(40000);
    expect(parsed?.platform).toBe('shopee');
  });
});
