import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Artisans On Main. Questions about a piece, consignment inquiries, or just want to say hello — we\'d love to hear from you.',
  openGraph: {
    title: 'Contact — Artisans On Main',
    description:
      'Reach out to Artisans On Main in Weaverville, NC. Questions, consignment inquiries, and general contact.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
