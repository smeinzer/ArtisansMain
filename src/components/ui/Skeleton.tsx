interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-warm-gray/20 ${className}`}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="block">
      <Skeleton className="aspect-[4/5] w-full rounded-none" />
      <div className="mt-3 space-y-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ArtistCardSkeleton() {
  return (
    <div className="block">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="mt-4">
        <Skeleton className="h-6 w-2/3" />
        <div className="mt-1 space-y-1.5">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      </div>
    </div>
  );
}

export function ArtistGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {Array.from({ length: count }).map((_, i) => (
        <ArtistCardSkeleton key={i} />
      ))}
    </div>
  );
}
