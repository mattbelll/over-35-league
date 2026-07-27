import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Blog content collection.
 * Add a new post by dropping a Markdown file into `src/blog/`.
 * Each file must include the frontmatter fields defined in the schema below.
 *
 * Note: files live in `src/blog/` (outside the reserved `src/content/`
 * directory) so the glob loader doesn't double-read entries on HMR.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default("League Office"),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
