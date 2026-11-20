# Kaya Makina — Corporate Website

Corporate website for **Kaya Makina**, a heavy machinery maintenance, repair
and spare parts company in Baku, Azerbaijan.

**Live domain:** https://kayamakina.az

Four languages: Azerbaijani (default), English, Russian and Simplified
Chinese — `/az/`, `/en/`, `/ru/`, `/zh/`.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, TypeScript) — **static export** (`output: 'export'`)
- [Tailwind CSS v4](https://tailwindcss.com) — design tokens in `app/globals.css` (`@theme`)
- [next-intl](https://next-intl.dev) — no middleware (static-export pattern)
- [lucide-react](https://lucide.dev) icons
- Fonts via `next/font` (`lib/fonts.ts`): Geologica (headings), Inter (text),
  JetBrains Mono (small labels). Chinese uses the visitor's system font.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000 (→ /az)
npm run build   # static export to out/
npm run lint    # eslint
npx serve out   # preview the production export locally
```

## Before launch — placeholders still to replace

Contact data lives in **`lib/site.ts`** — replace and push:

| Constant | Currently | Replace with |
|---|---|---|
| `PHONE_DISPLAY` / `PHONE_TEL` | `+994 50 000 00 00` | real phone |
| `WHATSAPP_NUMBER` | `994500000000` | real WhatsApp (digits only) |
| `EMAIL` | `info@kayamakina.az` | confirm the mailbox or alias exists |
| `FORMSPREE_URL` | `null` (form opens the visitor's email client) | Formspree endpoint, e.g. `https://formspree.io/f/xxxx` |
| `MAPS_EMBED_URL` | `null` (placeholder box shown) | Google Maps embed URL |

Also review:

- **Address and working hours**: `contact.info.address` / `contact.info.hours`
  in each `messages/*.json`, and `openingHours` in `lib/jsonld.ts`.
- **Service details**: the eight services come from the company's activity
  description; the bullet points under each one (`services.items.*.bullets`)
  spell that description out and should be checked by someone at the company.
- **Translations**: Azerbaijani, Russian and Chinese were written with machine
  assistance — have a native speaker read `messages/az.json`, `ru.json` and
  `zh.json`.

## Editing content

- All visible text: `messages/az.json`, `en.json`, `ru.json`, `zh.json`
  (identical structure — add a key to all four).
- Structure (service ids/anchors, icons, which photo goes where, gallery
  order): `lib/content.ts`.
- SEO titles/descriptions: the `meta` section of each messages file.

### Photos and video

Everything in `public/images/` and `public/video/` was shot in the Kaya
Makina workshop. The files are web-ready crops of the originals: the phone
watermark is cropped out, and frames showing number plates or staff faces
were left out.

To add a gallery photo: put the `.jpg` in `public/images/`, add
`{ id, w, h }` (file name without extension, pixel size) to `GALLERY` in
`lib/content.ts`, and add a caption under `gallery.captions.<id>` in all four
messages files.

### Chinese

- Headings in `messages/zh.json` contain `​` (zero-width space). Chinese
  headings are only allowed to wrap at those points, so a word is never split
  across two lines. Put one between phrases when writing a new heading.
- Typography overrides for Chinese are at the bottom of `app/globals.css`.

## Hosting — Cloudflare

The site is a **Cloudflare Worker with static assets**: Cloudflare serves the
`out/` folder; there is no server code. Configuration is in `wrangler.jsonc`.

- **Deploys:** the GitHub repo is connected to the Worker (Workers Builds), so
  **every push to `main` deploys**. Cloudflare installs dependencies, then
  runs `npx wrangler deploy`, which builds the site first
  (`build.command` in `wrangler.jsonc`). The dashboard's "Build command" can
  stay empty.
- **Node and npm versions:** `.node-version` pins the build to Node 22, and
  `packageManager` in `package.json` pins npm 11. Keep the npm pin: Cloudflare
  defaults to npm 10, which refuses a `package-lock.json` written by npm 11
  for this dependency tree ("package.json and package-lock.json are not in
  sync").
- **Domain:** `kayamakina.az` is registered at smarthost.az with its
  nameservers pointed to Cloudflare. `routes` in `wrangler.jsonc` attaches
  `kayamakina.az` and `www.kayamakina.az` to the Worker; Cloudflare creates
  the DNS records and certificates.
- **Email:** the zone has Google MX/SPF records, so mail for
  `@kayamakina.az` is handled by Google, not by this site.
- **Manual deploy** (rarely needed): `npx wrangler deploy`. Wrangler needs
  Node 22.12 or newer and a login to the Cloudflare account that owns the
  Worker (`npx wrangler login`).

`public/_redirects` sends `/` to `/az/` (302 — change to 301 once the launch
is settled). `out/index.html` also carries a meta-refresh fallback.

## Architecture notes

- `app/[locale]/…` — all pages; `generateStaticParams` exports every locale in
  `i18n/routing.ts`. Every page calls `setRequestLocale` (required for static
  export with next-intl).
- `app/layout.tsx` is a pass-through; `<html>/<body>` live in
  `app/[locale]/layout.tsx`. `app/not-found.tsx` is the single 404 page and
  answers in all four languages.
- hreflang/canonical/sitemap URLs all use trailing slashes to match
  `trailingSlash: true` — keep them in sync via `lib/seo.ts`.
- JSON-LD (`LocalBusiness`/`AutoRepair`) is injected in the locale layout from
  `lib/jsonld.ts`.
- Adding a language: add it to `i18n/routing.ts`, add `OG_LOCALES`,
  `HTML_LANG` and `LOCALE_LABELS` entries in `lib/site.ts`, and create
  `messages/<locale>.json`.
