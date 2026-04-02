export default function RootLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-terracotta/20 border-t-terracotta" />
        <p className="text-xs tracking-[0.2em] uppercase text-warm-gray dark:text-dark-text-muted animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
