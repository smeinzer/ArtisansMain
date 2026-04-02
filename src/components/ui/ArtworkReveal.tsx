'use client';

import { useEffect, useRef, useState } from 'react';

interface ArtworkRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'horizontal' | 'vertical';
  delay?: number;
  threshold?: number;
}

/**
 * Signature motion: a branded clip-path curtain reveal that wipes
 * across artwork, giving the gallery a cohesive, cinematic feel.
 * Uses CSS animations defined in globals.css for smooth GPU-accelerated perf.
 */
export default function ArtworkReveal({
  children,
  className = '',
  direction = 'horizontal',
  delay = 0,
  threshold = 0.15,
}: ArtworkRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el);
          if (delay > 0) {
            const timer = setTimeout(() => setRevealed(true), delay);
            return () => clearTimeout(timer);
          }
          setRevealed(true);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const revealClass =
    direction === 'vertical' ? 'artwork-reveal-vertical' : 'artwork-reveal';

  return (
    <div
      ref={ref}
      className={`${revealClass} ${revealed ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
