# Kaya Makina — Corporate Website

Trilingual (AZ / EN / RU) corporate website for **Kaya Makina**, a heavy
machinery service & repair company in Baku, Azerbaijan.

**Live domain:** https://kaya-makina.com (Cloudflare)

## Stack

- [Next.js 15](https://nextjs.org) (App Router, TypeScript) — **static export** (`output: 'export'`)
- [Tailwind CSS v4](https://tailwindcss.com) — design tokens in `app/globals.css` (`@theme`)
- [next-intl](https://next-intl.dev) — locales `az` (default), `en`, `ru`, no middleware (static-export pattern)
- [lucide-react](https://lucide.dev) icons, Oswald + Inter via `next/font`

## Commands

```bash
npm run dev     # dev server at http://localhost:3000 (→ /az)
npm run build   # static export to out/
npm run lint    # eslint
npx serve out   # preview the production export locally
```

## Before launch — TODO placeholders

All placeholder contact data lives in **`lib/site.ts`** — replace and rebuild:

| Constant | Currently | Replace with |
|---|---|---|
| `PHONE_DISPLAY` / `PHONE_TEL` | `+994 50 000 00 00` | real phone |
| `WHATSAPP_NUMBER` | `994500000000` | real WhatsApp (digits only) |
| `EMAIL` | `info@kaya-makina.com` | confirm mailbox exists |
| `FORMSPREE_URL` | `null` (form falls back to email client) | Formspree endpoint, e.g. `https://formspree.io/f/xxxx` |
| `MAPS_EMBED_URL` | `null` (styled placeholder shown) | Google Maps embed URL |

Also review:

- **Stats** (`lib/content.ts` → `STATS`): 10+ years / 500+ machines / 24/7 / 20+ team — adjust to real numbers.
- **Address & working hours**: `contact.info.address` / `contact.info.hours` in each `messages/*.json`.
- **Partner logos**: `components/home/LogoStrip.tsx` currently shows serviced machinery brands as text; swap in customer logos when available.
- **Copy review**: AZ and RU texts were machine-assisted — have a native speaker review `messages/az.json` and `messages/ru.json`.
- **Photos**: stock images in `public/images/` (see `CREDITS.md`). Replace files keeping the same names.

## Editing content

- All human-readable copy: `messages/az.json`, `messages/en.json`, `messages/ru.json` (identical structure).
- Structure (service ids/anchors, icons, image paths, brands, gallery): `lib/content.ts`.
- SEO titles/descriptions: `meta` namespace in each messages file.

## Deploying to Cloudflare Pages

**Option A — Git integration (recommended):**
Cloudflare dashboard → Workers & Pages → Create → Pages → connect this repo.

- Framework preset: **Next.js (Static HTML Export)**
- Build command: `npm run build`
- Output directory: `out`
- Environment variable: `NODE_VERSION=20`

Every push to `main` deploys; other branches get preview URLs.

**Option B — direct upload:**

```bash
npm run build
npx wrangler pages deploy out --project-name=kaya-makina
```

**Custom domain:** Pages project → Custom domains → add `kaya-makina.com`
(and `www.kaya-makina.com`; the zone is already in this Cloudflare account so
DNS records are created automatically).

**Root redirect:** `public/_redirects` 302-redirects `/` → `/az/`. Upgrade to
`301` after launch is confirmed. The exported `index.html` also contains a
meta-refresh fallback for hosts without redirect support.

## Architecture notes

- `app/[locale]/…` — all pages; `generateStaticParams` exports az/en/ru
  (18 pages total). Every page calls `setRequestLocale` (required for static
  export with next-intl).
- `app/layout.tsx` is a pass-through; `<html>/<body>` live in
  `app/[locale]/layout.tsx`.
- hreflang/canonical/sitemap URLs all use trailing slashes to match
  `trailingSlash: true` — keep them in sync via `lib/seo.ts`.
- JSON-LD (`LocalBusiness`/`AutoRepair`) is injected in the locale layout from
  `lib/jsonld.ts`.
- `scripts/fetch-images.py` — one-time helper that downloaded the stock
  photos; images are committed, so builds never hit the network.
