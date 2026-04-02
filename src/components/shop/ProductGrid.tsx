'use client';

import { useEffect, useRef, useState } from 'react';
import type { DemoProduct } from '@/lib/demo';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: DemoProduct[];
}

/**
 * Bento-style product grid: every 5th item gets a featured (2-col) layout
 * on large screens, creating visual rhythm and hierarchy.
 */
export default function ProductGrid({ products }: ProductGridProps) {
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleIds(new Set());

    if (!gridRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.productId;
            if (id) {
              setVisibleIds((prev) => new Set(prev).add(id));
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' },
    );

    const items = gridRef.current.querySelectorAll('[data-product-id]');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-serif text-charcoal-light dark:text-warm-gray-light">No pieces match your criteria</p>
        <p className="mt-2 text-sm text-warm-gray dark:text-warm-gray">
          Try adjusting or clearing your filters to see more work.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 stagger-grid"
    >
      {products.map((product, i) => {
        // Every 5th item (index 0, 5, 10...) is a featured bento card
        const isFeatured = i % 5 === 0 && products.length > 3;

        return (
          <div
            key={product.id}
            data-product-id={product.id}
            className={`transition-all duration-700 ease-out ${
              isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''
            }`}
            style={{
              opacity: visibleIds.has(product.id) ? 1 : 0,
              transform: visibleIds.has(product.id)
                ? 'translateY(0)'
                : 'translateY(30px)',
              transitionDelay: `${(i % 3) * 100}ms`,
            }}
          >
            <ProductCard product={product} featured={isFeatured} />
          </div>
        );
      })}
    </div>
  );
}
