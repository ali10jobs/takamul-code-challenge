import Skeleton from "@/components/atoms/Skeleton";

export default function TestimonialSectionSkeleton() {
  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="flex flex-col items-center gap-3 mb-12">
          <Skeleton className="h-8 md:h-10 w-72" />
          <Skeleton className="h-4 w-full max-w-2xl" />
          <Skeleton className="h-4 w-11/12 max-w-2xl" />
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Photo (3:4 aspect, matches real testimonial image) */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            <Skeleton className="aspect-[3/4] w-full max-w-xs mx-auto" />
          </div>

          {/* Quote block */}
          <div className="w-full md:w-2/3 flex flex-col items-center px-4 md:px-12">
            <div className="w-full flex flex-col gap-3 mb-8 max-w-3xl">
              <Skeleton className="h-4 md:h-5 w-full" />
              <Skeleton className="h-4 md:h-5 w-11/12" />
              <Skeleton className="h-4 md:h-5 w-5/6" />
              <Skeleton className="h-4 md:h-5 w-2/3" />
            </div>
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-28" />
            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <Skeleton rounded="full" className="w-3 h-3" />
              <Skeleton rounded="full" className="w-3 h-3" />
              <Skeleton rounded="full" className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
