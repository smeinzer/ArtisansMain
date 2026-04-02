'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { demoSiteSettings } from '@/lib/demo';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/artists', label: 'Artists' },
  { href: '/about', label: 'About' },
  { href: '/visit', label: 'Visit' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [animateLinks, setAnimateLinks] = useState(false);

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
      closeButtonRef.current?.focus();
      // Stagger link animations after panel slides in
      const timer = setTimeout(() => setAnimateLinks(true), 150);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      setAnimateLinks(false);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Return focus to the trigger button, then immediately blur
      // so the outline doesn't persist on mobile scroll
      const trigger = document.getElementById('mobile-menu-trigger');
      if (trigger) {
        trigger.focus();
        trigger.blur();
      }
    }
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
        className={`absolute inset-0 w-full h-full bg-charcoal/50 backdrop-blur-sm transition-opacity duration-300 cursor-default ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-label="Close menu"
        tabIndex={-1}
      />

      {/* Full-screen panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        className={`absolute inset-0 bg-cream dark:bg-dark-bg flex flex-col
          transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-serif text-xl text-charcoal dark:text-dark-text tracking-tight">
            Artisans On Main
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle className="text-charcoal dark:text-dark-text hover:text-terracotta" />
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close menu"
              className="text-charcoal dark:text-dark-text hover:text-terracotta transition-colors duration-200 p-1"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
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
        </div>

        {/* Navigation links — staggered entrance */}
        <nav className="flex-1 flex flex-col justify-center px-10" aria-label="Mobile navigation">
          <ul className="space-y-6">
            {navLinks.map(({ href, label }, i) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`block font-serif text-4xl sm:text-5xl font-medium tracking-tight transition-colors duration-200 ${
                      isActive ? 'text-terracotta' : 'text-charcoal dark:text-dark-text'
                    }`}
                    style={{
                      opacity: animateLinks ? 1 : 0,
                      transform: animateLinks ? 'translateY(0)' : 'translateY(20px)',
                      transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms`,
                    }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom info */}
        <div
          className="px-10 pb-10"
          style={{
            opacity: animateLinks ? 1 : 0,
            transform: animateLinks ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity 0.5s ease-out ${navLinks.length * 80 + 100}ms, transform 0.5s ease-out ${navLinks.length * 80 + 100}ms`,
          }}
        >
          <div className="border-t border-border dark:border-dark-border pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <address className="not-italic text-sm text-warm-gray dark:text-dark-text-muted">
              {demoSiteSettings.address}
            </address>
            <a
              href={`tel:${demoSiteSettings.phone.replace(/[^+\d]/g, '')}`}
              className="text-sm text-warm-gray dark:text-dark-text-muted hover:text-terracotta transition-colors"
            >
              {demoSiteSettings.phone}
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
