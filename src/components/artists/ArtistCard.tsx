import Image from 'next/image';
import Link from 'next/link';
import type { DemoArtist } from '@/lib/demo';
import ImageReveal from '@/components/ui/ImageReveal';

interface ArtistCardProps {
  artist: DemoArtist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/artists/${artist.slug}`} className="group block">
      <ImageReveal direction="up" className="relative aspect-square bg-cream-dark">
        <Image
          src={artist.headshot}
          alt={`Portrait of ${artist.name}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </ImageReveal>
      <div className="mt-4">
        <h3 className="font-serif text-xl font-medium text-charcoal group-hover:text-terracotta transition-colors duration-200">
          {artist.name}
        </h3>
        <p className="mt-1 text-sm text-warm-gray line-clamp-2 leading-relaxed">
          {artist.bio}
        </p>
      </div>
    </Link>
  );
}
