import Link from 'next/link';
import { demoProducts, demoArtists } from '@/lib/demo';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductGallery from '@/components/shop/ProductGallery';
import AddToCart from '@/components/shop/AddToCart';
import ProductCard from '@/components/shop/ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;

  const product = demoProducts.find((p) => p.handle === handle);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-charcoal mb-4">
          Product not found
        </h1>
        <p className="text-warm-gray mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-terracotta text-white px-8 py-3 tracking-wide hover:bg-terracotta-dark transition-colors duration-200"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const artist = demoArtists.find((a) => a.name === product.artist);
  const moreFromArtist = demoProducts
    .filter((p) => p.artist === product.artist && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/shop' },
          { label: product.title },
        ]}
      />

      <div className="mt-8 grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery — sticky on desktop so it stays visible while scrolling details */}
        <div className="md:sticky md:top-24 md:self-start">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          {artist ? (
            <Link
              href={`/artists/${artist.slug}`}
              className="text-sm text-warm-gray hover:text-terracotta transition-colors duration-200"
            >
              {product.artist}
            </Link>
          ) : (
            <span className="text-sm text-warm-gray">{product.artist}</span>
          )}

          <h1 className="font-serif text-3xl md:text-4xl font-medium text-charcoal leading-tight">
            {product.title}
          </h1>

          <p className="text-2xl text-charcoal">
            ${product.price.toLocaleString()}
          </p>

          <p className="text-warm-gray leading-relaxed">
            {product.description}
          </p>

          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm border-t border-border pt-6">
            <dt className="text-warm-gray">Medium</dt>
            <dd className="text-charcoal">{product.medium}</dd>
            <dt className="text-warm-gray">Dimensions</dt>
            <dd className="text-charcoal">{product.dimensions}</dd>
          </dl>

          <AddToCart product={product} />
        </div>
      </div>

      {/* More from Artist */}
      {moreFromArtist.length > 0 && (
        <section className="mt-20">
          <AnimateOnScroll>
            <SectionHeading
              title={`More from ${product.artist}`}
              align="left"
            />
          </AnimateOnScroll>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {moreFromArtist.map((p, i) => (
              <AnimateOnScroll key={p.id} delay={i * 100}>
                <ProductCard product={p} />
              </AnimateOnScroll>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
