import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // Handle agency.* subdomains
  const isAgencySubdomain = /^agency\./i.test(host);
  
  // Handle workflows.* subdomains
  const isWorkflowsSubdomain = /^workflows\./i.test(host);

  if (isAgencySubdomain) {
    // Avoid loop: if already under /agency, let it pass
    if (!url.pathname.startsWith("/agency")) {
      url.pathname = "/agency" + url.pathname;
      return NextResponse.rewrite(url);
    }
  }

  if (isWorkflowsSubdomain) {
    // Avoid loop: if already under /workflows, let it pass
    if (!url.pathname.startsWith("/workflows")) {
      url.pathname = "/workflows" + url.pathname;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
