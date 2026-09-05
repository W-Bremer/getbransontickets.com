export const siteConfig = {
  name: "GetBransonTickets.com",
  shortName: "Get Branson Tickets",
  tagline: "Branson Show Tickets and Things to Do",
  description:
    "Compare and book tickets to Branson live shows and attractions. Verified showtimes, dates and prices on every listing, and one checkout for the whole trip.",
  // Canonical host: the apex 301s to www, so every canonical, sitemap entry,
  // and QR target must use www or it burns a redirect hop.
  url: "https://www.getbransontickets.com",
  phone: "(417) 243-9629",
  phoneRaw: "14172439629",
  email: "contact@getbransontickets.com",
  address: "Branson, MO 65616",
  foundedYear: 2024,
  // Verified against the show catalog rather than asserted in copy. If you want
  // sales or review totals on the site, put the real figures here first.
  averageRating: 4.8,
  socialLinks: {
    facebook: "https://facebook.com/getbransontickets",
    instagram: "https://instagram.com/getbransontickets",
    youtube: "https://youtube.com/@getbransontickets",
  },
} as const;

// Descriptions are deliberately uneven: some carry a fact, some carry an
// opinion. Keep them that way. Stacked hype adjectives read as filler.
export const categories = [
  { name: "All Shows", slug: "all", icon: "Theater", description: "Everything currently running in Branson." },
  { name: "Variety & Music", slug: "variety-music", icon: "Music", description: "Branson's biggest category. Families who play a dozen instruments each, and bands that cover eight decades in two hours." },
  { name: "Comedy", slug: "comedy", icon: "Laugh", description: "Clean stand-up, sketch, and one hypnotist. Most play matinees." },
  { name: "Magic & Illusion", slug: "magic", icon: "Wand2", description: "Two full illusion shows, both evenings." },
  { name: "Dinner Shows", slug: "dinner-shows", icon: "UtensilsCrossed", description: "Dinner is included in the ticket. Get there early, seating starts well before curtain." },
  { name: "Country & Gospel", slug: "country-gospel", icon: "Guitar", description: "The music the town was built on." },
  { name: "Tribute Shows", slug: "tribute", icon: "Star", description: "Patsy Cline, Dean Martin, Motown, and the 60s hits." },
  { name: "Family Shows", slug: "family", icon: "Users", description: "Nothing you would have to explain to a seven-year-old." },
  { name: "Acrobats & Circus", slug: "acrobats", icon: "Dumbbell", description: "The Shanghai acrobats, at the Mickey Gilley theatre." },
  { name: "Theatrical", slug: "theatrical", icon: "Drama", description: "Sight & Sound's DAVID, and the outdoor drama up at Shepherd of the Hills." },
] as const;

export const attractionTypes = [
  { name: "All", slug: "all" },
  { name: "Theme Parks", slug: "theme-park" },
  { name: "Museums", slug: "museum" },
  { name: "Outdoor", slug: "outdoor" },
  { name: "Water Parks", slug: "water-park" },
  { name: "Amusement", slug: "amusement" },
  { name: "Tours", slug: "tour" },
  { name: "Shows", slug: "show" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Mini Golf", slug: "mini-golf" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
