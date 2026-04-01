'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}

export default function ParallaxImage({
  src,
  alt,
  priority,
  sizes,
}: ParallaxImageProps) {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    function handleScroll() {
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover scale-110"
        priority={priority}
        sizes={sizes}
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
    </div>
  );
}
