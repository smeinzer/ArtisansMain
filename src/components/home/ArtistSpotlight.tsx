'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { demoArtists, demoProducts } from '@/lib/demo';

// Pick a featured artist and their works
const spotlightArtist = demoArtists[0]; // Margaret Chen
const spotlightWorks = demoProducts
  .filter((p) => p.artist === spotlightArtist.name && p.available)
  .slice(0, 3);

export default function ArtistSpotlight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-0">
      <div className="max-w-7xl mx-auto px-6">
        {/* Mobile: stacked layout */}
        <div className="md:hidden space-y-8">
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-terracotta mb-3">
              Artist Spotlight
            </p>
            <h2 className="font-serif text-4xl font-medium text-charcoal dark:text-dark-text tracking-tight leading-[1.1]">
              {spotlightArtist.name}
            </h2>
            <p className="mt-4 text-warm-gray dark:text-dark-text-muted leading-relaxed text-base max-w-lg">
              {spotlightArtist.bio}
            </p>
            <Link
              href={`/artists/${spotlightArtist.slug}`}
              className="inline-block mt-6 text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors duration-200"
            >
              View all work &rarr;
            </Link>
          </div>
          <div className="space-y-4">
            {spotlightWorks.map((work, i) => (
              <Link key={work.id} href={`/shop/${work.handle}`} className="group block">
                <div
                  className="relative aspect-[4/3] overflow-hidden bg-cream-dark dark:bg-dark-surface"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `opacity 0.6s ease-out ${(i + 1) * 150}ms, transform 0.6s ease-out ${(i + 1) * 150}ms`,
                  }}
                >
                  <Image
                    src={work.images[0]}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="100vw"
                  />
                </div>
                <p className="mt-2 text-sm text-charcoal dark:text-dark-text font-medium group-hover:text-terracotta transition-colors">
                  {work.title}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop: pinned text + scrolling images */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left column: sticky text */}
          <div className="md:py-32">
            <div className="md:sticky md:top-32">
              <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-terracotta mb-4">
                Artist Spotlight
              </p>
              <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-medium text-charcoal dark:text-dark-text tracking-tight leading-[1.05]">
                {spotlightArtist.name}
              </h2>
              <p className="mt-6 text-warm-gray dark:text-dark-text-muted leading-relaxed text-lg max-w-md">
                {spotlightArtist.bio}
              </p>
              <Link
                href={`/artists/${spotlightArtist.slug}`}
                className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors duration-200 group"
              >
                View all work
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right column: scrolling artwork images */}
          <div className="space-y-8 md:py-32">
            {spotlightWorks.map((work, i) => (
              <Link key={work.id} href={`/shop/${work.handle}`} className="group block scroll-animate">
                <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark dark:bg-dark-surface">
                  <Image
                    src={work.images[0]}
                    alt={work.title}
                    fill
                    className="object-cover img-distort"
                    sizes="(max-width: 1024px) 50vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-base font-medium text-charcoal dark:text-dark-text group-hover:text-terracotta transition-colors duration-200">
                      {work.title}
                    </h3>
                    <p className="text-sm text-warm-gray dark:text-dark-text-muted mt-1">
                      {work.medium}
                    </p>
                  </div>
                  <p className="font-serif text-lg font-medium text-charcoal dark:text-dark-text">
                    ${work.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
