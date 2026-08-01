import { siteConfig } from "./config";

export interface VoucherItem {
  name: string;
  date: string;
  time?: string;
  adults: number;
  children: number;
  seatingTier?: string;
  theaterAddress?: string;
  pricePerAdult: number;
  pricePerChild: number;
  /**
   * Overrides the generated "<order>-01" code. Phone and box-office orders
   * carry a voucher number issued by the theater, and the box office expects
   * to see exactly that number.
   */
  voucherCode?: string;
  /**
   * Absolute URL to the show's logo. Must be publicly reachable over HTTPS:
   * email clients will not render relative paths or data URIs.
   */
  logoUrl?: string;
}

export interface VoucherData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderNumber: string;
  confirmationNumber: string;
  items: VoucherItem[];
  totalAmount: number;
}

const BRAND_MAROON = "#7B1A1A";
const BRAND_GOLD = "#8B6914";
const TEXT_DARK = "#333333";
const BG_CREAM = "#FAF8F5";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(dateStr: string): string {
  try {
    // "2026-08-04" parses as UTC midnight, which renders as the previous day
    // in any US timezone. Build a local date so the voucher shows the day the
    // customer is actually attending.
    const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr.trim());
    const d = dateOnly
      ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
      : new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function itemBlock(item: VoucherItem, index: number, orderNumber: string, customerName: string): string {
  const voucherCode =
    item.voucherCode ?? `${orderNumber}-${String(index + 1).padStart(2, "0")}`;
  const quantity =
    item.adults +
    (item.children > 0 ? ` Adult${item.adults !== 1 ? "s" : ""}, ${item.children} Child${item.children !== 1 ? "ren" : ""}` : ` Adult${item.adults !== 1 ? "s" : ""}`);
  const theaterAddr = item.theaterAddress ? escapeHtml(item.theaterAddress) : "";

  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:24px 0;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;background:#ffffff;">
    <tr>
      <td style="padding:24px;border-bottom:2px dashed #d1d5db;background:${BRAND_MAROON};">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="color:#ffffff;font-family:Arial,sans-serif;">
              <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;opacity:0.8;">Get Branson Tickets</div>
              <div style="font-size:22px;font-weight:bold;margin-top:4px;">SHOW VOUCHER</div>
            </td>
            <td align="right" style="color:#ffffff;font-family:Arial,sans-serif;">
              <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;opacity:0.8;">Valid On</div>
              <div style="font-size:16px;font-weight:bold;margin-top:4px;">${escapeHtml(formatDate(item.date))}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding:24px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td valign="top" width="50%" style="padding-right:12px;font-family:Arial,sans-serif;color:${TEXT_DARK};">
              <div style="font-size:11px;font-weight:bold;letter-spacing:1px;color:${BRAND_MAROON};text-transform:uppercase;margin-bottom:8px;">Show Information</div>
              ${
                item.logoUrl
                  ? `<img src="${escapeHtml(item.logoUrl)}" alt="${escapeHtml(item.name)}" width="200" style="display:block;width:200px;max-width:100%;height:auto;border:0;margin-bottom:10px;" />`
                  : ""
              }
              <div style="font-size:15px;font-weight:bold;margin-bottom:6px;">${escapeHtml(item.name)}</div>
              <div style="font-size:13px;color:#555;line-height:1.6;">
                <strong>Date:</strong> ${escapeHtml(formatDate(item.date))}<br/>
                ${item.time ? `<strong>Time:</strong> ${escapeHtml(item.time)}<br/>` : ""}
                <strong>Quantity:</strong> ${quantity}
                ${item.seatingTier ? `<br/><strong>Seating:</strong> ${escapeHtml(item.seatingTier)}` : ""}
              </div>
            </td>
            <td valign="top" width="50%" style="padding-left:12px;border-left:1px solid #e5e7eb;font-family:Arial,sans-serif;color:${TEXT_DARK};">
              <div style="font-size:11px;font-weight:bold;letter-spacing:1px;color:${BRAND_MAROON};text-transform:uppercase;margin-bottom:8px;">Customer Information</div>
              <div style="font-size:13px;color:#555;line-height:1.6;">
                <strong>Name:</strong> ${escapeHtml(customerName)}<br/>
                <strong>Order #:</strong> ${escapeHtml(orderNumber)}<br/>
                <strong>Voucher Code:</strong> <span style="font-family:Courier,monospace;background:${BG_CREAM};padding:1px 6px;border-radius:3px;font-weight:bold;color:${BRAND_GOLD};">${escapeHtml(voucherCode)}</span>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    ${
      theaterAddr
        ? `<tr>
      <td style="padding:0 24px 20px 24px;font-family:Arial,sans-serif;color:${TEXT_DARK};">
        <div style="font-size:11px;font-weight:bold;letter-spacing:1px;color:${BRAND_MAROON};text-transform:uppercase;margin-bottom:6px;">Theater Location</div>
        <div style="font-size:13px;color:#555;line-height:1.5;">${theaterAddr}</div>
      </td>
    </tr>`
        : ""
    }
  </table>
  `;
}

export function renderVoucherEmail(data: VoucherData): { html: string; text: string } {
  const itemsHtml = data.items
    .map((item, i) => itemBlock(item, i, data.orderNumber, data.customerName))
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Your Branson Show Voucher</title>
</head>
<body style="margin:0;padding:0;background:${BG_CREAM};font-family:Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BG_CREAM};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <tr>
            <td style="padding:32px 32px 24px 32px;background:${BRAND_MAROON};color:#ffffff;text-align:center;">
              <img src="${siteConfig.url}/logo.png" alt="${escapeHtml(siteConfig.name)}" width="180" style="display:block;margin:0 auto 16px auto;width:180px;max-width:70%;height:auto;border:0;" />
              <div style="font-size:28px;font-weight:bold;margin-top:8px;">Booking Confirmed!</div>
              <div style="font-size:14px;margin-top:8px;opacity:0.9;">Thank you for your order, ${escapeHtml(data.customerName.split(" ")[0])}</div>
            </td>
          </tr>

          <tr>
            <td style="padding:32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BG_CREAM};border-radius:8px;">
                <tr>
                  <td style="padding:20px;font-family:Arial,sans-serif;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="color:${TEXT_DARK};">
                          <div style="font-size:11px;color:#666;letter-spacing:1px;text-transform:uppercase;">Confirmation Number</div>
                          <div style="font-size:22px;font-weight:bold;color:${BRAND_MAROON};margin-top:4px;font-family:Courier,monospace;">${escapeHtml(data.confirmationNumber)}</div>
                        </td>
                        <td align="right" style="color:${TEXT_DARK};">
                          <div style="font-size:11px;color:#666;letter-spacing:1px;text-transform:uppercase;">Total Paid</div>
                          <div style="font-size:22px;font-weight:bold;color:${TEXT_DARK};margin-top:4px;">$${data.totalAmount.toFixed(2)}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${itemsHtml}

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;border:1px solid #fde68a;background:#fffbeb;border-radius:8px;">
                <tr>
                  <td style="padding:16px 20px;font-family:Arial,sans-serif;color:#78350f;">
                    <div style="font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">Usage Information</div>
                    <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;">
                      <li>Please bring this voucher (printed or on your phone) to the box office to redeem your tickets.</li>
                      <li>We recommend arriving at the theater at least <strong>30 minutes before showtime</strong>.</li>
                      <li>Your voucher code above is unique to your order. The box office will exchange it for your physical tickets.</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;">
                <tr>
                  <td style="padding:16px 0;border-top:1px solid #e5e7eb;font-family:Arial,sans-serif;color:#666;font-size:12px;line-height:1.6;">
                    <strong style="color:${TEXT_DARK};">Questions?</strong> Contact us at
                    <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:${BRAND_MAROON};text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
                    or call <a href="tel:${escapeHtml(siteConfig.phoneRaw)}" style="color:${BRAND_MAROON};text-decoration:none;">${escapeHtml(siteConfig.phone)}</a>.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;background:${BG_CREAM};text-align:center;font-family:Arial,sans-serif;color:#999;font-size:11px;line-height:1.6;">
              &copy; ${new Date().getFullYear()} ${escapeHtml(siteConfig.name)} &middot; ${escapeHtml(siteConfig.address)}<br/>
              This email was sent to ${escapeHtml(data.customerEmail)} regarding order ${escapeHtml(data.orderNumber)}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const textLines: string[] = [
    `${siteConfig.shortName} — Booking Confirmed`,
    "",
    `Thank you for your order, ${data.customerName}!`,
    "",
    `Confirmation Number: ${data.confirmationNumber}`,
    `Order Number: ${data.orderNumber}`,
    `Total Paid: $${data.totalAmount.toFixed(2)}`,
    "",
    "=== YOUR VOUCHERS ===",
  ];
  data.items.forEach((item, i) => {
    const code =
      item.voucherCode ?? `${data.orderNumber}-${String(i + 1).padStart(2, "0")}`;
    textLines.push("");
    textLines.push(`-- Voucher ${i + 1}: ${item.name} --`);
    textLines.push(`Date: ${formatDate(item.date)}`);
    if (item.time) textLines.push(`Time: ${item.time}`);
    textLines.push(
      `Quantity: ${item.adults} Adult${item.adults !== 1 ? "s" : ""}${item.children > 0 ? `, ${item.children} Child${item.children !== 1 ? "ren" : ""}` : ""}`
    );
    if (item.seatingTier) textLines.push(`Seating: ${item.seatingTier}`);
    textLines.push(`Voucher Code: ${code}`);
    if (item.theaterAddress) textLines.push(`Theater: ${item.theaterAddress}`);
  });
  textLines.push("");
  textLines.push("USAGE INFORMATION:");
  textLines.push("- Bring this voucher to the box office to redeem your tickets.");
  textLines.push("- Arrive at least 30 minutes before showtime.");
  textLines.push("");
  textLines.push(`Questions? Email ${siteConfig.email} or call ${siteConfig.phone}.`);

  return { html, text: textLines.join("\n") };
}
