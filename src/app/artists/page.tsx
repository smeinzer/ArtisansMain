import { demoArtists } from '@/lib/demo';
import ArtistGrid from '@/components/artists/ArtistGrid';

export default function ArtistsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      <h1 className="font-serif text-4xl md:text-5xl font-medium text-charcoal mb-3">
        Our Artists
      </h1>
      <p className="text-warm-gray text-base md:text-lg max-w-2xl mb-12">
        Every piece in our gallery is made by hand by artists rooted in Western
        North Carolina. Get to know the makers behind the work.
      </p>
      <ArtistGrid artists={demoArtists} />
    </div>
  );
}
