import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-7xl font-bold text-[#d4a843] font-heading">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-[#7B1A1A] font-heading">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or no longer exists. Let us help you find what you
          need.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
          <Link
            href="/shows"
            className="px-6 py-3 bg-[#d4a843] text-white rounded-lg font-semibold hover:bg-[#b8922e] transition-colors text-center"
          >
            Browse Shows
          </Link>
          <Link
            href="/attractions"
            className="px-6 py-3 bg-[#7B1A1A] text-white rounded-lg font-semibold hover:bg-[#5A1212] transition-colors text-center"
          >
            Attractions
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <Link
            href="/"
            className="text-[#d4a843] hover:text-[#b8922e] font-medium transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/shows/deals"
            className="text-[#d4a843] hover:text-[#b8922e] font-medium transition-colors"
          >
            Deals
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/shows/schedule"
            className="text-[#d4a843] hover:text-[#b8922e] font-medium transition-colors"
          >
            Schedule
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/blog"
            className="text-[#d4a843] hover:text-[#b8922e] font-medium transition-colors"
          >
            Blog
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/plan-your-trip"
            className="text-[#d4a843] hover:text-[#b8922e] font-medium transition-colors"
          >
            Plan Your Trip
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/contact"
            className="text-[#d4a843] hover:text-[#b8922e] font-medium transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="mt-10 p-6 rounded-xl bg-[#faf8f5] border border-gray-100 max-w-md mx-auto">
          <p className="text-sm text-gray-600">
            Need help? Call our Branson entertainment experts:
          </p>
          <Link
            href={`tel:${siteConfig.phoneRaw}`}
            className="mt-2 inline-block text-xl font-bold text-[#7B1A1A] hover:text-[#d4a843] transition-colors"
          >
            {siteConfig.phone}
          </Link>
        </div>
      </div>
    </section>
  );
}
