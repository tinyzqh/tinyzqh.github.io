import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const author = z.object({
  name: z.string(),
  me: z.boolean().optional(),
  corresponding: z.boolean().optional(),
  url: z.string().url().optional(),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(author).min(1),
    venue: z.string(),
    venueShort: z.string().optional(),
    year: z.number().int(),
    status: z.enum(['accepted', 'published', 'preprint', 'under-review']),
    impactFactor: z.number().optional(),
    quartile: z.enum(['Q1', 'Q2', 'Q3', 'Q4']).optional(),
    arxiv: z.string().optional(),
    doi: z.string().optional(),
    paperUrl: z.string().url().optional(),
    code: z.string().url().optional(),
    pdf: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    selected: z.boolean().default(false),
    order: z.number().default(0),
    abstract: z.string().optional(),
    note: z.string().optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    date: z.string(),
    title: z.string(),
    icon: z.string().optional(),
    href: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string().optional(),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    relatedPaper: z.string().optional(),
  }),
});

const researchThemes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/research-themes' }),
  schema: z.object({
    title: z.string(),
    icon: z.string().optional(),
    summary: z.string(),
    order: z.number().default(0),
    relatedPapers: z.array(z.string()).default([]),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    lang: z.enum(['en', 'zh']).default('en'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  publications,
  news,
  projects,
  'research-themes': researchThemes,
  notes,
};
