import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="font-serif text-8xl font-bold text-charcoal sm:text-9xl">
        404
      </h1>

      <p className="mt-6 text-xl text-charcoal sm:text-2xl">
        This page seems to have wandered off
      </p>

      <p className="mt-3 max-w-md text-warm-gray">
        The page you&apos;re looking for doesn&apos;t exist. Perhaps you&apos;d
        like to explore our shop or head back home.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-block rounded-md bg-charcoal px-8 py-3 font-sans text-sm font-medium text-cream transition hover:bg-charcoal/90"
        >
          Back to Home
        </Link>

        <Link
          href="/shop"
          className="inline-block rounded-md border border-charcoal px-8 py-3 font-sans text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-cream"
        >
          Browse the Shop
        </Link>
      </div>
    </div>
  );
}
