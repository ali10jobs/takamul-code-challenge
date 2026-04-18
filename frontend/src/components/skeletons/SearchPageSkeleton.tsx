import Skeleton from "@/components/atoms/Skeleton";
import SearchResultSkeleton from "./SearchResultSkeleton";

export default function SearchPageSkeleton() {
  return (
    <>
      {/* Hero with search bar */}
      <div className="relative w-full h-[300px] md:h-[400px] bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/80 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="flex items-center gap-3 w-full max-w-xl">
            <Skeleton variant="dark" className="flex-1 h-10" />
            <Skeleton variant="dark" className="h-10 w-32" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
        {/* Back link */}
        <Skeleton className="h-4 w-20 mb-8" />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabs */}
          <div className="md:w-32 flex-shrink-0">
            <div className="flex md:flex-col gap-0 border-b md:border-b-0 md:border-r border-divider">
              <div className="px-4 py-3">
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="px-4 py-3">
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <SearchResultSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
