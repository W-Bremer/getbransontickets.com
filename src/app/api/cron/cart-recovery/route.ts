import { NextResponse } from "next/server";
import { runCartRecovery } from "@/lib/cart-recovery";
import { isOfficeRequest, officeConfigured } from "@/lib/office-auth";

export const dynamic = "force-dynamic";

/**
 * Hourly abandoned-checkout sweep (vercel.json cron). Sends the one-time
 * reminder email/text for incomplete PaymentIntents that carry contact
 * details, and copies the office so a human can call the big carts. Safe to
 * run any number of times: every send is claimed on the intent's metadata
 * before it goes out. A signed-in office session can also trigger it by hand.
 */
export async function GET(req: Request) {
  const cronOk =
    !!process.env.CRON_SECRET &&
    req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;
  const officeOk = officeConfigured() && isOfficeRequest(req);
  if (!cronOk && !officeOk) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // ?minAge=0 lets an authorized caller sweep carts younger than the
    // default quiet period (office "send reminders now"; local testing).
    const minAgeRaw = new URL(req.url).searchParams.get("minAge");
    const minAgeMinutes =
      minAgeRaw !== null && /^\d+$/.test(minAgeRaw) ? Number(minAgeRaw) : undefined;
    const summary = await runCartRecovery({ minAgeMinutes });
    if (summary.reminded > 0) {
      console.log(
        `[cart-recovery] reminded ${summary.reminded} (${summary.remindedIntents.join(", ")}), sms ${summary.smsSent}`
      );
    }
    return NextResponse.json({ ...summary, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error("cart-recovery error:", err);
    return NextResponse.json(
      { error: "Recovery run failed", detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
