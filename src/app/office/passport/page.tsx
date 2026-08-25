import type { Metadata } from "next";
import Link from "next/link";
import { hasOfficeAccess, officeConfigured } from "@/lib/office-auth";
import { partners } from "@/data/partners";
import {
  listPassportEvents,
  readPassportEvent,
  passportEventEnv,
  type StoredPassportEvent,
} from "@/lib/passport-events";
import { OfficeLoginForm } from "@/components/office/login-form";
import { OfficeSignOutButton } from "@/components/office/sign-out-button";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Passport QR tracking",
  robots: { index: false, follow: false },
};

const officeDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

interface RecentSignup {
  email: string;
  ref: string | null;
  at: Date;
}

export default async function PassportTrackingPage() {
  if (!officeConfigured()) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
          <h1 className="font-bold">Office is not set up</h1>
          <p className="mt-2 text-sm">
            Set the OFFICE_PASSWORD environment variable (8+ characters) and redeploy.
          </p>
        </div>
      </div>
    );
  }

  if (!(await hasOfficeAccess())) {
    return <OfficeLoginForm />;
  }

  let scans: StoredPassportEvent[] = [];
  let signups: StoredPassportEvent[] = [];
  let applications: StoredPassportEvent[] = [];
  let storageError = false;
  try {
    [scans, signups, applications] = await Promise.all([
      listPassportEvents("scan"),
      listPassportEvents("signup"),
      listPassportEvents("partner-application"),
    ]);
  } catch (err) {
    console.error("passport tracking read failed:", err);
    storageError = true;
  }

  const scanCounts = new Map<string, number>();
  for (const s of scans) scanCounts.set(s.key, (scanCounts.get(s.key) ?? 0) + 1);
  const signupCounts = new Map<string, number>();
  for (const s of signups) signupCounts.set(s.key, (signupCounts.get(s.key) ?? 0) + 1);

  const referredSignups = signups.filter((s) => s.key !== "direct").length;
  const directSignups = signups.length - referredSignups;

  // Ref codes that have events but no partner entry (deleted or mistyped codes).
  const knownCodes = new Set(partners.map((p) => p.refCode.toUpperCase()));
  const strayCodes = [
    ...new Set(
      [...scanCounts.keys(), ...signupCounts.keys()].filter(
        (k) => k !== "direct" && !knownCodes.has(k)
      )
    ),
  ];

  const recentSignups: RecentSignup[] = (
    await Promise.all(
      signups.slice(0, 12).map(async (s) => {
        const body = await readPassportEvent(s.pathname);
        return {
          email: typeof body?.email === "string" ? body.email : "unknown",
          ref: s.key === "direct" ? null : s.key,
          at: s.uploadedAt,
        };
      })
    )
  ).filter(Boolean);

  const env = passportEventEnv();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold tracking-widest text-[#C8102E] uppercase">
            Get Branson Tickets
          </p>
          <h1 className="text-3xl font-bold text-[#13264D]">Passport QR Tracking</h1>
        </div>
        <OfficeSignOutButton />
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Every partner QR scan and Passport signup, counted from durable storage.
        A signup counts for a partner when the visitor scanned that partner&apos;s
        QR code in the last 30 days.
      </p>
      <p className="mt-2 text-sm">
        <Link href="/office" className="font-semibold text-[#C8102E] hover:underline">
          Back to the Voucher Desk
        </Link>
      </p>

      {storageError && (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
          Could not reach event storage. Check that BLOB_READ_WRITE_TOKEN is set
          for this environment.
        </div>
      )}

      {/* Totals */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        {[
          { label: "QR scans", value: scans.length },
          { label: "Passport signups", value: signups.length },
          { label: "From partner QRs", value: referredSignups },
        ].map((t) => (
          <div key={t.label} className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-[#13264D]">{t.value}</p>
            <p className="mt-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">{t.label}</p>
          </div>
        ))}
      </div>

      {/* Per partner */}
      <h2 className="mt-10 text-lg font-bold text-[#13264D]">By partner</h2>
      <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase">
              <th className="px-4 py-3">Partner</th>
              <th className="px-3 py-3 text-right">Scans</th>
              <th className="px-3 py-3 text-right">Signups</th>
              <th className="px-4 py-3 text-right">Links</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => {
              const code = p.refCode.toUpperCase();
              return (
                <tr key={p.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-[#1A1614]">{p.name}</span>
                    <span className="ml-2 rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-600">
                      {p.refCode}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-semibold text-[#13264D]">
                    {scanCounts.get(code) ?? 0}
                  </td>
                  <td className="px-3 py-3 text-right font-semibold text-[#13264D]">
                    {signupCounts.get(code) ?? 0}
                  </td>
                  <td className="px-4 py-3 text-right text-xs whitespace-nowrap">
                    <a
                      href={`/p/${p.refCode}`}
                      className="font-semibold text-[#C8102E] hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      QR link
                    </a>
                    <span className="mx-1 text-gray-300">·</span>
                    <Link
                      href={`/passport/partners/${p.slug}/kit`}
                      className="font-semibold text-[#C8102E] hover:underline"
                    >
                      Print kit
                    </Link>
                  </td>
                </tr>
              );
            })}
            <tr className="bg-gray-50/60">
              <td className="px-4 py-3 text-gray-600">Direct (no QR code)</td>
              <td className="px-3 py-3 text-right text-gray-400">-</td>
              <td className="px-3 py-3 text-right font-semibold text-[#13264D]">{directSignups}</td>
              <td className="px-4 py-3" />
            </tr>
            {strayCodes.map((code) => (
              <tr key={code} className="bg-amber-50/60">
                <td className="px-4 py-3 text-amber-900">
                  Unrecognized code <span className="font-mono text-xs">{code}</span>
                </td>
                <td className="px-3 py-3 text-right">{scanCounts.get(code) ?? 0}</td>
                <td className="px-3 py-3 text-right">{signupCounts.get(code) ?? 0}</td>
                <td className="px-4 py-3" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent signups */}
      <h2 className="mt-10 text-lg font-bold text-[#13264D]">
        Latest signups {signups.length > 0 && `(${signups.length} total)`}
      </h2>
      {recentSignups.length === 0 ? (
        <p className="mt-3 rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-500">
          No signups recorded yet. They appear here the moment someone joins the
          Passport.
        </p>
      ) : (
        <div className="mt-3 space-y-2">
          {recentSignups.map((s, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
            >
              <span className="text-sm font-medium text-[#1A1614]">{s.email}</span>
              <span className="flex items-center gap-3 text-xs">
                {s.ref ? (
                  <span className="rounded-full bg-[#13264D] px-2.5 py-0.5 font-semibold text-white">
                    via {partners.find((p) => p.refCode.toUpperCase() === s.ref)?.name ?? s.ref}
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 font-semibold text-gray-600">
                    direct
                  </span>
                )}
                <span className="text-gray-500">{officeDate.format(s.at)}</span>
              </span>
            </div>
          ))}
        </div>
      )}

      {applications.length > 0 && (
        <p className="mt-8 text-sm text-gray-600">
          Partner applications recorded: <span className="font-semibold">{applications.length}</span>{" "}
          (details arrive by email).
        </p>
      )}

      <p className="mt-10 text-xs text-gray-400">
        Environment: {env}. Events recorded since Aug 2026; earlier scans exist
        only in expired runtime logs. Partner QR codes point at{" "}
        {siteConfig.url.replace(/^https?:\/\//, "")}/p/&lt;code&gt;.
      </p>
    </div>
  );
}
