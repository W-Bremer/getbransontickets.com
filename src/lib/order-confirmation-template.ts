import { siteConfig } from "./config";
import { escapeHtml, formatDate, formatQuantity } from "./email-format";

/**
 * Sent the moment a payment clears. This is NOT the voucher: vouchers are
 * issued by hand against each theater's system and follow within 12 hours,
 * so this email's job is to prove the money landed and say what happens next.
 */

export interface ConfirmationItem {
  name: string;
  date: string;
  time?: string;
  adults: number;
  children: number;
  seatingTier?: string;
  theaterName?: string;
  pricePerAdult: number;
  pricePerChild: number;
}

export interface OrderConfirmationData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderNumber: string;
  items: ConfirmationItem[];
  totalAmount: number;
}

const NAVY = "#13264D";
const RED = "#C8102E";
const TEXT_DARK = "#1A1614";
const BG_PAPER = "#F6F4EF";

/** Hours we promise on the voucher. Change here and the copy follows. */
export const VOUCHER_SLA_HOURS = 12;

function itemSubtotal(item: ConfirmationItem): number {
  return item.pricePerAdult * item.adults + item.pricePerChild * item.children;
}

function itemRow(item: ConfirmationItem): string {
  const when = [formatDate(item.date), item.time].filter(Boolean).join(" at ");
  const details = [formatQuantity(item.adults, item.children), item.seatingTier]
    .filter(Boolean)
    .join(" &middot; ");

  return `
  <tr>
    <td style="padding:16px 0;border-bottom:1px solid #e5e7eb;font-family:Arial,sans-serif;color:${TEXT_DARK};">
      <div style="font-size:16px;font-weight:bold;">${escapeHtml(item.name)}</div>
      <div style="font-size:13px;color:#5b5651;margin-top:5px;">${escapeHtml(when)}</div>
      ${item.theaterName ? `<div style="font-size:13px;color:#5b5651;margin-top:2px;">${escapeHtml(item.theaterName)}</div>` : ""}
      <div style="font-size:13px;color:#5b5651;margin-top:2px;">${details}</div>
    </td>
    <td align="right" valign="top" style="padding:16px 0 16px 12px;border-bottom:1px solid #e5e7eb;font-family:Arial,sans-serif;color:${TEXT_DARK};font-size:15px;font-weight:bold;white-space:nowrap;">
      $${itemSubtotal(item).toFixed(2)}
    </td>
  </tr>`;
}

