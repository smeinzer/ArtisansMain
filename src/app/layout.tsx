import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/components/ui/Toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';
import ScrollProgress from '@/components/ui/ScrollProgress';
import './globals.css';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://artisans-on-main.vercel.app'),
  title: {
    template: '%s — Artisans On Main',
    default: 'Artisans On Main — Curated Art Gallery in Weaverville, NC',
  },
  description:
    'Artisans On Main is a curated art consignment gallery in Weaverville, NC featuring handcrafted paintings, ceramics, jewelry, and more from local Appalachian artists.',
  keywords: [
    'art gallery',
    'Weaverville NC',
    'Appalachian artists',
    'handcrafted art',
    'consignment gallery',
    'ceramics',
    'paintings',
    'jewelry',
    'Blue Ridge art',
    'Western North Carolina',
  ],
  authors: [{ name: 'Artisans On Main' }],
  openGraph: {
    title: 'Artisans On Main — Curated Art Gallery in Weaverville, NC',
    description:
      'Artisans On Main is a curated art consignment gallery in Weaverville, NC featuring handcrafted paintings, ceramics, jewelry, and more from local Appalachian artists.',
    url: 'https://artisans-on-main.vercel.app',
    siteName: 'Artisans On Main',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artisans On Main — Curated Art Gallery in Weaverville, NC',
    description:
      'Artisans On Main is a curated art consignment gallery in Weaverville, NC featuring handcrafted paintings, ceramics, jewelry, and more from local Appalachian artists.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ArtGallery',
  name: 'Artisans On Main',
  description:
    'Curated art consignment gallery featuring handcrafted works from local Appalachian artists',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '18 N Main St',
    addressLocality: 'Weaverville',
    addressRegion: 'NC',
    postalCode: '28787',
    addressCountry: 'US',
  },
  telephone: '(828) 658-9617',
  url: 'https://artisans-on-main.vercel.app',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '12:00',
      closes: '17:00',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <ToastProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-terracotta focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
          >
            Skip to main content
          </a>
          <ScrollProgress />
          <Header />
          <main id="main-content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
