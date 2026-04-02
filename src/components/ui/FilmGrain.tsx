'use client';

import { usePathname } from 'next/navigation';

export default function FilmGrain() {
  const pathname = usePathname();

  if (pathname.startsWith('/studio')) return null;

  return (
    <>
      <svg className="hidden">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
      <div
        className="pointer-events-none fixed inset-0 z-40"
        aria-hidden="true"
      >
        <div
          className="film-grain-overlay"
          style={{
            filter: 'url(#grain)',
            opacity: 0.035,
            mixBlendMode: 'multiply',
            width: '200%',
            height: '200%',
          }}
        />
      </div>
    </>
  );
}
