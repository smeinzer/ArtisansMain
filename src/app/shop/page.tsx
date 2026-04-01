'use client';

import { useState, useMemo } from 'react';
import { demoProducts, demoArtists } from '@/lib/demo';
import ProductFilters, { type FilterState } from '@/components/shop/ProductFilters';
import ProductGrid from '@/components/shop/ProductGrid';

const categories = Array.from(new Set(demoProducts.map((p) => p.category))).sort();
const artistNames = demoArtists.map((a) => a.name).sort();

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    artist: null,
    priceRange: null,
  });
  const [sort, setSort] = useState('newest');

  const filteredProducts = useMemo(() => {
    let result = demoProducts.filter((product) => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.artist && product.artist !== filters.artist) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (product.price < min || product.price >= max) return false;
      }
      return true;
    });

    switch (sort) {
      case 'newest':
        result = [...result].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'alpha':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [filters, sort]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl md:text-5xl font-medium text-charcoal mb-2">
        The Collection
      </h1>
      <p className="text-sm text-warm-gray mb-10" aria-live="polite" aria-atomic="true">
        {filteredProducts.length} piece{filteredProducts.length !== 1 ? 's' : ''}
      </p>

      <ProductFilters
        categories={categories}
        artists={artistNames}
        onFilterChange={setFilters}
        onSortChange={setSort}
        currentFilters={filters}
        currentSort={sort}
      />

      <ProductGrid products={filteredProducts} />
    </div>
  );
}
