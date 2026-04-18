import Skeleton from "@/components/atoms/Skeleton";
import Divider from "@/components/atoms/Divider";

export default function SearchResultSkeleton() {
  return (
    <div>
      <div className="py-4 flex flex-col gap-2">
        {/* Title */}
        <Skeleton className="h-4 w-4/5" />
        {/* Read more link */}
        <Skeleton className="h-3 w-20 mt-1" />
      </div>
      <Divider />
    </div>
  );
}
