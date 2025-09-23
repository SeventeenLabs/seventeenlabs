import { NextResponse, type NextRequest } from "next/server";

export function middleware(_req: NextRequest) {
  // Middleware can handle other functionality if needed
  // Subdomain routing is now handled by next.config.ts rewrites
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
