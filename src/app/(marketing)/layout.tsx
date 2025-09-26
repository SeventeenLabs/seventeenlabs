import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SeventeenLabs - Digital Agency | Web Development & Design",
  description: "SeventeenLabs is a cutting-edge digital agency specializing in web development, UI/UX design, and digital transformation. We craft exceptional digital experiences that drive growth and innovation.",
  keywords: "digital agency, web development, UI/UX design, Next.js, React, TypeScript, Tailwind CSS, Framer Motion",
  authors: [{ name: "SeventeenLabs" }],
  creator: "SeventeenLabs",
  publisher: "SeventeenLabs",
  openGraph: {
    title: "SeventeenLabs - Digital Agency",
    description: "We craft exceptional digital experiences that drive growth and innovation.",
    url: "https://seventeenlabs.io",
    siteName: "SeventeenLabs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SeventeenLabs - Digital Agency",
    description: "We craft exceptional digital experiences that drive growth and innovation.",
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}