/**
 * Safely parse a numeric input string, stripping non-numeric chars except digits and decimals.
 */
export function parseNumberInput(input: string | number): number {
  if (typeof input === 'number') {
    return isNaN(input) ? 0 : Math.max(0, input);
  }
  if (!input) return 0;

  // Remove trailing currency symbols, spaces, dots used as thousand separators
  // Note in VI locale, dots are thousand separators, commas are decimals
  const cleaned = input
    .replace(/[^\d.,-]/g, '')
    .replace(/\./g, '')
    .replace(/,/g, '.');

  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : Math.max(0, parsed);
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
