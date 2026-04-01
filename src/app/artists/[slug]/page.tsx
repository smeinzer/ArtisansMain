import Image from 'next/image';
import Link from 'next/link';
import { demoArtists, demoProducts } from '@/lib/demo';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductCard from '@/components/shop/ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;

  const artist = demoArtists.find((a) => a.slug === slug);

  if (!artist) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-charcoal mb-4">
          Artist not found
        </h1>
        <p className="text-warm-gray mb-8">
          The artist you are looking for does not exist.
        </p>
        <Link
          href="/artists"
          className="inline-block bg-terracotta text-white px-8 py-3 tracking-wide hover:bg-terracotta-dark transition-colors duration-200"
        >
          View All Artists
        </Link>
      </div>
    );
  }

  const artistProducts = demoProducts.filter(
    (p) => p.artist === artist.name
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Artists', href: '/artists' },
          { label: artist.name },
        ]}
      />

      {/* Artist profile */}
      <div className="mt-8 grid md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr] gap-10 lg:gap-16">
        {/* Headshot */}
        <div className="relative aspect-square overflow-hidden bg-cream-dark">
          <Image
            src={artist.headshot}
            alt={`Portrait of ${artist.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 360px"
            priority
          />
        </div>

        {/* Bio and links */}
        <div className="flex flex-col gap-5">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-charcoal leading-tight">
            {artist.name}
          </h1>

          <p className="text-warm-gray leading-relaxed text-base md:text-lg">
            {artist.bio}
          </p>

          {/* Links */}
          {(artist.website || artist.instagram) && (
            <div className="flex flex-wrap gap-4 pt-2">
              {artist.website && (
                <a
                  href={artist.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-charcoal hover:text-terracotta transition-colors duration-200 flex items-center gap-1.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                  Website
                </a>
              )}
              {artist.instagram && (
                <a
                  href={`https://instagram.com/${artist.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-charcoal hover:text-terracotta transition-colors duration-200 flex items-center gap-1.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  @{artist.instagram}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Artist's work */}
      {artistProducts.length > 0 && (
        <section className="mt-16 md:mt-24">
          <AnimateOnScroll>
            <SectionHeading
              title={`Work by ${artist.name}`}
              subtitle={`${artistProducts.length} piece${artistProducts.length !== 1 ? 's' : ''} currently in the gallery`}
              align="left"
            />
          </AnimateOnScroll>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {artistProducts.map((product, i) => (
              <AnimateOnScroll key={product.id} delay={i * 100}>
                <ProductCard product={product} />
              </AnimateOnScroll>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
