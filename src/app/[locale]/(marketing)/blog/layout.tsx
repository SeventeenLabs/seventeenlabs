import { ReactNode } from 'react';
import Link from 'next/link';

export default function BlogLayout({ 
  children,
  params 
}: { 
  children: ReactNode;
  params?: { locale?: string };
}) {
  const locale = params?.locale || 'en';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const rssUrl = locale === 'de' ? `${baseUrl}/de/rss` : `${baseUrl}/rss`;
  
  return (
    <>
      {/* RSS Feed Discovery */}
      <link 
        rel="alternate" 
        type="application/rss+xml" 
        title={locale === 'de' 
          ? "SeventeenLabs KI-Automatisierung Blog RSS Feed" 
          : "SeventeenLabs AI Automation Blog RSS Feed"
        }
        href={rssUrl}
      />
      
      {/* Blog-specific preconnects for performance */}
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      
      {children}
    </>
  );
}
