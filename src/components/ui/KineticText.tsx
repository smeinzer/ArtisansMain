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

// Easing curves
const EASE_FOLLOW = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Responsive follow
const EASE_SETTLE = 'cubic-bezier(0.16, 1, 0.3, 1)';         // Soft overshoot settle

/**
 * Variable-font kinetic typography.
 *
 * Splits text into individual characters. On hover, characters near the
 * cursor smoothly shift font-weight via direct DOM manipulation (no React
 * re-renders), creating a liquid ripple that follows the pointer at 60fps.
 *
 * On mouse leave, weights ripple back to rest with a staggered delay
 * radiating outward from the last cursor position, so it dissolves
 * organically instead of snapping.
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
  const lastMouseX = useRef(0);

  const chars = text.split('');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hoverQuery = window.matchMedia('(hover: hover)');
    if (!hoverQuery.matches) return;

    const charEls = container.querySelectorAll<HTMLSpanElement>('[data-kinetic-char]');
    if (charEls.length === 0) return;

    const settleDuration = duration * 2.5;   // Slower settle
    const staggerPerChar = 30;               // ms between each char's settle start

    // Set initial styles
    charEls.forEach((el) => {
      el.style.transition = `font-weight ${duration}ms ${EASE_FOLLOW}`;
      el.style.fontWeight = String(weightFrom);
      el.style.display = 'inline-block';
    });

    function applyWeights(mouseX: number) {
      charEls.forEach((el) => {
        // Switch to quick follow easing while hovering
        el.style.transition = `font-weight ${duration}ms ${EASE_FOLLOW}`;

        const rect = el.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(mouseX - charCenterX);
        const charWidth = rect.width || 10;
        const normalizedDistance = distance / charWidth;

        if (normalizedDistance > radius) {
          el.style.fontWeight = String(weightFrom);
          return;
        }

        const t = 1 - normalizedDistance / radius;
        const easedT = (Math.cos(Math.PI * (1 - t)) + 1) / 2;
        const weight = Math.round(weightFrom + (weightTo - weightFrom) * easedT);
        el.style.fontWeight = String(weight);
      });
    }

    function settleWeights() {
      // Sort characters by distance from last cursor position
      // so the ripple radiates outward from where the cursor left
      const charData: { el: HTMLSpanElement; dist: number }[] = [];

      charEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const dist = Math.abs(lastMouseX.current - charCenterX);
        charData.push({ el, dist });
      });

      // Sort by distance — closest to cursor settle first
      charData.sort((a, b) => a.dist - b.dist);

      charData.forEach(({ el }, i) => {
        const delay = i * staggerPerChar;
        // Switch to the slow, soft settle easing with staggered delay
        el.style.transition = `font-weight ${settleDuration}ms ${EASE_SETTLE} ${delay}ms`;
        el.style.fontWeight = String(weightFrom);
      });
    }

    function handleMouseMove(e: MouseEvent) {
      const mouseX = e.clientX;
      lastMouseX.current = mouseX;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        applyWeights(mouseX);
      });
    }

    function handleMouseEnter() {
      if (trackingShift && container) {
        container.style.letterSpacing = '0.02em';
      }
    }

    function handleMouseLeave() {
      cancelAnimationFrame(rafId.current);
      settleWeights();
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
          ? `letter-spacing ${duration * 2}ms ${EASE_SETTLE}`
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
