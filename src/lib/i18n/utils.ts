import { Locale } from './config';

/**
 * Get the URL path for a given locale and path
 * English is at root, German has /de prefix
 */
export function getLocalizedPath(locale: Locale, path: string = ''): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  if (locale === 'de') {
    return `/de${cleanPath}`;
  }
  
  // English is at root
  return cleanPath;
}

/**
 * Get the current path without locale prefix
 */
export function getPathWithoutLocale(pathname: string): string {
  if (pathname.startsWith('/de/')) {
    return pathname.substring(3);
  }
  if (pathname === '/de') {
    return '/';
  }
  return pathname;
}
