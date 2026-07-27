# Over 35 League — Website

A fast, mobile-first website for a recreational adult hockey league, built with
**Astro**, **TypeScript** and **Tailwind CSS v4**. The site is fully static (no
database, no runtime server), designed to deploy to **Netlify** and store its
source in **GitHub**.

Team names, schedule, scores and standings reflect the real Over 35 League data.
Rosters, sponsors, pricing, team profile photos and some blog copy are still
**placeholder content** and should be replaced with real league assets before launch.

---

## Quick start

```bash
npm install      # install dependencies
npm run dev      # start the local dev server (http://localhost:4321)
npm run build    # build the static site into ./dist
npm run preview  # preview the production build locally
npm run check    # type-check + Astro diagnostics
```

Requires Node 18+ (Node 20 recommended — matches `netlify.toml`).

---

## Project structure

```
hockey-league/
├── astro.config.mjs        # Astro config: site URL, sitemap, Tailwind
├── netlify.toml            # Netlify build settings
├── public/                 # Static files served as-is
│   ├── robots.txt          # Search engine rules + sitemap link
│   ├── favicon.svg
│   ├── og-default.svg      # Default social-share image
│   └── images/             # Placeholder blog images
└── src/
    ├── content.config.ts   # Blog content collection schema
    ├── data/               # ← EDIT THESE to update the site
    │   ├── site.ts         # League name, contact info, nav, form embed URL
    │   ├── teams.json      # Teams + rosters
    │   ├── schedule.json   # Games (upcoming + results)
    │   └── standings.json  # League standings
    ├── content/blog/       # Blog posts (Markdown)
    ├── lib/hockey.ts        # Helpers that read the data files
    ├── layouts/            # Page shell (BaseLayout)
    ├── components/         # Reusable UI components
    └── pages/              # Routes (see below)
```

### Routes

| Route              | File                             |
| ------------------ | -------------------------------- |
| `/`                | `src/pages/index.astro`          |
| `/about`           | `src/pages/about.astro`          |
| `/teams`           | `src/pages/teams/index.astro`    |
| `/teams/[slug]`    | `src/pages/teams/[slug].astro`   |
| `/schedule`        | `src/pages/schedule.astro`       |
| `/registration`    | `src/pages/registration.astro`   |
| `/contact`         | `src/pages/contact.astro`        |
| `/blog`            | `src/pages/blog/index.astro`     |
| `/blog/[slug]`     | `src/pages/blog/[slug].astro`    |
| `/thank-you`       | `src/pages/thank-you.astro`      |

---

## How to update content

### 1. League name, contact info & branding

Edit **`src/data/site.ts`**. This one file controls the league name, tagline,
description, location, email, phone, social links, season label, and the
navigation menu. Brand colours and fonts live in **`src/styles/global.css`**
(the `@theme` block — e.g. `--color-flare-500` is the orange CTA accent).

### 2. Teams

Edit **`src/data/teams.json`**. Each team is an object:

```json
{
  "slug": "dire-wolves",              // URL: /teams/dire-wolves (must be unique)
  "name": "Dire Wolves",
  "abbreviation": "DW",
  "primaryColor": "#334155",          // used for accents / the color dot
  "division": "35+",
  "image": "/images/teams/dire-wolves.svg", // square (1:1) profile image
  "tagline": "One-line hook shown on the team card.",
  "description": "Longer team blurb shown on the team page.",
  "roster": []                         // leave empty until player lists arrive
}
```

Add or remove teams by adding/removing objects in the array. Team pages, the
teams grid, standings and schedule all reference teams by their `slug`, so a
team's `slug` must match the `slug` used in `standings.json` and `schedule.json`.

**Team profile images:** each team shows a 1:1 square image (`image` field). The
repo ships placeholder squares in `public/images/teams/`. To use a real photo,
drop a square image into that folder and point `image` at it (e.g.
`/images/teams/dire-wolves.jpg`).

### 3. Schedule (games & results)

Edit **`src/data/schedule.json`**. This is what you replace each week with the
league's latest results. Each game references teams by `slug`:

