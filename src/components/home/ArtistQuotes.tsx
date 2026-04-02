'use client';

import { useEffect, useRef, useState } from 'react';

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

    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % quotes.length);
        setIsTransitioning(false);
      }, 600);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [isVisible]);

  const quote = quotes[current];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-6 bg-cream-dark"
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

        {/* Quote text */}
        <div className="min-h-[120px] md:min-h-[100px] flex items-center justify-center">
          <blockquote
            className="transition-all duration-600"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
              transition: 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out',
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

        {/* Dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-2" role="tablist">
          {quotes.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Quote ${i + 1}`}
              onClick={() => {
                if (i === current) return;
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrent(i);
                  setIsTransitioning(false);
                }, 600);
                // Reset auto-rotation
                clearInterval(intervalRef.current);
                intervalRef.current = setInterval(() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrent((prev) => (prev + 1) % quotes.length);
                    setIsTransitioning(false);
                  }, 600);
                }, 5000);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'bg-terracotta w-6'
                  : 'bg-warm-gray-light hover:bg-warm-gray'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
