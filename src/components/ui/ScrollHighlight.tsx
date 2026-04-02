'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface ScrollHighlightProps {
  text: string;
  as?: 'p' | 'h2' | 'h3' | 'span';
  className?: string;
  /** Color for highlighted (active) words */
  activeColor?: string;
  /** Color for not-yet-highlighted words */
  inactiveColor?: string;
}

/**
 * Apple-style scroll-triggered text highlighting.
 * Words progressively change from muted to vivid as the element scrolls
 * through the viewport, drawing the reader through the content.
 */
export default function ScrollHighlight({
  text,
  as: Tag = 'p',
  className = '',
  activeColor = 'var(--color-charcoal)',
  inactiveColor = 'var(--color-warm-gray-light)',
}: ScrollHighlightProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const rafId = useRef(0);
  const words = text.split(' ');

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start highlighting when top of element reaches 80% down the viewport
      // Finish when top reaches 30% (giving a smooth reading window)
      const start = windowHeight * 0.8;
      const end = windowHeight * 0.3;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setProgress(p);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  // Check if we're in dark mode to swap colors
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const resolvedActive = isDark ? 'var(--color-dark-text)' : activeColor;
  const resolvedInactive = isDark ? 'rgba(154, 145, 137, 0.35)' : inactiveColor;

  return (
    <Tag ref={containerRef as React.Ref<never>} className={className}>
      {words.map((word, i) => {
        const wordProgress = i / words.length;
        const isActive = progress > wordProgress;

        return (
          <span
            key={i}
            style={{
              color: isActive ? resolvedActive : resolvedInactive,
              transition: 'color 0.3s ease-out',
            }}
          >
            {word}{i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </Tag>
  );
}