export function renderOrderConfirmationEmail(data: OrderConfirmationData): {
  html: string;
  text: string;
} {
  const firstName = data.customerName.trim().split(/\s+/)[0] || "there";
  const voucherWord = data.items.length === 1 ? "voucher" : "vouchers";
  // "show" stays singular here: it is modifying "voucher", not counting shows.
  const voucherClause =
    data.items.length === 1 ? "show voucher comes" : "show vouchers come";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Order Confirmed</title>
</head>
<body style="margin:0;padding:0;background:${BG_PAPER};font-family:Arial,sans-serif;">
  <!-- Preheader: shown in the inbox preview, hidden in the body. -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    We have your order. Your show ${voucherWord} will arrive within ${VOUCHER_SLA_HOURS} hours.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BG_PAPER};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <!-- Fluid width: a fixed 600 makes phones scale the whole email down. -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <tr>
            <td style="padding:32px 32px 28px 32px;background:${NAVY};color:#ffffff;text-align:center;">
              <img src="${siteConfig.url}/logo.png" alt="${escapeHtml(siteConfig.name)}" width="180" style="display:block;margin:0 auto 16px auto;width:180px;max-width:70%;height:auto;border:0;" />
              <div style="font-size:28px;font-weight:bold;margin-top:8px;">Order Confirmed</div>
              <div style="font-size:14px;margin-top:8px;opacity:0.9;">Thanks, ${escapeHtml(firstName)}. Your payment went through.</div>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 32px 0 32px;">

              <!-- Stacked, not side by side: two 22px values in one row collide
                   on phone screens, and email clients can't be trusted with
                   media queries. -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BG_PAPER};border-radius:8px;">
                <tr>
                  <td style="padding:20px;font-family:Arial,sans-serif;color:${TEXT_DARK};">
                    <div style="font-size:11px;color:#5b5651;letter-spacing:1px;text-transform:uppercase;">Order Number</div>
                    <div style="font-size:22px;font-weight:bold;color:${NAVY};margin-top:4px;font-family:Courier,monospace;">${escapeHtml(data.orderNumber)}</div>
                    <div style="margin-top:14px;padding-top:14px;border-top:1px solid #e2ded6;">
                      <div style="font-size:11px;color:#5b5651;letter-spacing:1px;text-transform:uppercase;">Total Paid</div>
                      <div style="font-size:22px;font-weight:bold;color:${TEXT_DARK};margin-top:4px;">$${data.totalAmount.toFixed(2)}</div>
                    </div>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;border-left:4px solid ${RED};background:#fdf3f4;border-radius:6px;">
                <tr>
                  <td style="padding:18px 20px;font-family:Arial,sans-serif;color:${TEXT_DARK};">
                    <div style="font-size:16px;font-weight:bold;color:${RED};">Your ${voucherWord} will arrive within ${VOUCHER_SLA_HOURS} hours</div>
                    <div style="font-size:14px;line-height:1.65;margin-top:8px;color:#4a443f;">
                      This email is your receipt, not your ticket. We book every seat through the
                      theater by hand, so your ${voucherClause} in a second email within
                      ${VOUCHER_SLA_HOURS} hours. That voucher is what the box office scans.
                      Nothing else is needed from you before then.
                    </div>
                    <div style="font-size:14px;line-height:1.65;margin-top:10px;color:#4a443f;">
                      Attending today or tomorrow? Call us at
                      <a href="tel:${escapeHtml(siteConfig.phoneRaw)}" style="color:${RED};font-weight:bold;text-decoration:none;">${escapeHtml(siteConfig.phone)}</a>
                      and we will move your ${voucherWord} to the front of the line.
                    </div>
                  </td>
                </tr>
              </table>

              <div style="font-size:11px;font-weight:bold;letter-spacing:1px;color:${RED};text-transform:uppercase;margin:30px 0 4px 0;font-family:Arial,sans-serif;">Your Order</div>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${data.items.map(itemRow).join("")}
                <tr>
                  <td style="padding:16px 0;font-family:Arial,sans-serif;color:${TEXT_DARK};font-size:16px;font-weight:bold;">Total</td>
                  <td align="right" style="padding:16px 0;font-family:Arial,sans-serif;color:${TEXT_DARK};font-size:18px;font-weight:bold;">$${data.totalAmount.toFixed(2)}</td>
                </tr>
              </table>

              <div style="font-size:11px;font-weight:bold;letter-spacing:1px;color:${RED};text-transform:uppercase;margin:24px 0 10px 0;font-family:Arial,sans-serif;">What Happens Next</div>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:Arial,sans-serif;color:#4a443f;font-size:14px;line-height:1.6;">
                <tr>
                  <td valign="top" width="28" style="padding:0 0 12px 0;color:${NAVY};font-weight:bold;">1.</td>
                  <td style="padding:0 0 12px 0;">We confirm your seats with the theater.</td>
                </tr>
                <tr>
                  <td valign="top" width="28" style="padding:0 0 12px 0;color:${NAVY};font-weight:bold;">2.</td>
                  <td style="padding:0 0 12px 0;">You get a second email with a voucher for each show, within ${VOUCHER_SLA_HOURS} hours.</td>
                </tr>
                <tr>
                  <td valign="top" width="28" style="padding:0;color:${NAVY};font-weight:bold;">3.</td>
                  <td style="padding:0;">Show that voucher at the box office, printed or on your phone. Arrive 30 minutes before showtime.</td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:28px;">
                <tr>
                  <td style="padding:16px 0;border-top:1px solid #e5e7eb;font-family:Arial,sans-serif;color:#5b5651;font-size:12px;line-height:1.6;">
                    <strong style="color:${TEXT_DARK};">Need to change something?</strong> Reply to this email or call
                    <a href="tel:${escapeHtml(siteConfig.phoneRaw)}" style="color:${NAVY};text-decoration:none;">${escapeHtml(siteConfig.phone)}</a>.
                    Have your order number handy and we can sort it out before the ${voucherWord} go out.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;background:${BG_PAPER};text-align:center;font-family:Arial,sans-serif;color:#8a837c;font-size:11px;line-height:1.6;">
              &copy; ${new Date().getFullYear()} ${escapeHtml(siteConfig.name)} &middot; ${escapeHtml(siteConfig.address)}<br/>
              Sent to ${escapeHtml(data.customerEmail)} for order ${escapeHtml(data.orderNumber)}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const textLines: string[] = [
    `${siteConfig.shortName}: Order Confirmed`,
    "",
    `Thanks, ${firstName}. Your payment went through.`,
    "",
    `Order Number: ${data.orderNumber}`,
    `Total Paid: $${data.totalAmount.toFixed(2)}`,
    "",
    `YOUR ${voucherWord.toUpperCase()} WILL ARRIVE WITHIN ${VOUCHER_SLA_HOURS} HOURS`,
    "",
    "This email is your receipt, not your ticket. We book every seat through the",
    `theater by hand, so your ${voucherClause} in a second email within`,
    `${VOUCHER_SLA_HOURS} hours. That voucher is what the box office scans.`,
    "",
    `Attending today or tomorrow? Call ${siteConfig.phone} and we will move your`,
    `${voucherWord} to the front of the line.`,
    "",
    "=== YOUR ORDER ===",
  ];

  data.items.forEach((item) => {
    textLines.push("");
    textLines.push(item.name);
    textLines.push(`  ${[formatDate(item.date), item.time].filter(Boolean).join(" at ")}`);
    if (item.theaterName) textLines.push(`  ${item.theaterName}`);
    textLines.push(
      `  ${[formatQuantity(item.adults, item.children), item.seatingTier].filter(Boolean).join(" | ")}`
    );
    textLines.push(`  $${itemSubtotal(item).toFixed(2)}`);
  });

  textLines.push("");
  textLines.push(`Total: $${data.totalAmount.toFixed(2)}`);
  textLines.push("");
  textLines.push("WHAT HAPPENS NEXT:");
  textLines.push("1. We confirm your seats with the theater.");
  textLines.push(
    `2. You get a second email with a voucher for each show, within ${VOUCHER_SLA_HOURS} hours.`
  );
  textLines.push(
    "3. Show that voucher at the box office, printed or on your phone. Arrive 30 minutes before showtime."
  );
  textLines.push("");
  textLines.push(
    `Need to change something? Reply to this email or call ${siteConfig.phone}.`
  );

  return { html, text: textLines.join("\n") };
}
