"use client";

import Link from "next/link";

export default function WorkflowsPage() {
  return (
    <main className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">N8N Workflows</h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          We design and build reliable automation workflows that save time, reduce errors, and scale with your business.
        </p>

        <section className="mt-10 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">What we automate</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
              <li>Lead capture and CRM syncing</li>
              <li>Email marketing and follow-up sequences</li>
              <li>Data processing and reporting</li>
              <li>Social media posting and monitoring</li>
              <li>Invoice generation and payment tracking</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Our approach</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
              <li>Map your current process before automating</li>
              <li>Build with error handling and monitoring</li>
              <li>Document everything for easy handover</li>
              <li>Test thoroughly before going live</li>
            </ul>
          </div>
        </section>

        <div className="mt-10">
          <Link href="#contact" className="text-slate-900 underline underline-offset-4 hover:text-slate-700">
            Automate a workflow → Contact
          </Link>
        </div>
      </div>
    </main>
  );
}