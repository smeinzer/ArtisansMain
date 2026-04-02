'use client';

import { useRef, useEffect, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: 'div' | 'span';
}

export default function MagneticButton({
  children,
  className,
  strength = 0.3,
  as: Tag = 'div',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const rafId = useRef(0);
  const hasHover = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      hasHover.current = true;
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || !hasHover.current) return;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) * strength;
        const dy = (e.clientY - centerY) * strength;
        ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
        ref.current.style.transition = 'transform 0.15s ease-out';
      });
    },
    [strength],
  );

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement> & React.RefObject<HTMLSpanElement>}
      className={className}
      style={{ display: 'inline-block', willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Tag>
  );
}
