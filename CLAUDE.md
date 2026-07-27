# Over 35 League — project guide

Website for the **Over 35 League**, an adult (35+) recreational hockey league at
Carolina Ice Palace in Charleston, SC. Static site, deployed to Netlify.

## Stack
- **Astro 5** (static output) + **TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/vite` (design tokens in `src/styles/global.css`)
- `@astrojs/sitemap`
- No database, no React — Astro components only.

## Commands
```bash
npm run dev      # local dev server (http://localhost:4321)
npm run build    # static build to ./dist
npm run preview  # preview the production build
npm run check    # astro type-check (must stay at 0 errors)
```

## Where things live
- `src/data/site.ts` — league name, tagline, contact info, nav, registration embed URL
- `src/data/teams.json` — the 8 teams (slug, colors, logo image, roster: `{name, pos, round}`)
- `src/data/schedule.json` — games (`final` with scores / `scheduled` with `startTime`; playoff games use `homeLabel`/`awayLabel`)
- `src/data/standings.json` — standings in official `rank` order (site preserves rank, does not recompute tiebreakers)
- `src/lib/hockey.ts` — helpers that read the data files
- `src/content/blog/` — wait: blog markdown lives in `src/blog/` (see `src/content.config.ts`)
- `src/components/`, `src/layouts/`, `src/pages/` — UI and routes
- `public/images/teams/` — team logos; `public/images/sponsors/` — sponsor logos (uniform navy `#22457C`)

## Recurring workflow (no API)
The league has no API. Each week the schedule/standings are updated by hand:
- Paste the new results into `src/data/schedule.json` (set a game to `status: "final"` + scores).
- Paste the fresh standings rows into `src/data/standings.json` in the sheet's rank order.
See `README.md` for the full field-by-field guide to updating teams, schedule, standings, and blog posts.

## Conventions
- Light theme: white/rink-50 backgrounds, dark text, ice-blue + orange (`flare`) accents.
- Keep `npm run check` at 0 errors before considering a change done.
- Before deploy, set the production URL in `astro.config.mjs`, `src/data/site.ts`, and `public/robots.txt`.
