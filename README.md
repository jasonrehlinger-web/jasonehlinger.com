# Jason Ehlinger — Personal Website

Built with [Astro](https://astro.build) and deployed via [Netlify](https://netlify.com).

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:4321
npm run dev

# Build for production
npm run build
```

## Deployment: GitHub + Netlify

### 1. Push to GitHub
1. Create a new repo at [github.com/new](https://github.com/new)
2. In this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

### 2. Connect to Netlify
1. Go to [app.netlify.com](https://app.netlify.com) and click **Add new site → Import an existing project**
2. Choose **GitHub** and select your repo
3. Build settings are auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy site**

### 3. Custom Domain
In Netlify: **Site settings → Domain management → Add custom domain** → enter `jasonehlinger.com`

Then update your DNS at your domain registrar to point to Netlify's servers (Netlify will show you the exact records).

---

## Adding Blog Posts

Blog posts live in `src/content/blog/`. To add a new post:

1. Create a new file: `src/content/blog/your-post-title.md`
2. Add the frontmatter at the top:

```markdown
---
title: "Your Post Title"
description: "A one-sentence description for SEO and the blog index."
date: 2024-10-15
author: Jason Ehlinger
---

Your post content in Markdown goes here...
```

3. Write your post in Markdown below the frontmatter
4. Commit and push to GitHub — Netlify deploys automatically

---

## Site Structure

```
src/
├── components/
│   ├── Header.astro       # Navigation
│   └── Footer.astro       # Footer with links
├── content/
│   ├── config.ts          # Blog collection schema
│   └── blog/              # Markdown blog posts (add new ones here)
├── layouts/
│   └── Layout.astro       # Base HTML layout
├── pages/
│   ├── index.astro        # Home page
│   ├── about.astro        # About page
│   ├── services.astro     # Services page
│   ├── speaking.astro     # Speaking page
│   ├── contact.astro      # Contact page
│   └── blog/
│       ├── index.astro    # Blog listing
│       └── [...slug].astro # Individual post template
└── styles/
    └── global.css         # All site styles
```

## Forms (Netlify Forms)

The contact and masterclass signup forms use [Netlify Forms](https://docs.netlify.com/forms/setup/) — they work automatically once deployed to Netlify. Submissions appear in your Netlify dashboard under **Forms**.

No backend or third-party service needed.
