'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [visible, setVisible] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => setTransitioning(false), 50);
      }, 200);
    },
    [transitioning],
  );

  const goPrev = useCallback(() => {
    goTo((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, goTo]);

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, goTo]);

  // Fade in on mount
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  // Lock body scroll
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goPrev, goNext]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      data-lightbox
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors duration-200 hover:bg-white/30"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="4" y1="4" x2="16" y2="16" />
          <line x1="16" y1="4" x2="4" y2="16" />
        </svg>
      </button>

      {/* Previous arrow */}
      {images.length > 1 && (
        <button
          onClick={goPrev}
          aria-label="Previous image"
          className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors duration-200 hover:bg-white/30 md:left-6"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="13,4 7,10 13,16" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div className="relative h-[80vh] w-[90vw] max-w-5xl">
        {images.map((image, i) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-300 ${
              i === currentIndex && !transitioning ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="90vw"
              quality={95}
              priority={i === initialIndex}
            />
          </div>
        ))}
      </div>

      {/* Next arrow */}
      {images.length > 1 && (
        <button
          onClick={goNext}
          aria-label="Next image"
          className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors duration-200 hover:bg-white/30 md:right-6"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="7,4 13,10 7,16" />
          </svg>
        </button>
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm tracking-widest text-white/70">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
