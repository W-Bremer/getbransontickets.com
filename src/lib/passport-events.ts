import { get, list, put } from "@vercel/blob";

/**
 * Durable Passport tracking: one JSON blob per event in the private
 * gbt-passport-events store. Vercel runtime logs expire within days; these do
 * not, so QR scan counts and signup attribution survive for the office
 * dashboard at /office/passport.
 *
 * Pathnames carry the countable facts so the dashboard can tally events with
 * list() alone, without downloading bodies:
 *
 *   passport-events/<env>/scan/<REFCODE>/<timestamp>-<rand>.json
 *   passport-events/<env>/signup/<REFCODE|direct>/<timestamp>-<rand>.json
 *   passport-events/<env>/partner-application/<timestamp>-<rand>.json
 *
 * Bodies hold the full event (email, user agent, ...) for the recent-activity
 * feed. Recording never throws: a storage hiccup must not break a scan
 * redirect or a signup.
 */

const ROOT = "passport-events";

/** production | preview | development; keeps dev testing out of real counts. */
export function passportEventEnv(): string {
  return process.env.VERCEL_ENV ?? "development";
}

function eventPath(parts: string[]): string {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const rand = Math.random().toString(36).slice(2, 8);
  return [ROOT, passportEventEnv(), ...parts, `${stamp}-${rand}.json`].join("/");
}

async function record(parts: string[], payload: Record<string, unknown>): Promise<void> {
  try {
    await put(eventPath(parts), JSON.stringify(payload), {
      access: "private",
      contentType: "application/json",
    });
  } catch (err) {
    console.error("passport event record failed:", err);
  }
}

export async function recordPassportScan(scan: {
  refCode: string;
  partner: string;
  userAgent?: string;
  referer?: string;
  at: string;
}): Promise<void> {
  await record(["scan", scan.refCode.toUpperCase()], { event: "passport_scan", ...scan });
}

export async function recordPassportSignup(signup: {
  ref: string | null;
  email: string;
  phone?: string;
  smsOptIn?: boolean;
  at: string;
}): Promise<void> {
  await record(["signup", signup.ref ? signup.ref.toUpperCase() : "direct"], {
    event: "passport_visitor_signup",
    ...signup,
  });
}

export async function recordPartnerApplication(application: {
  businessName: string;
  email: string;
  source?: string;
  at: string;
}): Promise<void> {
  await record(["partner-application"], {
    event: "passport_partner_application",
    ...application,
  });
}

// ---------------------------------------------------------------------------
// Reading (office dashboard)

export interface StoredPassportEvent {
  pathname: string;
  uploadedAt: Date;
  /** REFCODE, "direct", or "" for partner applications. */
  key: string;
}

/** All events of one type for an environment, newest first. */
export async function listPassportEvents(
  type: "scan" | "signup" | "partner-application",
  env: string = passportEventEnv()
): Promise<StoredPassportEvent[]> {
  const prefix = `${ROOT}/${env}/${type}/`;
  const events: StoredPassportEvent[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    for (const blob of page.blobs) {
      const rest = blob.pathname.slice(prefix.length);
      const slash = rest.indexOf("/");
      events.push({
        pathname: blob.pathname,
        uploadedAt: blob.uploadedAt,
        key: slash === -1 ? "" : rest.slice(0, slash),
      });
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return events.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
}

/** Downloads one event body. Returns null when unreadable. */
export async function readPassportEvent(
  pathname: string
): Promise<Record<string, unknown> | null> {
  try {
    const result = await get(pathname, { access: "private" });
    if (!result || result.statusCode !== 200) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as Record<string, unknown>;
  } catch (err) {
    console.error("passport event read failed:", err);
    return null;
  }
}
