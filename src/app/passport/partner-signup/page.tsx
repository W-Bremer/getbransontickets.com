import type { Metadata } from "next";
import { BadgeDollarSign, Mail, QrCode, Users, Wrench } from "lucide-react";
import { PartnerSignupFlow } from "@/components/passport/partner-signup-flow";

// Private enrollment page. Shared directly with businesses; intentionally not
// linked from the site nav or sitemap.
export const metadata: Metadata = {
  title: `Partner Signup | Branson Passport`,
  robots: { index: false, follow: false },
};

const reasons = [
  {
    icon: <Users className="h-5 w-5 text-[#C8102E]" />,
    title: "Be in the guide visitors actually use",
    text: "Your own page in the Branson Passport, the free insider guide we hand every visitor planning shows and trips.",
  },
  {
    icon: <QrCode className="h-5 w-5 text-[#C8102E]" />,
    title: "The whole network sends you guests",
    text: "Partner hotels, restaurants, and shops point their guests into the Passport, and your business is there waiting for them.",
  },
  {
    icon: <Wrench className="h-5 w-5 text-[#C8102E]" />,
    title: "Zero work to get started",
    text: "We build your listing and print your QR counter kit, cards and stickers included. You just tell us about your business.",
  },
  {
    icon: <BadgeDollarSign className="h-5 w-5 text-[#C8102E]" />,
    title: "About $2 a day",
    text: "$60 a month flat. No setup fees, no contract, cancel anytime.",
  },
];

const steps = [
  {
    title: "Tell us about your business",
    text: "The short form on this page, about a minute.",
  },
  {
    title: "Set up your $60/month membership",
    text: "Secure card checkout right on this page.",
  },
  {
    title: "You're in within 7 days",
    text: "We build your listing and QR kit and add you to the Passport.",
  },
];

export default function PartnerSignupPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="bg-gradient-to-br from-[#13264D] to-[#1B355F] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-widest text-white/60 uppercase">
            Branson Passport
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
            Put Your Business in Front of Branson Visitors
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            This is the private signup page for Passport partners. Join the network of
            Branson businesses that send each other customers, for about $2 a day.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-[#13264D]">Why partners join</h2>
              <ul className="mt-6 space-y-4">
                {reasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-4 rounded-xl bg-[#F4F6FA] p-4">
                    <span className="mt-0.5 shrink-0">{r.icon}</span>
                    <span>
                      <span className="block font-semibold text-[#13264D]">{r.title}</span>
                      <span className="text-gray-700">{r.text}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-2xl font-bold text-[#13264D]">How it works</h2>
              <ol className="mt-5 space-y-3">
                {steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#13264D] text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <span>
                      <span className="font-semibold text-[#13264D]">{s.title}.</span>{" "}
                      <span className="text-gray-700">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-gray-100 p-6">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#C8102E]" />
                <p className="text-gray-600">
                  Questions before you sign up? Email us anytime at{" "}
                  <a
                    href="mailto:contact@getbransontickets.com"
                    className="font-medium text-[#13264D] underline"
                  >
                    contact@getbransontickets.com
                  </a>{" "}
                  and we&apos;ll get right back to you.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm lg:self-start">
              <PartnerSignupFlow />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
