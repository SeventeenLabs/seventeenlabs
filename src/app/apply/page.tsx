import type { Metadata } from "next";
import Link from "next/link";
import EarlyAccessApplication from "@/components/early-access-application";
import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";
import { getPlanById } from "@/lib/early-access-plans";

export const metadata: Metadata = {
  title: "Apply for early access | SeventeenLabs",
  description:
    "Apply for SeventeenLabs early access with the AI film, series, trailer, or client project you want to produce.",
};

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  const selectedPlan = getPlanById(plan);

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-[oklch(0.055_0.012_270)] px-5 pb-24 pt-28 text-[oklch(0.98_0.006_270)] md:px-8 md:pt-32">
        <section className="mx-auto grid w-full max-w-[82rem] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[oklch(0.86_0.2_128)]">
              Early access application
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-[oklch(0.98_0.006_270)] md:text-6xl">
              Apply with the project you want to produce.
            </h1>
            <p className="mt-5 text-base leading-7 text-[oklch(0.74_0.014_270)] md:text-lg">
              The application is short on purpose. We only need enough context to
              identify serious creators and match early access to real production
              problems.
            </p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.045] p-5">
              <p className="text-sm font-semibold text-[oklch(0.92_0.006_270)]">
                Selected plan: {selectedPlan.name} - {selectedPlan.price}
              </p>
              <p className="mt-2 text-sm leading-6 text-[oklch(0.7_0.012_270)]">
                You are not charged when you apply. Accepted members receive a
                Stripe link for this exact plan with expected onboarding timing.
              </p>
              <Link
                href="/#pricing"
                className="mt-4 inline-flex text-sm font-semibold text-[oklch(0.86_0.2_128)] transition hover:text-[oklch(0.92_0.22_128)]"
              >
                Change plan
              </Link>
            </div>
          </div>

          <EarlyAccessApplication selectedPlan={selectedPlan} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
