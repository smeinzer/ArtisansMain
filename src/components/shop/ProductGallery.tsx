'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${title}${images.length > 1 ? ` - image ${i + 1}` : ''}`}
            fill
            className={`object-cover transition-opacity duration-500 ${
              i === selectedIndex ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
          />
        ))}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto md:flex-wrap">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setSelectedIndex(i)}
              className={`relative shrink-0 w-16 h-20 overflow-hidden bg-cream-dark border-2 transition-colors duration-200 ${
                i === selectedIndex ? 'border-terracotta' : 'border-transparent'
              }`}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
