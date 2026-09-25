# Divya's Cakes | Bespoke Artisan Portfolio

A premium, high-performance bespoke cake portfolio for **Divya's**, built with Next.js 15, Tailwind CSS, and Framer Motion. This project features luxury aesthetics, interactive animations, and is optimized for mobile-first user experiences.

## 🌟 Key Features

- **Interactive Hero Section**: Sophisticated background transitions with mouse-follow effects and cinematic typography.
- **Bespoke Gallery**: A responsive masonry grid showcasing handcrafted artisan creations.
- **Micro-Atmosphere**: Subtle floating bokeh particles for enhanced visual depth.
- **High-Conversion CTAs**: Mobile-optimized WhatsApp and Direct Call integration.
- **SEO Optimized**: Advanced metadata, JSON-LD structured data (Bakery schema), and localized SEO for Kettering.
- **Premium Navigation**: Glassmorphism header with a custom animated mobile menu.

## 🛠️ Project Structure

```text
/src
  /app           # Next.js App Router (Layouts, Pages, Global CSS)
    /sitemap.ts  # Dynamic SEO sitemap
  /components    # React Components
    /ui          # Reusable UI primitives (Buttons, Backgrounds)
    Hero.tsx     # Hero section with interactive animations
    Gallery.tsx  # Masonry grid portfolio
    About.tsx    # Brand storytelling section
    Contact.tsx  # Floating luxury CTAs
    Header.tsx   # Responsive glassmorphism navigation
  /lib           # Utility functions (cn, etc.)
/public          # Static assets (Logo, Favicon, Images)
```

## 🚀 Getting Started

### Local Development

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build Locally**:
   ```bash
   npm run build
   ```

## ☁️ Cloudflare Pages Deployment

This project is optimized for **Cloudflare Pages** using **Static Export** for maximum performance and reliability.

### 1. Configure Cloudflare Dashboard

To fix the 404 error, ensure your project is configured with these exact settings in the Cloudflare Pages dashboard:

- **Framework Preset**: `None` (or `Next.js`)
- **Build Command**: `npm run build`
- **Build Output Directory**: `out`

### 2. Why Static Export?
We have enabled `output: 'export'` in `next.config.ts`. This generates a strictly static version of the site in the `out` folder, which Cloudflare serves directly from its CDN. This is the fastest and most stable way to host a portfolio.

---
© 2024 Divya's Cakes • Handcrafted in Kettering
