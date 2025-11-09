import Link from 'next/link';

export function NewsletterCTA() {
  return (
    <div className="mt-12 p-8 bg-gray-50 rounded-xl border border-gray-200">
      <div className="max-w-md mx-auto text-center">
        <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Stay Updated with AI Insights
        </h3>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Get weekly insights on AI automation, workflow optimization, and business transformation delivered to your inbox.
        </p>
        <form 
          className="flex flex-col sm:flex-row gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: Implement newsletter subscription
            console.log('Newsletter subscription placeholder');
          }}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none bg-white text-sm placeholder-gray-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 whitespace-nowrap text-sm"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          No spam, unsubscribe anytime. Read our{' '}
          <Link href="/privacy" className="text-gray-900 hover:underline font-medium">
            privacy policy
          </Link>
        </p>
      </div>
    </div>
  );
}