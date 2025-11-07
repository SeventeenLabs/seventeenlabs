import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  featured?: boolean;
  image?: string;
  readingTime: string;
  content: string;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  featured?: boolean;
  image?: string;
  readingTime: string;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const readingTimeStats = readingTime(content);
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      author: data.author || '',
      tags: data.tags || [],
      category: data.category || '',
      featured: data.featured || false,
      image: data.image || '',
      readingTime: readingTimeStats.text,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): BlogPostMetadata[] {
  const slugs = getAllPostSlugs();
  
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      
      // Return metadata only (without content)
      const { content, ...metadata } = post;
      return metadata;
    })
    .filter((post): post is BlogPostMetadata => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  return posts;
}

export function getPostsByCategory(category: string): BlogPostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase());
}

export function getPostsByTag(tag: string): BlogPostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => 
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  );
}

export function getFeaturedPosts(limit?: number): BlogPostMetadata[] {
  const allPosts = getAllPosts();
  const featured = allPosts.filter((post) => post.featured);
  return limit ? featured.slice(0, limit) : featured;
}

export function getRecentPosts(limit = 5): BlogPostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  return categories.filter(Boolean);
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));
  return tags.filter(Boolean);
}

export function searchPosts(query: string): BlogPostMetadata[] {
  const allPosts = getAllPosts();
  const lowercaseQuery = query.toLowerCase();
  
  return allPosts.filter((post) =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.category.toLowerCase().includes(lowercaseQuery)
  );
}

export function getRelatedPosts(
  currentSlug: string,
  limit = 3
): BlogPostMetadata[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug);
  
  // Score posts based on shared tags and category
  const scoredPosts = allPosts.map((post) => {
    let score = 0;
    
    // Same category gets higher score
    if (post.category === currentPost.category) {
      score += 3;
    }
    
    // Shared tags get points
    const sharedTags = post.tags.filter((tag) =>
      currentPost.tags.includes(tag)
    );
    score += sharedTags.length;
    
    return { ...post, score };
  });
  
  // Sort by score and return top results
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score, ...post }) => post);
}