// Order-level price adjustments. Pure module with zero imports: it runs
// identically in the browser (checkout mirror math) and on the server
// (payment-intent creation, voucher verification, cart recovery), which is
// what makes amount drift between the two impossible.
//
// The one money rule: adjustments are computed once, at order level, in
// integer cents, from the tax-inclusive subtotal. Never per line, never in
// dollars, never re-rounded.

export type DiscountType = "none" | "senior" | "military";

export const DISCOUNTS: Record<
  Exclude<DiscountType, "none">,
  { label: string; amountCents: number }
> = {
  senior: { label: "Senior discount (55+)", amountCents: 500 },
  military: { label: "Military and Veterans discount", amountCents: 500 },
};

/**
 * Tolerant parser: absent, empty, or unrecognized input collapses to "none".
 * Rollout safety hinges on this: PaymentIntents created before discounts
 * existed carry no discountType metadata and must verify exactly as before.
 */
export function parseDiscountType(raw: string | null | undefined): DiscountType {
  return raw === "senior" || raw === "military" ? raw : "none";
}

export interface OrderAdjustment {
  code: string; // "senior" | "military" | future: "fee-*", "tax-*", "bundle-*"
  label: string; // rendered in emails, checkout sidebar, office desk
  amountCents: number; // negative = discount, positive = fee/tax
}

// Stripe refuses charges under 50 cents; never discount an order below it.
const MIN_CHARGE_CENTS = 50;

/** All adjustments for an order, in application order. Today: zero or one. */
export function computeAdjustments(
  subtotalCents: number,
  discountType: DiscountType
): OrderAdjustment[] {
  if (discountType === "none") return [];
  const discount = DISCOUNTS[discountType];
  const maxOff = Math.max(0, subtotalCents - MIN_CHARGE_CENTS);
  return [
    {
      code: discountType,
      label: discount.label,
      amountCents: -Math.min(discount.amountCents, maxOff),
    },
  ];
}

export function applyAdjustments(
  subtotalCents: number,
  adjustments: OrderAdjustment[]
): number {
  const total = adjustments.reduce((sum, a) => sum + a.amountCents, subtotalCents);
  return Math.max(0, total);
}

/** Convenience: subtotal in, final order total out. */
export function orderTotalCents(
  subtotalCents: number,
  discountType: DiscountType
): number {
  return applyAdjustments(subtotalCents, computeAdjustments(subtotalCents, discountType));
}
