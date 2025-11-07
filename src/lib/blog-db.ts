import { supabase } from './supabase';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  image_alt?: string;
  category: string;
  tags: string[];
  author_name: string;
  author_email?: string;
  author_avatar?: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  published_at?: string;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  view_count: number;
  reading_time?: number;
  created_at: string;
  updated_at: string;
}

export type BlogPostMetadata = Omit<BlogPost, 'content'>;

export interface CreateBlogPostData {
  title: string;
  description: string;
  content: string;
  category?: string;
  tags?: string[];
  author_name?: string;
  featured?: boolean;
  featured_image?: string;
  image_alt?: string;
  meta_title?: string;
  meta_description?: string;
  status?: 'draft' | 'published';
}

// Select fields for metadata (excluding content)
const METADATA_SELECT = `
  id, slug, title, description, excerpt, featured_image, image_alt,
  category, tags, author_name, author_email, author_avatar, status,
  featured, published_at, meta_title, meta_description, canonical_url,
  view_count, reading_time, created_at, updated_at
`;

// Helper function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Helper function to generate excerpt
function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown formatting and get plain text
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Find the last complete word within the limit
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
}

// Get all published blog posts
export async function getAllPosts(): Promise<BlogPostMetadata[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(METADATA_SELECT)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data || [];
}

// Get a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  // Increment view count
  if (data) {
    await supabase
      .from('blog_posts')
      .update({ view_count: data.view_count + 1 })
      .eq('id', data.id);
  }

  return data;
}

// Get featured posts
export async function getFeaturedPosts(limit?: number): Promise<BlogPostMetadata[]> {
  let query = supabase
    .from('blog_posts')
    .select(METADATA_SELECT)
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }

  return data || [];
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<BlogPostMetadata[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(METADATA_SELECT)
    .eq('status', 'published')
    .eq('category', category)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }

  return data || [];
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPostMetadata[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(METADATA_SELECT)
    .eq('status', 'published')
    .contains('tags', [tag])
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts by tag:', error);
    return [];
  }

  return data || [];
}

// Search posts
export async function searchPosts(query: string): Promise<BlogPostMetadata[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(METADATA_SELECT)
    .eq('status', 'published')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error searching posts:', error);
    return [];
  }

  return data || [];
}

// Get all categories
export async function getAllCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('category')
    .eq('status', 'published')
    .not('category', 'is', null);

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  const categories = Array.from(new Set(data?.map(post => post.category) || []));
  return categories.filter(Boolean);
}

// Get all tags
export async function getAllTags(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('tags')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  const allTags = data?.flatMap(post => post.tags || []) || [];
  return Array.from(new Set(allTags)).filter(Boolean);
}

// Get related posts
export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPostMetadata[]> {
  // First get the current post to find its category and tags
  const currentPost = await supabase
    .from('blog_posts')
    .select('category, tags')
    .eq('slug', currentSlug)
    .single();

  if (!currentPost.data) return [];

  // Get posts from the same category or with similar tags
  const { data, error } = await supabase
    .from('blog_posts')
    .select(METADATA_SELECT)
    .eq('status', 'published')
    .neq('slug', currentSlug)
    .or(`category.eq.${currentPost.data.category},tags.cs.${JSON.stringify(currentPost.data.tags)}`)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }

  return data || [];
}

// Get recent posts
export async function getRecentPosts(limit: number = 5): Promise<BlogPostMetadata[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(METADATA_SELECT)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }

  return data || [];
}

// Create a new blog post
export async function createBlogPost(postData: CreateBlogPostData): Promise<BlogPost | null> {
  const readingTime = calculateReadingTime(postData.content);
  const excerpt = generateExcerpt(postData.content);
  
  const newPost = {
    ...postData,
    reading_time: readingTime,
    excerpt,
    published_at: postData.status === 'published' ? new Date().toISOString() : null,
    category: postData.category || 'General',
    tags: postData.tags || [],
    author_name: postData.author_name || 'SeventeenLabs',
    featured: postData.featured || false,
    status: postData.status || 'published',
  };

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([newPost])
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    return null;
  }

  return data;
}

// Update a blog post
export async function updateBlogPost(slug: string, updates: Partial<CreateBlogPostData>): Promise<BlogPost | null> {
  const updateData: any = { ...updates };
  
  if (updates.content) {
    updateData.reading_time = calculateReadingTime(updates.content);
    updateData.excerpt = generateExcerpt(updates.content);
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('slug', slug)
    .select()
    .single();

  if (error) {
    console.error('Error updating blog post:', error);
    return null;
  }

  return data;
}

// Delete a blog post
export async function deleteBlogPost(slug: string): Promise<boolean> {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('slug', slug);

  if (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }

  return true;
}