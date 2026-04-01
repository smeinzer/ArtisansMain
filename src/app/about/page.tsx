import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Artisans On Main, a curated art consignment gallery in Weaverville, NC showcasing handcrafted work from Western North Carolina artists.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      {/* Hero section */}
      <div className="max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal leading-tight">
          A Gallery Built on Craft
        </h1>
        <p className="mt-6 text-warm-gray text-base md:text-lg leading-relaxed">
          Artisans On Main is a curated consignment gallery in the heart of
          downtown Weaverville, North Carolina — just minutes north of
          Asheville. We exist to connect the talented makers of Western North
          Carolina with the people who appreciate their work.
        </p>
      </div>

      {/* Photo grid */}
      <AnimateOnScroll>
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div className="relative aspect-[3/4] col-span-1 row-span-2 overflow-hidden bg-cream-dark">
            <Image
              src="https://picsum.photos/seed/about-gallery-1/600/800"
              alt="Gallery interior showing paintings on display"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
              priority
            />
          </div>
          <div className="relative aspect-square overflow-hidden bg-cream-dark">
            <Image
              src="https://picsum.photos/seed/about-gallery-2/600/600"
              alt="Close-up of handcrafted ceramics on a shelf"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="relative aspect-square overflow-hidden bg-cream-dark hidden md:block">
            <Image
              src="https://picsum.photos/seed/about-gallery-3/600/600"
              alt="Artist working at their studio bench"
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
          <div className="relative aspect-square overflow-hidden bg-cream-dark">
            <Image
              src="https://picsum.photos/seed/about-gallery-4/600/600"
              alt="Jewelry display case with handcrafted pieces"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="relative aspect-square overflow-hidden bg-cream-dark hidden md:block">
            <Image
              src="https://picsum.photos/seed/about-gallery-5/600/600"
              alt="Gallery opening event with visitors"
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
        </div>
      </AnimateOnScroll>

      {/* Story sections */}
      <div className="mt-16 md:mt-24 max-w-3xl space-y-12">
        <AnimateOnScroll>
          <section>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal mb-4">
              Our Story
            </h2>
            <div className="text-warm-gray leading-relaxed space-y-4">
              <p>
                Artisans On Main was founded with a simple idea: that the best way
                to experience art is to encounter it where people already gather.
                Our gallery sits on Main Street in Weaverville, a small mountain
                town with a thriving creative community and a deep appreciation
                for things made by hand.
              </p>
              <p>
                We opened our doors because we believe the artists of this region
                deserve a beautiful, professional space to show their work — and
                because collectors and visitors deserve a place where they can
                discover something truly one-of-a-kind.
              </p>
            </div>
          </section>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <section>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal mb-4">
              The Consignment Model
            </h2>
            <div className="text-warm-gray leading-relaxed space-y-4">
              <p>
                Every piece in the gallery is consigned directly by the artist who
                made it. This means that when you purchase something from Artisans
                On Main, you are directly supporting a working artist in Western
                North Carolina. There are no middlemen, no mass production — just
                honest work from talented hands.
              </p>
              <p>
                We carefully curate our collection to represent a range of
                disciplines — painting, ceramics, jewelry, fiber arts,
                photography, sculpture, and mixed media — while maintaining a
                cohesive aesthetic that feels intentional, not crowded.
              </p>
            </div>
          </section>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <section>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal mb-4">
              Our Mission
            </h2>
            <p className="text-warm-gray leading-relaxed">
              To create a welcoming space where art and community meet. To
              champion the makers of the Blue Ridge. To put beautiful, handcrafted
              objects in the hands of people who will cherish them. And to prove
              that a small gallery on a small-town main street can make a real
              difference in the lives of artists.
            </p>
          </section>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="pt-4">
            <Link
              href="/artists"
              className="inline-block bg-terracotta text-white px-8 py-3 tracking-wide hover:bg-terracotta-dark transition-colors duration-200"
            >
              Meet Our Artists
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
