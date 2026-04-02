'use client';

import { useRef, useCallback, useState, useEffect } from 'react';

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
  /** CSS transition duration per character */
  duration?: number;
}

/**
 * Variable-font kinetic typography.
 *
 * Splits text into individual characters. On hover, characters near the
 * cursor smoothly shift font-weight and optionally letter-spacing,
 * creating a liquid ripple effect that follows the pointer.
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
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [weights, setWeights] = useState<number[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [hasHoverCapability, setHasHoverCapability] = useState(false);
  const rafId = useRef(0);

  const chars = text.split('');

  // Initialize weights array
  useEffect(() => {
    setWeights(new Array(chars.length).fill(weightFrom));
    setHasHoverCapability(
      typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
    );
  }, [chars.length, weightFrom]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!hasHoverCapability) return;

      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const mouseX = e.clientX;

        const newWeights = chars.map((_, i) => {
          const el = charRefs.current[i];
          if (!el) return weightFrom;

          const rect = el.getBoundingClientRect();
          const charCenterX = rect.left + rect.width / 2;
          const distance = Math.abs(mouseX - charCenterX);
          // Average character width for normalizing distance
          const charWidth = rect.width || 10;
          const normalizedDistance = distance / charWidth;

          if (normalizedDistance > radius) return weightFrom;

          // Smooth falloff — cosine curve for organic feel
          const t = 1 - normalizedDistance / radius;
          const easedT = (Math.cos(Math.PI * (1 - t)) + 1) / 2;
          return Math.round(weightFrom + (weightTo - weightFrom) * easedT);
        });

        setWeights(newWeights);
      });
    },
    [chars, weightFrom, weightTo, radius, hasHoverCapability]
  );

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    setIsHovering(false);
    setWeights(new Array(chars.length).fill(weightFrom));
  }, [chars.length, weightFrom]);

  const handleMouseEnter = useCallback(() => {
    if (hasHoverCapability) {
      setIsHovering(true);
    }
  }, [hasHoverCapability]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  // SSR/touch fallback — just render plain text
  if (!hasHoverCapability) {
    return (
      <Tag className={className} style={{ fontWeight: weightFrom }}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      ref={containerRef as React.Ref<never>}
      className={`kinetic-text ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={text}
      style={{
        letterSpacing:
          trackingShift && isHovering ? '0.02em' : undefined,
        transition: trackingShift
          ? `letter-spacing ${duration * 2}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
          : undefined,
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => { charRefs.current[i] = el; }}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            fontWeight: weights[i] ?? weightFrom,
            transition: `font-weight ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            willChange: isHovering ? 'font-weight' : 'auto',
            // Preserve whitespace
            ...(char === ' ' ? { width: '0.25em' } : {}),
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  );
}
