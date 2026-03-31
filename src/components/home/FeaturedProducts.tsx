import { demoProducts } from '@/lib/demo';
import ProductCard from '@/components/shop/ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export default function FeaturedProducts() {
  const featured = demoProducts
    .filter((p) => p.available)
    .slice(0, 6);

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <SectionHeading
            title="Featured Work"
            subtitle="A selection of recent pieces from our gallery"
          />
        </AnimateOnScroll>

        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {featured.map((product, i) => (
            <AnimateOnScroll key={product.id} delay={i * 100}>
              <ProductCard product={product} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
