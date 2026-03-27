---
// src/pages/rss.xml.ts
// Feed RSS per HablaSmart — compatibile con tutti i lettori RSS
---
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'HablaSmart — Comunicazione, Persuasione e AI',
    description: 'Blog italiano su comunicazione comportamentale, psicologia della persuasione, marketing e AI applicata ai contenuti.',
    site: context.site!,
    items: posts.map(post => ({
      title:       post.data.title,
      description: post.data.description,
      pubDate:     post.data.pubDate,
      link:        `/articoli/${post.slug}/`,
      categories:  [post.data.category, ...(post.data.tags ?? [])],
      author:      post.data.author ?? 'HablaSmart',
    })),
    customData: `<language>it-IT</language>`,
    stylesheet: '/rss/styles.xsl',
  });
}
