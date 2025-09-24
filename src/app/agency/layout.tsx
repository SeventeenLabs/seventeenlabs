import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Agency - SeventeenLabs | Digital Agency Services",
  description: "Professional digital agency services by SeventeenLabs. We deliver thoughtful websites and products with a senior, hands-on team.",
  keywords: "digital agency, web development, design, engineering, SeventeenLabs",
  authors: [{ name: "SeventeenLabs" }],
  creator: "SeventeenLabs",
  publisher: "SeventeenLabs",
  openGraph: {
    title: "Agency - SeventeenLabs",
    description: "Professional digital agency services by SeventeenLabs.",
    url: "https://agency.seventeenlabs.io",
    siteName: "SeventeenLabs Agency",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agency - SeventeenLabs",
    description: "Professional digital agency services by SeventeenLabs.",
  },
};

export default function AgencyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}