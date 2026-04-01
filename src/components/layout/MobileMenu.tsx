'use client';

import { useEffect, useCallback, useRef } from 'react';
import Navigation from './Navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
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
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Move focus into the dialog
      closeButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-visibility ${
        isOpen ? 'visible' : 'invisible'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <button
        type="button"
        className={`absolute inset-0 w-full h-full bg-charcoal/40 transition-opacity duration-300 cursor-default ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-label="Close menu"
        tabIndex={-1}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-cream shadow-lg
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex items-center justify-end p-6">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close menu"
            className="text-charcoal hover:text-terracotta transition-colors duration-200 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-4">
          <Navigation mobile onClose={onClose} />
        </div>
      </aside>
    </div>
  );
}
