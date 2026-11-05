// Content collections. Blog posts are Markdown files in src/content/blog; the
// file name is the URL (my-post.md -> /blog/my-post). See the example post in
// that folder for every field and the formatting you can use.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Publish date, YYYY-MM-DD. Posts are listed newest first. */
      date: z.coerce.date(),
      /** One or two sentences: the list, search results and share cards use it. */
      summary: z.string(),
      /** Optional cover image, relative to the post, e.g. ./my-post/cover.jpg. Also the share card image. */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Default text for the share page (/share). Falls back to the title. */
      share: z.string().optional(),
      /** Drafts show up in `npm run dev` but are left out of the built site. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
