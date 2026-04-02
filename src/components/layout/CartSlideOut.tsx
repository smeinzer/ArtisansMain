'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartSlideOut() {
  const { items, removeItem, updateQuantity, subtotal, itemCount, isSlideOutOpen, closeSlideOut } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isSlideOutOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSlideOutOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeSlideOut();
    }

    // Trap focus inside the panel
    if (e.key === 'Tab' && panelRef.current) {
      const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }
  }, [closeSlideOut]);

  useEffect(() => {
    if (isSlideOutOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isSlideOutOpen, handleKeyDown]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-visibility ${isSlideOutOpen ? 'visible' : 'invisible'}`}
      aria-hidden={!isSlideOutOpen}
    >
      {/* Backdrop */}
      <button
        type="button"
        className={`absolute inset-0 w-full h-full bg-charcoal/40 transition-opacity duration-300 cursor-default ${isSlideOutOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeSlideOut}
        aria-label="Close cart"
        tabIndex={-1}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute top-0 right-0 h-full w-96 max-w-[90vw] bg-cream dark:bg-dark-bg shadow-lg
          flex flex-col transition-transform duration-300 ease-in-out
          ${isSlideOutOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border dark:border-dark-border">
          <h2 className="font-serif text-xl font-medium text-charcoal dark:text-dark-text">
            Your Cart ({itemCount})
          </h2>
          <button
            ref={closeButtonRef}
            onClick={closeSlideOut}
            aria-label="Close cart"
            className="text-charcoal dark:text-dark-text hover:text-terracotta transition-colors duration-200 p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-warm-gray dark:text-dark-text-muted mb-4">Your cart is empty</p>
              <button
                onClick={closeSlideOut}
                className="text-sm text-terracotta hover:text-terracotta-dark transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4">
                  <Link
                    href={`/shop/${item.product.handle}`}
                    onClick={closeSlideOut}
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
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.product.handle}`}
                      onClick={closeSlideOut}
                      className="text-sm font-medium text-charcoal dark:text-dark-text hover:text-terracotta transition-colors duration-200 line-clamp-2"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-xs text-warm-gray dark:text-dark-text-muted mt-0.5">
                      {item.product.artist}
                    </p>
                    <p className="text-sm text-charcoal dark:text-dark-text mt-1">
                      ${item.product.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-border dark:border-dark-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-xs text-charcoal dark:text-dark-text hover:text-terracotta transition-colors"
                          aria-label={`Decrease quantity of ${item.product.title}`}
                        >
                          &minus;
                        </button>
                        <span className="px-2 py-1 text-xs text-charcoal dark:text-dark-text min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-xs text-charcoal dark:text-dark-text hover:text-terracotta transition-colors"
                          aria-label={`Increase quantity of ${item.product.title}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-xs text-warm-gray dark:text-dark-text-muted hover:text-terracotta transition-colors duration-200"
                        aria-label={`Remove ${item.product.title} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border dark:border-dark-border px-6 py-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-warm-gray dark:text-dark-text-muted">Subtotal</span>
              <span className="font-medium text-charcoal dark:text-dark-text">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-warm-gray dark:text-dark-text-muted">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              className="w-full bg-terracotta text-white py-3 tracking-wide hover:bg-terracotta-dark transition-colors duration-200"
              onClick={() => {
                closeSlideOut();
                alert('Shopify checkout is not connected yet. In production, this redirects to Shopify hosted checkout.');
              }}
            >
              Proceed to Checkout
            </button>
            <Link
              href="/cart"
              onClick={closeSlideOut}
              className="block w-full text-center text-sm text-charcoal dark:text-dark-text hover:text-terracotta transition-colors duration-200 py-1"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
