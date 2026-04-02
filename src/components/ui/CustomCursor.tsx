'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

// Color schemes
const LIGHT_BG = {
  dot: '#2C2C2C',
  circle: 'rgba(44, 44, 44, 0.35)',
  dotInteractive: '#C67D5B',
  circleInteractive: 'rgba(198, 125, 91, 0.6)',
};

const DARK_BG = {
  dot: '#FAF8F5',
  circle: 'rgba(250, 248, 245, 0.35)',
  dotInteractive: '#D4956F',
  circleInteractive: 'rgba(212, 149, 111, 0.6)',
};

export default function CustomCursor() {
  const pathname = usePathname();
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const circlePos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const isVisible = useRef(false);
  const isInteractive = useRef(false);
  const isOverDark = useRef(false);

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

  const applyColors = useCallback(() => {
    const colors = isOverDark.current ? DARK_BG : LIGHT_BG;
    const interactive = isInteractive.current;

    if (dotRef.current) {
      dotRef.current.style.backgroundColor = interactive
        ? colors.dotInteractive
        : colors.dot;
    }
    if (circleRef.current) {
      circleRef.current.style.borderColor = interactive
        ? colors.circleInteractive
        : colors.circle;
      circleRef.current.style.width = interactive ? '48px' : '36px';
      circleRef.current.style.height = interactive ? '48px' : '36px';
    }
  }, []);

  useEffect(() => {
    if (isStudio) {
      // Ensure native cursor is restored on Studio pages
      document.documentElement.classList.remove('custom-cursor-active');
      return;
    }

    const hoverQuery = window.matchMedia('(hover: hover)');
    if (!hoverQuery.matches) return;

    // Hide native cursor via class (CSS rule in globals.css)
    document.documentElement.classList.add('custom-cursor-active');

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

      const target = e.target as HTMLElement;

      // Check if over a dark section
      const overDark = !!target.closest('[data-theme="dark"]');
      const interactiveChanged = (() => {
        const interactive = !!target.closest('a, button, [role="button"], input, textarea, select, label');
        if (interactive !== isInteractive.current) {
          isInteractive.current = interactive;
          return true;
        }
        return false;
      })();

      if (overDark !== isOverDark.current || interactiveChanged) {
        isOverDark.current = overDark;
        applyColors();
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
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isStudio, updateCirclePosition, applyColors]);

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
          backgroundColor: LIGHT_BG.dot,
          opacity: 0,
          transition: 'background-color 0.3s ease-out, opacity 0.15s ease-out',
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
          border: `1px solid ${LIGHT_BG.circle}`,
          opacity: 0,
          transition: 'width 0.2s ease-out, height 0.2s ease-out, border-color 0.3s ease-out, opacity 0.15s ease-out',
        }}
        aria-hidden="true"
      />
    </>
  );
}
