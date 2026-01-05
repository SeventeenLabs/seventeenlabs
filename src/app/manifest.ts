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
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/homepage.png',
        sizes: '1280x720',
        type: 'image/png',
        label: 'SeventeenLabs Homepage',
      },
    ],
    shortcuts: [
      {
        name: 'Blog',
        short_name: 'Blog',
        description: 'Read our latest articles on AI automation',
        url: '/blog',
        icons: [{ src: '/icons/blog-shortcut.png', sizes: '96x96' }],
      },
      {
        name: 'Services',
        short_name: 'Services',
        description: 'Explore our AI automation services',
        url: '/ai-consulting',
        icons: [{ src: '/icons/services-shortcut.png', sizes: '96x96' }],
      },
      {
        name: 'Contact',
        short_name: 'Contact',
        description: 'Get in touch with us',
        url: '/about#contact',
        icons: [{ src: '/icons/contact-shortcut.png', sizes: '96x96' }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
