/**
 * Format a number into Vietnamese Dong (VND) currency string.
 * Examples:
 *   16300 => "+16.300đ" (if withSign is true) or "16.300đ"
 *   -30500 => "-30.500đ"
 *   0 => "0đ"
 */
export function formatVND(amount: number, options: { showSign?: boolean } = {}): string {
  if (isNaN(amount) || !isFinite(amount)) return '0đ';
  
  const rounded = Math.round(amount);
  const formatted = Math.abs(rounded).toLocaleString('vi-VN');
  
  if (rounded > 0 && options.showSign) {
    return `+${formatted}đ`;
  }
  if (rounded < 0) {
    return `-${formatted}đ`;
  }
  return `${formatted}đ`;
}

/**
 * Format percentage with optional decimal places
 * Example: 8.56 => "8,6%"
 */
export function formatPercent(value: number, decimals: number = 1): string {
  if (isNaN(value) || !isFinite(value)) return '0%';
  const formatted = value.toLocaleString('vi-VN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
  return `${formatted}%`;
}
