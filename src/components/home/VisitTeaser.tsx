import Link from 'next/link';
import { demoSiteSettings } from '@/lib/demo';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import MagneticButton from '@/components/ui/MagneticButton';

export default function VisitTeaser() {
  const { address, phone } = demoSiteSettings;
  const openDays = demoSiteSettings.hours.filter((h) => h.open !== null);

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
            Come See Us
          </h2>
          <p className="mt-4 text-warm-gray text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Visit our gallery in the heart of downtown Weaverville, just minutes north of Asheville.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-left max-w-lg mx-auto">
            <div>
              <h3 className="text-xs font-sans font-semibold tracking-wide uppercase text-charcoal mb-2">
                Location
              </h3>
              <address className="not-italic text-sm text-warm-gray leading-relaxed">
                <p>{address}</p>
                <p className="mt-1">{phone}</p>
              </address>
            </div>
            <div>
              <h3 className="text-xs font-sans font-semibold tracking-wide uppercase text-charcoal mb-2">
                Hours
              </h3>
              <div className="text-sm text-warm-gray space-y-0.5">
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
          <div className="mt-10">
            <MagneticButton strength={0.25}>
              <Link
                href="/visit"
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wide text-white bg-terracotta hover:bg-terracotta-dark transition-colors duration-200"
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
