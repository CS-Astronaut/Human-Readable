import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      featured: z.boolean().optional().default(false),
      tags: z.array(z.string()).optional().default([]),

      // NEW OG
      cover: image().optional(),
      
      // Persian support !
      lang: z.enum(['en', 'fa']).optional().default('en'),
    }),
});

export const collections = { blog };
