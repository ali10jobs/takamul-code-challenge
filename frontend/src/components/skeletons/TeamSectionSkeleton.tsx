import Skeleton from "@/components/atoms/Skeleton";
import TeamCardSkeleton from "./TeamCardSkeleton";

export default function TeamSectionSkeleton() {
  return (
    <section className="bg-background py-16 md:py-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="flex flex-col items-center gap-3 mb-12">
          <Skeleton className="h-8 md:h-10 w-56" />
          <Skeleton className="h-4 w-full max-w-2xl" />
          <Skeleton className="h-4 w-11/12 max-w-2xl" />
        </div>

        {/* Desktop: 3-up grid matching Carousel layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 px-6">
          <TeamCardSkeleton />
          <TeamCardSkeleton />
          <TeamCardSkeleton />
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden">
          <TeamCardSkeleton />
        </div>
      </div>
    </section>
  );
}
