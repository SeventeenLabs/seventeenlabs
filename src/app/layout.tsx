import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SeventeenLabs",
  description: "SeventeenLabs platform",
};

// This is a minimal root layout that just wraps the locale-specific layouts
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
