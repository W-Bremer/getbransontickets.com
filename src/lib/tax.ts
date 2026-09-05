// Tax-out display math. The catalog's priceFrom/childPriceFrom stay the
// tax-inclusive box-office rates and remain what checkout charges; pages
// advertise the pre-tax base, and the embedded tax surfaces once, as a
// cart-level "Taxes" row at checkout. Display decomposition only: no charged
// amount anywhere may change because of this module.
//
// Rate = ~10.35% combined MO/Taney/Branson/TCED sales tax + 4% City of
// Branson tourism tax on admission tickets. TODO(William): verify against a
// box-office receipt or Cindy before adjusting, then leave it alone; the
// labeled Taxes line must equal genuine tax embedded in the retail rate.
export const TAX_RATE = 0.1435;

/** Pre-tax display price for one tax-inclusive dollar amount. */
export function baseOf(priceDollars: number): number {
  return Math.round((priceDollars / (1 + TAX_RATE)) * 100) / 100;
}

/** Embedded tax for one tax-inclusive dollar amount (full minus base). */
export function taxOf(priceDollars: number): number {
  return Math.round((priceDollars - baseOf(priceDollars)) * 100) / 100;
}

/**
 * Formatted pre-tax sticker for a tax-inclusive catalog price: "41.98".
 * Every customer-facing price outside the checkout Taxes row renders through
 * this, so the advertised figure is always the base.
 */
export function formatBasePrice(priceDollars: number): string {
  const base = baseOf(priceDollars);
  return Number.isInteger(base) ? String(base) : base.toFixed(2);
}

export interface TaxableLine {
  pricePerAdult: number; // tax-inclusive, as stored on cart items
  pricePerChild: number;
  adults: number;
  children: number;
}

/** Sum of pre-tax bases across the cart, in dollars. */
export function cartBaseSubtotal(lines: TaxableLine[]): number {
  const cents = lines.reduce(
    (sum, l) =>
      sum +
      Math.round(baseOf(l.pricePerAdult) * 100) * l.adults +
      Math.round(baseOf(l.pricePerChild) * 100) * l.children,
    0
  );
  return cents / 100;
}

/** Cart-level Taxes row: full tax-inclusive subtotal minus the base subtotal. */
export function cartTax(lines: TaxableLine[]): number {
  const fullCents = lines.reduce(
    (sum, l) =>
      sum +
      Math.round(l.pricePerAdult * 100) * l.adults +
      Math.round(l.pricePerChild * 100) * l.children,
    0
  );
  return (fullCents - Math.round(cartBaseSubtotal(lines) * 100)) / 100;
}
