import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-medium text-blue-500 tracking-wide uppercase mb-3">
        404 – Page not found
      </p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4">
        We couldn&apos;t find that page
      </h1>
      <p className="max-w-xl text-base sm:text-lg text-muted-foreground mb-8">
        The page you&apos;re looking for may have been moved, renamed, or never existed. 
        Use the navigation or go back to the homepage to continue exploring SeventeenLabs.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-black shadow-sm hover:bg-blue-400 transition-colors"
        >
          Back to homepage
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Visit the blog
        </Link>
      </div>
    </main>
  );
}
