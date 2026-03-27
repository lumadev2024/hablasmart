import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hablasmart.vercel.app', // ← aggiorna con il tuo dominio Vercel
  integrations: [sitemap()],
  output: 'static',
});
