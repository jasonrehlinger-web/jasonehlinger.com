# Blog Automation — StoryBrand Engine Spec

This file is the single source of truth for the twice-weekly blog. The scheduled task reads it every run so posts stay on-brand and correctly formatted. Edit this file to change how posts are written.

## Cadence
- **Two posts per week: Tuesday and Thursday.**
- Topic is chosen **by keyword demand** each run — see Topic Rotation.

## Topic Rotation (choose by keyword demand)
Each run, pick ONE category — Leadership or Finance — based on current search demand:
1. Do fresh keyword research (see below).
2. Compare the strongest opportunity in Leadership vs. Finance (high search intent, evergreen, low-to-medium difficulty, not already covered by an existing post in `src/content/blog/`).
3. Write in whichever category has the stronger opportunity that week.
4. Keep rough balance over time — don't write 4 Finance posts in a row unless demand clearly justifies it. If tied, alternate from the previous post's category.

## Keyword Research (do this every run)
- Search current, high-intent leadership-coaching and personal-finance queries (transactional/long-tail convert best, e.g. "how to have difficult conversations with employees", "how much emergency fund do I need").
- Identify ONE **primary keyword** (put it in the title and description) and 5–8 **secondary keywords** (work them naturally into H2s and body — never keyword-stuff).
- Put the full keyword list in the frontmatter `keywords:` field.
- Avoid duplicating the primary keyword of any existing post in `src/content/blog/`.

## Post Format (must match existing posts exactly)

### Frontmatter (required)
```yaml
---
title: "Punchy, benefit-driven title with the primary keyword"
description: "1–2 sentence hook, ~150 chars, includes the primary keyword. Escape any inner quotes as \\\"."
date: YYYY-MM-DD   # the publish date (the Tue or Thu it goes out)
author: Jason Ehlinger
category: Leadership   # or Finance — MUST be exactly one of these
keywords: "primary keyword, secondary 1, secondary 2, ..."
---
```
The content collection schema (`src/content/config.ts`) requires `title`, `description`, `date`, `author`, `category` (enum: Leadership | Finance). `keywords` and `image` are optional.

### Body structure
Markdown with inline HTML. Follow this shape:
1. `<p class="lede">…</p>` — the opening hook. Empathize with the reader's pain in the first line. NOTE: Markdown (e.g. `*italic*`, `**bold**`) does NOT render inside raw HTML blocks like the lede — use `<em>` / `<strong>` there instead of asterisks. Markdown emphasis is fine in normal paragraphs.
2. A short intro (2–3 short paragraphs) that names the stakes.
3. Optional `<div class="stat-row"> <div class="stat"><strong>X</strong><span>label</span></div> …3 stats… </div>`.
4. `## H2` sections. Use `### H3` for numbered steps inside a framework.
5. One `<div class="pull-quote">memorable one-liner</div>` somewhere mid-article.
6. **Bold** for emphasis on key terms; use it sparingly.
7. 800–1,300 words. Plain-spoken, direct, no fluff — Jason's voice.

### Jason's voice
Direct, warm, no-nonsense, veteran/operator pragmatism. Uses concrete examples (military, running a 7-figure company, coaching real people). Short sentences. Reassures without coddling: "You're not lazy / weak — you're running a system that was never designed to work." Never corporate-jargon-y.

## StoryBrand framework (every post follows this)
- **The reader is the hero**, not Jason. Jason is the guide.
- Name the **external problem** (the surface issue) AND the **internal problem** (the fear/frustration underneath) — the internal problem is what makes them act.
- Position Jason as the guide with **empathy** ("I've been there / I've coached this") + **authority** (a clear framework).
- Give a **simple plan** — a short numbered path (usually 3–5 steps).
- **Call to action** — direct (book a call / see coaching) and transitional (free tool / The Forge).
- Make the **stakes** clear: what failure costs, what success looks like. End on the success vision.

## CTAs (use the site's real components and links)
Insert 2–3 CTAs per post. Use this exact HTML block:
```html
<div class="article-cta">
  <span class="cta-label">Short hook label</span>
  <h3>Benefit-driven headline</h3>
  <p>1–2 sentences tying the article to the offer. Mention the free intro call, no pitch.</p>
  <a href="/contact" class="btn btn-gold">Book a Free Intro Call</a>
  <a href="/pricing" class="btn btn-outline" style="margin-left:0.5rem;">See Coaching Options</a>
</div>
```
**Real internal links to use (verified in this repo):**
- `/contact` — book a free intro call (primary CTA)
- `/pricing` — coaching options
- `/services` — free courses: **The Forge** (13-part leadership masterclass) and **Build Right**
- `/tools/zero-based-budget/` — budget tool (Finance posts)
- `/tools/compound-interest-calculator/` — (Finance)
- `/tools/investment-calculator/` , `/tools/retirement-calculator/` , `/tools/mortgage-calculator/` (Finance)
- YouTube: `https://www.youtube.com/@Visiontribemoney`

Pattern: mid-article CTA → a free/transitional CTA (tool or The Forge) → closing CTA to book a call.

## File naming
- Save to `src/content/blog/<slug>.md`
- Slug = lowercase, hyphenated, keyword-rich, no dates. e.g. `how-to-delegate-without-losing-control.md`
- Don't overwrite an existing file — if the slug exists, refine the slug.

## Publishing (how a post goes live) — AUTOMATIC via browser
The site is Astro → GitHub → Netlify. A new `.md` in `src/content/blog/` goes live once it's committed to GitHub `main` (Netlify auto-deploys in ~1–2 min).

- **GitHub repo:** `jasonrehlinger-web/jasonehlinger.com`, branch `main`, blog folder `src/content/blog/`.
- **Publish method (primary): GitHub web UI via Claude in Chrome** (Jason is logged into GitHub in Chrome — no tokens needed):
  1. Write the finished post to `src/content/blog/<slug>.md` locally.
  2. In Chrome, navigate to `https://github.com/jasonrehlinger-web/jasonehlinger.com/upload/main/src/content/blog`
  3. Use the `file_upload` tool on the "Choose your files" file input (`find` it first) to upload the local `.md` file.
  4. Enter a commit message, ensure "Commit directly to the **main** branch" is selected, click **Commit changes**.
  5. Wait ~60–90s, then load `https://www.jasonehlinger.com/blog/<slug>/` and confirm it renders (category tag, CTAs, no stray markdown symbols).
- **Fallback:** if the browser is unavailable, git push from the project folder (`git add … && git commit && git push`) — but the browser upload is the reliable default.
- Do NOT modify unrelated files. One post = one new file.

## Verification (every run, before finishing)
- Frontmatter has all required fields; `category` is exactly `Leadership` or `Finance`; `date` is valid.
- All `<div>` / `<p>` tags are balanced.
- Internal links point to paths that exist in `src/pages/`.
- Primary keyword appears in title, description, and naturally in the body.
- Word count 800–1,300.
