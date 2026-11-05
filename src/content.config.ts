// Content collections. Blog posts are Markdown files in src/content/blog, written
// in the editor at /admin (src/pages/admin.astro); the file name is the URL
// (my-post.md -> /blog/my-post). Images live in src/content/blog/images.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** An emptied field can be saved as '' rather than left out. */
const blankToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v);

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Publish date, YYYY-MM-DD. Posts are listed newest first; set an earlier date to backdate. */
      date: z.coerce.date(),
      /** Only published posts appear on the site. Drafts show up in `npm run dev` only. */
      status: z.enum(['draft', 'published']).default('draft'),
      /** Topics, e.g. ["design", "ai"]. Each gets a page at /blog/tag/<tag>. "a, b" in one entry counts as two. */
      tags: z
        .array(z.string())
        .default([])
        .transform((tags) => [...new Set(tags.flatMap((t) => t.split(',')).map((t) => t.trim()).filter(Boolean))]),
      /** One or two sentences: the list, search results and share cards use it. */
      summary: z.string(),
      /** Optional cover image, relative to the post, e.g. ./my-post/cover.jpg. Also the share card image. */
      cover: z.preprocess(blankToUndefined, image().optional()),
      coverAlt: z.preprocess(blankToUndefined, z.string().optional()),
      /** Default text for the share page (/share). Falls back to the title. */
      share: z.string().optional(),
    }),
});

export const collections = { blog };
