import { NextResponse, type NextRequest } from "next/server";

function getLocaleFromPathname(pathname: string): string {
  // Check if path starts with /de/ or is exactly /de
  if (pathname.startsWith('/de/') || pathname === '/de') {
    return 'de';
  }
  // Everything else is English (default)
  return 'en';
}

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  const locale = getLocaleFromPathname(pathname);
  requestHeaders.set('x-path-locale', locale);
  
  // Force all German blog URLs to the canonical English paths
  if (pathname === '/de/blog' || pathname.startsWith('/de/blog/')) {
    const url = request.nextUrl.clone();
    const rewrittenPath = pathname.replace(/^\/de/, '') || '/blog';
    url.pathname = rewrittenPath.startsWith('/') ? rewrittenPath : `/${rewrittenPath}`;
    return NextResponse.redirect(url, 308);
  }
  
  // Redirect any explicit /en or /en/* paths to canonical English URLs without /en
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/en' ? '/' : pathname.replace(/^\/en/, '') || '/';
    return NextResponse.redirect(url, 308);
  }
  
  // Don't rewrite API routes, static files, or Next.js internal routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.startsWith('/rss') ||
    pathname.startsWith('/feed') ||
    pathname.startsWith('/workflows') ||
    pathname.startsWith('/(apps)') ||
    pathname.startsWith('/opengraph-image') ||
    pathname.startsWith('/project/')
  ) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

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
    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
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
    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Rewrite URLs to include locale in the Next.js routing
  // /de/* stays as /de/*
  // /* gets rewritten to /en/* internally (internal locale segment only)
  if (locale === 'en' && !pathname.startsWith('/en')) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp|.*\\.ico).*)",
  ],
};
