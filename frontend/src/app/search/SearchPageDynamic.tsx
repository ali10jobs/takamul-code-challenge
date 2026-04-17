"use client";

import dynamic from "next/dynamic";

const SearchPageClient = dynamic(() => import("./SearchPageClient"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
    </div>
  ),
});

export default function SearchPageDynamic() {
  return <SearchPageClient />;
}
