import { siteConfig } from "./config";
import { escapeHtml, formatDate, formatQuantity } from "./email-format";
import { cartBaseSubtotal, cartTax } from "./tax";
import type { OrderAdjustment } from "./adjustments";
import type { ConfirmationItem } from "./order-confirmation-template";

/**
 * The one-time abandoned-checkout reminder. A customer typed their contact
 * details into checkout, never finished paying, and gets exactly one email
 * (and, with consent + Twilio configured, one text) inviting them back to a
 * cart we rebuild for them. Nothing was charged, and the copy says so first:
 * a reminder that reads like a bill would do more harm than the sale is worth.
 */

export interface CartRecoveryData {
  customerName: string;
  customerEmail: string;
  items: ConfirmationItem[];
  /** Discount the abandoned intent had locked in (e.g. senior/military $5). */
  adjustments?: OrderAdjustment[];
  totalAmount: number;
  /** Absolute link that rebuilds this cart and lands on checkout. */
  resumeUrl: string;
  /** Set when the earliest show date is today or tomorrow in Branson. */
  showIsSoon: boolean;
}

const NAVY = "#13264D";
const RED = "#C8102E";
const TEXT_DARK = "#1A1614";
const BG_PAPER = "#F6F4EF";

// Pre-tax base per line, matching what checkout showed; taxes render once as
// their own row so the emailed figures line up with the resumed cart.
function itemSubtotal(item: ConfirmationItem): number {
  return cartBaseSubtotal([item]);
}

function itemRow(item: ConfirmationItem): string {
  const when = [formatDate(item.date), item.time].filter(Boolean).join(" at ");
  const details = [formatQuantity(item.adults, item.children), item.seatingTier]
    .filter(Boolean)
    .join(" &middot; ");

  return `
  <tr>
    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;font-family:Arial,sans-serif;color:${TEXT_DARK};">
      <div style="font-size:16px;font-weight:bold;">${escapeHtml(item.name)}</div>
      <div style="font-size:13px;color:#5b5651;margin-top:5px;">${escapeHtml(when)}</div>
      ${item.theaterName ? `<div style="font-size:13px;color:#5b5651;margin-top:2px;">${escapeHtml(item.theaterName)}</div>` : ""}
      <div style="font-size:13px;color:#5b5651;margin-top:2px;">${details}</div>
    </td>
    <td align="right" valign="top" style="padding:14px 0 14px 12px;border-bottom:1px solid #e5e7eb;font-family:Arial,sans-serif;color:${TEXT_DARK};font-size:15px;font-weight:bold;white-space:nowrap;">
      $${itemSubtotal(item).toFixed(2)}
    </td>
  </tr>`;
}

