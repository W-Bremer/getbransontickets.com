import { Resend } from "resend";
import { renderVoucherEmail, type VoucherData } from "./voucher-template";
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

export async function sendVoucherEmail(data: VoucherData) {
  const from = process.env.EMAIL_FROM ?? `${siteConfig.shortName} <onboarding@resend.dev>`;
  const { html, text } = renderVoucherEmail(data);

  const result = await getResend().emails.send({
    from,
    to: data.customerEmail,
    subject: `Your Branson Show Voucher — Confirmation ${data.confirmationNumber}`,
    html,
    text,
    replyTo: siteConfig.email,
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

/** Plain internal notification to the site inbox (passport signups, partner applications). */
export async function sendPassportNotification({ subject, lines }: PassportNotification) {
  const from = process.env.EMAIL_FROM ?? `${siteConfig.shortName} <onboarding@resend.dev>`;
  const rows = lines
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;">${escapeHtml(label)}</td><td style="padding:4px 0;color:#333;font-weight:600;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const result = await getResend().emails.send({
    from,
    to: siteConfig.email,
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
