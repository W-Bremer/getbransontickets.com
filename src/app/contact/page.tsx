import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name} — Get Help Booking Branson Shows`,
  description: `Contact ${siteConfig.name} for help booking Branson show tickets. Call ${siteConfig.phone} or send us a message. We're here to help plan your Branson entertainment.`,
  openGraph: {
    title: `Contact ${siteConfig.name}`,
    description: `Get help booking Branson show tickets. Call ${siteConfig.phone} or send us a message.`,
    url: `${siteConfig.url}/contact`,
    type: "website",
    siteName: siteConfig.name,
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${siteConfig.name}`,
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Branson",
        addressRegion: "MO",
        postalCode: "65616",
        addressCountry: "US",
      },
    },
  };

  return (
    <>
      <JsonLd data={contactSchema} />

      {/* Header */}
      <section className="bg-[#7B1A1A] pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/contact" },
            ]}
            className="text-white/60 mb-6 [&_span]:text-white"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Have questions about Branson shows? Need help planning your trip?
            We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#7B1A1A] font-heading mb-6">
                Send Us a Message
              </h2>
              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4a843] focus:border-transparent text-[#7B1A1A]"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4a843] focus:border-transparent text-[#7B1A1A]"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Phone Number{" "}
                    <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4a843] focus:border-transparent text-[#7B1A1A]"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4a843] focus:border-transparent text-[#7B1A1A] resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#d4a843] hover:bg-[#b8922e] text-white rounded-xl font-semibold text-lg transition-colors shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#7B1A1A] font-heading mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-[#faf8f5] border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-[#7B1A1A] flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[#d4a843]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#7B1A1A]">Call Us</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Speak with a Branson entertainment expert
                    </p>
                    <Link
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="mt-2 inline-block text-lg font-semibold text-[#d4a843] hover:text-[#b8922e] transition-colors"
                    >
                      {siteConfig.phone}
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-[#faf8f5] border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-[#7B1A1A] flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-[#d4a843]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#7B1A1A]">Email Us</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      We&apos;ll respond within 24 hours
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="mt-2 inline-block text-lg font-semibold text-[#d4a843] hover:text-[#b8922e] transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-[#faf8f5] border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-[#7B1A1A] flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#d4a843]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#7B1A1A]">Visit Us</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Located in the heart of Branson
                    </p>
                    <p className="mt-2 text-gray-700">{siteConfig.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-[#faf8f5] border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-[#7B1A1A] flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-[#d4a843]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#7B1A1A]">Business Hours</h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-700">
                      <div className="flex justify-between gap-8">
                        <span>Monday - Friday</span>
                        <span className="font-medium">8:00 AM - 8:00 PM CT</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Saturday</span>
                        <span className="font-medium">9:00 AM - 6:00 PM CT</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Sunday</span>
                        <span className="font-medium">10:00 AM - 5:00 PM CT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-[#faf8f5]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#7B1A1A] font-heading">
            Ready to Start Planning?
          </h2>
          <p className="mt-3 text-gray-600">
            Browse our shows and find the perfect entertainment for your
            Branson trip.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shows"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#d4a843] text-white rounded-lg font-semibold hover:bg-[#b8922e] transition-colors"
            >
              Browse Shows
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#7B1A1A] text-[#7B1A1A] rounded-lg font-semibold hover:bg-[#7B1A1A] hover:text-white transition-all"
            >
              View FAQs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
