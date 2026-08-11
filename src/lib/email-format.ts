/**
 * Formatting shared by every transactional email. Kept in one place so the
 * date handling below cannot drift between the confirmation and the voucher.
 */

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatDate(dateStr: string): string {
  try {
    // "2026-08-04" parses as UTC midnight, which renders as the previous day
    // in any US timezone. Build a local date so the email shows the day the
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

export function formatQuantity(adults: number, children: number): string {
  const parts = [`${adults} Adult${adults !== 1 ? "s" : ""}`];
  if (children > 0) {
    parts.push(`${children} Child${children !== 1 ? "ren" : ""}`);
  }
  return parts.join(", ");
}
