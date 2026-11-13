import type { APIRoute } from 'astro';
import { getPosts, getTags, postPath, tagPath } from '../data/blog';

const paths = ['/', '/breathebody', '/fishingforcompliments', '/mybussf', '/olivers-train', '/pingpongcowboy', '/simplelatlon', '/simpleoutage'];

export const GET: APIRoute = async ({ site }) => {
  const lastmod = new Date().toISOString().slice(0, 10); // build date
  const posts = await getPosts();
  // The blog joins the sitemap once it has a post.
  const tags = await getTags();
  const all = posts.length ? [...paths, '/blog', ...posts.map(postPath), ...tags.map((t) => tagPath(t.name))] : paths;
  const urls = all
    .map((p) => `  <url><loc>${new URL(p, site).href}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
