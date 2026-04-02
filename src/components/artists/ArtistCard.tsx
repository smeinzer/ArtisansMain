import Image from 'next/image';
import Link from 'next/link';
import type { DemoArtist } from '@/lib/demo';
import ImageReveal from '@/components/ui/ImageReveal';
import KineticText from '@/components/ui/KineticText';

interface ArtistCardProps {
  artist: DemoArtist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/artists/${artist.slug}`} className="group block">
      <ImageReveal direction="up" className="relative aspect-[3/4] bg-cream-dark dark:bg-dark-surface overflow-hidden">
        <Image
          src={artist.headshot}
          alt={`Portrait of ${artist.name}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Hover overlay with name */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
          <span className="text-xs font-sans font-semibold tracking-[0.15em] uppercase text-white/80">
            View Work
          </span>
        </div>
      </ImageReveal>
      <div className="mt-4">
        <h3 className="font-serif text-xl text-charcoal dark:text-dark-text group-hover:text-terracotta transition-colors duration-200">
          <KineticText
            text={artist.name}
            weightFrom={500}
            weightTo={700}
            radius={3}
            duration={250}
          />
        </h3>
        <p className="mt-1.5 text-sm text-warm-gray line-clamp-2 leading-relaxed">
          {artist.bio}
        </p>
      </div>
    </Link>
  );
}
