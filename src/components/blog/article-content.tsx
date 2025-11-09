import { ReactNode } from 'react';

interface ArticleContentProps {
  children: ReactNode;
}

export function ArticleContent({ children }: ArticleContentProps) {
  return (
    <article className="prose prose-xl max-w-none
      prose-headings:text-gray-900 
      prose-headings:font-bold 
      prose-headings:tracking-tight
      prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:leading-tight
      prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:leading-tight
      prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:leading-tight
      prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6
      prose-p:text-gray-700 
      prose-p:leading-relaxed 
      prose-p:mb-6
      prose-p:text-lg
      prose-a:text-blue-600 
      prose-a:no-underline 
      hover:prose-a:text-blue-700 
      hover:prose-a:underline
      prose-a:font-medium
      prose-strong:text-gray-900 
      prose-strong:font-bold
      prose-em:text-gray-700
      prose-blockquote:border-l-4 
      prose-blockquote:border-blue-200 
      prose-blockquote:bg-blue-50 
      prose-blockquote:p-6 
      prose-blockquote:rounded-r-lg 
      prose-blockquote:text-gray-700
      prose-blockquote:font-normal
      prose-blockquote:not-italic
      prose-blockquote:my-8
      prose-blockquote:text-lg
      prose-code:bg-gray-100 
      prose-code:text-gray-800 
      prose-code:px-2 
      prose-code:py-1 
      prose-code:rounded 
      prose-code:text-base
      prose-code:font-mono
      prose-pre:bg-gray-900 
      prose-pre:text-gray-100 
      prose-pre:p-6 
      prose-pre:rounded-xl 
      prose-pre:overflow-x-auto
      prose-pre:my-8
      prose-ul:space-y-3
      prose-ol:space-y-3
      prose-li:text-gray-700
      prose-li:leading-relaxed
      prose-li:text-lg
      prose-img:rounded-xl 
      prose-img:shadow-2xl
      prose-img:my-12
      prose-hr:border-gray-200 
      prose-hr:my-12
      prose-table:text-base
      prose-th:bg-gray-50
      prose-th:font-bold
      prose-th:text-gray-900
      prose-th:p-4
      prose-td:text-gray-700
      prose-td:p-4
      prose-thead:border-gray-200
      prose-tbody:border-gray-100"
    >
      {children}
    </article>
  );
}