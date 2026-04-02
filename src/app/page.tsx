import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Announcements from '@/components/home/Announcements';
import Marquee from '@/components/ui/Marquee';
import VisitTeaser from '@/components/home/VisitTeaser';
import { client } from '@/lib/sanity/client';
import { getHomepageConfig } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';

// Revalidate every 60 seconds so CMS changes appear quickly
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Artisans On Main — Curated Art Gallery in Weaverville, NC',
  description:
    'Discover handcrafted paintings, ceramics, jewelry, and more from local Appalachian artists at Artisans On Main in Weaverville, NC.',
};

export default async function HomePage() {
  let heroImageUrl: string | undefined;
  let heroHeadline: string | undefined;
  let heroSubline: string | undefined;

  try {
    const config = await client.fetch(getHomepageConfig);
    if (config) {
      if (config.heroImage) {
        heroImageUrl = urlFor(config.heroImage).width(1600).height(900).url();
      }
      heroHeadline = config.heroHeadline;
      heroSubline = config.heroSubline;
    }
  } catch {
    // Sanity unavailable — fall through to defaults
  }

  return (
    <>
      <Hero
        imageUrl={heroImageUrl}
        headline={heroHeadline}
        subline={heroSubline}
      />
      <FeaturedProducts />
      <Marquee
        items={['Paintings', 'Ceramics', 'Jewelry', 'Textiles', 'Sculpture', 'Photography', 'Mixed Media']}
      />
      <Announcements />
      <VisitTeaser />
    </>
  );
}
