import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Mail } from "lucide-react";
import { stripe } from "@/lib/stripe";

// Return page for the embedded partner checkout. Private, like the signup page.
export const metadata: Metadata = {
  title: `Welcome to the Passport | Branson Passport`,
  robots: { index: false, follow: false },
};

async function sessionPaid(sessionId: string | undefined): Promise<boolean> {
  if (!sessionId) return false;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.status === "complete";
  } catch {
    return false;
  }
}

export default async function PartnerSignupCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const paid = await sessionPaid(session_id);

  return (
    <div className="pt-24 sm:pt-28">
      <section className="bg-gradient-to-br from-[#13264D] to-[#1B355F] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-widest text-white/60 uppercase">
            Branson Passport
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
            {paid ? "Welcome to the Passport!" : "Almost there"}
          </h1>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {paid ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
              <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-600" />
              <h2 className="text-xl font-bold text-[#13264D]">
                Payment received. You&apos;re all set!
              </h2>
              <p className="mt-2 text-gray-600">
                Your business will be added to the Branson Passport within 7 days. We&apos;ll
                reach out at the email you gave us to build your listing and get you your QR
                code kit.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-bold text-[#13264D]">
                We couldn&apos;t confirm your payment
              </h2>
              <p className="mt-2 text-gray-600">
                If you finished checkout, don&apos;t worry: we&apos;ll see it on our end. If
                not, you can{" "}
                <Link href="/passport/partner-signup" className="font-medium text-[#C8102E] underline">
                  head back to the signup page
                </Link>{" "}
                and try again.
              </p>
            </div>
          )}
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-gray-600">
            <Mail className="h-5 w-5 shrink-0 text-[#C8102E]" />
            <span>
              Questions? Email{" "}
              <a
                href="mailto:contact@getbransontickets.com"
                className="font-medium text-[#13264D] underline"
              >
                contact@getbransontickets.com
              </a>
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
