import { NextResponse, type NextRequest } from "next/server";

export function middleware() {
  // Subdomain routing is handled by next.config.ts rewrites
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
