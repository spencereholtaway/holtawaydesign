// Copies the prebuilt Sveltia CMS (the blog editor at /admin) from the
// installed npm package into public/cms, so it's served from this site at the
// version pinned in package.json. Runs before `npm run dev` and `npm run build`.
import { cp, rm } from 'node:fs/promises';

const from = new URL('../node_modules/@sveltia/cms/dist/', import.meta.url);
const to = new URL('../public/cms/', import.meta.url);

await rm(to, { recursive: true, force: true });
await cp(new URL('sveltia-cms.js', from), new URL('sveltia-cms.js', to));
await cp(new URL('chunks/', from), new URL('chunks/', to), {
  recursive: true,
  filter: (src) => !src.endsWith('.map'),
});
