import Link from 'next/link';
import { demoSiteSettings } from '@/lib/demo';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import MagneticButton from '@/components/ui/MagneticButton';

export default function VisitTeaser() {
  const { address, phone } = demoSiteSettings;
  const openDays = demoSiteSettings.hours.filter((h) => h.open !== null);

  return (
    <section className="py-20 md:py-32 px-6 bg-charcoal text-cream relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-cream">
            Come See Us
          </h2>
          <p className="mt-4 text-warm-gray-light text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Visit our gallery in the heart of downtown Weaverville, just minutes north of Asheville.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-left max-w-lg mx-auto">
            <div>
              <h3 className="text-xs font-sans font-semibold tracking-[0.15em] uppercase text-terracotta-light mb-2">
                Location
              </h3>
              <address className="not-italic text-sm text-cream/70 leading-relaxed">
                <p>{address}</p>
                <p className="mt-1">{phone}</p>
              </address>
            </div>
            <div>
              <h3 className="text-xs font-sans font-semibold tracking-[0.15em] uppercase text-terracotta-light mb-2">
                Hours
              </h3>
              <div className="text-sm text-cream/70 space-y-0.5">
                <p>Mon: Closed</p>
                {openDays.length > 0 && (
                  <>
                    <p>
                      Tue&ndash;Sat: {openDays[0].open} &ndash; {openDays[0].close}
                    </p>
                    <p>
                      Sun: {openDays[openDays.length - 1].open} &ndash;{' '}
                      {openDays[openDays.length - 1].close}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={250}>
          <div className="mt-12">
            <MagneticButton strength={0.25}>
              <Link
                href="/visit"
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wide text-charcoal bg-cream hover:bg-white transition-colors duration-200"
              >
                Plan Your Visit
              </Link>
            </MagneticButton>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
