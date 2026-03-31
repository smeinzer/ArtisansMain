'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  mobile?: boolean;
  onClose?: () => void;
}

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/artists', label: 'Artists' },
  { href: '/about', label: 'About' },
  { href: '/visit', label: 'Visit' },
  { href: '/contact', label: 'Contact' },
] as const;

export default function Navigation({ mobile = false, onClose }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={mobile ? 'Mobile navigation' : 'Main navigation'}>
      <ul
        className={
          mobile
            ? 'flex flex-col gap-6'
            : 'flex items-center gap-8'
        }
      >
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                className={`
                  transition-colors duration-200
                  ${mobile ? 'text-2xl font-serif' : 'text-sm tracking-wide'}
                  ${
                    isActive
                      ? 'text-terracotta'
                      : 'text-charcoal hover:text-terracotta'
                  }
                `}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
