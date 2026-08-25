import { NextResponse } from "next/server";
import { after } from "next/server";
import { getPartnerByRefCode } from "@/data/partners";
import { REF_COOKIE, REF_COOKIE_MAX_AGE } from "@/lib/passport";
import { recordPassportScan } from "@/lib/passport-events";

// Partner QR / tracking link: getbransontickets.com/p/<refCode>
// Sets a 30-day attribution cookie, records the scan, and lands the
// visitor on the Branson Passport.
export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const partner = getPartnerByRefCode(code);

  const destination = new URL("/passport", req.url);
  if (partner) {
    destination.searchParams.set("ref", partner.refCode);
    destination.searchParams.set("utm_source", "passport-partner");
    destination.searchParams.set("utm_medium", "qr");
    destination.searchParams.set("utm_campaign", partner.slug);
  }

  const res = NextResponse.redirect(destination, 302);

  if (partner) {
    res.cookies.set(REF_COOKIE, partner.refCode, {
      maxAge: REF_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const scan = {
      event: "passport_scan",
      refCode: partner.refCode,
      partner: partner.slug,
      userAgent: req.headers.get("user-agent") ?? undefined,
      referer: req.headers.get("referer") ?? undefined,
      at: new Date().toISOString(),
    };
    // Searchable in Vercel runtime logs; the durable copy goes to Blob for
    // the /office/passport dashboard.
    console.log(JSON.stringify(scan));

    after(async () => {
      await recordPassportScan({
        refCode: partner.refCode,
        partner: partner.slug,
        userAgent: scan.userAgent,
        referer: scan.referer,
        at: scan.at,
      });
    });

    const webhook = process.env.PASSPORT_TRACKING_WEBHOOK_URL;
    if (webhook) {
      after(async () => {
        try {
          await fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(scan),
          });
        } catch (err) {
          console.error("passport scan webhook failed:", err);
        }
      });
    }
  }

  return res;
}
