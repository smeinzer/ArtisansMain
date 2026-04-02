import Link from 'next/link';

const quickLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/artists', label: 'Artists' },
  { href: '/about', label: 'About' },
  { href: '/visit', label: 'Visit' },
  { href: '/contact', label: 'Contact' },
] as const;

const socialLinks = [
  { href: 'https://www.instagram.com/artisansonmain/', label: 'Instagram' },
  { href: 'https://www.facebook.com/artisansonmain.nc/', label: 'Facebook' },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-theme="dark" className="sticky bottom-0 z-0 bg-charcoal text-cream" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 pt-16 pb-12 md:pt-20 md:pb-16">
        {/* Large brand mark */}
        <Link
          href="/"
          className="block font-serif text-3xl md:text-4xl text-cream hover:text-terracotta-light transition-colors duration-200 tracking-tight"
        >
          Artisans On Main
        </Link>
        <p className="mt-3 text-sm text-warm-gray leading-relaxed max-w-sm">
          Handcrafted art and fine goods from the heart of the Blue Ridge
          Mountains.
        </p>

        {/* Divider */}
        <div className="mt-10 mb-10 h-px bg-cream/10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
          {/* Column 1: Quick links */}
          <div>
            <h3 className="text-xs font-sans font-semibold tracking-[0.15em] uppercase text-cream/50 mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group relative text-sm text-cream/80 hover:text-terracotta-light transition-colors duration-200 inline-block"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-terracotta-light/50 group-hover:w-full transition-all duration-300 ease-out" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Hours & Address */}
          <div>
            <h3 className="text-xs font-sans font-semibold tracking-[0.15em] uppercase text-cream/50 mb-4">
              Visit Us
            </h3>
            <address className="not-italic text-sm text-cream/70 leading-relaxed space-y-2.5">
              <p>18 N Main St</p>
              <p>Weaverville, NC 28787</p>
              <p>(828) 658-9617</p>
            </address>
            <div className="mt-4 text-sm text-cream/50 leading-relaxed space-y-1">
              <p>Mon: Closed</p>
              <p>Tue&ndash;Sat: 10am &ndash; 6pm</p>
              <p>Sun: 12pm &ndash; 5pm</p>
            </div>
          </div>

          {/* Column 3: Social */}
          <div>
            <h3 className="text-xs font-sans font-semibold tracking-[0.15em] uppercase text-cream/50 mb-4">
              Follow Along
            </h3>
            <div className="flex flex-col gap-2.5">
              {socialLinks.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  className="group relative text-sm text-cream/80 hover:text-terracotta-light transition-colors duration-200 inline-block"
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-terracotta-light/50 group-hover:w-full transition-all duration-300 ease-out" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-6">
          <p className="text-xs text-cream/30 text-center">
            &copy; {currentYear} Artisans On Main. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
