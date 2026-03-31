import Link from 'next/link';

const quickLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/artists', label: 'Artists' },
  { href: '/about', label: 'About' },
  { href: '/visit', label: 'Visit' },
  { href: '/contact', label: 'Contact' },
] as const;

const socialLinks = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://facebook.com', label: 'Facebook' },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-cream-dark" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Column 1: Brand */}
          <div>
            <Link
              href="/"
              className="font-serif text-2xl text-charcoal hover:text-terracotta transition-colors duration-200"
            >
              Artisans On Main
            </Link>
            <p className="mt-3 text-sm text-warm-gray leading-relaxed max-w-xs">
              Handcrafted art and fine goods from the heart of the Blue Ridge
              Mountains.
            </p>
            <div className="mt-5 flex gap-4">
              {socialLinks.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  className="text-warm-gray hover:text-terracotta transition-colors duration-200 text-sm"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="text-sm font-sans font-semibold tracking-wide uppercase text-charcoal mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-warm-gray hover:text-terracotta transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hours & Address */}
          <div>
            <h3 className="text-sm font-sans font-semibold tracking-wide uppercase text-charcoal mb-4">
              Visit Us
            </h3>
            <address className="not-italic text-sm text-warm-gray leading-relaxed space-y-2.5">
              <p>18 N Main St</p>
              <p>Weaverville, NC 28787</p>
              <p>(828) 555-0192</p>
            </address>
            <div className="mt-4 text-sm text-warm-gray leading-relaxed space-y-1">
              <p>Mon: Closed</p>
              <p>Tue&ndash;Sat: 10am &ndash; 6pm</p>
              <p>Sun: 12pm &ndash; 5pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-xs text-warm-gray text-center">
            &copy; {currentYear} Artisans On Main. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
