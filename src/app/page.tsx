import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Announcements from '@/components/home/Announcements';
import VisitTeaser from '@/components/home/VisitTeaser';

export const metadata: Metadata = {
  title: 'Artisans On Main — Curated Art Gallery in Weaverville, NC',
  description:
    'Discover handcrafted paintings, ceramics, jewelry, and more from local Appalachian artists at Artisans On Main in Weaverville, NC.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Announcements />
      <VisitTeaser />
    </>
  );
}
