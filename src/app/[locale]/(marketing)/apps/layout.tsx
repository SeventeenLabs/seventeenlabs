import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apps | SeventeenLabs - Business Applications & Tools",
  description: "Explore our suite of business applications and tools. Access workflows, admin panel, and other productivity solutions designed to streamline your operations.",
  keywords: "business apps, productivity tools, workflow management, admin panel, business automation, SeventeenLabs applications",
  authors: [{ name: "SeventeenLabs" }],
  creator: "SeventeenLabs",
  publisher: "SeventeenLabs",
  openGraph: {
    title: "Apps | SeventeenLabs - Business Applications & Tools",
    description: "Explore our suite of business applications and tools designed to streamline your operations.",
    url: "https://seventeenlabs.io/apps",
    siteName: "SeventeenLabs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apps | SeventeenLabs - Business Applications & Tools",
    description: "Explore our suite of business applications and tools designed to streamline your operations.",
  },
};

export default function AppsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${plusJakartaSans.variable} font-sans`}>
      <div className="flex min-h-screen flex-col bg-slate-950">
        <LandingHeader />
        <div className="flex-1 pt-20">
          {children}
        </div>
        <SiteFooter />
      </div>
    </div>
  );
}