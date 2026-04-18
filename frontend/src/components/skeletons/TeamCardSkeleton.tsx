import Skeleton from "@/components/atoms/Skeleton";

export default function TeamCardSkeleton() {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Square photo matching TeamCard aspect-square */}
      <Skeleton className="w-full aspect-square mb-4" />
      {/* Name */}
      <Skeleton className="h-5 w-32 mb-2" />
      {/* Role */}
      <Skeleton className="h-4 w-24 mb-3" />
      {/* Social icon row */}
      <div className="flex items-center gap-3">
        <Skeleton rounded="full" className="w-5 h-5" />
        <Skeleton rounded="full" className="w-5 h-5" />
        <Skeleton rounded="full" className="w-5 h-5" />
      </div>
    </div>
  );
}
