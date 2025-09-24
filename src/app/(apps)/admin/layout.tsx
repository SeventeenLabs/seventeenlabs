import type { Metadata } from "next";
import AdminNavigation from "./admin-navigation";
import AdminAuth from "@/components/admin-auth";

export const metadata: Metadata = {
  title: "Admin Dashboard - SeventeenLabs",
  description: "Administrative dashboard for SeventeenLabs workflow and system management",
  robots: "noindex, nofollow", // Prevent admin pages from being indexed
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <AdminNavigation />
          <main className="flex-1">
            <div className="p-8">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminAuth>
  );
}