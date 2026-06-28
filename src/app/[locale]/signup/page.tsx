import type { Metadata } from "next";
import AuthPage from "@/components/auth-page";
import type { Locale } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Create your studio",
  description: "Create a SeventeenLabs workspace for AI movies, series, scenes, and launch assets.",
};

export default async function SignUpPage({ params }: PageProps) {
  const { locale } = await params;
  return <AuthPage mode="signup" locale={locale as Locale} />;
}
