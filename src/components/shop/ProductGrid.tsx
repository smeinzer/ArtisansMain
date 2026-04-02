'use client';

import { useEffect, useRef, useState } from 'react';
import type { DemoProduct } from '@/lib/demo';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: DemoProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset visibility when products change to re-trigger stagger
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
        <p className="text-lg font-serif text-charcoal-light">No pieces match your criteria</p>
        <p className="mt-2 text-sm text-warm-gray">
          Try adjusting or clearing your filters to see more work.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
    >
      {products.map((product, i) => (
        <div
          key={product.id}
          data-product-id={product.id}
          className="transition-all duration-700 ease-out"
          style={{
            opacity: visibleIds.has(product.id) ? 1 : 0,
            transform: visibleIds.has(product.id)
              ? 'translateY(0)'
              : 'translateY(30px)',
            transitionDelay: `${(i % 3) * 100}ms`,
          }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
