'use client';

import { useState, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';
import type { DemoProduct } from '@/lib/demo';

interface AddToCartProps {
  product: DemoProduct;
}

export default function AddToCart({ product }: AddToCartProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const revertTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);

    showToast(product.title ? `${product.title} added to cart` : 'Added to cart');

    setAdded(true);
    clearTimeout(revertTimer.current);
    revertTimer.current = setTimeout(() => setAdded(false), 1000);
  };

  if (!product.available) {
    return (
      <button
        disabled
        className="w-full bg-warm-gray-light dark:bg-dark-surface text-warm-gray dark:text-dark-text-muted py-3 text-sm font-medium tracking-wide cursor-not-allowed"
      >
        Sold
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="text-sm text-warm-gray">
          Quantity
        </label>
        <div className="flex items-center border border-border dark:border-warm-gray/30">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-sm text-charcoal dark:text-cream hover:text-terracotta transition-colors"
            aria-label="Decrease quantity"
          >
            &minus;
          </button>
          <input
            id="quantity"
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1) setQuantity(val);
            }}
            className="w-12 text-center text-sm text-charcoal dark:text-cream bg-transparent py-2 border-x border-border dark:border-warm-gray/30 focus:outline-none"
          />
          <button
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="px-3 py-2 text-sm text-charcoal dark:text-cream hover:text-terracotta transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className={`w-full py-3 text-sm font-medium tracking-wide transition-all duration-200 active:scale-[0.97] ${
          added
            ? 'bg-charcoal text-cream'
            : 'bg-terracotta text-white hover:bg-terracotta-dark'
        }`}
      >
        {added ? (
          <span className="inline-flex items-center justify-center gap-1.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M13.25 4.75L6.25 11.25L2.75 7.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Added!
          </span>
        ) : (
          'Add to Cart'
        )}
      </button>
    </div>
  );
}
