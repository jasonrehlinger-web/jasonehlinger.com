# CLAUDE.md: jasonehlinger.com

Handoff for Claude Code. Drop this file in the repo root (Claude Code loads `CLAUDE.md` automatically) and continue from here.

Last updated: 2026-09-23

---

## What this is

Personal consulting site for **Jason Ehlinger**: leadership coaching and personal finance coaching. It replaces the old site at https://www.jasonehlinger.com/. It must stay easy to update through **GitHub + Netlify** (push to `main`, Netlify builds and deploys).

- **GitHub repo:** `jasonrehlinger-web/jasonehlinger.com`, branch `main`
- **Live URL:** https://www.jasonehlinger.com
- **Hosting:** Netlify, auto-deploys on every push to `main` (about 1 to 2 minutes)
- **Old static HTML version:** `jasonrehlinger-web/jason-ehlinger-site` (do not edit, reference only)

---

## FIRST THING TO DO in Claude Code

The working folder this came from ("Jason Ehlinger website") has a **broken `.git`** (empty, `HEAD` points to `master`, no remote, no objects). Several changes were pushed to GitHub outside that folder (pricing page via the GitHub API, blog posts via GitHub web upload), so **GitHub `main` is the source of truth**, not the local folder.

1. Clone fresh: `git clone https://github.com/jasonrehlinger-web/jasonehlinger.com.git`
2. Diff it against the old local folder and bring over anything missing on GitHub (likely only these docs: `BLOG-AUTOMATION.md`, `HANDOFF-pricing-and-booking.md`, `booking-and-payment-setup.md`, `pricing-plan.md`, and this `CLAUDE.md`).
3. Confirm `npm install && npm run build` passes before changing anything.
4. Authenticate with `gh auth login` or GitHub Desktop. Never paste a personal access token into a chat.

---

## Stack

- **Astro 4** (`astro ^4.15.0`) + `@astrojs/mdx ^3.1.0`
- `astro.config.mjs`: `site: 'https://www.jasonehlinger.com'`, mdx integration
- `netlify.toml`: build `npm run build`, publish `dist`, `NODE_VERSION = "20"`, 404 redirect to `/404`
- Forms: **Netlify Forms** (`data-netlify="true"`), forms named `contact` (contact page) and `masterclass` (home + services). Submissions show in the Netlify dashboard.
- No backend, no database.

