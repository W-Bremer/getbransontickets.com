import { NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { siteConfig } from "@/lib/config";

// $60/mo Branson Passport Partner Membership. Live and test mode carry the
// same product; the key on STRIPE_SECRET_KEY decides which price exists.
const LIVE_PRICE = "price_1U5UT7AAVCxC3svMjCX364m7";
const TEST_PRICE = "price_1U5UnfABtPEyXMSRBMr3XS04";

const schema = z.object({
  businessName: z.string().min(2).max(200),
  contactName: z.string().min(2).max(120),
  email: z.string().email().max(200),
});

export async function POST(req: Request) {
  let parsed: z.infer<typeof schema>;
  try {
    parsed = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const price = process.env.STRIPE_SECRET_KEY?.startsWith("sk_test") ? TEST_PRICE : LIVE_PRICE;
  const origin = req.headers.get("origin");
  const base = origin?.startsWith("http://localhost") ? origin : siteConfig.url;

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      // Card only: wallets, BNPL, and bank debits read as clutter for a B2B membership.
      payment_method_types: ["card"],
      branding_settings: {
        // White, not omitted: leaving it unset falls back to the account-level
        // maroon branding, which is exactly what this override exists to avoid.
        background_color: "#FFFFFF",
        button_color: "#C8102E",
        border_style: "rounded",
      },
      custom_text: {
        submit: {
          message:
            "Your listing goes live within 7 days of your first payment. No contract, cancel anytime.",
        },
      },
      customer_email: parsed.email,
      metadata: { source: "passport-partner-signup", businessName: parsed.businessName },
      subscription_data: {
        metadata: {
          source: "passport-partner-signup",
          businessName: parsed.businessName,
          contactName: parsed.contactName,
        },
      },
      return_url: `${base}/passport/partner-signup/complete?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("passport subscribe checkout failed:", err);
    return NextResponse.json({ error: "Could not start checkout" }, { status: 500 });
  }
}
