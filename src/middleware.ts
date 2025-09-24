import { NextResponse, type NextRequest } from "next/server";

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
  
  // Handle workflows subdomain
  if (hostname === "workflows.seventeenlabs.io" || 
      hostname === "workflows.localhost:3000" || 
      hostname === "workflows.localhost") {
    const url = request.nextUrl.clone();
    url.pathname = `/workflows${pathname}`;
    return NextResponse.rewrite(url);
  }
  
  // Handle agency subdomain
  if (hostname === "agency.seventeenlabs.io" || 
      hostname === "agency.localhost:3000" || 
      hostname === "agency.localhost") {
    const url = request.nextUrl.clone();
    url.pathname = `/agency${pathname}`;
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
