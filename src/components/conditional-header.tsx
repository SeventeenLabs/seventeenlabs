"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "./site-header";
import WorkflowsHeader from "./workflows-header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't render any header for workflows routes since they have their own layout
  if (pathname.startsWith("/workflows")) {
    return null;
  }
  
  // Use default SiteHeader for all other routes
  return <SiteHeader />;
}