import { Locale } from './config';

type GetLocalizedPathOptions = {
  /**
   * When true, skip prefixing locale for globally shared routes (e.g. /workflows).
   */
  skipLocale?: boolean;
};

/**
 * Get the URL path for a given locale and path.
 * English lives at root, German has a /de prefix unless explicitly skipped.
 */
export function getLocalizedPath(
  locale: Locale,
  path: string = '',
  options: GetLocalizedPathOptions = {},
): string {
  const hasLeadingSlash = path.startsWith('/');
  const cleanPath = path === '' ? '/' : hasLeadingSlash ? path : `/${path}`;

  if (options.skipLocale) {
    return cleanPath;
  }

  if (locale === 'de') {
    if (cleanPath === '/') {
      return '/de';
    }
    return `/de${cleanPath}`;
  }

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
