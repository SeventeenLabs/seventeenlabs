import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/notion-blog';

interface BlogHeaderProps {
  post: BlogPost;
  showTitle: boolean;
}

export function BlogHeader({ post, showTitle }: BlogHeaderProps) {
  const homeHref = '/';
  const blogHref = '/blog';
  const contactHref = `${homeHref}#contact`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      showTitle 
        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      {/* Main Header Row */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left Section */}
          <div className="flex items-center gap-6 flex-1">
            {/* Mobile Back Button */}
            <Link 
              href={blogHref} 
              className="sm:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-200"
              aria-label="Back to blog"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>

            {/* Logo */}
            <Link 
              href={homeHref} 
              className="group flex items-center" 
              aria-label="SeventeenLabs Homepage"
            >
              <Image
                src="/logo_dark.png"
                alt="SeventeenLabs"
                width={180}
                height={42}
                className="w-[140px] sm:w-[160px] lg:w-[180px] h-auto transition-all duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Article Title Section */}
            <div className={`hidden lg:flex items-center gap-4 flex-1 min-w-0 transition-all duration-500 ease-out ${
              showTitle ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
            }`}>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.reading_time} min read
                  </div>
                </div>
                <h1 className="text-lg font-semibold text-gray-900 truncate leading-tight">
                  {post.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden sm:flex items-center gap-2">
              <Link 
                href={blogHref} 
                className="group flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>All Articles</span>
              </Link>
              
              <Link 
                href={contactHref} 
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all duration-200"
              >
                <span>Contact</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </nav>

          </div>
        </div>
      </div>
    </header>
  );
}