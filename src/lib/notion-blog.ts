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
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID;

const notion = NOTION_TOKEN ? new Client({
  auth: NOTION_TOKEN,
}) : null;

const n2m = notion ? new NotionToMarkdown({ notionClient: notion }) : null;

// Helper function to extract properties from Notion page
function extractPageProperties(page: any): BlogPostMetadata {
  const availableProps = Object.keys(page.properties);
  
  const properties = page.properties;
  
  const extracted = {
    id: page.id,
    slug: properties.Slug?.rich_text?.[0]?.text?.content || 
          properties.Title?.title?.[0]?.text?.content?.toLowerCase().replace(/\s+/g, '-') || '',
    title: properties.Title?.title?.[0]?.text?.content || '',
    description: properties.Description?.rich_text?.[0]?.text?.content || '',
    author_name: properties.Author?.people?.[0]?.name || 'SeventeenLabs',
    category: properties.Category?.select?.name || 'General',
    tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    featured_image: (() => {
      // Try multiple possible property names
      const possibleNames = ['Thumbnail', 'Featured Image', 'Image', 'Cover'];
      let featuredImageProp = null;
      let propertyName = '';
      
      for (const name of possibleNames) {
        if (properties[name]) {
          featuredImageProp = properties[name];
          propertyName = name;
          break;
        }
      }
      
      if (!featuredImageProp) {
        return undefined;
      }
      
      // Handle Files & Media property type
      if (featuredImageProp.type === 'files') {
        const files = featuredImageProp.files || [];
        
        if (files.length === 0) {
          return undefined;
        }
        
        const file = files[0];
        
        // Check for external URL first (pasted URLs)
        if (file.external?.url) {
          // If it's a Notion/AWS URL, proxy it to avoid timeouts
          if (file.external.url.includes('amazonaws.com') || file.external.url.includes('notion.so')) {
            const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(file.external.url)}`;
            return proxyUrl;
            return proxyUrl;
          }
          return file.external.url;
        }
        
        // Check for uploaded file URL
        if (file.file?.url) {
          // If it's a Notion/AWS URL, proxy it to avoid timeouts
          if (file.file.url.includes('amazonaws.com') || file.file.url.includes('notion.so')) {
            const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(file.file.url)}`;
            return proxyUrl;
            return proxyUrl;
          }
          return file.file.url;
        }
        
        console.log('❌ No valid URL in file object');
        return undefined;
      }
      
      // Handle URL property type
      if (featuredImageProp.type === 'url') {
        console.log('� URL property value:', featuredImageProp.url);
        return featuredImageProp.url || undefined;
      }
      
      // Handle Rich Text property type (fallback)
      if (featuredImageProp.type === 'rich_text') {
        const richText = featuredImageProp.rich_text || [];
        console.log('📝 Rich text blocks:', richText.length);
        
        for (const block of richText) {
          const content = block?.text?.content;
          if (content && (content.startsWith('http://') || content.startsWith('https://'))) {
            console.log('✅ Found URL in rich text:', content);
            // If it's a Notion/AWS URL, proxy it to avoid timeouts
            if (content.includes('amazonaws.com') || content.includes('notion.so')) {
              const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(content)}`;
              console.log('🔄 Using image proxy for rich text:', proxyUrl);
              return proxyUrl;
            }
            return content;
          }
        }
        
        return undefined;
      }
      
      return undefined;
    })(),
    image_alt: (() => {
      const possibleAltNames = ['Image Alt', 'image_alt', 'ImageAlt', 'Alt Text', 'Alt'];
      for (const name of possibleAltNames) {
        const altProp = properties[name]?.rich_text?.[0]?.text?.content;
        if (altProp) {
          return altProp;
        }
      }
      return undefined;
    })(),
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
  
  return extracted;
}

// Calculate reading time from markdown content
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Simple fetch wrapper for Notion API
async function queryDatabase(filter?: any, sorts?: any) {
  if (!DATABASE_ID || !NOTION_TOKEN) {
    return { results: [] };
  }
  
  // First, let's check the database schema to see available properties
  try {
    const databaseInfo = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
    });
    
    if (databaseInfo.ok) {
      const dbSchema = await databaseInfo.json();
    }
  } catch (error) {
    // Silently continue if schema fetch fails
  }
  
  try {
    const requestBody = {
      filter,
      sorts,
    };
    
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Notion API error response:', errorText);
      throw new Error(`Notion API error: ${response.status} ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    
    return jsonResponse;
  } catch (error) {
    console.error('❌ Error querying Notion database:', error);
    return { results: [] };
  }
}

// Get page content
async function getPageContent(pageId: string): Promise<string> {
  if (!n2m) {
    return '';
  }
  
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
  if (!notion || !DATABASE_ID) {
    return [];
  }
  
  try {
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
    
    const posts = response.results.map((page: any) => extractPageProperties(page));
    
    return posts;
  } catch (error) {
    console.error('❌ Error fetching posts from Notion:', error);
    return [];
  }
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
  if (!notion || !DATABASE_ID) {
    console.log('⚠️ Notion not configured - cannot fetch post by slug');
    return null;
  }
  
  console.log(`🔍 Fetching post by slug: "${slug}"`);
  
  try {
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

    const finalPost = {
      ...metadata,
      content,
      reading_time,
    };
    
    return finalPost;
  } catch (error) {
    console.error(`❌ Error fetching post with slug "${slug}":`, error);
    return null;
  }
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

// Get all categories from actual posts
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))];
  return categories.sort();
}

// Get all tags from actual posts
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = [...new Set(posts.flatMap((post) => post.tags || []).filter(Boolean))];
  return tags.sort();
}

// Get all unique authors from actual posts
export async function getAllAuthors(): Promise<string[]> {
  const posts = await getAllPosts();
  const authors = [...new Set(posts.map((post) => post.author_name).filter(Boolean))];
  return authors.sort();
}

// Get posts by a specific author
export async function getPostsByAuthor(authorName: string): Promise<BlogPostMetadata[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => 
    post.author_name.toLowerCase() === authorName.toLowerCase()
  );
}

// Get author slug from name
export function getAuthorSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

// Get author name from slug
export async function getAuthorBySlug(slug: string): Promise<string | null> {
  const authors = await getAllAuthors();
  return authors.find((author) => getAuthorSlug(author) === slug) || null;
}

// Revalidate all blog data caches
export async function revalidateBlogCache(): Promise<void> {
  revalidateTag('blog-posts', 'max');
}