import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const POSTS_PER_PAGE = 10;

export async function getAllPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog');
  return posts.sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
}

export function getSlug(post: CollectionEntry<'blog'>): string {
  return post.id.split('/').pop()?.replace(/\.md$/, '') || '';
}

export function getTotalPages(count: number, perPage = POSTS_PER_PAGE): number {
  return Math.max(1, Math.ceil(count / perPage));
}

export function getPostsPage(
  posts: CollectionEntry<'blog'>[],
  page: number,
  perPage = POSTS_PER_PAGE
): CollectionEntry<'blog'>[] {
  const start = (page - 1) * perPage;
  return posts.slice(start, start + perPage);
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
