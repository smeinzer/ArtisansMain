'use client';

import { useState } from 'react';
import { demoSiteSettings } from '@/lib/demo';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

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
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal leading-tight">
        Get in Touch
      </h1>
      <p className="mt-4 text-warm-gray text-base md:text-lg max-w-2xl leading-relaxed">
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-charcoal mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    aria-required="true"
                    className="w-full border border-border bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-warm-gray-light focus:outline-none focus:border-terracotta transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-charcoal mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    aria-required="true"
                    className="w-full border border-border bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-warm-gray-light focus:outline-none focus:border-terracotta transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-charcoal mb-1.5"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  aria-required="true"
                  className="w-full border border-border bg-white px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-terracotta transition-colors"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="About a Piece">Question About a Piece</option>
                  <option value="Consignment">
                    Consignment / Artist Application
                  </option>
                  <option value="Events">Events &amp; Gallery Openings</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-charcoal mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  aria-required="true"
                  rows={6}
                  className="w-full border border-border bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-warm-gray-light focus:outline-none focus:border-terracotta transition-colors resize-y"
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="bg-terracotta text-white px-10 py-3 tracking-wide hover:bg-terracotta-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : 'Send Message'}
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
