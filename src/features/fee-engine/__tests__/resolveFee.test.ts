import { describe, expect, it } from 'vitest';
import { resolvePlatformFee } from '../resolveFee';

describe('Fee Engine', () => {
  it('resolves TikTok standard womens t-shirt fees', () => {
    const fee = resolvePlatformFee(
      'tiktok',
      'standard',
      'tiktok-womens-tshirt',
    );

    expect(fee).not.toBeNull();
    expect(fee?.commissionRate).toBe(15);
    expect(fee?.transactionRate).toBe(6);
    expect(fee?.totalVariableRate).toBe(21);
    expect(fee?.orderProcessingFee).toBe(3000);
  });

  it('resolves Shopee Mall laptop snapshot', () => {
    const fee = resolvePlatformFee('shopee', 'mall', 'shopee-laptop');

    expect(fee).not.toBeNull();
    expect(fee?.commissionRate).toBe(3.8);
    expect(fee?.transactionRate).toBe(6);
    expect(fee?.totalVariableRate).toBe(9.8);
    expect(fee?.orderProcessingFee).toBe(3000);
  });

  it('returns null when category belongs to another platform', () => {
    expect(
      resolvePlatformFee('shopee', 'standard', 'tiktok-womens-tshirt'),
    ).toBeNull();
  });

  it('returns null for unknown categories', () => {
    expect(
      resolvePlatformFee('tiktok', 'standard', 'does-not-exist'),
    ).toBeNull();
  });
});
