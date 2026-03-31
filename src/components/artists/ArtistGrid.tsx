import type { DemoArtist } from '@/lib/demo';
import ArtistCard from './ArtistCard';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

interface ArtistGridProps {
  artists: DemoArtist[];
}

export default function ArtistGrid({ artists }: ArtistGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {artists.map((artist, i) => (
        <AnimateOnScroll key={artist.id} delay={i * 100}>
          <ArtistCard artist={artist} />
        </AnimateOnScroll>
      ))}
    </div>
  );
}
