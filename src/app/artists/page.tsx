import type { Metadata } from 'next';
import { demoArtists } from '@/lib/demo';
import ArtistGrid from '@/components/artists/ArtistGrid';
import SplitText from '@/components/ui/SplitText';

export const metadata: Metadata = {
  title: 'Our Artists',
  description:
    'Meet the artists of Artisans On Main. Every piece in our Weaverville, NC gallery is handcrafted by makers rooted in Western North Carolina.',
  openGraph: {
    title: 'Our Artists — Artisans On Main',
    description:
      'Meet the painters, ceramicists, jewelers, and craftspeople whose handcrafted work fills our Weaverville, NC gallery.',
  },
};

export default function ArtistsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      <SplitText
        text="Our Artists"
        as="h1"
        className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal dark:text-dark-text leading-tight"
      />
      <p className="mt-5 text-warm-gray text-base md:text-lg max-w-2xl leading-relaxed mb-12">
        Every piece in our gallery is made by hand by artists rooted in Western
        North Carolina. Get to know the makers behind the work.
      </p>
      <ArtistGrid artists={demoArtists} />
    </div>
  );
}
