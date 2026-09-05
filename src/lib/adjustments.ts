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
  code: string; // "bogo50" | "senior" | "military" | future: "fee-*", "tax-*"
  label: string; // rendered in emails, checkout sidebar, office desk
  amountCents: number; // negative = discount, positive = fee/tax
}

export const BOGO_CODE = "bogo50";
export const BOGO_LABEL = "BOGO 50% off 2nd adult ticket";

export interface BogoLine {
  adults: number;
  /** Tax-inclusive adult price in cents (the charged catalog rate). */
  adultPriceCents: number;
  bogo50?: boolean;
}

/**
 * BOGO 50%: on enabled shows, the SECOND adult ticket is half price, applied
 * automatically (no code, no selection). ONE discounted ticket per show line,
 * no matter how many adults are on it (per William, matching the offer as
 * advertised: buy one, get ONE 50% off). Pure function of the cart lines so
 * client and server compute it identically.
 */
export function bogoAmountCents(lines: BogoLine[]): number {
  return lines.reduce((sum, l) => {
    if (!l.bogo50 || Math.floor(l.adults) < 2) return sum;
    return sum + Math.floor(l.adultPriceCents / 2);
  }, 0);
}

// Stripe refuses charges under 50 cents; never discount an order below it.
const MIN_CHARGE_CENTS = 50;

/**
 * All adjustments for an order, in application order: BOGO first, then the
 * senior/military $5. They stack; each is clamped so the total never drops
 * below the Stripe minimum.
 */
export function computeAdjustments(
  subtotalCents: number,
  discountType: DiscountType,
  bogoCents = 0
): OrderAdjustment[] {
  const out: OrderAdjustment[] = [];
  let headroom = Math.max(0, subtotalCents - MIN_CHARGE_CENTS);
  if (bogoCents > 0) {
    const off = Math.min(bogoCents, headroom);
    headroom -= off;
    out.push({ code: BOGO_CODE, label: BOGO_LABEL, amountCents: -off });
  }
  if (discountType !== "none") {
    const discount = DISCOUNTS[discountType];
    out.push({
      code: discountType,
      label: discount.label,
      amountCents: -Math.min(discount.amountCents, headroom),
    });
  }
  return out;
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
  discountType: DiscountType,
  bogoCents = 0
): number {
  return applyAdjustments(
    subtotalCents,
    computeAdjustments(subtotalCents, discountType, bogoCents)
  );
}
