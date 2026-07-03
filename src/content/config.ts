import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string().default('Jason Ehlinger'),
    category: z.enum(['Leadership', 'Finance']).default('Finance'),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
