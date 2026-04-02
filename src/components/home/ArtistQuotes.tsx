'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Quote {
  text: string;
  artist: string;
  medium: string;
}

const quotes: Quote[] = [
  {
    text: 'Every piece I create carries a piece of these mountains with it.',
    artist: 'Margaret Chen',
    medium: 'Painter',
  },
  {
    text: 'Clay has memory. It remembers every touch, every intention.',
    artist: 'Thomas Blackwell',
    medium: 'Ceramicist',
  },
  {
    text: 'I weave to make the invisible threads of this place visible.',
    artist: 'Priya Sharma',
    medium: 'Textile Artist',
  },
  {
    text: 'The best jewelry tells a story you can wear close to your heart.',
    artist: 'Elena Vasquez',
    medium: 'Jeweler',
  },
];

export default function ArtistQuotes() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const touchStartX = useRef(0);

  const goTo = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 400);
  }, []);

  const startAutoRotate = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % quotes.length);
        setIsTransitioning(false);
      }, 400);
    }, 5000);
  }, []);

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
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    startAutoRotate();
    return () => clearInterval(intervalRef.current);
  }, [isVisible, startAutoRotate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50;
    if (Math.abs(delta) < threshold) return;

    if (delta < 0) {
      // Swipe left → next
      const next = (current + 1) % quotes.length;
      goTo(next);
    } else {
      // Swipe right → prev
      const prev = (current - 1 + quotes.length) % quotes.length;
      goTo(prev);
    }
    startAutoRotate();
  };

  const handleDotClick = (i: number) => {
    if (i === current) return;
    goTo(i);
    startAutoRotate();
  };

  const quote = quotes[current];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-6 bg-cream"
    >
      <div
        className="max-w-4xl mx-auto text-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }}
      >
        {/* Decorative quotation mark */}
        <span
          className="block font-serif text-7xl md:text-8xl text-terracotta/20 leading-none select-none mb-2"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Quote text — swipeable */}
        <div
          className="min-h-[140px] sm:min-h-[120px] md:min-h-[100px] flex items-center justify-center touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <blockquote
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)',
              transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
            }}
          >
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-charcoal leading-snug italic tracking-tight">
              {quote.text}
            </p>
            <footer className="mt-6">
              <cite className="not-italic">
                <span className="text-sm font-medium text-charcoal tracking-wide">
                  {quote.artist}
                </span>
                <span className="mx-2 text-warm-gray-light">&mdash;</span>
                <span className="text-sm text-warm-gray">
                  {quote.medium}
                </span>
              </cite>
            </footer>
          </blockquote>
        </div>

        {/* Dot indicators — larger touch targets on mobile */}
        <div className="mt-8 flex items-center justify-center gap-3" role="tablist">
          {quotes.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Quote ${i + 1}`}
              onClick={() => handleDotClick(i)}
              className="p-2 -m-2 group"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'bg-terracotta w-6'
                    : 'bg-warm-gray-light group-hover:bg-warm-gray w-2'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
