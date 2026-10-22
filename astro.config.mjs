import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.includes('/404') }),
  ],
  site: 'https://jasonehlinger.com',
  // Astro 7 defaults to JSX-style whitespace, which strips the spaces between
  // inline elements ("<strong>a</strong> <em>b</em>" renders as "ab").
  // Keep the pre-7 behavior so copy renders exactly as written.
  compressHTML: true,
});
