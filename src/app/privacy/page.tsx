import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
};

const sections = [
  {
    title: "Information We Collect",
    body: [
      "When you book tickets, we collect your name, email address, phone number, and payment details. Payments are processed by Stripe; we never store your full card number on our servers.",
      "When you sign up for the Branson Passport or our deals list, we collect your email address and, if you choose to share it, your mobile number.",
      "When a business applies to join the Branson Passport, we collect the business name, contact name, email, phone, and any message provided.",
      "If you arrive through a Passport partner's QR code, we set a small cookie that remembers which partner referred you for up to 30 days so we can credit that business.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "To process ticket orders and send your booking vouchers.",
      "To send deals, trip tips, and Passport updates you asked for. Every email includes an unsubscribe link, and you can reply STOP to any text message to opt out.",
      "To credit Passport partner businesses for visitors they refer to us.",
      "To respond when you contact us.",
    ],
  },
  {
    title: "What We Do Not Do",
    body: [
      "We do not sell your personal information.",
      "We do not share your contact details with third parties for their own marketing.",
      "We do not send you text messages unless you gave us your number and checked the opt-in box.",
    ],
  },
  {
    title: "Service Providers",
    body: [
      "We use trusted vendors to run this site: Stripe for payments, Resend for email delivery, and Vercel for hosting. Each receives only the information needed to do its job.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "You can unsubscribe from emails at any time using the link in any message.",
      "You can opt out of texts by replying STOP.",
      `You can ask us to delete your information by emailing ${siteConfig.email}.`,
      "You can clear or block cookies in your browser settings at any time.",
    ],
  },
  {
    title: "Contact",
    body: [
      `Questions about this policy? Email ${siteConfig.email} or call ${siteConfig.phone}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="bg-gradient-to-br from-[#7B1A1A] to-[#5A1212] py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-lg text-white/80">
            Last updated July 25, 2026
          </p>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6">
          <p className="text-lg text-gray-600">
            {siteConfig.name} respects your privacy. This page explains, in plain language, what
            we collect and how we use it.
          </p>
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl font-bold text-[#333333]">{section.title}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
                {section.body.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
