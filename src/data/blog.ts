import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export const isDraft = (p: Post) => p.data.status !== 'published';

/** Posts, newest first. Drafts are included in `astro dev` only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', (p) => import.meta.env.DEV || !isDraft(p));
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const postPath = (p: Post) => `/blog/${p.id}`;

/** The homepage's "Latest from the blog" row shows this many posts, and only once there are this many. */
export const LATEST_COUNT = 5;

/** A tag as it appears in a URL: "Product Design" -> "product-design". */
export const tagSlug = (tag: string) =>
  tag.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const tagPath = (tag: string) => `/blog/tag/${tagSlug(tag)}`;

/** Every tag in use: its URL slug, the name as first written, and its posts (newest first). */
export async function getTags() {
  const tags = new Map<string, { slug: string; name: string; posts: Post[] }>();
  for (const post of await getPosts()) {
    for (const name of post.data.tags) {
      const slug = tagSlug(name);
      if (!slug) continue;
      if (!tags.has(slug)) tags.set(slug, { slug, name: name.trim(), posts: [] });
      tags.get(slug)!.posts.push(post);
    }
  }
  return [...tags.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

/** Whole minutes at 230 words a minute, at least 1. */
export const readingMinutes = (p: Post) =>
  Math.max(1, Math.round((p.body ?? '').split(/\s+/).filter(Boolean).length / 230));
