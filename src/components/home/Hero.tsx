import Link from 'next/link';
import ParallaxImage from '@/components/ui/ParallaxImage';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';

interface HeroProps {
  imageUrl?: string;
  headline?: string;
  subline?: string;
}

const DEFAULTS = {
  imageUrl: 'https://picsum.photos/seed/artisans-hero/1600/900',
  headline: 'Handcrafted Art from the Blue Ridge',
  subline:
    'A curated collection of paintings, ceramics, jewelry, and fine craft from the artists of Western North Carolina.',
};

export default function Hero({ imageUrl, headline, subline }: HeroProps) {
  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      <ParallaxImage
        src={imageUrl || DEFAULTS.imageUrl}
        alt="Curated handcrafted art displayed in the Artisans On Main gallery"
        priority
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-charcoal/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <TextReveal
            text={headline || DEFAULTS.headline}
            as="h1"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.1]"
            trigger="onMount"
            delay={200}
            staggerDelay={60}
          />
          <p className="animate-hero-fade-in mt-4 md:mt-6 text-base md:text-lg text-white/85 max-w-lg mx-auto leading-relaxed" style={{ animationDelay: '0.4s' }}>
            {subline || DEFAULTS.subline}
          </p>
          <div className="animate-hero-fade-in mt-8 flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.6s' }}>
            <MagneticButton strength={0.25}>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wide text-charcoal bg-cream hover:bg-white transition-colors duration-200"
              >
                Browse the Collection
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <Link
                href="/artists"
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wide text-white border border-white/60 hover:bg-white/10 transition-colors duration-200"
              >
                Meet the Artists
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
