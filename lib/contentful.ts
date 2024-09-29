import { createClient, EntrySkeletonType } from 'contentful';
import { Document } from '@contentful/rich-text-types';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

interface BlogPostFields {
  title: string;
  content: Document;
  excerpt?: string;
}

interface BlogPost extends EntrySkeletonType<BlogPostFields> {}

export interface BlogPostSummary {
  id: string;
  title: string;
  excerpt: string;
}

export async function getBlogPost(id: string): Promise<BlogPostFields | null> {
  try {
    const entry = await client.getEntry<BlogPost>(id);
    return entry.fields;
  } catch (error) {
    console.error('Chyba při načítání dat z Contentful:', error);
    return null;
  }
}

export async function getAllBlogPostIds(): Promise<string[]> {
  const entries = await client.getEntries<BlogPost>({
    content_type: 'blogPost',
  });
  return entries.items.map((item) => item.sys.id);
}

export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  const entries = await client.getEntries<BlogPost>({
    content_type: 'blogPost',
  });
  
  return entries.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    excerpt: item.fields.excerpt || '',
  }));
}
