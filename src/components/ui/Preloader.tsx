'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [phase, setPhase] = useState<'logo' | 'reveal' | 'done'>('logo');

  useEffect(() => {
    // Phase 1: Logo appears (already showing via CSS animation)
    // Phase 2: Curtain reveals after logo animation
    const revealTimer = setTimeout(() => setPhase('reveal'), 1000);
    // Phase 3: Remove from DOM
    const doneTimer = setTimeout(() => setPhase('done'), 1800);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-cream"
      style={{
        opacity: phase === 'reveal' ? 0 : 1,
        pointerEvents: phase === 'reveal' ? 'none' : 'auto',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-hidden="true"
    >
      {/* Logo */}
      <div
        className="text-center"
        style={{
          opacity: phase === 'logo' ? 1 : 0,
          transform: phase === 'logo' ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
        }}
      >
        <h1
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal tracking-tight"
          style={{
            animation: 'preloader-text-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          Artisans On Main
        </h1>
        <div
          className="mt-4 mx-auto h-[1px] bg-terracotta"
          style={{
            animation: 'preloader-line-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
          }}
        />
      </div>
    </div>
  );
}
