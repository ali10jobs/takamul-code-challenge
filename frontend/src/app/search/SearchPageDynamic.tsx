"use client";

import dynamic from "next/dynamic";
import SearchPageSkeleton from "@/components/skeletons/SearchPageSkeleton";

const SearchPageClient = dynamic(() => import("./SearchPageClient"), {
  ssr: false,
  loading: () => <SearchPageSkeleton />,
});

export default function SearchPageDynamic() {
  return <SearchPageClient />;
}
