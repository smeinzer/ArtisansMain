'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
      <h1 className="font-serif text-4xl md:text-5xl font-medium text-charcoal dark:text-dark-text mb-10">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-warm-gray dark:text-dark-text-muted text-lg mb-6">Your cart is empty.</p>
          <Link
            href="/shop"
            className="inline-block bg-terracotta text-white px-8 py-3 tracking-wide hover:bg-terracotta-dark transition-colors duration-200"
          >
            Browse the Collection
          </Link>
        </div>
      ) : (
        <>
          {/* Header row */}
          <div className="hidden md:grid md:grid-cols-[1fr_120px_120px_40px] gap-4 pb-4 border-b border-border dark:border-dark-border text-xs text-warm-gray dark:text-dark-text-muted uppercase tracking-wide">
            <span>Product</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Total</span>
            <span />
          </div>

          {/* Cart items */}
          <ul className="divide-y divide-border dark:divide-dark-border">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="py-6 grid grid-cols-[80px_1fr] md:grid-cols-[1fr_120px_120px_40px] gap-4 md:gap-6 items-center"
              >
                {/* Product info */}
                <div className="col-span-2 md:col-span-1 flex gap-4">
                  <Link
                    href={`/shop/${item.product.handle}`}
                    className="relative w-20 h-24 flex-shrink-0 bg-cream-dark dark:bg-dark-surface overflow-hidden"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>
                  <div className="min-w-0">
                    <Link
                      href={`/shop/${item.product.handle}`}
                      className="text-sm font-medium text-charcoal dark:text-dark-text hover:text-terracotta transition-colors duration-200"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-xs text-warm-gray dark:text-dark-text-muted mt-0.5">
                      {item.product.artist}
                    </p>
                    <p className="text-sm text-charcoal-light dark:text-dark-text-muted mt-1">
                      ${item.product.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-center col-start-2 md:col-start-auto">
                  <div className="flex items-center border border-border dark:border-dark-border">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="px-2.5 py-1.5 text-sm text-charcoal dark:text-dark-text hover:text-terracotta transition-colors"
                      aria-label={`Decrease quantity of ${item.product.title}`}
                    >
                      &minus;
                    </button>
                    <span className="px-3 py-1.5 text-sm text-charcoal dark:text-dark-text min-w-[32px] text-center border-x border-border dark:border-dark-border">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="px-2.5 py-1.5 text-sm text-charcoal dark:text-dark-text hover:text-terracotta transition-colors"
                      aria-label={`Increase quantity of ${item.product.title}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Line total */}
                <p className="hidden md:block text-sm text-charcoal dark:text-dark-text text-right">
                  ${(item.product.price * item.quantity).toLocaleString()}
                </p>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="hidden md:block text-warm-gray dark:text-dark-text-muted hover:text-terracotta transition-colors duration-200"
                  aria-label={`Remove ${item.product.title} from cart`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Mobile: line total + remove */}
                <div className="flex items-center justify-between col-span-2 md:hidden">
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-xs text-warm-gray dark:text-dark-text-muted hover:text-terracotta transition-colors duration-200"
                    aria-label={`Remove ${item.product.title} from cart`}
                  >
                    Remove
                  </button>
                  <p className="text-sm font-medium text-charcoal dark:text-dark-text">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="border-t border-border dark:border-dark-border mt-2 pt-8">
            <div className="flex flex-col items-end gap-4">
              <div className="flex justify-between w-full max-w-xs text-base">
                <span className="text-warm-gray dark:text-dark-text-muted">
                  Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})
                </span>
                <span className="font-medium text-charcoal dark:text-dark-text">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-warm-gray dark:text-dark-text-muted">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                className="w-full max-w-xs bg-terracotta text-white py-3.5 tracking-wide hover:bg-terracotta-dark transition-colors duration-200"
                onClick={() => {
                  alert('Shopify checkout is not connected yet. In production, this redirects to Shopify hosted checkout.');
                }}
              >
                Proceed to Checkout
              </button>
              <Link
                href="/shop"
                className="text-sm text-charcoal dark:text-dark-text hover:text-terracotta transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
