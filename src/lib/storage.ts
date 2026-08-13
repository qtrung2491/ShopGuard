import { OrderInput } from '../features/return-loss/types';

const STORAGE_KEY = 'shopguard_return_loss_input_v1';

export function saveToStorage(input: OrderInput): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
  } catch {
    // Ignore quota or storage errors gracefully
  }
}

export function loadFromStorage(): Partial<OrderInput> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
