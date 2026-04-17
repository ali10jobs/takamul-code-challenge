import { Suspense } from "react";
import SearchPageDynamic from "./SearchPageDynamic";

function SearchLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchPageDynamic />
    </Suspense>
  );
}
