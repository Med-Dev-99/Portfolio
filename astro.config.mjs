// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mohamedelkorchi.com',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // Keep every script and asset as a file so the Content-Security-Policy can stay strict ('self').
    build: { assetsInlineLimit: 0 },
  },
});
