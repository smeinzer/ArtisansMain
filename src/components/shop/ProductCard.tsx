import Image from 'next/image';
import Link from 'next/link';
import type { DemoProduct } from '@/lib/demo';

interface ProductCardProps {
  product: DemoProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/shop/${product.handle}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          quality={85}
        />
        {!product.available && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-charcoal/80 text-white text-xs tracking-wide">
            Sold
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium text-charcoal group-hover:text-terracotta transition-colors duration-200 leading-snug">
          {product.title}
        </h3>
        <p className="text-xs text-warm-gray">{product.artist}</p>
        <p className="text-sm text-charcoal-light">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
