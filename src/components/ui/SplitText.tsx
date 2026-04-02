'use client';

import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export default function SplitText({
  text,
  as: Tag = 'h1',
  className = '',
  delay = 100,
  staggerDelay = 25,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsRevealed(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  // Split into characters, preserving spaces
  const chars = text.split('');

  return (
    <Tag ref={ref as React.Ref<never>} className={className} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            // Preserve whitespace width
            ...(char === ' ' ? { width: '0.25em' } : {}),
          }}
        >
          <span
            style={{
              display: 'inline-block',
              transform: isRevealed
                ? 'translateY(0) rotate(0deg)'
                : 'translateY(110%) rotate(5deg)',
              opacity: isRevealed ? 1 : 0,
              transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerDelay}ms, opacity 0.4s ease-out ${i * staggerDelay}ms`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </Tag>
  );
}
