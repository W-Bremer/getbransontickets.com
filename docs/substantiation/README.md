# Price comparison substantiation

The `competitorPrice` field in `src/data/shows.ts` renders a struck-through
price labeled "on other ticket sites". Every such claim must be documented
here so it is provable if ever challenged.

Rules:

- One dated screenshot per claim, named `<slug>-YYYY-MM-DD.png`, showing the
  competitor's listing with the price and URL visible.
- Re-verify monthly. If the competitor's listed price changes, update or
  remove the `competitorPrice` field the same day and add a fresh screenshot.
- Never label the comparison as our former price ("was", "normally",
  "regular price"). It is a comparison to another seller's listed rate.

## Current claims

| Show | competitorPrice | Source | Captured | Screenshot |
| --- | --- | --- | --- | --- |
| amazing-acrobats-of-shanghai | $57/adult | bransonshows.com cart ("$57.00", "Normally $114.00" for 2 adults) | 2026-09-05 | TODO: William, drop your 2026-09-05 cart screenshot in this folder as `amazing-acrobats-of-shanghai-2026-09-05.png` |
| the-duttons | $51.92/adult | bransonshows.com Adult Admission offer (the listing's own JSON-LD), lowest current-season tier | 2026-09-06 | `the-duttons-2026-09-06.json` |
| six | $52.99/adult | bransonshows.com Adult Admission offer, lowest current-season tier (Nov to Jan tiers are $65.38 and $71.15) | 2026-09-06 | `six-2026-09-06.json` |
| clay-coopers-country-express | $71.15/adult | bransonshows.com Adult Admission offer (Dec 31 special event $124.99 ignored) | 2026-09-06 | `clay-coopers-country-express-2026-09-06.json` |
| hot-rods-and-high-heels | $53.85/adult | bransonshows.com Adult Admission offer | 2026-09-06 | `hot-rods-and-high-heels-2026-09-06.json` |
| the-texas-tenors | $65.38/adult | bransonshows.com Adult Admission offer | 2026-09-06 | `the-texas-tenors-2026-09-06.json` |
| thank-you-for-the-music | $38.46/adult | bransonshows.com Adult Admission offer | 2026-09-06 | `thank-you-for-the-music-2026-09-06.json` |
| beach-boys-california-dreamin | $38.46/adult | bransonshows.com Adult Admission offer | 2026-09-06 | `beach-boys-california-dreamin-2026-09-06.json` |
| back-to-the-bee-gees | $38.46/adult | bransonshows.com Adult Admission offer | 2026-09-06 | `back-to-the-bee-gees-2026-09-06.json` |
| sound-of-simon-and-garfunkel | $38.46/adult | bransonshows.com Adult Admission offer | 2026-09-06 | `sound-of-simon-and-garfunkel-2026-09-06.json` |

The 2026-09-06 captures are JSON evidence files: each holds the listing URL,
page title, capture time, and the competitor's schema.org Offer objects copied
verbatim from the page source (the visible price on bransonshows.com only
appears after "Check availability", so a page screenshot does not show it).
Add a cart screenshot alongside when convenient.

## Checked and NOT used (2026-09-06)

- Grand Country shows (grand-jubilee, comedy-jamboree, pets-and-giggles,
  new-south-gospel, ozarks-gospel, down-home-country, ozarks-country):
  bransonshows.com lists $84.58 "Adult Admission" on every one of them, which
  does not match a single-show adult ticket (Grand Country's box office adult
  rate is $52.99). Unverified what that price bundles, so no claim.
- the-haygoods ($96.00 regular, $66.00 Christmas), spirit-of-america ($58.00),
  hamners-unbelievable-variety ($49.99): all three listings are titled "Buy 1
  Get 1 Free", so the listed per-adult rate is not what a pair actually pays.
  Left for William to decide (the Acrobats listing carries the same promo).
- The Showroom at Branson Meadows shows (rock-n-roll-sunrise, british-invasion,
  retro-christmas, classic-rock-icons, elvis-story-of-a-king,
  honky-tonk-heartland, best-of-motown-and-more): bransonshows.com lists
  $42.99, BELOW our $46.17 plus tax sticker. No claim possible.

