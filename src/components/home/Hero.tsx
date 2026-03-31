import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      <Image
        src="https://picsum.photos/seed/artisans-hero/1600/900"
        alt="Curated handcrafted art displayed in the Artisans On Main gallery"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-charcoal/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.1]">
            Handcrafted Art from the Blue Ridge
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-white/85 max-w-lg mx-auto leading-relaxed">
            A curated collection of paintings, ceramics, jewelry, and fine craft from the artists of Western North Carolina.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wide text-charcoal bg-cream hover:bg-white transition-colors duration-200"
            >
              Browse the Collection
            </Link>
            <Link
              href="/artists"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wide text-white border border-white/60 hover:bg-white/10 transition-colors duration-200"
            >
              Meet the Artists
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
