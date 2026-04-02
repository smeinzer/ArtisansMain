import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Browse handcrafted paintings, ceramics, jewelry, and fine craft from Western North Carolina artists at Artisans On Main in Weaverville, NC.',
  openGraph: {
    title: 'Shop — Artisans On Main',
    description:
      'Browse handcrafted paintings, ceramics, jewelry, and fine craft from Western North Carolina artists.',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
