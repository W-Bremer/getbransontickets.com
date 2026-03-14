#!/usr/bin/env node
/**
 * Scrapes all attractions from ExploreBranson.com using Playwright.
 * Outputs raw data to scripts/scraped-attractions.json
 */

import { chromium } from "playwright";
import * as fs from "fs";
import { fileURLToPath } from "url";
import * as path from "path";

var __dirname = path.dirname(fileURLToPath(import.meta.url));
var BASE_URL = "https://www.explorebranson.com";
var LISTING_URL = BASE_URL + "/things-to-do/attractions-museums-branson/";
var OUTPUT_PATH = path.join(__dirname, "scraped-attractions.json");

function delay(ms) {
  return new Promise(function(r) { setTimeout(r, ms); });
}

async function collectAllListings(page) {
  // Navigate to the listing page
  console.log("  Loading listing page...");
  await page.goto(LISTING_URL + "?skip=0&bounds=false&view=grid&sort=qualityScore", {
    waitUntil: "networkidle",
    timeout: 60000
  });
  await delay(3000);

  // Check for pagination info and total count
  var pageInfo = await page.evaluate(function() {
    // Look for result count text
    var countText = "";
    var allText = document.body.innerText;
    var countMatch = allText.match(/(\d+)\s*results?/i) || allText.match(/showing\s*\d+\s*[-–]\s*\d+\s*of\s*(\d+)/i);
    if (countMatch) countText = countMatch[0];

    // Look for pagination
    var paginationLinks = document.querySelectorAll("[class*='paging'] a, [class*='pagination'] a, .paging a, nav[aria-label*='pagination'] a");
    var pageNums = [];
    for (var i = 0; i < paginationLinks.length; i++) {
      pageNums.push(paginationLinks[i].textContent.trim() + " -> " + paginationLinks[i].href);
    }

    // Find the listing grid items
    var gridItems = document.querySelectorAll(".item-inner");
    var slideItems = document.querySelectorAll(".slide");

    // Check for "load more" or "show more" buttons
    var loadMoreBtns = document.querySelectorAll("[class*='load-more'], [class*='show-more'], button:not([type='submit'])");
    var btnTexts = [];
    for (var j = 0; j < loadMoreBtns.length; j++) {
      var t = loadMoreBtns[j].textContent.trim();
      if (t && t.length < 50) btnTexts.push(t);
    }

    // Find all links with "next" in text
    var nextLinks = [];
    var allLinks = document.querySelectorAll("a");
    for (var k = 0; k < allLinks.length; k++) {
      var linkText = allLinks[k].textContent.trim().toLowerCase();
      if (linkText.includes("next") || linkText.includes("more") || linkText.includes("view all")) {
        nextLinks.push(allLinks[k].textContent.trim() + " -> " + allLinks[k].href);
      }
    }

    return {
      countText: countText,
      gridItemCount: gridItems.length,
      slideCount: slideItems.length,
      paginationLinks: pageNums,
      buttons: btnTexts,
      nextLinks: nextLinks.slice(0, 10)
    };
  });

  console.log("  Grid items:", pageInfo.gridItemCount);
  console.log("  Slide items:", pageInfo.slideCount);
  console.log("  Count text:", pageInfo.countText);
  console.log("  Pagination links:", JSON.stringify(pageInfo.paginationLinks));
  console.log("  Buttons:", JSON.stringify(pageInfo.buttons));
  console.log("  Next/More links:", JSON.stringify(pageInfo.nextLinks));

  // Now collect from all pages using skip parameter
  var allItems = [];
  var skip = 0;
  var PER_PAGE = 12; // looks like 12 per page based on item-inner count

  for (var pageNum = 0; pageNum < 20; pageNum++) {
    var url = LISTING_URL + "?skip=" + skip + "&bounds=false&view=grid&sort=qualityScore";
    if (pageNum > 0) {
      console.log("  Loading page " + (pageNum + 1) + " (skip=" + skip + ")...");
      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await delay(3000);
    }

    var items = await page.evaluate(function() {
      var results = [];
      var seen = {};

      // Strategy: get unique listing links with their parent context
      var links = document.querySelectorAll('a[href*="/listing/"]');

      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var href = link.getAttribute("href") || "";

        // Normalize URL
        if (href.startsWith("/")) href = window.location.origin + href;
        if (!href.includes("/listing/") || seen[href]) continue;
        seen[href] = true;

        // Get containing card
        var card = link.closest(".slide, .item-inner, [class*='card']");
        if (!card) continue; // Skip nav/footer links

        // Name: prefer slide-title-text or title within the card
        var titleEl = card.querySelector(".slide-title-text, .title, h2, h3, h4");
        var name = titleEl ? titleEl.textContent.trim() : "";
        if (!name) continue;

        // Clean up name
        name = name.replace(/\n/g, " ").replace(/\s+/g, " ").trim();

        // Image
        var img = card.querySelector("img");
        var imageUrl = "";
        if (img) {
          imageUrl = img.src || img.getAttribute("data-src") || "";
        }
        // Also check background image
        if (!imageUrl) {
          var bgEl = card.querySelector("[style*='background-image']");
          if (bgEl) {
            var bgMatch = bgEl.style.backgroundImage.match(/url\(["']?(.+?)["']?\)/);
            if (bgMatch) imageUrl = bgMatch[1];
          }
        }

        // Category from subtitle or desc
        var subtitleEl = card.querySelector(".slide-desc, .subtitle, [class*='desc']");
        var category = subtitleEl ? subtitleEl.textContent.trim().substring(0, 100) : "";

        results.push({
          name: name,
          detailUrl: href,
          imageUrl: imageUrl,
          category: category
        });
      }

      return results;
    });

    if (items.length === 0) {
      console.log("  No items found on page " + (pageNum + 1) + ", stopping.");
      break;
    }

    // Check for new unique items
    var newCount = 0;
    for (var j = 0; j < items.length; j++) {
      if (!allItems.some(function(existing) { return existing.detailUrl === items[j].detailUrl; })) {
        allItems.push(items[j]);
        newCount++;
      }
    }

    console.log("  Page " + (pageNum + 1) + ": " + items.length + " items (" + newCount + " new), total: " + allItems.length);

    if (newCount === 0) {
      console.log("  No new items, stopping pagination.");
      break;
    }

    skip += PER_PAGE;
  }

  return allItems;
}

async function scrapeDetailPage(page, url) {
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await delay(2000);

    var details = await page.evaluate(function() {
      // Description - collect all meaningful text
      var descParts = [];
      var paras = document.querySelectorAll("main p, article p, .content p, [class*='description'] p, [class*='body'] p, [class*='text'] p");
      for (var i = 0; i < paras.length; i++) {
        var text = paras[i].textContent.trim();
        if (text && text.length > 20) descParts.push(text);
      }
      var description = descParts.join("\n\n");

      // Fallback: try broader content areas
      if (!description) {
        var contentEl = document.querySelector("[class*='description'], [class*='about'], .detail-content, article, main");
        if (contentEl) {
          description = contentEl.textContent.trim().substring(0, 2000);
        }
      }

      // Address
      var address = "";
      var addrEl = document.querySelector("[itemprop='address'], [class*='address'], [class*='location']");
      if (addrEl) address = addrEl.textContent.trim().replace(/\s+/g, " ");

      // Phone
      var phone = "";
      var telLink = document.querySelector("a[href^='tel:']");
      if (telLink) {
        phone = telLink.getAttribute("href").replace("tel:", "").replace(/%20/g, "").trim();
        if (!phone) phone = telLink.textContent.trim();
      }
      if (!phone) {
        var phoneEl = document.querySelector("[itemprop='telephone'], [class*='phone']");
        if (phoneEl) phone = phoneEl.textContent.trim();
      }

      // Website
      var website = "";
      var allLinks = document.querySelectorAll("a");
      for (var j = 0; j < allLinks.length; j++) {
        var linkText = (allLinks[j].textContent || "").trim().toLowerCase();
        var linkHref = allLinks[j].href || "";
        if ((linkText === "website" || linkText === "visit website" || linkText === "official website" || linkText.includes("visit site")) && linkHref && linkHref.indexOf("explorebranson") === -1) {
          website = linkHref;
          break;
        }
      }

      // Hours
      var hours = "";
      var hoursEl = document.querySelector("[class*='hours'], [class*='schedule'], [itemprop='openingHours']");
      if (hoursEl) hours = hoursEl.textContent.trim();

      // Gallery images (simpleview CDN)
      var galleryImages = [];
      var allImgs = document.querySelectorAll("img");
      for (var k = 0; k < allImgs.length; k++) {
        var src = allImgs[k].src || allImgs[k].getAttribute("data-src") || "";
        if (src && src.indexOf("simpleview") !== -1 && galleryImages.indexOf(src) === -1) {
          galleryImages.push(src);
        }
      }

      // Also check background images
      var bgEls = document.querySelectorAll("[style*='background-image']");
      for (var m = 0; m < bgEls.length; m++) {
        var bgMatch = bgEls[m].style.backgroundImage.match(/url\(["']?(.+?)["']?\)/);
        if (bgMatch && bgMatch[1].indexOf("simpleview") !== -1 && galleryImages.indexOf(bgMatch[1]) === -1) {
          galleryImages.push(bgMatch[1]);
        }
      }

      // Amenities
      var amenities = [];
      var amenityEls = document.querySelectorAll("[class*='amenity'] li, [class*='feature'] li, [class*='amenities'] li, [class*='tag']");
      for (var n = 0; n < amenityEls.length; n++) {
        var amenText = amenityEls[n].textContent.trim();
        if (amenText && amenText.length < 100) amenities.push(amenText);
      }

      // Pricing
      var pricing = "";
      var priceEl = document.querySelector("[class*='price'], [class*='admission'], [class*='cost']");
      if (priceEl) pricing = priceEl.textContent.trim();

      return {
        description: description,
        address: address,
        phone: phone,
        website: website,
        hours: hours,
        galleryImages: galleryImages,
        amenities: amenities,
        pricing: pricing
      };
    });

    return details;
  } catch (err) {
    console.log("  Error scraping detail page " + url + ": " + err.message);
    return {};
  }
}

async function main() {
  console.log("Starting ExploreBranson attractions scraper...\n");

  var browser = await chromium.launch({ headless: true });
  var context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1920, height: 1080 },
  });
  var page = await context.newPage();

  // Step 1: Collect all attraction links from listing pages
  console.log("Step 1: Collecting all attraction listings...\n");
  var allItems = await collectAllListings(page);

  console.log("\nTotal unique attractions: " + allItems.length);
  console.log("Attractions found:");
  allItems.forEach(function(item, i) {
    console.log("  " + (i+1) + ". " + item.name);
  });

  // Step 2: Scrape each detail page
  console.log("\nStep 2: Scraping detail pages...\n");
  var attractions = [];

  for (var idx = 0; idx < allItems.length; idx++) {
    var item = allItems[idx];
    console.log("  [" + (idx + 1) + "/" + allItems.length + "] " + item.name);

    var details = await scrapeDetailPage(page, item.detailUrl);

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

    await delay(800);
  }

  await browser.close();

  // Step 3: Save results
  console.log("\nSaving " + attractions.length + " attractions to " + OUTPUT_PATH);
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(attractions, null, 2));
  console.log("Done!");
}

main().catch(console.error);
