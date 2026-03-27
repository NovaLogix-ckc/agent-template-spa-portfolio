# Static Website Template

A config-driven **React 19 + Vite 8** template for building polished, modern static websites — designed to be customised by AI agents or by hand.

Whether you're launching a portfolio, a business landing page, or a showcase site, this template gives you a production-ready starting point with beautiful animations, theming, and SEO baked in. Just point your favourite AI coding agent at it and describe what you want.

## Video Demo

[![Static Website Template Demo](https://img.youtube.com/vi/84fDwmO5AXU/maxresdefault.jpg)](https://youtu.be/84fDwmO5AXU)

Watch a demo on YouTube.

---

## Agent-First Design

This repo is built around an **agent-first workflow**. It ships with [`agent-instructions.md`](agent-instructions.md) — a structured guide that any AI coding agent can read to personalise the entire template for you.

**How it works:**
1. Open the repo in your AI-powered editor (Claude Code, Cursor, Copilot, Windsurf, etc.)
2. Point your agent at `agent-instructions.md`
3. Tell it what your site should be — your brand, your colours, your content
4. Watch it transform the template into your finished site

No need to dig through code yourself. The agent instructions cover everything from site identity and theming to section toggling, hero backgrounds, images, and SEO.

Of course, you can also customise everything manually — the config-driven architecture makes both paths straightforward.

---

## Quick Start

```bash
npm install        # Install dependencies
npm run dev        # Start dev server with hot reload
npm run build      # Build for production
npm run preview    # Preview the production build locally
```

The `dist/` folder contains pure static HTML, CSS, and JS — deploy it to **Vercel**, **Netlify**, **GitHub Pages**, **Azure Static Web Apps**, or any host you like.

---

## Features

- **Config-driven** — all content, sections, and theme controlled from a single file (`src/data/siteConfig.js`)
- **Toggleable sections** — services, work, showcase, insights, about, contact, team — enable, disable, and reorder as needed
- **4 animated hero backgrounds** — particles, aurora, gravitational orbs, fire embers
- **Section backgrounds** — mesh gradients, wave fields, floating shapes, animated grid
- **Dark / light mode** with colour cycling and single brand-colour theming
- **Framer Motion** scroll reveals, entrance animations, and smooth transitions
- **SEO-ready** — JSON-LD structured data, Open Graph tags, Twitter Cards, sitemap, robots.txt
- **Variable fonts** — Outfit, Plus Jakarta Sans, Syne
- **Zero backend** — builds to static files, deploy anywhere

---

## Project Structure

| Path | Description |
|------|-------------|
| `src/data/siteConfig.js` | All site content and configuration |
| `src/components/` | Section components (Hero, Services, Work, Showcase, etc.) |
| `src/styles/variables.css` | CSS custom properties and theming |
| `agent-instructions.md` | AI agent customisation guide |
| `notice` | Licence terms |

---

## Customisation

Everything you need to know is in [`agent-instructions.md`](agent-instructions.md). The key areas you can customise:

1. **Site identity** — name, tagline, description, logo, favicon
2. **Theme & colours** — set a single brand colour and the template generates all variants automatically
3. **Sections** — enable/disable and reorder any combination of sections
4. **Hero background** — choose from four animated backgrounds
5. **Section backgrounds** — pick a different style for each section
6. **Images** — drop files in `/public/` and reference them in the config
7. **SEO & metadata** — update meta tags, structured data, sitemap, and robots.txt

---

## Attribution

This template includes digital signatures (HTML meta tags, a footer link, CSS comments, and `humans.txt`) that credit the original author. These **must remain intact** per the licence terms. See the attribution table in [`agent-instructions.md`](agent-instructions.md) for the full list.

---

## Licence

```
Copyright (c) 2026 Colin Kelly-Cook / Novalogix
https://novalogix.au

This template may be used freely to build websites and
commercial products. It may NOT be resold, sublicensed,
or distributed as a standalone template product without
written permission from the copyright holder.

To obtain a commercial redistribution licence, contact:
colin@novalogix.au
```

---

## Support This Project

If this template saved you time or helped you build something great, consider buying me a coffee — it helps keep projects like this free and maintained.

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/colin.kellycook)

For questions, feedback, or commercial redistribution enquiries, reach out at **colin@novalogix.au**.

---

Built with care by [Colin Kelly-Cook](https://novalogix.au) / **Novalogix**
