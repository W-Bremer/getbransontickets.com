import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { siteConfig, categories } from "@/lib/config";

const showLinks = categories
  .filter((c) => c.slug !== "all")
  .map((c) => ({ label: c.name, href: `/shows/category/${c.slug}` }));

const exploreLinks = [
  { label: "All Shows", href: "/shows" },
  { label: "Attractions", href: "/attractions" },
  { label: "Theaters & Venues", href: "/theaters" },
  { label: "Show Schedule", href: "/shows/schedule" },
  { label: "Deals & Discounts", href: "/deals" },
  { label: "Blog", href: "/blog" },
  { label: "Plan Your Trip", href: "/plan-your-trip" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Reviews", href: "/reviews" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  { label: "Facebook", href: siteConfig.socialLinks.facebook, icon: Facebook },
  { label: "Instagram", href: siteConfig.socialLinks.instagram, icon: Instagram },
  { label: "Twitter", href: siteConfig.socialLinks.twitter, icon: Twitter },
  { label: "YouTube", href: siteConfig.socialLinks.youtube, icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-[#5A1212] text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        {/* Top section - brand + newsletter */}
        <div className="mb-12 flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
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

          {/* Newsletter */}
          <div className="max-w-sm shrink-0">
            <h3 className="mb-2 text-lg font-semibold">
              Stay in the Spotlight
            </h3>
            <p className="mb-3 text-sm text-white/50">
              Get exclusive deals and show updates delivered to your inbox.
            </p>
            <form className="flex gap-2" action="#">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#D4A843]/50 focus:outline-none focus:ring-1 focus:ring-[#D4A843]/50"
              />
              <button
                type="submit"
                className="flex items-center gap-1 rounded-lg bg-[#8B6914] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6B5210]"
              >
                Subscribe
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Shows */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-[#D4A843] uppercase">
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
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-[#D4A843] uppercase">
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
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-[#D4A843] uppercase">
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
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-[#D4A843] uppercase">
              Connect
            </h4>
            <div className="mb-4 space-y-3">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#D4A843]"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#D4A843]"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.email}
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-[#D4A843]/30 hover:bg-[#D4A843]/10 hover:text-[#D4A843]"
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
          <p className="text-xs tracking-widest text-white/40 uppercase">
            Live Entertainment Capital of the World
          </p>
        </div>
      </div>
    </footer>
  );
}
