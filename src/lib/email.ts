import { Resend } from "resend";
import { renderVoucherEmail, type VoucherData } from "./voucher-template";
import {
  renderOrderConfirmationEmail,
  VOUCHER_SLA_HOURS,
  type OrderConfirmationData,
} from "./order-confirmation-template";
import { formatDate, formatQuantity } from "./email-format";
import { siteConfig } from "./config";

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("Missing RESEND_API_KEY environment variable");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

function fromAddress(): string {
  // || not ??: an empty EMAIL_FROM (dev envs) must also fall back.
  return process.env.EMAIL_FROM || `${siteConfig.shortName} <onboarding@resend.dev>`;
}

export async function sendVoucherEmail(data: VoucherData) {
  const { html, text } = renderVoucherEmail(data);

  const result = await getResend().emails.send({
    from: fromAddress(),
    to: data.customerEmail,
    subject: `Your Branson show voucher (confirmation ${data.confirmationNumber})`,
    html,
    text,
    replyTo: siteConfig.email,
  });

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`);
  }

  return result.data;
}

/**
 * The receipt a customer gets the instant their card clears. Vouchers are
 * issued manually afterwards, so this email exists to stop them wondering
 * where their tickets are.
 */
export async function sendOrderConfirmationEmail(data: OrderConfirmationData) {
  const { html, text } = renderOrderConfirmationEmail(data);

  const result = await getResend().emails.send({
    from: fromAddress(),
    to: data.customerEmail,
    subject: `Order confirmed (${data.orderNumber}). Your vouchers arrive within ${VOUCHER_SLA_HOURS} hours.`,
    html,
    text,
    replyTo: siteConfig.email,
  });

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`);
  }

  return result.data;
}

/**
 * Who gets the voucher work order. Both inboxes are on the domain's Google
 * Workspace; either person can issue the voucher. William's personal address
 * rides along as cc (visible, not bcc) so any of the three can reply-all and
 * the others see the order is handled.
 */
const ALERT_RECIPIENTS = [
  "contact@getbransontickets.com",
  "xerious@getbransontickets.com",
];
const ALERT_CC = ["williambremer9@gmail.com"];

/**
 * Tells the office an order needs a voucher issued. Deliberately plain text:
 * it is a work order, not marketing.
 */
export async function sendNewOrderAlert(data: OrderConfirmationData) {
  const soonest = data.items
    .map((i) => i.date)
    .sort()
    .at(0);

  const lines = [
    `NEW ORDER: ${data.orderNumber}`,
    `Voucher due within ${VOUCHER_SLA_HOURS} hours.`,
    ...(data.paymentIntentId
      ? [`Send it here: ${siteConfig.url}/office/orders/${data.paymentIntentId}`]
      : []),
    "",
    `Customer: ${data.customerName}`,
    `Email:    ${data.customerEmail}`,
    `Phone:    ${data.customerPhone || "not given"}`,
    `Total:    $${data.totalAmount.toFixed(2)}`,
    ...(soonest ? [`First show date: ${formatDate(soonest)}`] : []),
    "",
    "ITEMS",
  ];

  data.items.forEach((item) => {
    lines.push("");
    lines.push(`- ${item.name}`);
    lines.push(`  ${[formatDate(item.date), item.time].filter(Boolean).join(" at ")}`);
    if (item.theaterName) lines.push(`  ${item.theaterName}`);
    lines.push(`  ${formatQuantity(item.adults, item.children)}`);
    if (item.seatingTier) lines.push(`  Seating: ${item.seatingTier}`);
  });

  const text = lines.join("\n");

  const result = await getResend().emails.send({
    from: fromAddress(),
    // ORDER_ALERT_EMAIL overrides for local testing so dev orders never hit
    // the real fulfillment inboxes (and skips the cc for the same reason).
    to: process.env.ORDER_ALERT_EMAIL ? [process.env.ORDER_ALERT_EMAIL] : ALERT_RECIPIENTS,
    ...(process.env.ORDER_ALERT_EMAIL ? {} : { cc: ALERT_CC }),
    subject: `Voucher needed: ${data.orderNumber} (${data.customerName})`,
    text,
    html: `<pre style="font-family:Menlo,Consolas,monospace;font-size:13px;line-height:1.6;color:#1A1614;">${text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")}</pre>`,
    replyTo: data.customerEmail,
  });

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`);
  }

  return result.data;
}

/**
 * The daily showtimes digest to the office (William and Z). Same recipient
 * pattern as order alerts: ORDER_ALERT_EMAIL overrides for local testing so
 * dev runs never hit the real inboxes.
 */
export async function sendShowtimesDigestEmail({
  subject,
  text,
}: {
  subject: string;
  text: string;
}) {
  const result = await getResend().emails.send({
    from: fromAddress(),
    to: process.env.ORDER_ALERT_EMAIL ? [process.env.ORDER_ALERT_EMAIL] : ALERT_RECIPIENTS,
    ...(process.env.ORDER_ALERT_EMAIL ? {} : { cc: ALERT_CC }),
    subject,
    text,
    html: `<pre style="font-family:Menlo,Consolas,monospace;font-size:13px;line-height:1.6;color:#1A1614;">${text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")}</pre>`,
  });

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`);
  }

  return result.data;
}

export interface PassportNotification {
  subject: string;
  lines: [string, string][];
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Plain internal notification to the office inboxes (passport signups, partner applications). */
export async function sendPassportNotification({ subject, lines }: PassportNotification) {
  const from = fromAddress();
  const rows = lines
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;">${escapeHtml(label)}</td><td style="padding:4px 0;color:#333;font-weight:600;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const result = await getResend().emails.send({
    from,
    to: ALERT_RECIPIENTS,
    subject,
    html: `<div style="font-family:sans-serif;max-width:520px;"><h2 style="color:#7B1A1A;">${escapeHtml(subject)}</h2><table>${rows}</table></div>`,
    text: lines.map(([label, value]) => `${label}: ${value}`).join("\n"),
    replyTo: siteConfig.email,
  });

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`);
  }

  return result.data;
}
