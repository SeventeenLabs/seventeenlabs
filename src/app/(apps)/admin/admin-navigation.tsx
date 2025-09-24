"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Database, BarChart3 } from "lucide-react";

const adminNavItems = [
  {
    href: "/admin/workflows",
    label: "Workflows",
    icon: Database,
    description: "Manage workflows and content"
  },
  {
    href: "/admin/stripe-sync",
    label: "Stripe Sync",
    icon: BarChart3,
    description: "Synchronize products with Stripe"
  },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-r border-gray-200 w-64 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin</h1>
            <p className="text-sm text-gray-500">SeventeenLabs</p>
          </div>
        </div>
        
        <ul className="space-y-2">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 group ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${
                    isActive
                      ? "text-blue-500"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`} />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-xs ${
                      isActive ? "text-blue-600" : "text-gray-500"
                    }`}>{item.description}</div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}