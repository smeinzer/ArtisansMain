'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface ParallaxGridItemProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxGridItem({
  children,
  speed = 0.05,
  className = '',
}: ParallaxGridItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Disable on touch/small screens
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    function onScroll() {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const offset = (elementCenter - viewportCenter) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
