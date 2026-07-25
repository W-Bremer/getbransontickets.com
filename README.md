# GetBransonTickets.com (Tix Branson)

Next.js site for Branson show and attraction tickets, plus the free **Branson Passport** insider guide.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | yes | Stripe checkout (client) |
| `STRIPE_SECRET_KEY` | yes | Stripe checkout (server) |
| `RESEND_API_KEY` | yes | Voucher emails + passport signup notifications |
| `EMAIL_FROM` | no | From address for outgoing email |
| `PASSPORT_WEBHOOK_URL` | no | Forward passport signups / partner applications to a CRM webhook |
| `PASSPORT_TRACKING_WEBHOOK_URL` | no | Forward partner QR scan events to an analytics webhook |

## Branson Passport

The Passport lives at `/passport`. Key pieces:

- `src/data/passport.ts`: guide content (restaurants, coffee, shopping, free things, seasonal events, local tips)
- `src/data/partners.ts`: partner businesses, each with a unique `refCode`
- `/p/<refCode>`: partner tracking links. Sets a 30-day `bp_ref` cookie, logs the scan, redirects to `/passport`
- `/passport/partners/<slug>/kit`: printable QR counter card for a partner
- `/api/passport-signup`: visitor email/SMS signups and partner applications (Resend notification + optional webhook)
- Referral attribution: `bp_ref` is written into Stripe PaymentIntent metadata (`referralPartner`) at checkout, so partner-referred ticket sales are measurable in Stripe

Scan counts are visible in Vercel runtime logs (search `passport_scan`) until a database-backed dashboard exists.

## Deploy

Deployed on Vercel (project `branson-shows`). Production domain: [www.getbransontickets.com](https://www.getbransontickets.com).
