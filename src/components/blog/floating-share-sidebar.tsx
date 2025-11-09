import Link from 'next/link';

interface FloatingShareSidebarProps {
  postTitle: string;
  postUrl: string;
}

export function FloatingShareSidebar({ postTitle, postUrl }: FloatingShareSidebarProps) {
  return (
    <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-40 no-print">
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg p-3">
        <div className="flex flex-col gap-3">
          <span className="text-xs text-gray-500 text-center font-medium mb-1">Share</span>
          
          {/* Twitter/X Share */}
          <Link
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}&via=seventeenlabs`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-white hover:bg-black transition-all duration-200"
            aria-label="Share on X (Twitter)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </Link>

          {/* LinkedIn Share */}
          <Link
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-200"
            aria-label="Share on LinkedIn"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="group flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
            aria-label="Copy link"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>

          {/* Email Share */}
          <Link
            href={`mailto:?subject=${encodeURIComponent(postTitle)}&body=${encodeURIComponent(`I thought you might find this article interesting:\n\n${postTitle}\n\nRead it here: ${postUrl}`)}`}
            className="group flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
            aria-label="Share via email"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}