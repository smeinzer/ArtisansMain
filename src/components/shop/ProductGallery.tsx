'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Lightbox from '@/components/ui/Lightbox';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isSwiping = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= images.length) return;
      setSelectedIndex(index);
    },
    [images.length],
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(touchDeltaX.current) > 10) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;
    const threshold = 50;
    if (touchDeltaX.current < -threshold) {
      // Swipe left → next
      goTo(Math.min(images.length - 1, selectedIndex + 1));
    } else if (touchDeltaX.current > threshold) {
      // Swipe right → prev
      goTo(Math.max(0, selectedIndex - 1));
    }
  };

  return (
    <div>
      {/* Main image — swipeable on mobile */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-cream-dark dark:bg-dark-surface squircle-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={() => {
            // Only open lightbox if not swiping
            if (!isSwiping.current) setLightboxOpen(true);
          }}
          aria-label="Open image in lightbox"
          data-cursor="view"
          className="absolute inset-0 w-full h-full cursor-zoom-in"
        >
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${title}${images.length > 1 ? ` - image ${i + 1}` : ''}`}
              fill
              className={`object-cover transition-opacity duration-500 ${
                i === selectedIndex ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
              priority={i === 0}
            />
          ))}
        </button>

        {/* Mobile dot indicators — overlaid on image */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 md:hidden pointer-events-none">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? 'bg-white w-5'
                    : 'bg-white/50'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail strip — hidden on mobile (dots replace it), visible on desktop */}
      {images.length > 1 && (
        <div className="mt-3 hidden md:flex gap-3 flex-wrap">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setSelectedIndex(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={i === selectedIndex ? 'true' : undefined}
              className={`relative shrink-0 w-16 h-20 overflow-hidden bg-cream-dark dark:bg-dark-surface squircle-sm border-2 transition-colors duration-200 ${
                i === selectedIndex ? 'border-terracotta' : 'border-transparent'
              }`}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <Lightbox
          images={images.map((src, i) => ({
            src,
            alt: `${title}${images.length > 1 ? ` - image ${i + 1}` : ''}`,
          }))}
          initialIndex={selectedIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
