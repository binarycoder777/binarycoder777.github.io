import { defineConfig } from 'astro/config';

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  site: 'https://binarycoder777.github.io',
  base: '/binarycoder777',
});