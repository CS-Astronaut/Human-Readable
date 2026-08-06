import { getAllPosts, getSlug } from '../lib/posts';
import { getImage } from 'astro:assets';

export const prerender = true;

export async function GET() {
  const posts = await getAllPosts();

  const index = await Promise.all(
    posts.map(async (post) => {
      const cover = post.data.cover
        ? await getImage({
            src: post.data.cover,
            widths: [400, 800],
            format: 'webp',
          })
        : null;

      return {
        title: post.data.title,
        slug: getSlug(post),
        description: post.data.description,
        tags: post.data.tags ?? [],
        pubDate: new Date(post.data.pubDate).toISOString(),
        lang: post.data.lang ?? 'en',
        cover: cover ? cover.src : null,
        coverSrcSet: cover ? cover.srcSet.attribute : null,
      };
    })
  );

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
