# Novalogix Static Template — Agent Instructions

## Overview

This is a React + Vite static website template. All site content and configuration lives in a single file: `src/data/siteConfig.js`. Styling is handled through CSS custom properties defined in `src/styles/variables.css`, with component-scoped styles in CSS Modules.

---

## Setup

```bash
npm install        # Install dependencies
npm run dev        # Start dev server with hot reload
npm run build      # Build to /dist for production
npm run preview    # Preview production build locally
```

The built `/dist` folder is static HTML/CSS/JS — deploy it to any host (Vercel, Netlify, GitHub Pages, Azure Static Web Apps, etc.).

---

## Personalising the Template

Almost everything is configured through `src/data/siteConfig.js`. Work through these sections with the user:

### 1. Site Identity

In `siteConfig.site`, update:
- `name` — company or personal name
- `tagline` — short descriptor shown beside the name
- `description` — used in meta tags and SEO
- `url` — the production URL (updates canonical, OG, and sitemap)
- `logoText` — navbar logo text
- `faviconLetter` — single character shown in the browser tab icon

### 2. Theme & Colours

In `siteConfig.theme`, set:
- `--color-primary` — the single brand colour; hover, subtle, and border variants derive automatically via `color-mix()` in CSS
- Override any other CSS variable from `src/styles/variables.css` as needed (backgrounds, text colours, etc.)

The colour cycler (6 preset accent colours) can be toggled with `site.showcaseColorCycler`. Light/dark mode is controlled by `site.showThemeToggle` and `site.defaultTheme`.

### 3. Sections

`siteConfig.sections` is an array that controls which sections render and in what order. Each entry has `id`, `label`, and `enabled`. Toggle sections on/off or reorder them here.

Available sections: `services`, `work`, `showcase`, `insights`, `about`, `contact`, `team`.

### 4. Section Content

Each section has its own key in `siteConfig` (`hero`, `services`, `work`, `showcase`, `insights`, `about`, `contact`, `team`, `footer`). Update headings, items, and content within these objects.

### 5. Hero

- `hero.headlineLines` — array of headline strings
- `hero.tagline` — subheading text
- `hero.background` — one of: `'particles'`, `'aurora'`, `'orbs'`, `'embers'`
- `hero.backgroundSwitcher` — allow visitors to switch backgrounds

### 6. Images

Place image files in `/public/` and reference them by path in siteConfig (e.g., `/my-photo.jpg`). Placeholder URLs (`https://placehold.co/...`) work during development.

### 7. Fonts

Variable fonts are loaded in `src/styles/typography.css`:
- **Outfit** — display headings
- **Plus Jakarta Sans** — body text
- **Syne** — alternative display

Change font families via CSS custom properties in `variables.css`.

### 8. SEO & Metadata

Update `index.html` to match the new site identity:
- `<title>`, `<meta name="description">`, Open Graph tags, Twitter Card tags
- Structured data (JSON-LD) — update the `"name"`, `"url"`, and `"description"` fields
- `public/robots.txt` and `public/sitemap.xml` — update the sitemap URL

---

## Digital Signatures — DO NOT REMOVE

This template contains attribution markers for the original creator. **These must not be removed, modified, or obscured.** They are a condition of the licence.

The signatures are:

| Location | Signature |
|---|---|
| `index.html` | `<meta name="author">` tag |
| `index.html` | `<meta name="designer">` tag |
| `index.html` | `<meta name="generator">` tag |
| `index.html` | HTML comment in `<body>` |
| `index.html` | `creator` field in structured data (JSON-LD) |
| `src/styles/variables.css` | CSS comment on line 1 |
| `src/components/Footer/Footer.jsx` | "Powered by Novalogix" link |
| `public/humans.txt` | Developer and site credits |

When customising the template, you **may** update the user-facing content (company name, descriptions, etc.) but you **must** leave all of the above signatures intact.

---

## Licence

```
NOTICE

Copyright (c) 2026 Colin Kelly-Cook / Novalogix
https://novalogix.au

This template may be used freely to build websites and
commercial products. It may NOT be resold, sublicensed,
or distributed as a standalone template product without
written permission from the copyright holder.

To obtain a commercial redistribution licence, contact:
colin@novalogix.au
```
