'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const pathname = usePathname();
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const circlePos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const isVisible = useRef(false);
  const isInteractive = useRef(false);

  const isStudio = pathname.startsWith('/studio');

  const updateCirclePosition = useCallback(() => {
    const lerp = 0.15;
    circlePos.current.x += (mousePos.current.x - circlePos.current.x) * lerp;
    circlePos.current.y += (mousePos.current.y - circlePos.current.y) * lerp;

    if (circleRef.current) {
      circleRef.current.style.transform = `translate(${circlePos.current.x}px, ${circlePos.current.y}px) translate(-50%, -50%)`;
    }

    rafId.current = requestAnimationFrame(updateCirclePosition);
  }, []);

  useEffect(() => {
    if (isStudio) return;

    const hoverQuery = window.matchMedia('(hover: hover)');
    if (!hoverQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }

      if (!isVisible.current) {
        isVisible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (circleRef.current) circleRef.current.style.opacity = '1';
      }

      // Check for interactive elements
      const target = e.target as HTMLElement;
      const interactive = !!target.closest('a, button, [role="button"], input, textarea, select, label');

      if (interactive !== isInteractive.current) {
        isInteractive.current = interactive;
        if (circleRef.current) {
          circleRef.current.style.width = interactive ? '48px' : '36px';
          circleRef.current.style.height = interactive ? '48px' : '36px';
          circleRef.current.style.borderColor = interactive
            ? 'rgba(198, 125, 91, 0.6)'
            : 'rgba(44, 44, 44, 0.35)';
        }
        if (dotRef.current) {
          dotRef.current.style.backgroundColor = interactive
            ? '#C67D5B'
            : '#2C2C2C';
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (circleRef.current) circleRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (circleRef.current) circleRef.current.style.opacity = '1';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    rafId.current = requestAnimationFrame(updateCirclePosition);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, [isStudio, updateCirclePosition]);

  if (isStudio) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#2C2C2C',
          opacity: 0,
          transition: 'background-color 0.2s ease-out, opacity 0.15s ease-out',
        }}
        aria-hidden="true"
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(44, 44, 44, 0.35)',
          opacity: 0,
          transition: 'width 0.2s ease-out, height 0.2s ease-out, border-color 0.2s ease-out, opacity 0.15s ease-out',
        }}
        aria-hidden="true"
      />
    </>
  );
}
