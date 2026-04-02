'use client';

import { useEffect, useRef } from 'react';

interface MarqueeProps {
  items: string[];
  separator?: string;
  speed?: number;
  className?: string;
  direction?: 'left' | 'right';
}

export default function Marquee({
  items,
  separator = '\u2014',
  speed = 30,
  className = '',
  direction = 'left',
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const baseSpeed = 0.5; // pixels per frame
    const dirMult = direction === 'right' ? 1 : -1;
    let rafId: number;

    function onScroll() {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;
      // Add scroll velocity as a boost (capped)
      velocityRef.current = Math.min(15, Math.max(-15, delta * 0.5));
    }

    function animate() {
      if (!track) return;

      // Decay velocity
      velocityRef.current *= 0.95;

      // Combine base speed + scroll velocity
      const totalSpeed = baseSpeed + Math.abs(velocityRef.current);
      positionRef.current += totalSpeed * dirMult;

      // Get half the track width (since content is duplicated)
      const halfWidth = track.scrollWidth / 2;

      // Reset seamlessly
      if (direction === 'left' && positionRef.current <= -halfWidth) {
        positionRef.current += halfWidth;
      } else if (direction === 'right' && positionRef.current >= 0) {
        positionRef.current -= halfWidth;
      }

      track.style.transform = `translateX(${positionRef.current}px)`;
      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [direction, speed]);

  const content = items.map((item, i) => (
    <span key={i} className="inline-flex items-center">
      <span className="font-serif text-lg md:text-xl text-warm-gray tracking-wide">
        {item}
      </span>
      <span className="mx-4 md:mx-6 text-warm-gray-light text-sm" aria-hidden="true">
        {separator}
      </span>
    </span>
  ));

  return (
    <section
      className={`bg-cream-dark dark:bg-dark-surface py-6 md:py-8 overflow-hidden ${className}`}
      aria-label="Gallery categories"
    >
      <div
        ref={trackRef}
        className="inline-flex whitespace-nowrap will-change-transform"
      >
        {/* First copy */}
        <span className="inline-flex">{content}</span>
        {/* Duplicate for seamless loop */}
        <span className="inline-flex" aria-hidden="true">{content}</span>
      </div>
    </section>
  );
}
