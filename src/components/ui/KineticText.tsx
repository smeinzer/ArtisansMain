'use client';

import { useRef, useEffect } from 'react';

interface KineticTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  /** Base font-weight (rest state) */
  weightFrom?: number;
  /** Peak font-weight on hover */
  weightTo?: number;
  /** How many characters on each side of the cursor get affected */
  radius?: number;
  /** Also animate letter-spacing on hover */
  trackingShift?: boolean;
  /** CSS transition duration in ms */
  duration?: number;
}

/**
 * Variable-font kinetic typography.
 *
 * Splits text into individual characters. On hover, characters near the
 * cursor smoothly shift font-weight via direct DOM manipulation (no React
 * re-renders), creating a liquid ripple that follows the pointer at 60fps.
 *
 * Requires variable fonts with a `wght` axis (Cormorant Garamond 300-700,
 * DM Sans 100-1000).
 */
export default function KineticText({
  text,
  as: Tag = 'span',
  className = '',
  weightFrom = 400,
  weightTo = 700,
  radius = 4,
  trackingShift = false,
  duration = 300,
}: KineticTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const rafId = useRef(0);
  const isHovering = useRef(false);

  const chars = text.split('');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Only enable on hover-capable devices
    const hoverQuery = window.matchMedia('(hover: hover)');
    if (!hoverQuery.matches) return;

    const charEls = container.querySelectorAll<HTMLSpanElement>('[data-kinetic-char]');
    if (charEls.length === 0) return;

    // Set initial transition on all chars
    charEls.forEach((el) => {
      el.style.transition = `font-weight ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      el.style.fontWeight = String(weightFrom);
      el.style.display = 'inline-block';
    });

    function applyWeights(mouseX: number) {
      charEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(mouseX - charCenterX);
        const charWidth = rect.width || 10;
        const normalizedDistance = distance / charWidth;

        if (normalizedDistance > radius) {
          el.style.fontWeight = String(weightFrom);
          return;
        }

        // Cosine falloff for organic feel
        const t = 1 - normalizedDistance / radius;
        const easedT = (Math.cos(Math.PI * (1 - t)) + 1) / 2;
        const weight = Math.round(weightFrom + (weightTo - weightFrom) * easedT);
        el.style.fontWeight = String(weight);
      });
    }

    function resetWeights() {
      charEls.forEach((el) => {
        el.style.fontWeight = String(weightFrom);
      });
    }

    function handleMouseMove(e: MouseEvent) {
      // Extract clientX synchronously before RAF
      const mouseX = e.clientX;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        applyWeights(mouseX);
      });
    }

    function handleMouseEnter() {
      isHovering.current = true;
      if (trackingShift && container) {
        container.style.letterSpacing = '0.02em';
      }
    }

    function handleMouseLeave() {
      isHovering.current = false;
      cancelAnimationFrame(rafId.current);
      resetWeights();
      if (trackingShift && container) {
        container.style.letterSpacing = '';
      }
    }

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [text, weightFrom, weightTo, radius, trackingShift, duration]);

  return (
    <Tag
      ref={containerRef as React.Ref<never>}
      className={className}
      aria-label={text}
      style={{
        fontWeight: weightFrom,
        transition: trackingShift
          ? `letter-spacing ${duration * 2}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
          : undefined,
      }}
    >
      {chars.map((char, i) =>
        char === ' ' ? (
          <span
            key={i}
            aria-hidden="true"
            style={{ display: 'inline-block', width: '0.25em' }}
          >
            {'\u00A0'}
          </span>
        ) : (
          <span
            key={i}
            data-kinetic-char=""
            aria-hidden="true"
          >
            {char}
          </span>
        )
      )}
    </Tag>
  );
}
