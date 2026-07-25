// Branson Passport partner businesses.
// V1 stores partners in code; swap this module for a database table when
// partner volume outgrows a file (the exported helpers are the contract).

export interface PassportPartner {
  id: string;
  slug: string;
  name: string;
  /** Unique referral code used in QR links: getbransontickets.com/p/<refCode> */
  refCode: string;
  category:
    | "lodging"
    | "show"
    | "attraction"
    | "restaurant"
    | "coffee"
    | "shopping"
    | "service";
  tagline: string;
  description: string;
  /** Passport-exclusive offer shown to visitors. Optional. */
  passportDeal?: string;
  area: string;
  address?: string;
  url?: string;
  phone?: string;
  imageUrl?: string;
  isFeatured: boolean;
  joined: string; // YYYY-MM
}

export const partners: PassportPartner[] = [
  {
    id: "bll",
    slug: "branson-lakes-lodging",
    name: "Branson Lakes Lodging",
    refCode: "STAY01",
    category: "lodging",
    tagline: "Premium vacation rentals in the heart of Branson",
    description:
      "Villas, condos, and lake houses with hot tubs, game rooms, and stunning Table Rock views. Local owners, 24/7 support, and rentals from $135 a night. The team knows Branson inside and out and can point you to the right show for your crew.",
    passportDeal: "Mention the Branson Passport for a free late checkout when available.",
    area: "Branson & Table Rock Lake",
    url: "https://bransonlakeslodging.com/",
    imageUrl: "/branson-lakes-lodging.jpg",
    isFeatured: true,
    joined: "2026-07",
  },
  {
    id: "duttons",
    slug: "the-duttons",
    name: "The Duttons",
    refCode: "DUTTON1",
    category: "show",
    tagline: "America's Got Talent family, live in Branson",
    description:
      "A multi-generational family of virtuoso musicians whose two-hour show spans bluegrass, country, classical, and pop. One of the most beloved shows in town, with a Family Pass that covers two adults and all kids under 18.",
    passportDeal: "Family Pass: $113 covers 2 adults plus all children under 18.",
    area: "76 Strip",
    address: "3454 W 76 Country Blvd, Branson, MO 65616",
    url: "https://www.theduttons.com",
    isFeatured: true,
    joined: "2026-07",
  },
];

export function getPartnerByRefCode(code: string): PassportPartner | undefined {
  const normalized = code.trim().toUpperCase();
  return partners.find((p) => p.refCode.toUpperCase() === normalized);
}

export function getPartnerBySlug(slug: string): PassportPartner | undefined {
  return partners.find((p) => p.slug === slug);
}

export function getFeaturedPartners(): PassportPartner[] {
  return partners.filter((p) => p.isFeatured);
}
