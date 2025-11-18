import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Image from 'next/image';
import Link from 'next/link';

// Custom MDX components
const mdxComponents = {
  // Images
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src || typeof src !== 'string') return null;
    
    return (
      <div className="my-6">
        <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={400}
          className="rounded-lg shadow-lg w-full h-auto"
        />
        {alt && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 italic">
            {alt}
          </p>
        )}
      </div>
    );
  },
  
  // Links
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href && href.startsWith('/')) {
      return (
        <Link 
          href={href} 
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium"
          {...props}
        >
          {children}
        </Link>
      );
    }
    
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium"
        {...props}
      >
        {children}
      </a>
    );
  },
  
  // Headings
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      role="heading"
      aria-level={2}
      className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-8 leading-tight"
      {...props}
    >
      {children}
    </h2>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8 leading-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-6 leading-tight" {...props}>
      {children}
    </h3>
  ),
  
  // Paragraphs
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  
  // Code
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code 
      className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre 
      className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 mb-4 overflow-x-auto text-gray-100 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  
  // Blockquotes
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote 
      className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 py-2 mb-4 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),
  
  // Lists
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ol>
  ),
};

interface MDXContentProps {
  content: string;
}

export async function MDXContent({ content }: MDXContentProps) {
  return (
    <MDXRemote
      source={content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight],
        },
      }}
      components={mdxComponents}
    />
  );
}