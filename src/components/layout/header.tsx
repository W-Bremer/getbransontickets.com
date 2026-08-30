"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, Search, Phone, ChevronDown, X, Ticket,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { CartIcon } from "@/components/cart-icon";
import { cn } from "@/lib/utils";

export interface HeaderShowLink {
  name: string;
  slug: string;
}

const navLinks = [
  { label: "Attractions", href: "/attractions" },
  { label: "Passport", href: "/passport" },
  { label: "Deals", href: "/deals" },
  { label: "Schedule", href: "/shows/schedule" },
  { label: "Contact", href: "/contact" },
];

export function Header({ partnerShows }: { partnerShows: HeaderShowLink[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [showsOpen, setShowsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The open menu ends in its own call button, and it can stretch to the very
  // bottom of a phone screen — flag the state globally so the fixed bottom
  // bars (gold call bar, sticky booking bar) and the chat bubble step aside
  // instead of stacking a second call button on top of the menu's.
  useEffect(() => {
    document.documentElement.classList.toggle("mobile-nav-open", mobileOpen);
    return () => document.documentElement.classList.remove("mobile-nav-open");
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shows?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#13264D]/95 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "bg-[#13264D]"
        )}
      >
        {/* Main nav */}
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center">
            <Image
              src="/logo.png"
              alt="Get Branson Tickets"
              width={220}
              height={60}
              className="h-14 w-auto transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {/* Shows dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowsOpen(true)}
              onMouseLeave={() => setShowsOpen(false)}
            >
              <Link
                href="/shows"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/15 hover:text-white"
              >
                Shows
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    showsOpen && "rotate-180"
                  )}
                />
              </Link>

              <AnimatePresence>
                {showsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 z-50 mt-1 w-[540px] -translate-x-1/2 rounded-xl border border-white/10 bg-[#0D1B38] p-4 shadow-2xl shadow-black/40"
                  >
                    <div className="mb-3 border-b border-white/10 pb-3">
                      <Link
                        href="/shows"
                        className="group flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-white/5"
                      >
                        <Ticket className="h-5 w-5 text-[#E8C65A]" />
                        <div>
                          <p className="text-sm font-semibold text-white">All Shows</p>
                          <p className="text-xs text-white/50">Browse every show in Branson</p>
                        </div>
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {partnerShows.map((show) => (
                        <Link
                          key={show.slug}
                          href={`/shows/${show.slug}`}
                          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
                        >
                          <span className="text-[#E8C65A]/80 transition-colors group-hover:text-[#E8C65A]">
                            <Ticket className="h-4 w-4" />
                          </span>
                          <p className="text-sm font-medium text-white/90 group-hover:text-white">
                            {show.name}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/15 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="hidden items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/20 lg:flex"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>

            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
              aria-label="Search shows"
            >
              <Search className="h-5 w-5" />
            </button>

            <CartIcon />

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/15 hover:text-white lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-white/10 lg:hidden"
            >
              {/* The menu is taller than the phone screen once every partner
                  show is listed, so it scrolls inside the fixed header. */}
              <div className="mx-auto max-w-7xl space-y-1 overflow-y-auto overscroll-contain px-4 py-4 max-h-[calc(100dvh-5.5rem)] pb-[max(1rem,env(safe-area-inset-bottom))]">
                <Link
                  href="/shows"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-white/5"
                >
                  All Shows
                </Link>
                {partnerShows.map((show) => (
                  <Link
                    key={show.slug}
                    href={`/shows/${show.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                  >
                    <span className="text-[#E8C65A]/70"><Ticket className="h-4 w-4" /></span>
                    {show.name}
                  </Link>
                ))}
                <div className="border-t border-white/10 pt-2 mt-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-white/5"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4 mt-2">
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-4 py-3 font-semibold text-white"
                  >
                    <Phone className="h-4 w-4" />
                    Call {siteConfig.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0D1B38]/95 backdrop-blur-xl"
          >
            <div className="mx-auto max-w-2xl px-4 pt-24">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Search</h2>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search shows, attractions, theaters..."
                    className="w-full rounded-xl border border-white/20 bg-white/5 py-4 pl-12 pr-4 text-lg text-white placeholder:text-white/40 focus:border-[#E8C65A]/50 focus:outline-none focus:ring-2 focus:ring-[#E8C65A]/20"
                    autoFocus
                  />
                </div>
              </form>
              <div className="mt-6 text-sm text-white/40">
                <p className="mb-3">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {["Haygoods", "Dinner Shows", "Magic", "Comedy", "Silver Dollar City", "Dolly Parton"].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        router.push(`/shows?q=${encodeURIComponent(term)}`);
                        setSearchOpen(false);
                      }}
                      className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-white/70 hover:border-[#E8C65A]/50 hover:text-[#E8C65A]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
