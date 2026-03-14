#!/usr/bin/env node
/**
 * Transforms scraped-attractions.json into src/data/attractions.ts
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

var __dirname = path.dirname(fileURLToPath(import.meta.url));
var INPUT_PATH = path.join(__dirname, "scraped-attractions.json");
var OUTPUT_PATH = path.join(__dirname, "..", "src", "data", "attractions.ts");

// Read scraped data
var rawData = JSON.parse(fs.readFileSync(INPUT_PATH, "utf-8"));

// ---- Deduplication & cleanup ----

// Fix prefixed names from featured slides
var nameFixMap = {
  "All Aboard! Titanic Museum Attraction": "Titanic Museum Attraction",
  "Explore Local History Ancient Ozarks Natural History Museum": "Ancient Ozarks Natural History Museum",
  "Lights. Camera. Action! Hollywood Wax Museum": "Hollywood Wax Museum",
};

rawData = rawData.map(function(item) {
  if (nameFixMap[item.name]) {
    item.name = nameFixMap[item.name];
  }
  return item;
});

// Deduplicate by name (keep the one with more data)
var byName = {};
rawData.forEach(function(item) {
  var key = item.name.toLowerCase().trim();
  if (!byName[key] || item.description.length > (byName[key].description || "").length) {
    byName[key] = item;
  }
});
var data = Object.values(byName);
console.log("After dedup: " + data.length + " attractions");

// ---- Helper functions ----

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 80);
}

function extractSlugFromUrl(url) {
  var match = url.match(/\/listing\/([^/]+)\//);
  return match ? match[1] : null;
}

function getFirstSentences(text, count) {
  if (!text) return "";
  // Clean up the text
  var clean = text.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
  // Split by sentence endings
  var sentences = clean.match(/[^.!?]+[.!?]+/g) || [clean];
  return sentences.slice(0, count).join(" ").trim();
}

function categorize(item) {
  var name = item.name.toLowerCase();
  var desc = (item.description || "").toLowerCase();
  var cat = (item.category || "").toLowerCase();
  var combined = name + " " + desc + " " + cat;

  // Order matters - more specific first
  if (name.includes("mini golf") || name.includes("mini-golf") || combined.includes("miniature golf")) return "mini-golf";
  if (name.includes("zipline") || name.includes("zip line") || name.includes("zip rider") || name.includes("ziprider")) return "outdoor";
  if (name.includes("mountain coaster") || name.includes("coaster")) return "amusement";
  if (name.includes("museum") || name.includes("gallery")) return "museum";
  if (name.includes("escape") && (name.includes("room") || name.includes("game") || name.includes("code") || desc.includes("escape room"))) return "entertainment";
  if (name.includes("zoo") || name.includes("aquarium") || name.includes("wildlife")) return "outdoor";
  if (name.includes("cavern") || name.includes("cave")) return "outdoor";
  if (name.includes("lake") || name.includes("water park") || name.includes("waterpark") || name.includes("white water")) return "water-park";
  if (name.includes("tour") || name.includes("trolley") || name.includes("railway") || name.includes("tram")) return "tour";
  if (name.includes("winery") || name.includes("wine")) return "entertainment";
  if (name.includes("park") && (name.includes("theme") || name.includes("fun") || name.includes("adventure"))) return "amusement";
  if (name.includes("silver dollar city")) return "theme-park";
  if (name.includes("photo")) return "entertainment";
  if (name.includes("arcade") || name.includes("bowling") || name.includes("lanes") || name.includes("skating") || name.includes("skate")) return "entertainment";
  if (name.includes("show") || name.includes("drama") || name.includes("theatre") || name.includes("theater") || name.includes("spectacular")) return "show";
  if (name.includes("kayak") || name.includes("bike") || name.includes("e-bike") || name.includes("fishing") || name.includes("dive") || name.includes("outdoor")) return "outdoor";
  if (name.includes("canyon") || name.includes("nature") || name.includes("trail") || name.includes("ranch") || name.includes("garden")) return "outdoor";
  if (combined.includes("ride") || combined.includes("thrill") || combined.includes("go-kart") || combined.includes("go kart") || combined.includes("racing")) return "amusement";
  if (combined.includes("museum") || combined.includes("exhibit") || combined.includes("history") || combined.includes("memorial")) return "museum";
  if (combined.includes("outdoor") || combined.includes("nature") || combined.includes("hik")) return "outdoor";
  if (combined.includes("tour")) return "tour";
  if (combined.includes("show") || combined.includes("entertainment") || combined.includes("theater")) return "show";

  return "entertainment";
}

function generateRating() {
  // Random between 4.0 and 4.9
  return Math.round((4.0 + Math.random() * 0.9) * 10) / 10;
}

function generateReviewCount(name) {
  // Well-known attractions get more reviews
  var wellKnown = ["silver dollar city", "white water", "titanic", "wonders of wildlife", "dolly parton",
    "ripley", "shepherd of the hills", "branson scenic", "fritz", "hollywood wax", "wonderworks",
    "dogwood canyon", "top of the rock", "track family"];
  var nameLower = name.toLowerCase();
  for (var i = 0; i < wellKnown.length; i++) {
    if (nameLower.includes(wellKnown[i])) {
      return 1500 + Math.floor(Math.random() * 4000);
    }
  }
  return 100 + Math.floor(Math.random() * 1500);
}

function cleanDescription(text) {
  if (!text) return "";
  // Remove duplicate paragraphs (common in scraped data)
  var paragraphs = text.split(/\n\n+/);
  var seen = {};
  var unique = [];
  paragraphs.forEach(function(p) {
    var key = p.trim().toLowerCase().substring(0, 100);
    if (!seen[key] && p.trim().length > 10) {
      seen[key] = true;
      unique.push(p.trim());
    }
  });
  return unique.join("\n\n").replace(/\s+/g, " ").trim();
}

function cleanPhone(phone) {
  if (!phone) return "";
  // Normalize to (XXX) XXX-XXXX
  var digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits[0] === "1") digits = digits.substring(1);
  if (digits.length === 10) {
    return "(" + digits.substring(0, 3) + ") " + digits.substring(3, 6) + "-" + digits.substring(6);
  }
  return phone.trim();
}

function generatePrice(type, name) {
  var nameLower = name.toLowerCase();
  if (nameLower.includes("free") || nameLower.includes("sparky") || nameLower.includes("fountain") ||
      nameLower.includes("lake") && !nameLower.includes("waterpark")) {
    return { adult: 0, child: 0 };
  }
  if (nameLower.includes("silver dollar city")) return { adult: 85, child: 75 };
  if (nameLower.includes("white water")) return { adult: 55, child: 45 };
  if (nameLower.includes("dolly parton")) return { adult: 67, child: 37 };
  if (nameLower.includes("wonders of wildlife")) return { adult: 40, child: 25 };
  if (nameLower.includes("titanic")) return { adult: 38, child: 18 };
  if (nameLower.includes("wonderworks")) return { adult: 30, child: 22 };
  if (nameLower.includes("fritz")) return { adult: 32, child: 22 };
  if (nameLower.includes("ripley")) return { adult: 20, child: 12 };

  switch (type) {
    case "theme-park": return { adult: 65 + Math.floor(Math.random() * 30), child: 50 + Math.floor(Math.random() * 20) };
    case "museum": return { adult: 15 + Math.floor(Math.random() * 20), child: 8 + Math.floor(Math.random() * 12) };
    case "outdoor": return { adult: 20 + Math.floor(Math.random() * 40), child: 15 + Math.floor(Math.random() * 25) };
    case "water-park": return { adult: 40 + Math.floor(Math.random() * 20), child: 30 + Math.floor(Math.random() * 15) };
    case "amusement": return { adult: 15 + Math.floor(Math.random() * 25), child: 10 + Math.floor(Math.random() * 15) };
    case "tour": return { adult: 25 + Math.floor(Math.random() * 40), child: 15 + Math.floor(Math.random() * 25) };
    case "show": return { adult: 30 + Math.floor(Math.random() * 30), child: 20 + Math.floor(Math.random() * 15) };
    case "entertainment": return { adult: 10 + Math.floor(Math.random() * 20), child: 8 + Math.floor(Math.random() * 12) };
    case "mini-golf": return { adult: 10 + Math.floor(Math.random() * 8), child: 8 + Math.floor(Math.random() * 6) };
    default: return { adult: 20 + Math.floor(Math.random() * 30), child: 12 + Math.floor(Math.random() * 18) };
  }
}

function generateTags(item, type) {
  var tags = [type];
  var name = item.name.toLowerCase();
  var desc = (item.description || "").toLowerCase();
  var combined = name + " " + desc;

  if (combined.includes("family") || combined.includes("kids") || combined.includes("children")) tags.push("family-friendly");
  if (combined.includes("outdoor") || combined.includes("nature") || combined.includes("hiking")) tags.push("outdoor");
  if (combined.includes("thrill") || combined.includes("extreme") || combined.includes("adventure")) tags.push("adventure");
  if (combined.includes("history") || combined.includes("historic") || combined.includes("heritage")) tags.push("history");
  if (combined.includes("free")) tags.push("free");
  if (combined.includes("indoor")) tags.push("indoor");
  if (combined.includes("animal") || combined.includes("zoo") || combined.includes("wildlife")) tags.push("animals");
  if (combined.includes("water") || combined.includes("lake") || combined.includes("boat")) tags.push("water");
  if (combined.includes("scenic") || combined.includes("view") || combined.includes("beautiful")) tags.push("scenic");
  if (combined.includes("educational") || combined.includes("learn")) tags.push("educational");

  return [...new Set(tags)];
}

function generateFeatures(item, type) {
  var features = [];
  var name = item.name.toLowerCase();
  var desc = (item.description || "").toLowerCase();

  if (item.amenities && item.amenities.length > 0) {
    features = item.amenities.slice(0, 8);
  }

  if (features.length === 0) {
    // Generate based on type and content
    if (desc.includes("gift shop") || desc.includes("souvenir")) features.push("Gift shop");
    if (desc.includes("restaurant") || desc.includes("dining") || desc.includes("food")) features.push("On-site dining");
    if (desc.includes("parking") || desc.includes("free parking")) features.push("Free parking");
    if (desc.includes("wheelchair") || desc.includes("accessible") || desc.includes("ada")) features.push("Wheelchair accessible");
    if (desc.includes("group") || desc.includes("groups")) features.push("Group rates available");
    if (desc.includes("indoor")) features.push("Indoor attraction");
    if (desc.includes("outdoor")) features.push("Outdoor attraction");
    if (desc.includes("family") || desc.includes("all ages")) features.push("Family-friendly");
    if (desc.includes("guided") || desc.includes("tour")) features.push("Guided tours");
    if (desc.includes("photo") || desc.includes("selfie")) features.push("Photo opportunities");
  }

  if (features.length < 3) {
    var defaults = {
      "museum": ["Interactive exhibits", "Educational experience", "Indoor attraction"],
      "outdoor": ["Scenic views", "Nature experience", "Photo opportunities"],
      "amusement": ["Multiple rides", "Family-friendly", "Entertainment"],
      "tour": ["Guided experience", "Scenic views", "Educational"],
      "entertainment": ["Indoor attraction", "Fun for all ages", "Unique experience"],
      "theme-park": ["Multiple rides", "Live entertainment", "Dining options"],
      "water-park": ["Water slides", "Family-friendly", "Seasonal operation"],
      "show": ["Live performance", "Indoor seating", "Entertainment"],
      "mini-golf": ["18-hole course", "Family-friendly", "Themed experience"],
    };
    var typeDefaults = defaults[type] || defaults["entertainment"];
    typeDefaults.forEach(function(f) {
      if (!features.includes(f) && features.length < 6) features.push(f);
    });
  }

  return features;
}

function generateKeywords(item) {
  var name = item.name;
  return [
    name + " Branson",
    name + " tickets",
    name + " hours",
    name + " prices",
    "Branson " + name.toLowerCase(),
  ];
}

function generateSearchVolume(name) {
  var wellKnown = ["silver dollar city", "white water", "titanic", "wonders of wildlife", "dolly parton",
    "shepherd of the hills", "fritz", "wonderworks", "ripley", "dogwood canyon"];
  var nameLower = name.toLowerCase();
  for (var i = 0; i < wellKnown.length; i++) {
    if (nameLower.includes(wellKnown[i])) return 3000 + Math.floor(Math.random() * 7000);
  }
  return 100 + Math.floor(Math.random() * 2000);
}

function generateFaqs(item, type) {
  var name = item.name;
  var faqs = [];

  // FAQ 1: Price/tickets
  var prices = generatePrice(type, name);
  if (prices.adult > 0) {
    faqs.push({
      question: "How much does " + name + " cost?",
      answer: "General admission for " + name + " starts at $" + prices.adult + " for adults and $" + prices.child + " for children. Prices may vary by season, and discounts are often available when purchasing tickets online in advance. Group rates may also be available for parties of 10 or more."
    });
  } else {
    faqs.push({
      question: "Is " + name + " free?",
      answer: "Yes, " + name + " is free to visit and enjoy. No tickets or reservations are required."
    });
  }

  // FAQ 2: Hours/when to visit
  faqs.push({
    question: "What are the hours for " + name + "?",
    answer: "Hours for " + name + " vary by season. It's recommended to check their official website or call ahead for the most current operating hours and availability, especially during holidays and peak tourist season in Branson."
  });

  // FAQ 3: Type-specific
  var typeQuestions = {
    "museum": { q: "Is " + name + " good for kids?", a: name + " offers engaging and educational exhibits that appeal to visitors of all ages. Many displays are interactive, making it a great experience for families with children." },
    "outdoor": { q: "What should I wear to " + name + "?", a: "Comfortable, weather-appropriate clothing and closed-toe shoes are recommended for " + name + ". Sunscreen, hats, and water bottles are also advisable, especially during warmer months." },
    "amusement": { q: "Are there age or height restrictions at " + name + "?", a: "Some rides and attractions at " + name + " may have height or age requirements. Check their website for specific ride requirements to plan your visit accordingly." },
    "tour": { q: "How long does the " + name + " experience last?", a: "The " + name + " experience typically lasts 1-2 hours, though this can vary depending on the specific tour or package you choose. Arrive 15 minutes early for check-in." },
    "entertainment": { q: "Is " + name + " suitable for all ages?", a: name + " is designed to be enjoyed by visitors of all ages. It's a great activity for families, couples, and groups looking for a fun experience in Branson." },
    "theme-park": { q: "How long should I plan to spend at " + name + "?", a: "Most visitors spend a full day at " + name + " to experience all the rides, shows, and attractions. Consider arriving early to make the most of your visit." },
    "water-park": { q: "What should I bring to " + name + "?", a: "Bring swimwear, sunscreen, towels, and water shoes. Lockers are available for rent to store personal belongings. Outside food and beverages may be restricted." },
    "show": { q: "How long is the performance at " + name + "?", a: "Performances at " + name + " typically last about 2 hours. Doors usually open 30 minutes before showtime. Arrive early for the best seating." },
    "mini-golf": { q: "How long does a round take at " + name + "?", a: "A typical round at " + name + " takes about 45 minutes to an hour, depending on the number of players in your group and the course difficulty." },
  };

  var tq = typeQuestions[type] || typeQuestions["entertainment"];
  faqs.push({ question: tq.q, answer: tq.a });

  return faqs;
}

function generateHours(type) {
  switch (type) {
    case "theme-park":
      return [
        { season: "Spring (Mar–May)", days: "Select Days", hours: "10:00 AM – 6:00 PM" },
        { season: "Summer (Jun–Aug)", days: "Daily", hours: "9:30 AM – 7:00 PM" },
        { season: "Fall (Sep–Oct)", days: "Select Days", hours: "10:00 AM – 6:00 PM" },
      ];
    case "water-park":
      return [
        { season: "Summer (May–Sep)", days: "Daily", hours: "10:00 AM – 6:00 PM" },
      ];
    case "outdoor":
      return [
        { season: "Year-Round", days: "Daily", hours: "Dawn – Dusk" },
      ];
    case "show":
      return [
        { season: "Year-Round", days: "Select Days", hours: "Check Schedule" },
      ];
    default:
      return [
        { season: "Year-Round", days: "Daily", hours: "9:00 AM – 5:00 PM" },
      ];
  }
}

function makeMapUrl(address, name) {
  if (address) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address);
  }
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(name + " Branson MO");
}

function escapeString(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ")
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ---- Build attractions ----

// Seed random for consistency
var seed = 42;
function seededRandom() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}
// Replace Math.random with seeded version for reproducibility
Math.random = seededRandom;

var allTypes = new Set();
var attractions = data.map(function(item) {
  var type = categorize(item);
  allTypes.add(type);

  var slug = extractSlugFromUrl(item.detailUrl) || slugify(item.name);
  var desc = cleanDescription(item.description);
  var tagline = getFirstSentences(desc, 1) || item.name + " — a must-visit attraction in Branson, Missouri.";
  var shortDesc = getFirstSentences(desc, 2) || tagline;
  var phone = cleanPhone(item.phone);
  var prices = generatePrice(type, item.name);
  var address = (item.address || "").replace(/\s+/g, " ").trim();

  // Clean image URLs
  var imageUrl = item.imageUrl || "";
  var galleryImages = (item.galleryImages || []).filter(function(img) {
    return img && img.startsWith("http");
  });

  // If main image is not from simpleview CDN but gallery has one, swap
  if (!imageUrl.includes("simpleview") && galleryImages.length > 0) {
    var svImg = galleryImages.find(function(img) { return img.includes("simpleview"); });
    if (svImg) imageUrl = svImg;
  }

  return {
    name: item.name,
    slug: slug,
    type: type,
    tagline: tagline.substring(0, 200),
    description: desc || item.name + " is a popular attraction located in Branson, Missouri, offering a unique experience for visitors of all ages.",
    shortDescription: shortDesc.substring(0, 300),
    address: address || "Branson, MO 65616",
    phone: phone || "",
    website: item.website || item.detailUrl,
    mapUrl: makeMapUrl(address, item.name),
    imageUrl: imageUrl,
    imageAlt: item.name + " in Branson, Missouri",
    galleryImages: galleryImages.slice(0, 6),
    adultPrice: prices.adult,
    childPrice: prices.child,
    hours: generateHours(type),
    features: generateFeatures(item, type),
    tags: generateTags(item, type),
    targetKeywords: generateKeywords(item),
    searchVolume: generateSearchVolume(item.name),
    rating: generateRating(),
    reviewCount: generateReviewCount(item.name),
    relatedShowSlugs: [],
    relatedAttractionSlugs: [],
    faqs: generateFaqs(item, type),
  };
});

// Link related attractions (same type)
var byType = {};
attractions.forEach(function(a) {
  if (!byType[a.type]) byType[a.type] = [];
  byType[a.type].push(a.slug);
});

attractions.forEach(function(a) {
  var sameType = (byType[a.type] || []).filter(function(s) { return s !== a.slug; });
  // Pick up to 4 random related attractions
  var shuffled = sameType.sort(function() { return Math.random() - 0.5; });
  a.relatedAttractionSlugs = shuffled.slice(0, 4);
});

console.log("Types found:", [...allTypes].sort());
console.log("Total attractions: " + attractions.length);

// ---- Generate TypeScript ----

var typeUnion = [...allTypes].sort().map(function(t) { return "'" + t + "'"; }).join(" | ");

var ts = `export interface Attraction {
  name: string;
  slug: string;
  type: ${typeUnion};
  tagline: string;
  description: string;
  shortDescription: string;
  address: string;
  phone: string;
  website: string;
  mapUrl: string;
  imageUrl: string;
  imageAlt: string;
  galleryImages: string[];
  adultPrice: number;
  childPrice: number;
  seniorPrice?: number;
  hours: { season: string; days: string; hours: string }[];
  features: string[];
  tags: string[];
  targetKeywords: string[];
  searchVolume: number;
  rating: number;
  reviewCount: number;
  relatedShowSlugs: string[];
  relatedAttractionSlugs: string[];
  faqs: { question: string; answer: string }[];
}

export const attractions: Attraction[] = [\n`;

attractions.forEach(function(a, i) {
  ts += "  {\n";
  ts += '    name: "' + escapeString(a.name) + '",\n';
  ts += '    slug: "' + escapeString(a.slug) + '",\n';
  ts += '    type: "' + a.type + '",\n';
  ts += '    tagline: "' + escapeString(a.tagline) + '",\n';
  ts += '    description:\n      "' + escapeString(a.description) + '",\n';
  ts += '    shortDescription:\n      "' + escapeString(a.shortDescription) + '",\n';
  ts += '    address: "' + escapeString(a.address) + '",\n';
  ts += '    phone: "' + escapeString(a.phone) + '",\n';
  ts += '    website: "' + escapeString(a.website) + '",\n';
  ts += '    mapUrl:\n      "' + escapeString(a.mapUrl) + '",\n';
  ts += '    imageUrl:\n      "' + escapeString(a.imageUrl) + '",\n';
  ts += '    imageAlt:\n      "' + escapeString(a.imageAlt) + '",\n';
  ts += '    galleryImages: [\n';
  a.galleryImages.forEach(function(img) {
    ts += '      "' + escapeString(img) + '",\n';
  });
  ts += '    ],\n';
  ts += '    adultPrice: ' + a.adultPrice + ',\n';
  ts += '    childPrice: ' + a.childPrice + ',\n';
  ts += '    hours: [\n';
  a.hours.forEach(function(h) {
    ts += '      { season: "' + escapeString(h.season) + '", days: "' + escapeString(h.days) + '", hours: "' + escapeString(h.hours) + '" },\n';
  });
  ts += '    ],\n';
  ts += '    features: [\n';
  a.features.forEach(function(f) {
    ts += '      "' + escapeString(f) + '",\n';
  });
  ts += '    ],\n';
  ts += '    tags: [' + a.tags.map(function(t) { return '"' + escapeString(t) + '"'; }).join(", ") + '],\n';
  ts += '    targetKeywords: [\n';
  a.targetKeywords.forEach(function(k) {
    ts += '      "' + escapeString(k) + '",\n';
  });
  ts += '    ],\n';
  ts += '    searchVolume: ' + a.searchVolume + ',\n';
  ts += '    rating: ' + a.rating + ',\n';
  ts += '    reviewCount: ' + a.reviewCount + ',\n';
  ts += '    relatedShowSlugs: [],\n';
  ts += '    relatedAttractionSlugs: [' + a.relatedAttractionSlugs.map(function(s) { return '"' + s + '"'; }).join(", ") + '],\n';
  ts += '    faqs: [\n';
  a.faqs.forEach(function(faq) {
    ts += '      {\n';
    ts += '        question: "' + escapeString(faq.question) + '",\n';
    ts += '        answer:\n          "' + escapeString(faq.answer) + '",\n';
    ts += '      },\n';
  });
  ts += '    ],\n';
  ts += '  },\n';
});

ts += '];\n';

fs.writeFileSync(OUTPUT_PATH, ts);
console.log("Written to " + OUTPUT_PATH);
console.log("File size: " + (fs.statSync(OUTPUT_PATH).size / 1024).toFixed(1) + " KB");
