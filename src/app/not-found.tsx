import Link from "next/link";

// Popular pages to help users find what they need
const popularPages = [
  { href: "/", label: "Homepage" },
  { href: "/ai-consulting", label: "AI Consulting" },
  { href: "/ai-audit", label: "AI Audit" },
  { href: "/ai-development", label: "AI Development" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
];

// Quick actions for common user intents
const quickActions = [
  {
    href: "/ai-consulting",
    title: "Get Started with AI",
    description: "Book a free consultation call",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    href: "/blog",
    title: "Read Our Blog",
    description: "Latest insights on AI automation",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    href: "/about#contact",
    title: "Contact Us",
    description: "We're here to help",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6">
          <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </div>
        <p className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-3">
          404 – Page not found
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Oops! This page doesn&apos;t exist
        </h1>
        <p className="max-w-xl text-base sm:text-lg text-gray-600 mb-8">
          The page you&apos;re looking for may have been moved, renamed, or deleted. 
          Don&apos;t worry—let&apos;s help you find what you need.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to homepage
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Visit the blog
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-6">
          Here are some helpful links
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="text-blue-600 mb-3">{action.icon}</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Pages */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-6">
          Popular pages
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {popularPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              {page.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Search Suggestion */}
      <div className="max-w-2xl mx-auto px-4 pb-16 text-center">
        <p className="text-gray-600">
          Still can&apos;t find what you&apos;re looking for?{" "}
          <Link href="/about#contact" className="text-blue-600 hover:underline font-medium">
            Contact our team
          </Link>{" "}
          and we&apos;ll help you out.
        </p>
      </div>
    </main>
  );
}
