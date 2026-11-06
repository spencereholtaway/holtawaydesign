// RSS feed for the blog, for feed readers and RSS-to-email services.
import type { APIRoute } from 'astro';
import { getPosts, postPath } from '../../data/blog';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const home = new URL('/blog', site).href;
  const items = posts
    .map((p) => {
      const url = new URL(postPath(p), site).href;
      return `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
      <description>${esc(p.data.summary)}</description>
    </item>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Spencer Holtaway — Blog</title>
    <link>${home}</link>
    <description>Notes on product design, games and building apps with AI. Things I see, think and make.</description>
    <language>en-us</language>
    <atom:link href="${new URL('/blog/rss.xml', site).href}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
