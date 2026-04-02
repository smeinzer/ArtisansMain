'use client';

import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="font-serif text-4xl font-medium text-charcoal dark:text-dark-text sm:text-5xl">
        Something went wrong
      </h1>

      <p className="mt-4 max-w-md text-warm-gray dark:text-dark-text-muted">
        We hit an unexpected bump. Please try again, and if the problem
        persists feel free to reach out to us.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button
          onClick={reset}
          className="inline-block rounded-md bg-terracotta px-8 py-3 font-sans text-sm font-medium text-white transition hover:bg-terracotta-dark active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-terracotta/40"
        >
          Try Again
        </button>

        <Link
          href="/"
          className="inline-block rounded-md border border-charcoal dark:border-dark-border px-8 py-3 font-sans text-sm font-medium text-charcoal dark:text-dark-text transition hover:bg-charcoal hover:text-cream dark:hover:bg-dark-surface active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-terracotta/40"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
