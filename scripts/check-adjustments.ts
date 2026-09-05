/**
 * Drift alarm for the pricing math until a real test runner lands.
 * Run: npx tsx scripts/check-adjustments.ts
 */
import {
  DISCOUNTS,
  applyAdjustments,
  computeAdjustments,
  orderTotalCents,
  parseDiscountType,
} from "../src/lib/adjustments";
import { baseOf, cartBaseSubtotal, cartTax, TAX_RATE } from "../src/lib/tax";

let failures = 0;
function check(name: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) {
    failures++;
    console.error(`FAIL ${name}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
  } else {
    console.log(`ok   ${name}`);
  }
}

// parseDiscountType tolerance: the rollout-safety hinge.
check("parse undefined", parseDiscountType(undefined), "none");
check("parse null", parseDiscountType(null), "none");
check("parse empty", parseDiscountType(""), "none");
check("parse garbage", parseDiscountType("SENIOR; drop table"), "none");
check("parse senior", parseDiscountType("senior"), "senior");
check("parse military", parseDiscountType("military"), "military");

// No discount is a strict no-op for any subtotal.
for (const s of [50, 51, 4800, 9600, 12345, 999999]) {
  check(`none is identity @${s}`, orderTotalCents(s, "none"), s);
}
check("none has no adjustments", computeAdjustments(9600, "none"), []);

// Flat $5 off, both types.
check("senior $5 off 2 adults acrobats", orderTotalCents(9600, "senior"), 9100);
check("military $5 off 2 adults acrobats", orderTotalCents(9600, "military"), 9100);
check(
  "senior adjustment shape",
  computeAdjustments(9600, "senior"),
  [{ code: "senior", label: DISCOUNTS.senior.label, amountCents: -500 }]
);

// Clamp: never discount below Stripe's 50-cent minimum charge.
check("clamp tiny order", orderTotalCents(400, "senior"), 50);
check("clamp at exactly minimum", orderTotalCents(50, "military"), 50);
check("applyAdjustments floors at zero", applyAdjustments(100, [{ code: "x", label: "x", amountCents: -900 }]), 0);

// Tax decomposition: base + tax must reconstruct the charged price exactly.
for (const price of [48, 25, 40, 71, 44.5, 57]) {
  const base = baseOf(price);
  const line = { pricePerAdult: price, pricePerChild: 0, adults: 1, children: 0 };
  check(
    `base+tax reconstructs $${price}`,
    Math.round((cartBaseSubtotal([line]) + cartTax([line])) * 100),
    Math.round(price * 100)
  );
  check(`base below full for $${price}`, base < price, true);
}

// A mixed multi-line cart still reconstructs to the cent.
const cart = [
  { pricePerAdult: 48, pricePerChild: 25, adults: 2, children: 2 },
  { pricePerAdult: 71, pricePerChild: 0, adults: 3, children: 1 },
];
const fullCents = cart.reduce(
  (s, l) => s + Math.round(l.pricePerAdult * 100) * l.adults + Math.round(l.pricePerChild * 100) * l.children,
  0
);
check(
  "multi-line base+tax reconstructs",
  Math.round((cartBaseSubtotal(cart) + cartTax(cart)) * 100),
  fullCents
);

// Sanity on the configured rate itself.
check("TAX_RATE in a plausible band", TAX_RATE > 0.1 && TAX_RATE < 0.2, true);
check("acrobats sticker", baseOf(48), 41.98);

if (failures > 0) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log("\nAll checks passed");
