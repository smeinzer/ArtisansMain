'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafId = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setVisible(scrollY > 400);
        setProgress(docHeight > 0 ? scrollY / docHeight : 0);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle math
  const size = 44;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center transition-all duration-500 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {/* Progress ring */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0 -rotate-90"
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border dark:text-dark-border"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-terracotta transition-[stroke-dashoffset] duration-150"
        />
      </svg>
      {/* Background fill */}
      <span className="absolute inset-[3px] rounded-full bg-cream dark:bg-dark-surface shadow-md transition-colors duration-300" />
      {/* Arrow */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="relative z-10 text-charcoal dark:text-dark-text"
      >
        <path
          d="M8 13V3M4 6l4-4 4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