export function renderCartRecoveryEmail(data: CartRecoveryData): {
  subject: string;
  html: string;
  text: string;
} {
  const firstName = data.customerName.trim().split(/\s+/)[0] || "there";
  const firstShow = data.items[0]?.name ?? "Branson show";
  const subject = `Your ${firstShow} booking isn't finished`;
  const baseSubtotal = cartBaseSubtotal(data.items);
  const taxes = cartTax(data.items);
  const adjustments = data.adjustments ?? [];

  const soonNote = data.showIsSoon
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:20px;border-left:4px solid ${RED};background:#fdf3f4;border-radius:6px;">
        <tr>
          <td style="padding:14px 18px;font-family:Arial,sans-serif;color:#4a443f;font-size:14px;line-height:1.6;">
            <strong style="color:${RED};">Your show date is almost here.</strong>
            Seats for ${escapeHtml(formatDate(data.items[0].date))} are sold at the door too,
            so booking ahead is the only way to be sure of yours.
          </td>
        </tr>
      </table>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Finish Your Booking</title>
</head>
<body style="margin:0;padding:0;background:${BG_PAPER};font-family:Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Nothing was charged. Pick up right where you left off &mdash; it takes about two minutes.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BG_PAPER};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <tr>
            <td style="padding:32px 32px 28px 32px;background:${NAVY};color:#ffffff;text-align:center;">
              <img src="${siteConfig.url}/logo.png" alt="${escapeHtml(siteConfig.name)}" width="180" style="display:block;margin:0 auto 16px auto;width:180px;max-width:70%;height:auto;border:0;" />
              <div style="font-size:28px;font-weight:bold;margin-top:8px;">Almost there, ${escapeHtml(firstName)}</div>
              <div style="font-size:14px;margin-top:8px;opacity:0.9;">Your card was not charged &mdash; your seats are still unbooked.</div>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 0 32px;">
              <div style="font-family:Arial,sans-serif;color:#4a443f;font-size:14px;line-height:1.65;">
                You started booking these tickets but didn&rsquo;t get to the finish line.
                We saved your cart &mdash; one tap below brings it right back.
              </div>

              ${soonNote}

              <div style="font-size:11px;font-weight:bold;letter-spacing:1px;color:${RED};text-transform:uppercase;margin:26px 0 4px 0;font-family:Arial,sans-serif;">Your Cart</div>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${data.items.map(itemRow).join("")}
                <tr>
                  <td style="padding:12px 0 2px 0;font-family:Arial,sans-serif;color:#5b5651;font-size:14px;">Subtotal</td>
                  <td align="right" style="padding:12px 0 2px 0;font-family:Arial,sans-serif;color:#5b5651;font-size:14px;">$${baseSubtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding:2px 0;font-family:Arial,sans-serif;color:#5b5651;font-size:14px;">Taxes</td>
                  <td align="right" style="padding:2px 0;font-family:Arial,sans-serif;color:#5b5651;font-size:14px;">$${taxes.toFixed(2)}</td>
                </tr>
                ${adjustments
                  .map(
                    (a) => `<tr>
                  <td style="padding:2px 0;font-family:Arial,sans-serif;color:#047857;font-size:14px;font-weight:bold;">${escapeHtml(a.label)}</td>
                  <td align="right" style="padding:2px 0;font-family:Arial,sans-serif;color:#047857;font-size:14px;font-weight:bold;">-$${(-a.amountCents / 100).toFixed(2)}</td>
                </tr>`
                  )
                  .join("")}
                <tr>
                  <td style="padding:10px 0 14px 0;font-family:Arial,sans-serif;color:${TEXT_DARK};font-size:16px;font-weight:bold;">Total</td>
                  <td align="right" style="padding:10px 0 14px 0;font-family:Arial,sans-serif;color:${TEXT_DARK};font-size:18px;font-weight:bold;">$${data.totalAmount.toFixed(2)}</td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:8px;">
                <tr>
                  <td align="center">
                    <a href="${escapeHtml(data.resumeUrl)}"
                       style="display:block;background:${RED};color:#ffffff;text-decoration:none;font-size:17px;font-weight:bold;padding:16px 24px;border-radius:10px;font-family:Arial,sans-serif;">
                      Finish My Booking
                    </a>
                    <div style="font-family:Arial,sans-serif;color:#8a837c;font-size:12px;margin-top:10px;">
                      Takes about two minutes. Instant confirmation.
                    </div>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;background:${BG_PAPER};border-radius:8px;">
                <tr>
                  <td style="padding:16px 20px;font-family:Arial,sans-serif;color:#4a443f;font-size:13px;line-height:1.7;">
                    Box-office prices, no hidden fees &middot; Free cancellation up to 24 hours before showtime &middot; Real people in Branson
                  </td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;">
                <tr>
                  <td style="padding:16px 0;border-top:1px solid #e5e7eb;font-family:Arial,sans-serif;color:#5b5651;font-size:12px;line-height:1.6;">
                    <strong style="color:${TEXT_DARK};">Rather book with a person, or bringing a group?</strong>
                    Call <a href="tel:${escapeHtml(siteConfig.phoneRaw)}" style="color:${NAVY};text-decoration:none;font-weight:bold;">${escapeHtml(siteConfig.phone)}</a>
                    and we&rsquo;ll take care of it over the phone. Questions? Just reply to this email.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;background:${BG_PAPER};text-align:center;font-family:Arial,sans-serif;color:#8a837c;font-size:11px;line-height:1.6;">
              &copy; ${new Date().getFullYear()} ${escapeHtml(siteConfig.name)} &middot; ${escapeHtml(siteConfig.address)}<br/>
              This is a one-time reminder about the booking started with ${escapeHtml(data.customerEmail)}.
              If that wasn&rsquo;t you, or you&rsquo;re all set, no action is needed &mdash; we won&rsquo;t send another.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const textLines: string[] = [
    `${siteConfig.shortName}: your booking isn't finished`,
    "",
    `Almost there, ${firstName}. Your card was NOT charged - your seats are still unbooked.`,
    "",
    "You started booking these tickets but didn't get to the finish line.",
    "We saved your cart:",
    "",
  ];

  data.items.forEach((item) => {
    textLines.push(`- ${item.name}`);
    textLines.push(`  ${[formatDate(item.date), item.time].filter(Boolean).join(" at ")}`);
    textLines.push(`  ${formatQuantity(item.adults, item.children)} | $${itemSubtotal(item).toFixed(2)}`);
  });

  textLines.push("");
  textLines.push(`Subtotal: $${baseSubtotal.toFixed(2)}`);
  textLines.push(`Taxes: $${taxes.toFixed(2)}`);
  adjustments.forEach((a) => {
    textLines.push(`${a.label}: -$${(-a.amountCents / 100).toFixed(2)}`);
  });
  textLines.push(`Total: $${data.totalAmount.toFixed(2)}`);
  textLines.push("");
  textLines.push(`Finish your booking here (takes about 2 minutes):`);
  textLines.push(data.resumeUrl);
  textLines.push("");
  textLines.push(`Rather book with a person, or bringing a group? Call ${siteConfig.phone}.`);
  textLines.push("");
  textLines.push("Box-office prices, no hidden fees. Free cancellation up to 24 hours before showtime.");
  textLines.push("");
  textLines.push("This is a one-time reminder. If you're all set, no action is needed - we won't send another.");

  return { subject, html, text: textLines.join("\n") };
}

/** Short SMS variant. One segment of context, the link, and an opt-out. */
export function renderCartRecoverySms(data: CartRecoveryData): string {
  const firstShow = data.items[0];
  const when = firstShow ? ` for ${formatDate(firstShow.date)}` : "";
  return (
    `${siteConfig.shortName}: your ${firstShow?.name ?? "Branson show"} booking${when} wasn't finished - nothing was charged. ` +
    `Finish in 2 min: ${data.resumeUrl} Or call ${siteConfig.phone}. Reply STOP to opt out.`
  );
}
