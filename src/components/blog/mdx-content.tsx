import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';
import Link from 'next/link';

// Custom components for MDX
const components = {
  // Headings
  h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-8 leading-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8 leading-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-6 leading-tight" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h5 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 mt-4" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h6 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2 mt-4" {...props}>
      {children}
    </h6>
  ),

  // Paragraphs and text
  p: ({ children, ...props }: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),

  // Links
  a: ({ href, children, ...props }: React.HTMLProps<HTMLAnchorElement>) => {
    // Internal links
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
    
    // External links
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

  // Lists
  ul: ({ children, ...props }: React.HTMLProps<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLProps<HTMLOListElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type, ...restProps } = props;
    return (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300" {...restProps}>
        {children}
      </ol>
    );
  },
  li: ({ children, ...props }: React.HTMLProps<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote 
      className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 py-2 mb-4 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code
  code: ({ children, ...props }: React.HTMLProps<HTMLElement>) => (
    <code 
      className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.HTMLProps<HTMLPreElement>) => (
    <pre 
      className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 mb-4 overflow-x-auto text-gray-100 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),

  // Tables
  table: ({ children, ...props }: React.HTMLProps<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: React.HTMLProps<HTMLTableSectionElement>) => (
    <thead className="bg-gray-100 dark:bg-gray-800" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: React.HTMLProps<HTMLTableSectionElement>) => (
    <tbody {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: React.HTMLProps<HTMLTableRowElement>) => (
    <tr className="border-b border-gray-200 dark:border-gray-700" {...props}>
      {children}
    </tr>
  ),
  td: ({ children, ...props }: React.HTMLProps<HTMLTableCellElement>) => (
    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </td>
  ),
  th: ({ children, ...props }: React.HTMLProps<HTMLTableCellElement>) => (
    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </th>
  ),

  // Horizontal rule
  hr: ({ ...props }: React.HTMLProps<HTMLHRElement>) => (
    <hr className="my-8 border-gray-300 dark:border-gray-600" {...props} />
  ),

  // Images
  img: ({ src, alt, width, height }: React.HTMLProps<HTMLImageElement>) => {
    if (!src) return null;
    
    return (
      <div className="my-6">
        <Image
          src={src}
          alt={alt || ''}
          width={typeof width === 'string' ? parseInt(width) : width || 800}
          height={typeof height === 'string' ? parseInt(height) : height || 400}
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
};

interface MDXContentProps {
  children: React.ReactNode;
  className?: string;
}

export function MDXContent({ children, className = '' }: MDXContentProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <MDXProvider components={components}>
        {children}
      </MDXProvider>
    </div>
  );
}

export default MDXContent;