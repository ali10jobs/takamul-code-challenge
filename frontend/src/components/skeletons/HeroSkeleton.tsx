import Skeleton from "@/components/atoms/Skeleton";

export default function HeroSkeleton() {
  return (
    <section
      aria-busy="true"
      className="relative w-full h-[600px] md:h-[800px] overflow-hidden bg-primary"
    >
      {/* Media placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/80 animate-pulse" />

      {/* Content placeholders */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-4xl gap-4">
        <Skeleton variant="dark" className="h-10 md:h-14 w-3/4" />
        <div className="flex flex-col gap-2 max-w-lg">
          <Skeleton variant="dark" className="h-3 md:h-4 w-full" />
          <Skeleton variant="dark" className="h-3 md:h-4 w-11/12" />
          <Skeleton variant="dark" className="h-3 md:h-4 w-2/3" />
        </div>
        <Skeleton variant="dark" className="mt-4 h-12 w-36" />
      </div>

      {/* Vertical dots */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
        <Skeleton variant="dark" rounded="full" className="w-2 h-6" />
        <Skeleton variant="dark" rounded="full" className="w-2 h-2" />
        <Skeleton variant="dark" rounded="full" className="w-2 h-2" />
      </div>
    </section>
  );
}
