// @ts-check
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { DEFAULT_LOCALE, LOCALES } from './src/i18n/i18n';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: "standalone"
  }),

  site: 'http://localhost:4321',

  integrations: [sitemap()],

  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALES,
    routing: {
      fallbackType: "redirect",
      redirectToDefaultLocale: true,
      prefixDefaultLocale: false
    }
  },
});