import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterCta() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/80 bg-white/80 p-8 text-center shadow-sm backdrop-blur sm:p-12">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Stay in the loop</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
          Get free AI & automation tips
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Join our monthly update for practical templates, workflow ideas, and product news tailored to modern marketing teams.
        </p>
        <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Input
            type="email"
            required
            placeholder="you@example.com"
            aria-label="Email address"
            className="sm:w-64"
          />
          <Button type="submit" size="lg" className="sm:px-8">
            Subscribe
          </Button>
        </form>
        <p className="mt-3 text-xs text-slate-400">
          Prefer a demo?{' '}
          <Link href="mailto:hello@seventeenlabs.io" className="underline decoration-dotted underline-offset-4">
            Talk to us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
