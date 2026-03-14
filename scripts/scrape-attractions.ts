#!/usr/bin/env npx tsx
/**
 * Scrapes all attractions from ExploreBranson.com using Playwright.
 * Outputs raw data to scripts/scraped-attractions.json
 */

import { chromium, type Page } from "playwright";
import * as fs from "fs";
import * as path from "path";

const BASE_URL = "https://www.explorebranson.com";
const LISTING_URL = `${BASE_URL}/things-to-do/attractions-museums-branson/`;
const PER_PAGE = 48;
const OUTPUT_PATH = path.join(__dirname, "scraped-attractions.json");

interface ScrapedAttraction {
  name: string;
  detailUrl: string;
  imageUrl: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  hours: string;
  galleryImages: string[];
  amenities: string[];
  pricing: string;
}

async function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function scrapeListingPage(page: Page, skip: number): Promise<{ name: string; detailUrl: string; imageUrl: string; category: string }[]> {
  const url = `${LISTING_URL}?skip=${skip}&bounds=false&view=grid&sort=qualityScore`;
  console.log(`  Fetching listing page: skip=${skip}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await delay(2000);

  // Wait for content to load
  await page.waitForSelector(".layout-column, .card, [class*='listing'], [class*='slide']", { timeout: 15000 }).catch(() => {
    console.log("  Warning: Could not find expected listing selectors, trying alternatives...");
  });

  // Try multiple selector strategies to find attraction cards
  const items = await page.evaluate(() => {
    const results: { name: string; detailUrl: string; imageUrl: string; category: string }[] = [];

    // Strategy 1: Look for listing cards with links to /listing/
    const links = document.querySelectorAll('a[href*="/listing/"]');
    const seen = new Set<string>();

    links.forEach((link) => {
      const href = (link as HTMLAnchorElement).href || link.getAttribute("href") || "";
      if (!href.includes("/listing/") || seen.has(href)) return;
      seen.add(href);

      // Find the card container (parent elements)
      const card = link.closest(".card, .slide, [class*='card'], [class*='listing-item'], [class*='result']") || link;

      // Get name from title elements
      const titleEl = card.querySelector(".slide-title, .card-title, h3, h4, [class*='title']") || link;
      const name = titleEl?.textContent?.trim() || "";
      if (!name || name.length < 2) return;

      // Get image
      const img = card.querySelector("img");
      const imageUrl = img?.src || img?.getAttribute("data-src") || img?.getAttribute("data-lazy-src") || "";

      // Get category/badge
      const badge = card.querySelector(".badge, [class*='category'], [class*='type'], [class*='tag']");
      const category = badge?.textContent?.trim() || "";

      results.push({
        name,
        detailUrl: href.startsWith("http") ? href : `${window.location.origin}${href}`,
        imageUrl,
        category,
      });
    });

    return results;
  });

  console.log(`  Found ${items.length} attractions on this page`);
  return items;
}

async function scrapeDetailPage(page: Page, url: string): Promise<Partial<ScrapedAttraction>> {
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await delay(1500);

    const details = await page.evaluate(() => {
      const getText = (selectors: string): string => {
        for (const sel of selectors.split(",")) {
          const el = document.querySelector(sel.trim());
          if (el?.textContent?.trim()) return el.textContent.trim();
        }
        return "";
      };

      const getAll = (selectors: string): string[] => {
        const results: string[] = [];
        for (const sel of selectors.split(",")) {
          document.querySelectorAll(sel.trim()).forEach((el) => {
            const text = el.textContent?.trim();
            if (text) results.push(text);
          });
        }
        return results;
      };

      // Description - try multiple selectors
      const descriptionEl = document.querySelector(
        ".detail-description, .listing-description, [class*='description'], .content-section p, .detail-content p, article p"
      );
      const description = descriptionEl?.textContent?.trim() || "";

      // Also try to get all paragraph text from the main content area
      let fullDescription = description;
      if (!fullDescription) {
        const paragraphs = document.querySelectorAll("main p, .detail-content p, article p, .content p");
        fullDescription = Array.from(paragraphs)
          .map((p) => p.textContent?.trim())
          .filter(Boolean)
          .join(" ");
      }

      // Address
      const address =
        getText("[class*='address'], [itemprop='address'], .detail-address, .listing-address") ||
        getText("[class*='street'], [itemprop='streetAddress']");

      // Phone
      const phone =
        getText("[itemprop='telephone'], [class*='phone'], a[href^='tel:']") ||
        (() => {
          const telLink = document.querySelector("a[href^='tel:']");
          return telLink?.getAttribute("href")?.replace("tel:", "") || "";
        })();

      // Website
      const websiteEl = document.querySelector(
        "a[class*='website'], a[data-type='website'], a[href]:not([href*='explorebranson']):not([href*='javascript']):not([href^='#']):not([href^='tel']):not([href^='mailto'])"
      );
      const website = "";

      // Hours
      const hours = getText("[class*='hours'], [class*='schedule'], [itemprop='openingHours']");

      // Gallery images
      const galleryImages: string[] = [];
      document.querySelectorAll(".gallery img, .photo-gallery img, [class*='gallery'] img, .detail-photos img, .carousel img").forEach((img) => {
        const src = (img as HTMLImageElement).src || img.getAttribute("data-src") || "";
        if (src && !galleryImages.includes(src)) galleryImages.push(src);
      });

      // Also get the main/hero image
      const heroImg = document.querySelector(".detail-hero img, .hero img, .listing-hero img, header img");
      if (heroImg) {
        const heroSrc = (heroImg as HTMLImageElement).src || heroImg.getAttribute("data-src") || "";
        if (heroSrc && !galleryImages.includes(heroSrc)) galleryImages.unshift(heroSrc);
      }

      // Amenities
      const amenities = getAll("[class*='amenity'], [class*='feature'], .detail-amenities li, .listing-features li");

      // Pricing
      const pricing = getText("[class*='price'], [class*='admission'], [class*='cost'], [class*='rate']");

      // Try to get website URL from sidebar/contact section
      let websiteUrl = "";
      document.querySelectorAll("a").forEach((a) => {
        const text = a.textContent?.trim().toLowerCase() || "";
        const href = a.href || "";
        if (
          (text === "website" || text === "visit website" || text === "official website" || text.includes("visit site")) &&
          href &&
          !href.includes("explorebranson")
        ) {
          websiteUrl = href;
        }
      });

      return {
        description: fullDescription,
        address,
        phone,
        website: websiteUrl,
        hours,
        galleryImages,
        amenities,
        pricing,
      };
    });

    return details;
  } catch (err) {
    console.log(`  Error scraping detail page ${url}: ${(err as Error).message}`);
    return {};
  }
}

async function main() {
  console.log("Starting ExploreBranson attractions scraper...\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  // Step 1: Collect all attraction links from listing pages
  console.log("Step 1: Scraping listing pages...\n");
  const allListingItems: { name: string; detailUrl: string; imageUrl: string; category: string }[] = [];
  let skip = 0;
  let emptyPages = 0;

  while (emptyPages < 2) {
    const items = await scrapeListingPage(page, skip);
    if (items.length === 0) {
      emptyPages++;
      console.log(`  Empty page at skip=${skip}, consecutive empties: ${emptyPages}`);
    } else {
      emptyPages = 0;
      allListingItems.push(...items);
    }
    skip += PER_PAGE;

    // Safety: don't go beyond 10 pages
    if (skip > PER_PAGE * 10) break;
  }

  // Deduplicate by URL
  const uniqueItems = Array.from(
    new Map(allListingItems.map((item) => [item.detailUrl, item])).values()
  );
  console.log(`\nTotal unique attractions found: ${uniqueItems.length}\n`);

  // Step 2: Scrape each detail page
  console.log("Step 2: Scraping detail pages...\n");
  const attractions: ScrapedAttraction[] = [];

  for (let i = 0; i < uniqueItems.length; i++) {
    const item = uniqueItems[i];
    console.log(`  [${i + 1}/${uniqueItems.length}] ${item.name}`);

    const details = await scrapeDetailPage(page, item.detailUrl);

    attractions.push({
      name: item.name,
      detailUrl: item.detailUrl,
      imageUrl: item.imageUrl,
      category: item.category,
      description: details.description || "",
      address: details.address || "",
      phone: details.phone || "",
      website: details.website || "",
      hours: details.hours || "",
      galleryImages: details.galleryImages || [],
      amenities: details.amenities || [],
      pricing: details.pricing || "",
    });

    // Be polite - don't hammer the server
    await delay(800);
  }

  await browser.close();

  // Step 3: Save results
  console.log(`\nSaving ${attractions.length} attractions to ${OUTPUT_PATH}`);
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(attractions, null, 2));
  console.log("Done!");
}

main().catch(console.error);
