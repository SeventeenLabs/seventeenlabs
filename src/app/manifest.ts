import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SeventeenLabs - AI Production Pipeline',
    short_name: 'SeventeenLabs',
    description: 'AI production pipeline for planning scenes, locking continuity, and generating consistent shots for films, pilots, trailers, and series.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050506',
    theme_color: '#c8ff00',
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
        name: 'Request early access',
        short_name: 'Early access',
        description: 'Apply for early access to SeventeenLabs',
        url: '/#early-access',
      },
      {
        name: 'Open app',
        short_name: 'App',
        description: 'Open the SeventeenLabs studio app',
        url: '/app',
      },
      {
        name: 'Blog',
        short_name: 'Blog',
        description: 'Read notes on AI filmmaking and production workflows',
        url: '/blog',
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
