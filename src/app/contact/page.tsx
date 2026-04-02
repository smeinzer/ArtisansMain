'use client';

import { useState } from 'react';
import { demoSiteSettings } from '@/lib/demo';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import SplitText from '@/components/ui/SplitText';
import { FloatingInput, FloatingTextarea, FloatingSelect } from '@/components/ui/FloatingInput';

export default function ContactPage() {
  const { phone, email, address, socialLinks } = demoSiteSettings;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'placeholder_id';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    if (formspreeId === 'placeholder_id') {
      // Demo mode: simulate submission
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      <SplitText
        text="Get in Touch"
        as="h1"
        className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal dark:text-cream leading-tight"
      />
      <p className="mt-5 text-warm-gray text-base md:text-lg max-w-2xl leading-relaxed">
        Have a question about a piece, interested in consigning your work, or
        just want to say hello? We&rsquo;d love to hear from you.
      </p>

      <div className="mt-12 md:mt-16 grid md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">
        {/* Contact form */}
        <AnimateOnScroll>
          {submitted ? (
            <div className="py-16 text-center" role="status" aria-live="polite">
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal mb-3">
                Message Sent
              </h2>
              <p className="text-warm-gray leading-relaxed">
                Thank you for reaching out. We&rsquo;ll get back to you as soon
                as we can.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm text-terracotta hover:text-terracotta-dark transition-colors duration-200"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <FloatingInput
                  id="name"
                  name="name"
                  label="Name"
                  required
                />
                <FloatingInput
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  required
                />
              </div>

              <FloatingSelect
                id="subject"
                name="subject"
                label="Subject"
                required
                options={[
                  { value: 'General Inquiry', label: 'General Inquiry' },
                  { value: 'About a Piece', label: 'Question About a Piece' },
                  { value: 'Consignment', label: 'Consignment / Artist Application' },
                  { value: 'Events', label: 'Events & Gallery Openings' },
                  { value: 'Other', label: 'Other' },
                ]}
              />

              <FloatingTextarea
                id="message"
                name="message"
                label="Message"
                rows={5}
                required
              />

              <button
                type="submit"
                disabled={submitting}
                className="bg-terracotta text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-terracotta-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {submitting ? 'Sending...' : 'Send Message'}
                </span>
              </button>
            </form>
          )}
        </AnimateOnScroll>

        {/* Sidebar: contact info */}
        <AnimateOnScroll delay={150}>
          <aside className="space-y-8">
            <section>
              <h2 className="text-xs font-sans font-semibold tracking-wide uppercase text-charcoal mb-3">
                Address
              </h2>
              <address className="not-italic text-sm text-warm-gray leading-relaxed">
                <p>{address}</p>
              </address>
            </section>

            <section>
              <h2 className="text-xs font-sans font-semibold tracking-wide uppercase text-charcoal mb-3">
                Phone
              </h2>
              <a
                href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                className="text-sm text-warm-gray hover:text-terracotta transition-colors duration-200"
              >
                {phone}
              </a>
            </section>

            <section>
              <h2 className="text-xs font-sans font-semibold tracking-wide uppercase text-charcoal mb-3">
                Email
              </h2>
              <a
                href={`mailto:${email}`}
                className="text-sm text-warm-gray hover:text-terracotta transition-colors duration-200"
              >
                {email}
              </a>
            </section>

            <section>
              <h2 className="text-xs font-sans font-semibold tracking-wide uppercase text-charcoal mb-3">
                Social
              </h2>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-warm-gray hover:text-terracotta transition-colors duration-200 capitalize"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </section>

            <section className="p-6 bg-cream-dark border border-border">
              <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
                For Artists
              </h3>
              <p className="text-sm text-warm-gray leading-relaxed">
                Interested in consigning your work with us? Select
                &ldquo;Consignment / Artist Application&rdquo; above, or email
                us directly at{' '}
                <a
                  href={`mailto:${email}`}
                  className="text-terracotta hover:text-terracotta-dark transition-colors"
                >
                  {email}
                </a>{' '}
                with 10–15 images of recent work and a brief artist statement.
              </p>
            </section>
          </aside>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
