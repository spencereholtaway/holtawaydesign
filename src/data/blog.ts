import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Posts, newest first. Drafts are included in `astro dev` only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', (p) => import.meta.env.DEV || !p.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const postPath = (p: Post) => `/blog/${p.id}`;

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

/** Whole minutes at 230 words a minute, at least 1. */
export const readingMinutes = (p: Post) =>
  Math.max(1, Math.round((p.body ?? '').split(/\s+/).filter(Boolean).length / 230));
