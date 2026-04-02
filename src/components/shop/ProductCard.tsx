import Image from 'next/image';
import Link from 'next/link';
import type { DemoProduct } from '@/lib/demo';
import TiltCard from '@/components/ui/TiltCard';

interface ProductCardProps {
  product: DemoProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasMultipleImages = product.images.length > 1;

  return (
    <Link
      href={`/shop/${product.handle}`}
      className="group block"
    >
      <TiltCard className="hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark" data-cursor="view">
          {/* Primary image */}
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              hasMultipleImages ? 'group-hover:opacity-0' : ''
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            quality={85}
          />

          {/* Second image (crossfade on hover) */}
          {hasMultipleImages && (
            <Image
              src={product.images[1]}
              alt={`${product.title} — alternate view`}
              fill
              className="object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              quality={85}
            />
          )}

          {/* Hover overlay with "View" indicator */}
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
            <span className="text-white text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View
            </span>
          </div>

          {/* Sold badge */}
          {!product.available && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-charcoal/80 backdrop-blur-sm text-white text-xs tracking-wide">
              Sold
            </div>
          )}
        </div>
        <div className="mt-4 px-1 pb-1 space-y-1">
          <h3 className="text-sm font-medium text-charcoal group-hover:text-terracotta transition-colors duration-200 leading-snug">
            {product.title}
          </h3>
          <p className="text-xs text-warm-gray">{product.artist}</p>
          <p className="text-sm text-charcoal-light">
            ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </TiltCard>
    </Link>
  );
}
