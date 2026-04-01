'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [hasScrollableContent, setHasScrollableContent] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      setHasScrollableContent(docHeight > 0);

      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      } else {
        setProgress(0);
      }
    }

    function onScroll() {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (!hasScrollableContent) return null;

  return (
    <div
      className="fixed top-0 left-0 z-50 h-[3px] bg-terracotta"
      style={{
        width: `${progress}%`,
        transition: 'width 100ms linear',
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Scroll progress"
    />
  );
}
