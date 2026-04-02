import { demoProducts } from '@/lib/demo';
import ProductCard from '@/components/shop/ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function FeaturedProducts() {
  const featured = demoProducts
    .filter((p) => p.available)
    .slice(0, 6);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll>
          <SectionHeading
            title="Featured Work"
            subtitle="A selection of recent pieces from our gallery"
          />
        </AnimateOnScroll>
      </div>

      {/* Mobile: horizontal swipeable carousel */}
      <div className="mt-10 md:mt-14 md:hidden">
        <div
          className="flex gap-4 px-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {featured.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[75vw] max-w-[300px] snap-center"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: regular grid */}
      <div className="mt-10 md:mt-14 hidden md:grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 max-w-7xl mx-auto px-6">
        {featured.map((product, i) => (
          <AnimateOnScroll key={product.id} delay={i * 60}>
            <ProductCard product={product} />
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
