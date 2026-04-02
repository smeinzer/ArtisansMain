'use client';

import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';
import type { DemoProduct } from '@/lib/demo';

interface StickyAddToCartProps {
  product: DemoProduct;
}

export default function StickyAddToCart({ product }: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { showToast } = useToast();
  const revertTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when the original AddToCart is NOT visible
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleAdd = () => {
    addItem(product, 1);
    showToast(product.title ? `${product.title} added to cart` : 'Added to cart');
    setAdded(true);
    clearTimeout(revertTimer.current);
    revertTimer.current = setTimeout(() => setAdded(false), 1000);
  };

  if (!product.available) return <div ref={sentinelRef} />;

  return (
    <>
      {/* Sentinel — placed inline where the original AddToCart lives */}
      <div ref={sentinelRef} className="w-full h-0" />

      {/* Sticky bar — mobile only */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-md border-t border-border dark:border-dark-border px-4 py-3 flex items-center justify-between gap-4 safe-bottom">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-charcoal dark:text-dark-text truncate">
              {product.title}
            </p>
            <p className="text-sm text-charcoal-light dark:text-dark-text-muted">
              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <button
            onClick={handleAdd}
            className={`shrink-0 px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-200 active:scale-[0.97] ${
              added
                ? 'bg-charcoal text-cream'
                : 'bg-terracotta text-white'
            }`}
          >
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </>
  );
}
