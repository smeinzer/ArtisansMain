'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ArtworkReveal from '@/components/ui/ArtworkReveal';
import { demoProducts } from '@/lib/demo';

// Pick the most visually striking piece as the showstopper
const featured = demoProducts.find((p) => p.handle === 'morning-light-on-the-blue-ridge') || demoProducts[0];

export default function FullBleedArtwork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafId = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // 0 when section enters viewport, 1 when it's fully centered/scrolled
        const p = Math.min(1, Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height * 0.5)));
        setScrollProgress(p);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Subtle scale: starts at 1.08, settles to 1.0 as you scroll into view
  const imageScale = 1.08 - scrollProgress * 0.08;
  // Text fades in and slides up
  const textOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.3) / 0.4));
  const textTranslate = 30 - textOpacity * 30;

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="relative h-[85vh] min-h-[500px] max-h-[900px] overflow-hidden"
    >
      {/* Full-bleed artwork image with signature reveal */}
      <ArtworkReveal className="absolute inset-0" direction="horizontal">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `scale(${imageScale})` }}
        >
          <Image
            src={featured.images[0]}
            alt={featured.title}
            fill
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </div>
      </ArtworkReveal>

      {/* Gradient overlay — heavier at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />

      {/* Content positioned at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-12 md:pb-16 z-10"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textTranslate}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-terracotta-light mb-3">
            Featured Piece
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.05]">
            {featured.title}
          </h2>
          <p className="mt-3 text-base md:text-lg text-white/70 max-w-lg">
            {featured.artist} &middot; {featured.medium}
          </p>
          <Link
            href={`/shop/${featured.handle}`}
            className="inline-flex items-center gap-2 mt-6 px-8 py-3 text-sm font-medium tracking-wide text-charcoal bg-cream hover:bg-white transition-colors duration-200 group"
          >
            View Piece
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
