'use client';

import Link from 'next/link';

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="font-serif text-4xl font-medium text-charcoal sm:text-5xl">
        Shop Temporarily Unavailable
      </h1>

      <p className="mt-4 max-w-md text-warm-gray">
        We&apos;re having trouble loading our collection right now. Our artists&apos;
        work will be back shortly — please check again in a moment.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button
          onClick={reset}
          className="inline-block rounded-md bg-charcoal px-8 py-3 font-sans text-sm font-medium text-cream transition hover:bg-charcoal/90"
        >
          Try Again
        </button>

        <Link
          href="/"
          className="inline-block rounded-md border border-charcoal px-8 py-3 font-sans text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-cream"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
