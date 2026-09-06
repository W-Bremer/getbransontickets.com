#!/usr/bin/env node
// Pings IndexNow (Bing, Yandex, Naver, Seznam share submissions) so new and
// updated pages get recrawled in minutes instead of days. The key is meant to
// be public: it is served at /{key}.txt from public/ and proves domain
// ownership, nothing else.
//
// Usage:
//   node scripts/indexnow-ping.mjs                     submit every sitemap URL
//   node scripts/indexnow-ping.mjs https://... [...]   submit specific URLs

const HOST = "www.getbransontickets.com";
const KEY = "83816a70bd578ed372298814ac0df5a9";

async function sitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urlList = process.argv.slice(2).length > 0 ? process.argv.slice(2) : await sitemapUrls();

if (urlList.length === 0) {
  console.error("No URLs to submit.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

// 200 = submitted, 202 = accepted (key validation pending). Anything else is a
// real failure: 403 bad key, 422 URLs off-host, 429 rate-limited.
if (res.status === 200 || res.status === 202) {
  console.log(`IndexNow: submitted ${urlList.length} URLs (HTTP ${res.status})`);
} else {
  console.error(`IndexNow failed: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
  process.exit(1);
}
