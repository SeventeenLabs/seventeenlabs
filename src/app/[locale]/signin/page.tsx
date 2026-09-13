import type { Metadata } from "next";
import AuthPage from "@/components/auth-page";
import type { Locale } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your SeventeenLabs AI studio workspace.",
};

export default async function SignInPage({ params }: PageProps) {
  const { locale } = await params;
  return <AuthPage mode="signin" locale={locale as Locale} />;
}
