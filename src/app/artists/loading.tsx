import { ArtistGridSkeleton, Skeleton } from '@/components/ui/Skeleton';

export default function ArtistsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      <Skeleton className="h-12 w-56 mb-3" />
      <Skeleton className="h-5 w-full max-w-2xl mb-2" />
      <Skeleton className="h-5 w-3/4 max-w-2xl mb-12" />
      <ArtistGridSkeleton count={6} />
    </div>
  );
}
