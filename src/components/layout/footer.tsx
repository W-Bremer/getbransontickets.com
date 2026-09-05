import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { getPartnerShows } from "@/data/shows";

const showLinks = getPartnerShows().map((s) => ({
  label: s.name,
  href: `/shows/${s.slug}`,
}));

const exploreLinks = [
  { label: "All Shows", href: "/shows" },
  { label: "Attractions", href: "/attractions" },
  { label: "Branson Passport", href: "/passport" },
  { label: "Theaters & Venues", href: "/theaters" },
  { label: "Show Schedule", href: "/shows/schedule" },
  { label: "Deals & Discounts", href: "/deals" },
  { label: "Plan Your Trip", href: "/plan-your-trip" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Join the Passport (Businesses)", href: "/passport/join" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const socialLinks = [
  { label: "Facebook", href: siteConfig.socialLinks.facebook, icon: Facebook },
  { label: "Instagram", href: siteConfig.socialLinks.instagram, icon: Instagram },
  { label: "YouTube", href: siteConfig.socialLinks.youtube, icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-[#0D1B38] text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        {/* Top section - brand */}
        <div className="mb-12 border-b border-white/10 pb-12">
          <Link href="/" className="mb-4 flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Get Branson Tickets"
              width={200}
              height={56}
              className="h-12 w-auto"
            />
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
            {siteConfig.description}
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Shows */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-[#E8C65A] uppercase">
              Shows
            </h4>
            <ul className="space-y-2.5">
              {showLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-[#E8C65A] uppercase">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-[#E8C65A] uppercase">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-[#E8C65A] uppercase">
              Connect
            </h4>
            <div className="mb-4 space-y-3">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#E8C65A]"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
              {/* The address is one unbreakable token; without a break rule it
                  paints past the viewport on phones and the browser widens the
                  layout viewport — the right-edge gap bug. */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-2 text-sm text-white/60 transition-colors hover:text-[#E8C65A]"
              >
                <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="min-w-0 [overflow-wrap:anywhere]">{siteConfig.email}</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4 shrink-0" />
                {siteConfig.address}
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-[#E8C65A]/30 hover:bg-[#E8C65A]/10 hover:text-[#E8C65A]"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 md:flex-row md:px-6">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/50">
            Seniors and military save $5 at checkout on every order.
          </p>
          <p className="text-xs tracking-widest text-white/40 uppercase">
            Live Entertainment Capital of the World
          </p>
        </div>
      </div>
    </footer>
  );
}
