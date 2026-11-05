// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { shotsPlugin } from './src/lib/markdown-shots.mjs';

export default defineConfig({
  site: 'https://www.holtawaydesign.com',
  // Emit /breathebody.html rather than /breathebody/index.html so Netlify serves
  // /breathebody with a 200 and no trailing-slash redirect (Apple has these URLs on file).
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  compressHTML: true,
  // Blog images are laid out by what they are: phone screenshot, Mac screenshot or photo.
  markdown: { processor: satteri({ hastPlugins: [shotsPlugin] }) },
});