```json
{
  "id": "g001",                  // any unique string
  "date": "2026-05-07",          // YYYY-MM-DD (local date)
  "startTime": "7:30 PM",        // scheduled games only (display string)
  "home": "kingspan",            // team slug
  "away": "holy-city",           // team slug
  "arena": "Palace Rink",
  "type": "regular",             // "regular" or "playoff"
  "status": "scheduled",         // "scheduled" or "final"
  "homeScore": 1,                // final games only
  "awayScore": 6,                // final games only
  "ot": true                     // optional: overtime final
}
```

- For a **completed** game set `"status": "final"` and add `"homeScore"` /
  `"awayScore"` (add `"ot": true` for overtime). You can drop `startTime`.
- For an **upcoming** game set `"status": "scheduled"` and include `"startTime"`.
- For a **playoff** game whose teams aren't decided yet, set `"type": "playoff"`
  and use `"homeLabel"` / `"awayLabel"` (e.g. `"Seed 3"`, `"Winner of Game 1"`)
  instead of `home` / `away`.

Upcoming games, recent results and each team's game list are sorted for you.

### 4. Standings

Edit **`src/data/standings.json`**. Standings are shown exactly as entered — the
site preserves the official sheet's `rank` order (including its tiebreakers)
rather than recomputing it:

```json
{ "rank": 1, "slug": "dire-wolves", "gp": 12, "w": 8, "l": 4, "otl": 0, "t": 0, "pts": 16, "gf": 55, "ga": 40 }
```

When you upload a fresh standings sheet, keep the rows in the sheet's rank order
and set each `rank`. Update the `"updated"` date at the top so visitors know how
current the table is. (Goal differential is calculated automatically from
`gf` − `ga`.)

### 5. Blog posts

Add a Markdown file to **`src/content/blog/`**. The filename becomes the URL
slug (e.g. `gear-guide.md` → `/blog/gear-guide`). Required frontmatter:

```markdown
---
title: "Post title"
description: "One-sentence summary for cards and SEO."
pubDate: 2026-07-15
author: "League Office"          # optional, defaults to "League Office"
tags: ["registration", "season"] # optional
heroImage: "/images/blog-x.svg"  # optional, lives in public/images/
draft: false                     # set true to hide from the site
---

Write the post body in **Markdown** here.
```

Then write the body in Markdown. Posts are sorted newest-first automatically.

---

## Registration form (Tally / Google Forms)

The registration page is pre-wired for an embedded form. To go live:

1. Create a form in [Tally](https://tally.so) or [Google Forms](https://forms.google.com).
2. Copy its **embed / share URL**.
3. Paste it into `registrationEmbedUrl` in **`src/data/site.ts`**.

The placeholder box on `/registration` is automatically replaced by the live
embedded form once that value is set.

---

## Contact form (Netlify Forms)

The contact form (`src/pages/contact.astro`) is configured for **Netlify Forms**:

- The `<form>` has `data-netlify="true"` and a hidden `form-name` field.
- A honeypot field (`bot-field`) provides basic spam protection.
- On success, Netlify redirects to `/thank-you/`.

**Netlify detects the form automatically at deploy time** — no extra config
needed. Submissions appear in your Netlify dashboard under **Forms**. (The form
only works on a deployed Netlify site, not on the local dev server.)

---

## Deployment (Netlify + GitHub)

1. Push this folder to a GitHub repository.
2. In Netlify, **Add new site → Import from GitHub** and pick the repo.
3. Netlify reads `netlify.toml` automatically:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. After the first deploy, note your site URL and update `site` in
   **`astro.config.mjs`** and `url` in **`src/data/site.ts`** (this makes the
   sitemap, canonical URLs and Open Graph images use your real domain), then
   also update the `Sitemap:` line in **`public/robots.txt`**.

---

## SEO & accessibility notes

- Every page sets a title, meta description, canonical URL and Open Graph /
  Twitter card tags via `src/components/Seo.astro`.
- A sitemap is generated at `/sitemap-index.xml` by `@astrojs/sitemap`.
- `robots.txt` allows crawling and points to the sitemap.
- Navigation is keyboard-accessible with a skip-to-content link, visible focus
  states, ARIA labels and `aria-current` on the active nav item.
- Forms use associated `<label>`s and required-field indicators.

---

## Tech stack

- [Astro](https://astro.build) — static site framework
- [Tailwind CSS v4](https://tailwindcss.com) — via `@tailwindcss/vite`
- [TypeScript](https://www.typescriptlang.org)
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
