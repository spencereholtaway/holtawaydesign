// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.holtawaydesign.com',
  // Emit /breathebody.html rather than /breathebody/index.html so Netlify serves
  // /breathebody with a 200 and no trailing-slash redirect (Apple has these URLs on file).
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  compressHTML: true,
});
