import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** "$52.80" not "$52.8": whole dollars render bare, fractional prices keep two decimals. */
export function formatPrice(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}
