import { NextResponse } from "next/server";
import { after } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { sendPassportNotification } from "@/lib/email";
import { REF_COOKIE } from "@/lib/passport";

const visitorSchema = z.object({
  type: z.literal("visitor"),
  email: z.string().email().max(200),
  phone: z.string().max(30).optional().or(z.literal("")),
  smsOptIn: z.boolean().optional(),
  // honeypot: real users never fill this
  website: z.string().max(0).optional().or(z.literal("")),
});

const partnerSchema = z.object({
  type: z.literal("partner"),
  businessName: z.string().min(2).max(200),
  contactName: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(30).optional().or(z.literal("")),
  category: z.string().max(60).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

const payloadSchema = z.discriminatedUnion("type", [visitorSchema, partnerSchema]);

export async function POST(req: Request) {
  let parsed: z.infer<typeof payloadSchema>;
  try {
    parsed = payloadSchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const ref = (await cookies()).get(REF_COOKIE)?.value ?? null;

  const record = {
    event: parsed.type === "visitor" ? "passport_visitor_signup" : "passport_partner_application",
    ...parsed,
    website: undefined,
    ref,
    at: new Date().toISOString(),
  };
  // Always captured in Vercel runtime logs even if email/webhook fail.
  console.log(JSON.stringify(record));

  after(async () => {
    try {
      if (parsed.type === "visitor") {
        await sendPassportNotification({
          subject: "New Branson Passport signup",
          lines: [
            ["Email", parsed.email],
            ["Phone", parsed.phone || "not provided"],
            ["Text updates", parsed.smsOptIn ? "yes" : "no"],
            ["Referred by", ref ?? "direct"],
          ],
        });
      } else {
        await sendPassportNotification({
          subject: `Passport partner application: ${parsed.businessName.replace(/[\r\n]+/g, " ")}`,
          lines: [
            ["Business", parsed.businessName],
            ["Contact", parsed.contactName],
            ["Email", parsed.email],
            ["Phone", parsed.phone || "not provided"],
            ["Category", parsed.category || "not specified"],
            ["Message", parsed.message || "none"],
          ],
        });
      }
    } catch (err) {
      console.error("passport signup email failed:", err);
    }

    const webhook = process.env.PASSPORT_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        });
      } catch (err) {
        console.error("passport signup webhook failed:", err);
      }
    }
  });

  return NextResponse.json({ ok: true });
}
