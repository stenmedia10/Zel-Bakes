# Zel Bakes

Website for **Zel Bakes**, homemade custom celebration cakes in Kettering. Built with Next.js (static export), Tailwind CSS v4 and Motion.

## Features

- **Instant price calculator.** Customers build a cake (size, flavour, shape, decoration, topper, extras) and see a live estimate. On mobile it's a guided step-by-step flow with a docked price bar.
- **Quote sharing.** Send the quote on WhatsApp, or save it as a branded image or PDF.
- **Gallery** with a keyboard- and swipe-friendly lightbox.
- **Branded loading screen**, shown once per browser session.
- Responsive images, SEO metadata, sitemap/robots, and accessible navigation.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Editing content

| What | Where |
| --- | --- |
| Prices, options, collection postcode, WhatsApp number | `src/lib/pricing.ts` |
| Phone, hours, navigation, live site URL | `src/lib/site.ts` |
| Gallery cakes and descriptions | `src/components/Gallery.tsx` |
| Colours and fonts | `src/app/globals.css`, `src/app/layout.tsx` |

## Images

Original photos live in `assets/`. After adding or replacing one, regenerate the web sizes (macOS):

```bash
./scripts/optimize-images.sh
```

This writes 160/480/800/1200px JPEGs to `public/img/`. Reference images in code as `/img/<name>.jpg`, and the custom loader (`src/lib/imageLoader.ts`) serves the right size for each device.

## Project structure

```text
assets/          Original images (not deployed)
public/img/      Generated responsive images
scripts/         Image optimisation script
src/app/         Layout, global styles, icons, sitemap/robots
src/components/  Page sections (Hero, Gallery, About, HowItWorks, PriceCalculator, Contact, Footer…)
src/lib/         Pricing, site settings, image loader, quote image renderer
```
