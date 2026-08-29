import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Archivo, Libre_Franklin, Fraunces } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getPartnerShows } from "@/data/shows";
import { PhoneBar } from "@/components/layout/phone-bar";
import { CartDrawer } from "@/components/cart-drawer";
import { GoogleAdsTag } from "@/components/google-ads-tag";
import { siteConfig } from "@/lib/config";
import "./globals.css";

// Archivo carries the marquee headlines, Libre Franklin the reading text,
// Fraunces the vintage-Ozarks accents. Deliberately not the default UI stack.
const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name}: ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Get Branson Tickets: Shows, Attractions & Entertainment in Branson, Missouri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Branson",
    addressRegion: "MO",
    postalCode: "65616",
    addressCountry: "US",
  },
  // No self-serving aggregateRating: we do not collect first-party reviews of
  // the business, so asserting one would be fabricated markup.
  areaServed: {
    "@type": "City",
    name: "Branson",
    containedInPlace: { "@type": "State", name: "Missouri" },
  },
  knowsAbout: [
    "Branson live shows",
    "Branson attractions",
    "Branson show schedules",
    "Table Rock Lake",
  ],
  sameAs: [
    siteConfig.socialLinks.facebook,
    siteConfig.socialLinks.instagram,
    siteConfig.socialLinks.twitter,
    siteConfig.socialLinks.youtube,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${archivo.variable} ${libreFranklin.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <Header
          partnerShows={getPartnerShows().map((s) => ({ name: s.name, slug: s.slug }))}
        />
        <main className="min-h-screen pt-[80px] pb-14 md:pt-[80px] md:pb-0">
          {children}
        </main>
        <Footer />
        <PhoneBar />
        <CartDrawer />
        <Analytics />
        <GoogleAdsTag />
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a7bcb4770d2c2478c5ee9cf"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
