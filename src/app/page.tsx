import { redirect } from 'next/navigation';

export default function RootPage() {
  // Root page now redirects to English locale without /en prefix
  // This reduces redirect overhead and improves SEO
  redirect('/en');
}

// TODO: Consider making / serve content directly instead of redirecting
// This would eliminate the redirect overhead and improve Core Web Vitals