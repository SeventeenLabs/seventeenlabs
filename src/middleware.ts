import { NextResponse, type NextRequest } from "next/server";

const locales = ['en-US', 'de-DE'];
const defaultLocale = 'en-US';

function getLocaleFromPathname(pathname: string): string | null {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return null;
}

function detectLocaleFromRequest(request: NextRequest): string {
  // Check if URL already has a locale
  const pathnameLocale = getLocaleFromPathname(request.nextUrl.pathname);
  if (pathnameLocale) return pathnameLocale;

  // Check for explicit locale cookie first for consistency
  const localeCookie = request.cookies.get('preferred-locale')?.value;
  if (localeCookie && locales.includes(localeCookie as any)) {
    return localeCookie;
  }

  // Get locale from Accept-Language header as fallback
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Simple locale detection - check for German first
    if (acceptLanguage.includes('de')) {
      return 'de-DE';
    }
    if (acceptLanguage.includes('en')) {
      return 'en-US';
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
    pathname.startsWith('/sitemap.xml')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameLocale = getLocaleFromPathname(pathname);
  
  // Handle workflows subdomain
  if (hostname === "workflows.seventeenlabs.io" || 
      hostname === "workflows.localhost:3000" || 
      hostname === "workflows.localhost") {
    const url = request.nextUrl.clone();
    
    if (pathnameLocale) {
      // Remove locale from pathname for subdomain routing
      const pathWithoutLocale = pathname.replace(`/${pathnameLocale}`, '') || '/';
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
    
    if (pathnameLocale) {
      // Remove locale from pathname for subdomain routing
      const pathWithoutLocale = pathname.replace(`/${pathnameLocale}`, '') || '/';
      url.pathname = `/agency${pathWithoutLocale}`;
    } else {
      url.pathname = `/agency${pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // Handle locale routing for main domain
  if (!pathnameLocale) {
    // Detect locale and redirect
    const locale = detectLocaleFromRequest(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    
    // Set cookie to maintain consistency across requests
    const response = NextResponse.redirect(newUrl);
    response.cookies.set('preferred-locale', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    });
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp|.*\\.ico).*)",
  ],
};
