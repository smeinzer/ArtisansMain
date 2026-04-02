'use client';

import { useEffect, useRef, useState } from 'react';

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  color?: string;
  delay?: number;
}

type Phase = 'idle' | 'cover' | 'reveal' | 'done';

const EASING = 'cubic-bezier(0.77, 0, 0.175, 1)';
const PHASE_DURATION = 500; // ms per phase

function getOverlayTransform(
  direction: 'left' | 'right' | 'up' | 'down',
  phase: Phase
): string {
  // idle: overlay is off-screen on the entry side
  // cover: overlay slides in to cover the image (translateX/Y 0)
  // reveal: overlay slides out the opposite side
  // done: same as reveal (stays off-screen)

  const transforms: Record<
    'left' | 'right' | 'up' | 'down',
    { idle: string; cover: string; reveal: string }
  > = {
    left: {
      idle: 'translateX(-100%)',
      cover: 'translateX(0)',
      reveal: 'translateX(100%)',
    },
    right: {
      idle: 'translateX(100%)',
      cover: 'translateX(0)',
      reveal: 'translateX(-100%)',
    },
    up: {
      idle: 'translateY(100%)',
      cover: 'translateY(0)',
      reveal: 'translateY(-100%)',
    },
    down: {
      idle: 'translateY(-100%)',
      cover: 'translateY(0)',
      reveal: 'translateY(100%)',
    },
  };

  const t = transforms[direction];
  if (phase === 'idle') return t.idle;
  if (phase === 'cover') return t.cover;
  return t.reveal; // 'reveal' or 'done'
}

export default function ImageReveal({
  children,
  className = '',
  direction = 'left',
  color = '#C67D5B',
  delay = 0,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(element);

          // Start cover phase after delay
          const coverTimer = setTimeout(() => {
            setPhase('cover');
          }, delay);

          // Start reveal phase after delay + phase duration
          const revealTimer = setTimeout(() => {
            setPhase('reveal');
          }, delay + PHASE_DURATION);

          // Mark done after both phases complete
          const doneTimer = setTimeout(() => {
            setPhase('done');
          }, delay + PHASE_DURATION * 2);

          // Store timers for cleanup
          element.dataset.timers = JSON.stringify([
            coverTimer,
            revealTimer,
            doneTimer,
          ]);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (element.dataset.timers) {
        const timers = JSON.parse(element.dataset.timers) as number[];
        timers.forEach(clearTimeout);
      }
    };
  }, [delay]);

  const imageVisible = phase === 'reveal' || phase === 'done';
  const animating = phase !== 'idle' && phase !== 'done';

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Image wrapper */}
      <div
        style={{
          opacity: imageVisible ? 1 : 0,
          transform: imageVisible ? 'scale(1)' : 'scale(1.1)',
          transition: imageVisible
            ? `opacity 0.05s ease-out, transform ${PHASE_DURATION}ms ${EASING}`
            : 'none',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>

      {/* Colored overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: color,
          transform: getOverlayTransform(direction, phase),
          transition:
            phase === 'idle'
              ? 'none'
              : `transform ${PHASE_DURATION}ms ${EASING}`,
          willChange: animating ? 'transform' : 'auto',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </div>
  );
}
