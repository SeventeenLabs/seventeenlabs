import { BlogPostMetadata } from '@/lib/notion-blog';
import { BlogCard } from './blog-card';

interface BlogListProps {
  posts: BlogPostMetadata[];
  title?: string;
  showEmptyState?: boolean;
}

export function BlogList({ posts, title, showEmptyState = true }: BlogListProps) {
  if (posts.length === 0 && showEmptyState) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
          No posts found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Check back later for new content.
        </p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}