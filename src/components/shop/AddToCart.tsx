'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { DemoProduct } from '@/lib/demo';

interface AddToCartProps {
  product: DemoProduct;
}

export default function AddToCart({ product }: AddToCartProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product.available) {
    return (
      <button
        disabled
        className="w-full bg-warm-gray-light text-warm-gray py-3.5 tracking-wide cursor-not-allowed"
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
        <div className="flex items-center border border-border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-sm text-charcoal hover:text-terracotta transition-colors"
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
            className="w-12 text-center text-sm text-charcoal bg-transparent py-2 border-x border-border focus:outline-none"
          />
          <button
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            className="px-3 py-2 text-sm text-charcoal hover:text-terracotta transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          addItem(product, quantity);
          setQuantity(1);
        }}
        className="w-full bg-terracotta text-white py-3.5 tracking-wide hover:bg-terracotta-dark transition-colors duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
}
