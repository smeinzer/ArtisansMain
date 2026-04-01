import { ProductGridSkeleton, Skeleton } from '@/components/ui/Skeleton';

export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <Skeleton className="h-12 w-64 mb-2" />
      <Skeleton className="h-4 w-24 mb-10" />
      <Skeleton className="h-10 w-full mb-8" />
      <ProductGridSkeleton count={6} />
    </div>
  );
}
