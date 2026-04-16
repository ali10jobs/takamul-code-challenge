"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setQuery,
  setActiveTab,
  setCurrentPage,
  setTotalPages,
  type SearchTab,
} from "@/store/searchSlice";
import { searchContent } from "@/lib/strapi";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import SearchResultItem from "@/components/molecules/SearchResultItem";
import PaginationBar from "@/components/molecules/PaginationBar";
import type { TeamMember } from "@/data/team";
import type { Service } from "@/data/services";

export default function SearchPageClient() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useAppSelector((s) => s.ui);
  const { query, activeTab, currentPage, totalPages } = useAppSelector(
    (s) => s.search
  );

  const urlQuery = searchParams.get("q") || "";
  const [results, setResults] = useState<(TeamMember | Service)[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(urlQuery);

  // Sync URL query param to Redux store
  const activeQuery = urlQuery || query;

  // Fetch results when query, tab, or page changes (API-driven pagination)
  useEffect(() => {
    let cancelled = false;
    if (urlQuery && urlQuery !== query) {
      dispatch(setQuery(urlQuery));
    }
    async function fetchResults() {
      if (!activeQuery) {
        setResults([]);
        return;
      }
      setLoading(true);
      const response = await searchContent(activeQuery, activeTab, currentPage, locale);
      if (!cancelled) {
        setResults(response.data);
        dispatch(setTotalPages(response.pagination.pageCount));
        setLoading(false);
      }
    }
    fetchResults();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuery, activeTab, currentPage, locale]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(setQuery(searchInput.trim()));
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleTabChange = (tab: SearchTab) => {
    dispatch(setActiveTab(tab));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getResultTitle = (item: TeamMember | Service): string => {
    if ("slug" in item) {
      return locale === "ar" ? item.titleAr : item.title;
    }
    return locale === "ar" ? item.nameAr : item.name;
  };

  const getResultHref = (item: TeamMember | Service): string => {
    if ("slug" in item) {
      return `/services/${item.slug}`;
    }
    return "#";
  };

  const getResultDescription = (item: TeamMember | Service): string => {
    if ("slug" in item) {
      return locale === "ar" ? item.descriptionAr : item.description;
    }
    return locale === "ar" ? item.roleAr : item.role;
  };

  return (
    <>
      {/* Hero with Search Bar */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=1920&h=600&fit=crop"
          alt="Search"
          fill
          className="object-cover img-dark-filter"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/60" />

        {/* Search Bar centered on hero */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="flex items-center gap-3 w-full max-w-xl">
            <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <Input
                  variant="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={t("nav.search")}
                  className="pl-10 w-full"
                />
              </div>
            </form>
            <Button variant="outline" className="text-xs whitespace-nowrap">
              {t("nav.bookAppointment")}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
        {/* Back Link */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-text-main text-sm mb-8 hover:text-accent transition-colors"
        >
          <svg
            className="w-4 h-4 rtl:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("nav.back")}
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar — Tabs */}
          <div className="md:w-32 flex-shrink-0">
            <div className="flex md:flex-col gap-0 border-b md:border-b-0 md:border-r border-divider">
              {(["team", "services"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-3 text-sm font-medium text-left transition-colors ${
                    activeTab === tab
                      ? "text-primary border-b-2 md:border-b-0 md:border-r-2 border-primary"
                      : "text-muted hover:text-text-main"
                  }`}
                >
                  {t(`search.${tab}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel — Results */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-divider rounded w-3/4 mb-2" />
                    <div className="h-3 bg-divider rounded w-1/4 mb-4" />
                    <hr className="border-divider" />
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <>
                {results.map((item) => (
                  <SearchResultItem
                    key={"slug" in item ? item.slug : item.id}
                    title={`${getResultTitle(item)} - ${getResultDescription(item)}`}
                    href={getResultHref(item)}
                  />
                ))}

                <PaginationBar
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : query ? (
              <p className="text-muted text-sm py-8">
                {t("search.noResults")}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
