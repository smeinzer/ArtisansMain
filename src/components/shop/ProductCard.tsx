import Image from 'next/image';
import Link from 'next/link';
import type { DemoProduct } from '@/lib/demo';
import TiltCard from '@/components/ui/TiltCard';

interface ProductCardProps {
  product: DemoProduct;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const hasMultipleImages = product.images.length > 1;

  return (
    <Link
      href={`/shop/${product.handle}`}
      className="group block"
    >
      <TiltCard className="hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div
          className={`relative overflow-hidden bg-cream-dark dark:bg-charcoal-light/30 ${
            featured ? 'aspect-[16/9] sm:aspect-[2/1] lg:aspect-[21/9]' : 'aspect-[4/5]'
          }`}
          data-cursor="view"
        >
          {/* Primary image with hover distortion */}
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className={`object-cover img-distort ${
              hasMultipleImages ? 'group-hover:opacity-0' : ''
            }`}
            sizes={
              featured
                ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
            }
            quality={85}
          />

          {/* Second image (crossfade on hover) */}
          {hasMultipleImages && (
            <Image
              src={product.images[1]}
              alt={`${product.title} — alternate view`}
              fill
              className="object-cover opacity-0 img-distort group-hover:opacity-100"
              sizes={
                featured
                  ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw'
                  : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
              }
              quality={85}
            />
          )}

          {/* Hover overlay with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Sold badge */}
          {!product.available && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-charcoal/80 backdrop-blur-sm text-white text-xs tracking-wide">
              Sold
            </div>
          )}

          {/* Featured badge for bento cards */}
          {featured && product.available && (
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-cream/90 dark:bg-charcoal/90 backdrop-blur-sm text-charcoal dark:text-cream text-xs font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Featured
            </div>
          )}
        </div>
        <div className={`mt-4 px-1 pb-1 ${featured ? 'sm:flex sm:items-end sm:justify-between sm:gap-4' : ''}`}>
          <div>
            <p className="text-xs text-warm-gray tracking-wide">{product.artist}</p>
            <h3 className={`mt-1 font-medium text-charcoal dark:text-cream group-hover:text-terracotta transition-colors duration-200 leading-snug ${
              featured ? 'text-base sm:text-lg' : 'text-sm'
            }`}>
              {product.title}
            </h3>
          </div>
          <p className={`font-serif font-medium text-charcoal dark:text-cream ${
            featured ? 'mt-2 sm:mt-0 text-lg' : 'mt-2 text-base'
          }`}>
            ${product.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
        </div>
      </TiltCard>
    </Link>
  );
}
