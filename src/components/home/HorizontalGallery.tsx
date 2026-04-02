'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { demoProducts } from '@/lib/demo';

const galleryItems = demoProducts.filter((p) => p.available).slice(0, 8);

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let rafId: number;

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!section || !track) return;
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;
        // scrollProgress: 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
        const scrollProgress = Math.min(
          1,
          Math.max(0, (viewportHeight - rect.top) / (sectionHeight + viewportHeight - viewportHeight))
        );

        // Calculate how far to translate
        const trackWidth = track.scrollWidth;
        const containerWidth = section.offsetWidth;
        const maxTranslate = trackWidth - containerWidth;
        // Map scroll through the sticky zone to horizontal movement
        const stickyProgress = Math.min(
          1,
          Math.max(0, -rect.top / (sectionHeight - viewportHeight))
        );

        track.style.transform = `translateX(${-stickyProgress * maxTranslate}px)`;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="relative bg-charcoal"
      // Height creates scroll distance for the horizontal movement
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Section label */}
        <div className="px-6 md:px-12 mb-8">
          <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-warm-gray mb-3">
            Curated Selection
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-cream tracking-tight">
            Explore the Gallery
          </h2>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex gap-6 md:gap-8 px-6 md:px-12 will-change-transform stagger-fast"
        >
          {galleryItems.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.handle}`}
              className="group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-charcoal-light squircle">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="380px"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500" />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-cream/90 group-hover:text-terracotta-light transition-colors duration-300">
                  {product.title}
                </h3>
                <p className="text-xs text-warm-gray mt-1">{product.artist}</p>
              </div>
            </Link>
          ))}

          {/* End CTA card */}
          <Link
            href="/shop"
            className="group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] flex items-center justify-center"
          >
            <div className="text-center">
              <p className="font-serif text-2xl md:text-3xl text-cream/70 group-hover:text-terracotta-light transition-colors duration-300">
                View All Pieces
              </p>
              <div className="mt-4 flex justify-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="text-cream/40 group-hover:text-terracotta-light group-hover:translate-x-2 transition-all duration-300"
                >
                  <path
                    d="M8 20h24M24 12l8 8-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="px-6 md:px-12 mt-8">
          <p className="text-xs text-warm-gray/50 tracking-wide">
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
}
