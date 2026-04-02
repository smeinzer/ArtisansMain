'use client';

import { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  staggerDelay?: number;
  trigger?: 'onMount' | 'onScroll';
}

export default function TextReveal({
  text,
  as: Tag = 'span',
  className,
  delay = 0,
  staggerDelay = 50,
  trigger = 'onScroll',
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    if (trigger === 'onMount') {
      const timeout = setTimeout(() => setIsRevealed(true), delay);
      return () => clearTimeout(timeout);
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsRevealed(true), delay);
          } else {
            setIsRevealed(true);
          }
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [trigger, delay]);

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            marginRight: '0.25em',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              transform: isRevealed ? 'translateY(0)' : 'translateY(100%)',
              opacity: isRevealed ? 1 : 0,
              transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerDelay}ms, opacity 0.5s ease-out ${i * staggerDelay}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
