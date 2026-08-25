import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Gate for the /office fulfillment pages and the send-voucher API. One shared
 * password (OFFICE_PASSWORD env) covers the whole office: there are two
 * people. The cookie stores an HMAC derived from the password rather than the
 * password itself, so rotating the password invalidates every signed-in
 * browser at once. With the env var unset the office is closed: sign-in and
 * every gated API refuse.
 */

export const OFFICE_COOKIE = "gbt_office";
export const OFFICE_COOKIE_MAX_AGE = 60 * 60 * 24 * 60; // 60 days

function password(): string | null {
  const pw = process.env.OFFICE_PASSWORD;
  return pw && pw.length >= 8 ? pw : null;
}

export function officeConfigured(): boolean {
  return password() !== null;
}

/** The value stored in the cookie. */
export function officeToken(): string | null {
  const pw = password();
  if (!pw) return null;
  return createHmac("sha256", pw).update("gbt-office-v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function isValidOfficePassword(candidate: unknown): boolean {
  const pw = password();
  return !!pw && typeof candidate === "string" && safeEqual(candidate, pw);
}

export function isValidOfficeToken(token: string | undefined | null): boolean {
  const expected = officeToken();
  return !!expected && !!token && safeEqual(token, expected);
}

/** Auth check for server components under /office. */
export async function hasOfficeAccess(): Promise<boolean> {
  const store = await cookies();
  return isValidOfficeToken(store.get(OFFICE_COOKIE)?.value);
}

/**
 * Auth check for API routes: the signed-in cookie, or the password itself in
 * an x-office-key header so a plain curl still works.
 */
export function isOfficeRequest(req: Request): boolean {
  const headerKey = req.headers.get("x-office-key");
  if (headerKey && isValidOfficePassword(headerKey)) return true;
  const cookieHeader = req.headers.get("cookie") ?? "";
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${OFFICE_COOKIE}=([^;]+)`));
  return isValidOfficeToken(match?.[1]);
}
