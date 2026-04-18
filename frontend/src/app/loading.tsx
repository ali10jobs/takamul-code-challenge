import HeroSkeleton from "@/components/skeletons/HeroSkeleton";
import TeamSectionSkeleton from "@/components/skeletons/TeamSectionSkeleton";
import TestimonialSectionSkeleton from "@/components/skeletons/TestimonialSectionSkeleton";

export default function HomeLoading() {
  return (
    <>
      <HeroSkeleton />
      <TeamSectionSkeleton />
      <TestimonialSectionSkeleton />
    </>
  );
}
