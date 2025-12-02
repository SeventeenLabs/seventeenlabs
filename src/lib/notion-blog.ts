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
  console.log('🔧 Extracting properties from page:', page.id);
  const availableProps = Object.keys(page.properties);
  console.log('🔧 Available property names:', availableProps);
  
  // Check for Featured Image property variations
  const featuredImageVariations = availableProps.filter(prop => 
    prop.toLowerCase().includes('featured') || 
    prop.toLowerCase().includes('image') ||
    prop.toLowerCase().includes('cover')
  );
  console.log('🖼️ Potential image property names found:', featuredImageVariations);
  
  console.log('🔧 Page properties:', JSON.stringify(page.properties, null, 2));
  
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
        console.log('❌ No image property found. Tried:', possibleNames);
        console.log('📝 Available properties:', Object.keys(properties));
        return undefined;
      }
      
      console.log('✅ Found image property:', propertyName);
      
      console.log('🖼️ Featured Image property:', JSON.stringify(featuredImageProp, null, 2));
      console.log('🔍 Property type:', featuredImageProp.type);
      
      // Handle Files & Media property type
      if (featuredImageProp.type === 'files') {
        const files = featuredImageProp.files || [];
        console.log('📁 Files count:', files.length);
        
        if (files.length === 0) {
          console.log('❌ No files in Featured Image property');
          return undefined;
        }
        
        const file = files[0];
        console.log('📄 File data:', JSON.stringify(file, null, 2));
        
        // Check for external URL first (pasted URLs)
        if (file.external?.url) {
          console.log('✅ Found external URL:', file.external.url);
          // If it's a Notion/AWS URL, proxy it to avoid timeouts
          if (file.external.url.includes('amazonaws.com') || file.external.url.includes('notion.so')) {
            const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(file.external.url)}`;
            console.log('🔄 Using image proxy:', proxyUrl);
            return proxyUrl;
          }
          return file.external.url;
        }
        
        // Check for uploaded file URL
        if (file.file?.url) {
          console.log('✅ Found uploaded file URL:', file.file.url);
          // If it's a Notion/AWS URL, proxy it to avoid timeouts
          if (file.file.url.includes('amazonaws.com') || file.file.url.includes('notion.so')) {
            const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(file.file.url)}`;
            console.log('🔄 Using image proxy:', proxyUrl);
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
        
        console.log('❌ No URLs found in rich text blocks');
        return undefined;
      }
      
      console.log('❌ Unsupported property type:', featuredImageProp.type);
      return undefined;
    })(),
    image_alt: (() => {
      const possibleAltNames = ['Image Alt', 'image_alt', 'ImageAlt', 'Alt Text', 'Alt'];
      for (const name of possibleAltNames) {
        const altProp = properties[name]?.rich_text?.[0]?.text?.content;
        if (altProp) {
          console.log('🏷️ Found image alt with property:', name, '=', altProp);
          return altProp;
        }
      }
      console.log('🏷️ No image alt found with any of these names:', possibleAltNames);
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
  
  console.log('🔧 Extracted properties result:', JSON.stringify(extracted, null, 2));
  
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
    console.log('⚠️ Notion database ID or token not configured');
    return { results: [] };
  }
  
  console.log('🚀 Querying Notion database:', DATABASE_ID);
  console.log('🔍 Filter:', JSON.stringify(filter, null, 2));
  console.log('📊 Sorts:', JSON.stringify(sorts, null, 2));
  
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
      console.log('🗂️ Database schema properties:', JSON.stringify(dbSchema.properties, null, 2));
    }
  } catch (error) {
    console.log('⚠️ Could not fetch database schema:', error);
  }
  
  try {
    const requestBody = {
      filter,
      sorts,
    };
    
    console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('📥 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Notion API error response:', errorText);
      throw new Error(`Notion API error: ${response.status} ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    console.log('✅ Successful Notion API response:', JSON.stringify(jsonResponse, null, 2));
    
    return jsonResponse;
  } catch (error) {
    console.error('❌ Error querying Notion database:', error);
    return { results: [] };
  }
}

// Get page content
async function getPageContent(pageId: string): Promise<string> {
  if (!n2m) {
    console.log('⚠️ Notion markdown converter not configured');
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
    console.log('⚠️ Notion not configured - returning empty posts array');
    return [];
  }
  
  console.log('🔍 Fetching all published posts from Notion...');
  
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
    console.log(`📊 Found ${response.results.length} published posts`);
    console.log('📝 Raw Notion response:', JSON.stringify(response, null, 2));
    
    const posts = response.results.map((page: any) => extractPageProperties(page));
    console.log('✅ Processed posts:', JSON.stringify(posts, null, 2));
    
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
    console.log(`📊 Found ${response.results.length} posts matching slug "${slug}"`);
    console.log('📝 Raw Notion response for slug query:', JSON.stringify(response, null, 2));
  
  if (response.results.length === 0) {
    console.log(`❌ No post found with slug: "${slug}"`);
    return null;
  }

    const page = response.results[0];
    console.log('📄 Processing page:', JSON.stringify(page, null, 2));
    
    const metadata = extractPageProperties(page);
    console.log('📋 Extracted metadata:', JSON.stringify(metadata, null, 2));
    
    const content = await getPageContent(page.id);
    console.log('📖 Content length:', content.length, 'characters');
    console.log('📖 Content preview:', content.substring(0, 200) + '...');
    
    const reading_time = calculateReadingTime(content);
    console.log('⏱️ Calculated reading time:', reading_time, 'minutes');

    const finalPost = {
      ...metadata,
      content,
      reading_time,
    };
    
    console.log('✅ Final processed post:', JSON.stringify(finalPost, null, 2));
    
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