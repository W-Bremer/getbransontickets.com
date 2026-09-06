#!/usr/bin/env node
// Bing Webmaster Tools stats puller.
//
// Usage:
//   node scripts/bing-stats.mjs traffic          daily clicks + impressions
//   node scripts/bing-stats.mjs queries          per-query stats (weekly buckets)
//   node scripts/bing-stats.mjs pages            per-page stats
//   node scripts/bing-stats.mjs all              all three
//   ... [--limit=25] [--json]
//
// The API key comes from $BING_WEBMASTER_KEY or ~/.gbt-ads/bing_webmaster_key.txt
// (generated in Bing Webmaster Tools > Settings > API access). The AI/Copilot
// citation data has no API; export those CSVs from the dashboard.

import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const SITE_URL = "https://www.getbransontickets.com";
const API_BASE = "https://ssl.bing.com/webmaster/api.svc/json";

function apiKey() {
  if (process.env.BING_WEBMASTER_KEY) return process.env.BING_WEBMASTER_KEY.trim();
  const keyFile = join(homedir(), ".gbt-ads", "bing_webmaster_key.txt");
  try {
    return readFileSync(keyFile, "utf8").trim();
  } catch {
    console.error(`No API key: set BING_WEBMASTER_KEY or create ${keyFile}`);
    process.exit(1);
  }
}

// "/Date(1787727600000-0700)/" -> "2026-08-26"
function parseDotNetDate(raw) {
  const m = /\/Date\((\d+)/.exec(raw);
  if (!m) return raw;
  return new Date(Number(m[1])).toISOString().slice(0, 10);
}

function clean(row) {
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    if (k === "__type") continue;
    out[k] = typeof v === "string" && v.startsWith("/Date(") ? parseDotNetDate(v) : v;
  }
  return out;
}

async function call(method) {
  const url = `${API_BASE}/${method}?apikey=${apiKey()}&siteUrl=${encodeURIComponent(SITE_URL)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${method} failed: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
  const body = await res.json();
  return (body.d ?? []).map(clean);
}

function printTable(rows, columns) {
  const widths = columns.map((c) =>
    Math.max(c.length, ...rows.map((r) => String(r[c] ?? "").length))
  );
  const line = (cells) => cells.map((v, i) => String(v ?? "").padEnd(widths[i])).join("  ");
  console.log(line(columns));
  console.log(line(widths.map((w) => "-".repeat(w))));
  for (const r of rows) console.log(line(columns.map((c) => r[c])));
}

const args = process.argv.slice(2);
const command = args.find((a) => !a.startsWith("--")) ?? "traffic";
const asJson = args.includes("--json");
const limit = Number(args.find((a) => a.startsWith("--limit="))?.split("=")[1] ?? 25);

const REPORTS = {
  traffic: {
    method: "GetRankAndTrafficStats",
    columns: ["Date", "Impressions", "Clicks"],
    sort: (a, b) => a.Date.localeCompare(b.Date),
  },
  queries: {
    method: "GetQueryStats",
    columns: ["Query", "Impressions", "Clicks", "AvgImpressionPosition", "AvgClickPosition"],
    sort: (a, b) => b.Impressions - a.Impressions,
  },
  pages: {
    method: "GetPageStats",
    columns: ["Query", "Impressions", "Clicks", "AvgImpressionPosition", "AvgClickPosition"],
    sort: (a, b) => b.Impressions - a.Impressions,
  },
};

const wanted = command === "all" ? Object.keys(REPORTS) : [command];
if (wanted.some((w) => !REPORTS[w])) {
  console.error(`Unknown report "${command}". Use: traffic | queries | pages | all`);
  process.exit(1);
}

for (const name of wanted) {
  const report = REPORTS[name];
  const rows = (await call(report.method)).sort(report.sort).slice(0, name === "traffic" ? 1000 : limit);
  if (asJson) {
    console.log(JSON.stringify({ report: name, rows }, null, 2));
  } else {
    console.log(`\n== ${name} (${report.method}) ==`);
    // GetPageStats reuses the Query field name for the page URL.
    printTable(rows, report.columns.filter((c) => rows.some((r) => r[c] !== undefined)));
  }
}