Commands:

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview
```

---

## Repo map

```
src/
  components/Header.astro     nav array (Home, About, Services, Pricing, Speaking, Blog, Tools, Contact) + "Work With Me" -> /contact
  components/Footer.astro     footer "Navigate" links (includes Pricing)
  layouts/Layout.astro        base HTML layout
  styles/global.css           ALL site styles + design tokens
  content/config.ts           blog collection schema
  content/blog/*.md           blog posts (25 as of 2026-09-22)
  pages/
    index.astro               home (has masterclass signup form)
    about.astro
    services.astro            free courses "The Forge" (13-part leadership masterclass) + "Build Right"
    pricing.astro             coaching pricing + Calendly booking (see below)
    speaking.astro
    contact.astro             free intro call / contact form
    404.astro
    blog/index.astro          blog listing
    blog/[...slug].astro      post template
    tools/index.astro
    tools/zero-based-budget.astro
    tools/compound-interest-calculator.astro
    tools/investment-calculator.astro
    tools/retirement-calculator.astro
    tools/mortgage-calculator.astro
public/
  favicon.svg, robots.txt, sitemap.xml (hand-written, 13 URLs, likely stale)
  jason-headshot.jpg, jason-hero-full.jpg   (in use)
  jason-headshot.png (51 MB!), jason-hero-full.jpg.png (1.5 MB)   (check if unused, then remove)
Docs (repo root, not part of the build):
  README.md, BLOG-AUTOMATION.md, HANDOFF-pricing-and-booking.md,
  booking-and-payment-setup.md, pricing-plan.md
```

---

## Design system (match it, do not invent new styles)

Defined in `src/styles/global.css`:

- Colors: `--gold #C8982A`, `--gold-dark #a87d20`, `--black #0a0a0a`, `--dark #1a1a1a`, `--gray #4a4a4a`, `--light-gray #f4f4f4`, `--white`
- Fonts: Inter (sans), Georgia (serif). `--max-width: 1100px`
- Reusable classes: `.container`, `.section`, `.section-gray`, `.section-dark`, `.section-label`, `.page-hero`, `.card`, `.btn`, `.btn-gold`, `.btn-dark`, `.btn-outline`
- Blog classes: `.lede`, `.stat-row` / `.stat`, `.pull-quote`, `.article-cta` (with `.cta-label`)

---

## Blog

Schema (`src/content/config.ts`):

```ts
title: string, description: string, date: date,
author: string (default "Jason Ehlinger"),
category: "Leadership" | "Finance" (default "Finance"),
image?: string
```

Posts also use an optional `keywords:` frontmatter string (not in the schema, harmless).

**`BLOG-AUTOMATION.md` is the full spec** (StoryBrand structure, Jason's voice, keyword research, CTA blocks, verification checklist). Read it before writing any post. Key rules:

- Two posts a week, **Tuesday and Thursday**, topic picked by keyword demand, roughly alternating Leadership / Finance.
- 800 to 1,300 words. Reader is the hero, Jason is the guide. Simple 3 to 5 step plan. 2 to 3 CTAs.
- Markdown does not render inside raw HTML blocks (use `<em>` / `<strong>` inside `.lede`).
- Only link to real paths: `/contact`, `/pricing`, `/services`, `/tools/...`, YouTube `https://www.youtube.com/@Visiontribemoney`.
- Slug: lowercase, hyphenated, keyword-rich, no dates. Never overwrite an existing post.

Most recent posts: `how-to-save-for-a-down-payment-on-a-house` (Finance, 2026-09-22), `how-to-retain-your-best-employees` (Leadership, 2026-09-17). Next in rotation: **Leadership, Thursday 2026-09-24**.

**Heads-up:** a Cowork scheduled task `jason-blog-twice-weekly` (cron `0 7 * * 2,4`) currently writes and publishes these posts via GitHub web upload. If Claude Code takes over blogging, pause or delete that task first, or you will get duplicate posts. Always `git pull` before adding a post.

---

## Pricing + booking (`src/pages/pricing.astro`)

Individuals only. A single `booking` config object at the top of the file holds every link, and a `link()` helper falls back to `/contact` when a URL is blank, so the page never breaks. An inline script opens Calendly URLs as a popup and other URLs in a new tab.

| Offer | Price | Link |
|---|---|---|
| Free intro call | $0 | `calendly.com/ceo-taikatranslations/30min` |
| Financial intake (45 min) | $150 | `/financial-coaching-intake-session` |
| Financial follow-up (45 min) | $100 | `/financial-coaching-follow-up-session` |
| Financial 6-session package | $550 | **NOT SET** (`finPackage: ""`) |
| Leadership session (90 min in Calendly) | $175 | `/leadership-coaching-session` |
| Leadership 6-session package | $900 | **NOT SET** (`leadPackage: ""`) |

Calendly account: handle `ceo-taikatranslations`, login ceo@taikatranslations.com. Payment at booking runs through **PayPal** connected to Calendly (not Stripe). Pay-at-booking needs Calendly Standard or higher.

---

## Open to-do list

1. **Package payment links.** Create the $550 financial and $900 leadership 6-session packages (Calendly "meeting packages / payment links" is the cleanest option) and paste the URLs into `finPackage` / `leadPackage`.
2. **Intro call mismatch.** The Calendly `/30min` event is still named "45 Minute Meeting" and is 45 min, but the site says 30 min. Fix in Calendly or update copy.
3. **Leadership session length.** Calendly says 90 min, site copy says 45 min. Pick one and make them match.
4. **Confirm paid bookings charge.** Do one test booking on a paid event and confirm PayPal collects payment.
5. **Sitemap.** `public/sitemap.xml` is hand-written with 13 URLs and misses most blog posts and tools. Replace with `@astrojs/sitemap` and delete the static file.
6. **Oversized images.** Remove `public/jason-headshot.png` (51 MB) and `public/jason-hero-full.jpg.png` if nothing references them (a quick grep of `src/` found no references). Consider Astro's image optimization for the rest.
7. **README.md** is outdated (placeholder GitHub setup steps, blog frontmatter without `category`). Refresh it.
8. **Optional pricing polish:** package expiry note (for example, use within 6 months) and a 24-hour cancellation line.

---

## Security

A GitHub personal access token was pasted into an earlier chat in plain text. If it has not already been revoked, revoke it in GitHub > Settings > Developer settings > Personal access tokens.

---

## Working rules

- **No em-dashes** anywhere in copy written for Jason (site copy, blog posts, commit messages). Use commas, periods, or parentheses.
- Keep copy in Jason's voice: direct, warm, plain-spoken, veteran/operator pragmatism, no corporate jargon.
- Match the existing design system and components. Don't add frameworks or dependencies without a good reason.
- Run `npm run build` before every push. A broken build means the live site doesn't update.
- Small, focused commits to `main` (or a branch + PR for bigger changes). Netlify deploys from `main`.
- Verify the live page after deploy.
