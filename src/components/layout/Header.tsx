'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import MobileMenu from './MobileMenu';
import CartSlideOut from './CartSlideOut';

const desktopNavLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/artists', label: 'Artists' },
  { href: '/about', label: 'About' },
  { href: '/visit', label: 'Visit' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, openSlideOut } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [inverted, setInverted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const rafId = useRef(0);

  const checkDarkSections = useCallback(() => {
    if (!headerRef.current) return;
    const headerRect = headerRef.current.getBoundingClientRect();
    const headerMid = headerRect.top + headerRect.height / 2;

    // Check if header overlaps any dark-section element
    const darkSections = document.querySelectorAll('[data-theme="dark"]');
    let overDark = false;
    darkSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (headerMid >= rect.top && headerMid <= rect.bottom) {
        overDark = true;
      }
    });
    setInverted(overDark);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        checkDarkSections();
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [checkDarkSections]);

  // When over a data-theme="dark" section, always use light text.
  // Otherwise, use charcoal in light mode, cream in dark mode.
  const textColor = inverted ? 'text-cream' : 'text-charcoal dark:text-cream';
  const hoverColor = inverted ? 'hover:text-terracotta-light' : 'hover:text-terracotta';

  return (
    <>
      <header
        ref={headerRef}
        className={`scroll-state-target sticky top-0 z-40 transition-all duration-500 ${
          inverted
            ? scrolled
              ? 'bg-charcoal/80 backdrop-blur-md shadow-sm border-b border-transparent'
              : 'bg-charcoal/60 backdrop-blur-sm md:bg-transparent border-b border-transparent'
            : scrolled
              ? 'bg-cream/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-sm border-b border-transparent'
              : 'bg-cream dark:bg-dark-bg border-b border-border dark:border-dark-border'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
            {/* Logo / Business name */}
            <Link
              href="/"
              className={`font-serif text-xl sm:text-2xl tracking-tight transition-colors duration-500 ${textColor} ${hoverColor}`}
            >
              Artisans On Main
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {desktopNavLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`group relative text-sm font-medium tracking-wide transition-colors duration-500 ${textColor} ${hoverColor}`}
                >
                  {label}
                  {/* Animated underline */}
                  <span className={`absolute -bottom-1 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300 ease-out ${inverted ? 'bg-terracotta-light' : 'bg-terracotta'}`} />
                </Link>
              ))}
            </nav>

            {/* Right section: theme toggle + cart + mobile hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme toggle — desktop only, mobile toggle lives in MobileMenu */}
              <ThemeToggle className={`hidden md:flex ${textColor} ${hoverColor}`} />

              {/* Cart icon */}
              <button
                onClick={openSlideOut}
                aria-label={`Shopping cart, ${itemCount} items`}
                className={`relative transition-colors duration-500 p-1 ${textColor} ${hoverColor}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-medium text-white">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className={`md:hidden transition-colors duration-500 p-1 ${textColor} ${hoverColor}`}
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
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
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Cart slide-out */}
      <CartSlideOut />
    </>
  );
}
