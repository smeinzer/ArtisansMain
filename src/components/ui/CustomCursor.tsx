'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

type CursorMode = 'default' | 'interactive' | 'view' | 'hidden';

export default function CustomCursor() {
  const pathname = usePathname();
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const circlePos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const modeRef = useRef<CursorMode>('default');
  const isVisible = useRef(false);

  const isStudio = pathname.startsWith('/studio');

  const applyMode = useCallback((newMode: CursorMode) => {
    if (modeRef.current === newMode) return;
    modeRef.current = newMode;

    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    const label = circle.querySelector('span') as HTMLSpanElement | null;

    switch (newMode) {
      case 'view':
        dot.style.width = '0px';
        dot.style.height = '0px';
        circle.style.width = '80px';
        circle.style.height = '80px';
        circle.style.border = 'none';
        circle.style.backgroundColor = 'rgba(44, 44, 44, 0.8)';
        if (label) {
          label.style.opacity = '1';
          label.textContent = 'View';
        }
        break;
      case 'interactive':
        dot.style.width = '8px';
        dot.style.height = '8px';
        circle.style.width = '48px';
        circle.style.height = '48px';
        circle.style.border = '1px solid rgba(44, 44, 44, 0.4)';
        circle.style.backgroundColor = 'transparent';
        if (label) {
          label.style.opacity = '0';
          label.textContent = '';
        }
        break;
      case 'hidden':
        dot.style.opacity = '0';
        circle.style.opacity = '0';
        break;
      default:
        dot.style.width = '8px';
        dot.style.height = '8px';
        circle.style.width = '36px';
        circle.style.height = '36px';
        circle.style.border = '1px solid rgba(44, 44, 44, 0.4)';
        circle.style.backgroundColor = 'transparent';
        if (label) {
          label.style.opacity = '0';
          label.textContent = '';
        }
        break;
    }

    // Restore visibility when switching away from hidden
    if (newMode !== 'hidden' && isVisible.current) {
      dot.style.opacity = '1';
      circle.style.opacity = '1';
    }
  }, []);

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

      const target = e.target as HTMLElement;

      // Check for lightbox
      if (target.closest('[data-lightbox]')) {
        applyMode('hidden');
        return;
      }

      // Check for data-cursor="view"
      const cursorEl = target.closest('[data-cursor]');
      if (cursorEl && cursorEl.getAttribute('data-cursor') === 'view') {
        applyMode('view');
        return;
      }

      // Check for interactive elements
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        applyMode('interactive');
        return;
      }

      applyMode('default');
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (circleRef.current) circleRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
      if (modeRef.current !== 'hidden') {
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (circleRef.current) circleRef.current.style.opacity = '1';
      }
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
  }, [isStudio, updateCirclePosition, applyMode]);

  if (isStudio) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--color-charcoal)',
          opacity: 0,
          transition: 'width 0.2s ease-out, height 0.2s ease-out, opacity 0.15s ease-out',
        }}
        aria-hidden="true"
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(44, 44, 44, 0.4)',
          backgroundColor: 'transparent',
          opacity: 0,
          transition: 'width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out, border 0.2s ease-out, opacity 0.15s ease-out',
        }}
        aria-hidden="true"
      >
        <span
          className="text-white text-xs tracking-widest uppercase select-none"
          style={{
            opacity: 0,
            transition: 'opacity 0.2s ease-out',
          }}
        />
      </div>
    </>
  );
}
