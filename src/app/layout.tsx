import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SeventeenLabs",
  description: "SeventeenLabs platform",
};

// Root layout provides HTML structure for routes outside [locale]
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
