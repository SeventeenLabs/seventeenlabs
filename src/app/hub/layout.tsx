"use client";

import AdminAuth from "@/components/admin-auth";

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return <AdminAuth>{children}</AdminAuth>;
}
