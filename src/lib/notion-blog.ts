import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { unstable_cache } from 'next/cache';
import { revalidateTag } from 'next/cache';

// Types matching your current blog system
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author_name: string;
  category: string;
  tags: string[];
  featured_image?: string;
  image_alt?: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  published_at: string;
  created_at: string;
  updated_at: string;
  view_count: number;
  reading_time: number;
  meta_title?: string;
  meta_description?: string;
}

export type BlogPostMetadata = Omit<BlogPost, 'content'>;

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });
const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID!;

// Helper function to extract properties from Notion page
function extractPageProperties(page: any): BlogPostMetadata {
  const properties = page.properties;
  
  return {
    id: page.id,
    slug: properties.Slug?.rich_text?.[0]?.text?.content || 
          properties.Title?.title?.[0]?.text?.content?.toLowerCase().replace(/\s+/g, '-') || '',
    title: properties.Title?.title?.[0]?.text?.content || '',
    description: properties.Description?.rich_text?.[0]?.text?.content || '',
    author_name: properties.Author?.people?.[0]?.name || 'SeventeenLabs',
    category: properties.Category?.select?.name || 'General',
    tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    featured_image: properties['Featured Image']?.files?.[0]?.file?.url || 
                   properties['Featured Image']?.files?.[0]?.external?.url,
    image_alt: properties['Image Alt']?.rich_text?.[0]?.text?.content,
    featured: properties.Featured?.checkbox || false,
    status: (properties.Status?.select?.name?.toLowerCase() as 'draft' | 'published' | 'archived') || 'draft',
    published_at: properties['Published Date']?.date?.start || page.created_time,
    created_at: page.created_time,
    updated_at: page.last_edited_time,
    view_count: 0, // You'd need to track this separately
    reading_time: 0, // Calculated from content
    meta_title: properties['Meta Title']?.rich_text?.[0]?.text?.content,
    meta_description: properties['Meta Description']?.rich_text?.[0]?.text?.content,
  };
}

// Calculate reading time from markdown content
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Simple fetch wrapper for Notion API
async function queryDatabase(filter?: any, sorts?: any) {
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        filter,
        sorts,
      }),
    });

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error querying Notion database:', error);
    return { results: [] };
  }
}

// Get page content
async function getPageContent(pageId: string): Promise<string> {
  try {
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    return n2m.toMarkdownString(mdBlocks).parent;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return '';
  }
}

// Get all published posts (cached)
async function _getAllPosts(): Promise<BlogPostMetadata[]> {
  const filter = {
    property: 'Status',
    select: {
      equals: 'Published'
    }
  };

  const sorts = [
    {
      property: 'Published Date',
      direction: 'descending'
    }
  ];

  const response = await queryDatabase(filter, sorts);
  return response.results.map((page: any) => extractPageProperties(page));
}

export const getAllPosts = unstable_cache(
  _getAllPosts,
  ['notion-blog-all-posts'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['blog-posts']
  }
);

// Get single post by slug with content (cached)
async function _getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filter = {
    and: [
      {
        property: 'Slug',
        rich_text: {
          equals: slug
        }
      },
      {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      }
    ]
  };

  const response = await queryDatabase(filter);
  
  if (response.results.length === 0) {
    return null;
  }

  const page = response.results[0];
  const metadata = extractPageProperties(page);
  const content = await getPageContent(page.id);
  const reading_time = calculateReadingTime(content);

  return {
    ...metadata,
    content,
    reading_time,
  };
}

export const getPostBySlug = unstable_cache(
  _getPostBySlug,
  ['notion-blog-post-by-slug'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['blog-posts']
  }
);

// Get featured posts (cached)
async function _getFeaturedPosts(limit: number = 3): Promise<BlogPostMetadata[]> {
  const filter = {
    and: [
      {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      },
      {
        property: 'Featured',
        checkbox: {
          equals: true
        }
      }
    ]
  };

  const sorts = [
    {
      property: 'Published Date',
      direction: 'descending'
    }
  ];

  const response = await queryDatabase(filter, sorts);
  return response.results.slice(0, limit).map((page: any) => extractPageProperties(page));
}

export const getFeaturedPosts = unstable_cache(
  _getFeaturedPosts,
  ['notion-blog-featured-posts'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['blog-posts']
  }
);

// Get posts by category
export async function getPostsByCategory(category: string): Promise<BlogPostMetadata[]> {
  const filter = {
    and: [
      {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      },
      {
        property: 'Category',
        select: {
          equals: category
        }
      }
    ]
  };

  const sorts = [
    {
      property: 'Published Date',
      direction: 'descending'
    }
  ];

  const response = await queryDatabase(filter, sorts);
  return response.results.map((page: any) => extractPageProperties(page));
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPostMetadata[]> {
  const filter = {
    and: [
      {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      },
      {
        property: 'Tags',
        multi_select: {
          contains: tag
        }
      }
    ]
  };

  const sorts = [
    {
      property: 'Published Date',
      direction: 'descending'
    }
  ];

  const response = await queryDatabase(filter, sorts);
  return response.results.map((page: any) => extractPageProperties(page));
}

// Search posts
export async function searchPosts(query: string): Promise<BlogPostMetadata[]> {
  const filter = {
    and: [
      {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      },
      {
        or: [
          {
            property: 'Title',
            title: {
              contains: query
            }
          },
          {
            property: 'Description',
            rich_text: {
              contains: query
            }
          }
        ]
      }
    ]
  };

  const response = await queryDatabase(filter);
  return response.results.map((page: any) => extractPageProperties(page));
}

// Get related posts (by category) - cached
async function _getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPostMetadata[]> {
  // First get the current post to find its category
  const currentFilter = {
    property: 'Slug',
    rich_text: {
      equals: currentSlug
    }
  };

  const currentPostResponse = await queryDatabase(currentFilter);
  
  if (currentPostResponse.results.length === 0) return [];
  
  const currentPost = extractPageProperties(currentPostResponse.results[0]);

  const filter = {
    and: [
      {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      },
      {
        property: 'Slug',
        rich_text: {
          does_not_equal: currentSlug
        }
      },
      {
        property: 'Category',
        select: {
          equals: currentPost.category
        }
      }
    ]
  };

  const response = await queryDatabase(filter);
  return response.results.slice(0, limit).map((page: any) => extractPageProperties(page));
}

export const getRelatedPosts = unstable_cache(
  _getRelatedPosts,
  ['notion-blog-related-posts'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['blog-posts']
  }
);

// Get all categories (simplified - you'll need to maintain this manually or fetch from database properties)
export async function getAllCategories(): Promise<string[]> {
  // For now, return common categories. 
  // In a full implementation, you'd fetch this from the database schema
  return ['AI Automation', 'Automation Tutorials', 'Business Optimization', 'AI & Marketing', 'Productivity'];
}

// Get all tags (simplified - you'll need to maintain this manually or fetch from database properties)
export async function getAllTags(): Promise<string[]> {
  // For now, return common tags.
  // In a full implementation, you'd fetch this from the database schema
  return ['AI', 'automation', 'workflow', 'n8n', 'productivity', 'business transformation', 'no-code', 'integration'];
}

// Revalidate all blog data caches
export async function revalidateBlogCache(): Promise<void> {
  revalidateTag('blog-posts');
}