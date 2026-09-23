import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.includes('/404') }),
  ],
  site: 'https://www.jasonehlinger.com',
});
