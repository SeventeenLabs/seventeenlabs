import Link from 'next/link';
import { BlogPost } from '@/lib/notion-blog';

interface MobileHeaderBarProps {
  post: BlogPost;
  postUrl: string;
  showTitle: boolean;
}

export function MobileHeaderBar({ post, postUrl, showTitle }: MobileHeaderBarProps) {
  return (
    <div className={`sm:hidden fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${
      showTitle 
        ? 'opacity-100 translate-y-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg' 
        : 'opacity-0 -translate-y-full pointer-events-none bg-transparent'
    }`}>
      <div className="px-4 py-2">
        {/* Article Info */}
        <div className="flex items-center gap-2.5 mb-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            {post.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.reading_time} min read
          </div>
        </div>
        
        {/* Article Title */}
        <h1 className="text-sm font-semibold text-gray-900 leading-tight mb-2 line-clamp-2">
          {post.title}
        </h1>
        
        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {/* Twitter Share */}
            <Link
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}&via=seventeenlabs`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-900 text-gray-600 hover:text-white transition-all duration-200"
              aria-label="Share on X"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>

            {/* Copy Link */}
            <button
              onClick={(e) => {
                navigator.clipboard.writeText(postUrl);
                const button = e.currentTarget as HTMLButtonElement;
                if (button) {
                  const originalHTML = button.innerHTML;
                  button.innerHTML = `
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  `;
                  button.classList.add('text-white', 'bg-green-600');
                  setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.classList.remove('text-white', 'bg-green-600');
                  }, 2000);
                }
              }}
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-200"
              aria-label="Copy link"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}