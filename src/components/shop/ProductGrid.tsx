'use client';

import type { DemoProduct } from '@/lib/demo';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: DemoProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-serif text-charcoal-light">No pieces match your criteria</p>
        <p className="mt-2 text-sm text-warm-gray">
          Try adjusting or clearing your filters to see more work.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
