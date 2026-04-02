import type { Metadata } from 'next';
import { demoSiteSettings } from '@/lib/demo';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import SplitText from '@/components/ui/SplitText';

export const metadata: Metadata = {
  title: 'Visit Us',
  description:
    'Plan your visit to Artisans On Main at 18 N Main St, Weaverville, NC. Open Tuesday through Sunday.',
};

export default function VisitPage() {
  const { address, phone, email, hours } = demoSiteSettings;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      <SplitText
        text="Visit Us"
        as="h1"
        className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal leading-tight"
      />
      <p className="mt-5 text-warm-gray text-base md:text-lg max-w-2xl leading-relaxed">
        We&rsquo;d love to see you in the gallery. Stop by to browse, meet our
        artists at an opening, or simply enjoy a quiet moment with beautiful
        things.
      </p>

      <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Map + directions */}
        <div>
          <AnimateOnScroll>
            {/* Google Map embed */}
            <div className="relative aspect-[4/3] bg-cream-dark overflow-hidden">
              <iframe
                title="Artisans On Main location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.5!2d-82.5607!3d35.6971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzQ5LjYiTiA4MsKwMzMnMzguNSJX!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <div className="mt-8">
              <h2 className="font-serif text-2xl font-medium text-charcoal mb-4">
                Getting Here
              </h2>
              <div className="text-warm-gray leading-relaxed space-y-3 text-sm">
                <p>
                  We&rsquo;re located on Main Street in downtown Weaverville,
                  just 10 minutes north of Asheville via US-19/23.
                </p>
                <p>
                  <strong className="text-charcoal">From Asheville:</strong>{' '}
                  Take US-19/23 North (Future I-26) to Exit 21 (Weaverville /
                  New Stock Rd). Turn right onto New Stock Rd, then left onto
                  Main St. The gallery is on your right.
                </p>
                <p>
                  <strong className="text-charcoal">Parking:</strong> Free
                  street parking is available on Main Street and the surrounding
                  blocks. There is also a public lot behind the Town Hall, a
                  short walk from the gallery.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Right: Hours + contact */}
        <div>
          <AnimateOnScroll>
            <section>
              <h2 className="font-serif text-2xl font-medium text-charcoal mb-6">
                Hours
              </h2>
              <dl className="space-y-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-sm">
                    <dt className="text-charcoal font-medium">{h.day}</dt>
                    <dd className="text-warm-gray">
                      {h.open ? `${h.open} – ${h.close}` : 'Closed'}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <section className="mt-10">
              <h2 className="font-serif text-2xl font-medium text-charcoal mb-4">
                Contact
              </h2>
              <address className="not-italic text-sm text-warm-gray leading-relaxed space-y-2">
                <p>{address}</p>
                <p>
                  <a
                    href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                    className="hover:text-terracotta transition-colors duration-200"
                  >
                    {phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-terracotta transition-colors duration-200"
                  >
                    {email}
                  </a>
                </p>
              </address>
            </section>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <section className="mt-10 p-6 bg-cream-dark border border-border">
              <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
                Accessibility
              </h3>
              <p className="text-sm text-warm-gray leading-relaxed">
                Our gallery is wheelchair accessible with step-free entry from
                Main Street. If you have specific accessibility needs, please
                call ahead and we&rsquo;ll be happy to assist.
              </p>
            </section>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
}
