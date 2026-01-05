import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SeventeenLabs - AI Automation Agency',
    short_name: 'SeventeenLabs',
    description: 'AI automation agency specializing in custom workflow automation, intelligent process optimization, and scalable automation solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    dir: 'ltr',
    categories: ['business', 'productivity', 'technology'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/logo_dark.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Blog',
        short_name: 'Blog',
        description: 'Read our latest articles on AI automation',
        url: '/blog',
      },
      {
        name: 'Services',
        short_name: 'Services',
        description: 'Explore our AI automation services',
        url: '/services/ai-consulting',
      },
      {
        name: 'Contact',
        short_name: 'Contact',
        description: 'Get in touch with us',
        url: '/about#contact',
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
