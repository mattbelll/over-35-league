// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Update `site` to your production URL before deploying so that the sitemap,
// canonical URLs and Open Graph tags resolve to absolute links.
export default defineConfig({
  site: 'https://over35league.netlify.app',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    // Cast avoids a harmless Vite-version type mismatch between Astro's bundled
    // Vite and the copy pulled in by @tailwindcss/vite. Runtime is unaffected.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
