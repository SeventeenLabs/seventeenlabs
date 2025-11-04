import { NextResponse, type NextRequest } from "next/server";

const locales = ['en', 'de'];
const defaultLocale = 'en';

function getLocaleFromPathname(pathname: string): string {
  // Check if path starts with /de/ or is exactly /de
  if (pathname.startsWith('/de/') || pathname === '/de') {
    return 'de';
  }
  // Everything else is English (default)
  return 'en';
}

function detectLocaleFromRequest(request: NextRequest): string {
  // Check for explicit locale cookie first
  const localeCookie = request.cookies.get('preferred-locale')?.value;
  if (localeCookie && locales.includes(localeCookie as any)) {
    return localeCookie;
  }

  // Get locale from Accept-Language header as fallback
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Simple locale detection - check for German first
    if (acceptLanguage.includes('de')) {
      return 'de';
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;
  
  // Don't rewrite API routes, static files, or Next.js internal routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.startsWith('/workflows') ||
    pathname.startsWith('/(apps)') ||
    pathname.startsWith('/opengraph-image')
  ) {
    return NextResponse.next();
  }

  const locale = getLocaleFromPathname(pathname);
  
  // Handle workflows subdomain
  if (hostname === "workflows.seventeenlabs.io" || 
      hostname === "workflows.localhost:3000" || 
      hostname === "workflows.localhost") {
    const url = request.nextUrl.clone();
    
    if (locale === 'de') {
      // Remove /de prefix for subdomain routing
      const pathWithoutLocale = pathname.replace('/de', '') || '/';
      url.pathname = `/workflows${pathWithoutLocale}`;
    } else {
      url.pathname = `/workflows${pathname}`;
    }
    return NextResponse.rewrite(url);
  }
  
  // Handle agency subdomain
  if (hostname === "agency.seventeenlabs.io" || 
      hostname === "agency.localhost:3000" || 
      hostname === "agency.localhost") {
    const url = request.nextUrl.clone();
    
    if (locale === 'de') {
      // Remove /de prefix for subdomain routing
      const pathWithoutLocale = pathname.replace('/de', '') || '/';
      url.pathname = `/agency${pathWithoutLocale}`;
    } else {
      url.pathname = `/agency${pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // Rewrite URLs to include locale in the Next.js routing
  // /de/* stays as /de/*
  // /* gets rewritten to /en/* internally
  if (locale === 'en' && !pathname.startsWith('/en')) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp|.*\\.ico).*)",
  ],
};
