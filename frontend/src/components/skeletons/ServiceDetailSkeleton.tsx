import Skeleton from "@/components/atoms/Skeleton";

export default function ServiceDetailSkeleton() {
  return (
    <>
      {/* Hero image */}
      <div className="relative w-full h-[300px] md:h-[400px] bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/80 animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
        {/* Back button */}
        <Skeleton className="h-4 w-20 mb-8" />

        {/* Title */}
        <Skeleton className="h-8 md:h-10 w-3/4 mb-6" />

        {/* Description */}
        <div className="flex flex-col gap-2 mb-10">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />
          <Skeleton className="h-4 w-9/12" />
        </div>

        {/* Content sections */}
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Skeleton rounded="full" className="w-2 h-2 flex-shrink-0" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <div className="ltr:pl-4 rtl:pr-4 flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
