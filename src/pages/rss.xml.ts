import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '~/lib/blog';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: 'Zhiqiang He · Blog',
    description: 'Notes on reinforcement learning, research, and getting agents to work outside the simulator.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      categories: p.data.tags,
      link: `/blog/${p.id}/`,
    })),
  });
}
