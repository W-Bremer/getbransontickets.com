export const siteConfig = {
  name: "ShowTime Branson",
  tagline: "Your Guide to Branson's Best Live Entertainment",
  description: "Discover and book tickets for the best shows, attractions, and entertainment in Branson, Missouri — the Live Entertainment Capital of the World.",
  url: "https://showtimebranson.com",
  phone: "1-800-555-SHOW",
  phoneRaw: "18005557469",
  email: "info@showtimebranson.com",
  address: "Branson, MO 65616",
  foundedYear: 2024,
  showsBooked: 125000,
  reviewCount: 8500,
  averageRating: 4.8,
  socialLinks: {
    facebook: "https://facebook.com/showtimebranson",
    instagram: "https://instagram.com/showtimebranson",
    twitter: "https://twitter.com/showtimebranson",
    youtube: "https://youtube.com/@showtimebranson",
  },
} as const;

export const categories = [
  { name: "All Shows", slug: "all", icon: "Theater", description: "Browse every show in Branson" },
  { name: "Variety & Music", slug: "variety-music", icon: "Music", description: "High-energy variety and music performances" },
  { name: "Comedy", slug: "comedy", icon: "Laugh", description: "Side-splitting comedy from Branson's funniest" },
  { name: "Magic & Illusion", slug: "magic", icon: "Wand2", description: "World-class magic and illusion shows" },
  { name: "Dinner Shows", slug: "dinner-shows", icon: "UtensilsCrossed", description: "Dinner and a show — the complete experience" },
  { name: "Country & Gospel", slug: "country-gospel", icon: "Guitar", description: "Country music and gospel performances" },
  { name: "Tribute Shows", slug: "tribute", icon: "Star", description: "Tributes to music legends" },
  { name: "Family Shows", slug: "family", icon: "Users", description: "Fun for the whole family" },
  { name: "Acrobats & Circus", slug: "acrobats", icon: "Dumbbell", description: "Jaw-dropping acrobatics and circus acts" },
  { name: "Theatrical", slug: "theatrical", icon: "Drama", description: "Broadway-quality theatrical productions" },
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
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
