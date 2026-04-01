'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from '@/components/ui/Lightbox';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label="Open image in lightbox"
        className="relative aspect-[4/5] w-full overflow-hidden bg-cream-dark cursor-zoom-in"
      >
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
            quality={90}
            priority={i === 0}
          />
        ))}
      </button>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto md:flex-wrap">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setSelectedIndex(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={i === selectedIndex ? 'true' : undefined}
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
      {lightboxOpen && (
        <Lightbox
          images={images.map((src, i) => ({
            src,
            alt: `${title}${images.length > 1 ? ` - image ${i + 1}` : ''}`,
          }))}
          initialIndex={selectedIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
