'use client';

import { useState } from 'react';

export interface FilterState {
  category: string | null;
  artist: string | null;
  priceRange: [number, number] | null;
}

interface ProductFiltersProps {
  categories: string[];
  artists: string[];
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: string) => void;
  currentFilters: FilterState;
  currentSort: string;
}

const priceRangeOptions: { label: string; value: [number, number] | null }[] = [
  { label: 'All Prices', value: null },
  { label: 'Under $100', value: [0, 100] },
  { label: '$100\u2013$500', value: [100, 500] },
  { label: '$500\u2013$1,000', value: [500, 1000] },
  { label: 'Over $1,000', value: [1000, Infinity] },
];

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'A\u2013Z', value: 'alpha' },
];

function priceRangeToString(range: [number, number] | null): string {
  if (!range) return '';
  const match = priceRangeOptions.find(
    (opt) => opt.value && opt.value[0] === range[0] && opt.value[1] === range[1]
  );
  return match ? match.label : '';
}

function stringToPriceRange(str: string): [number, number] | null {
  const match = priceRangeOptions.find((opt) => opt.label === str);
  return match?.value ?? null;
}

const selectClasses =
  'w-full md:w-auto appearance-none border border-border bg-white px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-terracotta';

export default function ProductFilters({
  categories,
  artists,
  onFilterChange,
  onSortChange,
  currentFilters,
  currentSort,
}: ProductFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCount = [
    currentFilters.category,
    currentFilters.artist,
    currentFilters.priceRange,
  ].filter(Boolean).length;

  function handleCategoryChange(value: string) {
    onFilterChange({ ...currentFilters, category: value || null });
  }

  function handleArtistChange(value: string) {
    onFilterChange({ ...currentFilters, artist: value || null });
  }

  function handlePriceChange(value: string) {
    onFilterChange({ ...currentFilters, priceRange: stringToPriceRange(value) });
  }

  function handleClearAll() {
    onFilterChange({ category: null, artist: null, priceRange: null });
  }

  const filterControls = (
    <>
      <select
        value={currentFilters.category ?? ''}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className={selectClasses}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={currentFilters.artist ?? ''}
        onChange={(e) => handleArtistChange(e.target.value)}
        className={selectClasses}
      >
        <option value="">All Artists</option>
        {artists.map((artist) => (
          <option key={artist} value={artist}>
            {artist}
          </option>
        ))}
      </select>

      <select
        value={currentFilters.priceRange ? priceRangeToString(currentFilters.priceRange) : 'All Prices'}
        onChange={(e) => handlePriceChange(e.target.value)}
        className={selectClasses}
      >
        {priceRangeOptions.map((opt) => (
          <option key={opt.label} value={opt.label}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className={selectClasses}
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );

  return (
    <div className="mb-8">
      {/* Desktop filter bar */}
      <div className="hidden md:flex items-center gap-3 flex-wrap">
        {filterControls}

        {activeCount > 0 && (
          <div className="flex items-center gap-2 ml-2 text-sm text-warm-gray">
            <span>
              {activeCount} filter{activeCount !== 1 ? 's' : ''} active
            </span>
            <button
              onClick={handleClearAll}
              className="text-terracotta hover:text-terracotta-dark underline underline-offset-2 transition-colors duration-200"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Mobile filter toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 border border-border px-4 py-2 text-sm text-charcoal bg-white w-full justify-between"
        >
          <span className="font-sans">
            Filter &amp; Sort
            {activeCount > 0 && (
              <span className="ml-2 text-terracotta">({activeCount})</span>
            )}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {mobileOpen && (
          <div className="border border-t-0 border-border bg-white p-4 space-y-3">
            {filterControls}

            {activeCount > 0 && (
              <div className="flex items-center gap-2 pt-2 text-sm text-warm-gray">
                <span>
                  {activeCount} filter{activeCount !== 1 ? 's' : ''} active
                </span>
                <button
                  onClick={handleClearAll}
                  className="text-terracotta hover:text-terracotta-dark underline underline-offset-2 transition-colors duration-200"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
