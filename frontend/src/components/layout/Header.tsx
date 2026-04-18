"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useT } from "@/lib/useIsHydrated";
import { toggleLocale, setSearchOpen } from "@/store/uiSlice";
import { setQuery } from "@/store/searchSlice";
import { navLinks } from "@/data/navigation";
import { services } from "@/data/services";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import DropdownMenu from "@/components/layout/DropdownMenu";

export default function Header() {
  const t = useT();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { locale, isSearchOpen } = useAppSelector((s) => s.ui);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    closeTimer.current = setTimeout(() => setIsServicesOpen(false), 120);
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      dispatch(setQuery(searchValue.trim()));
      dispatch(setSearchOpen(false));
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
    }
  };

  const handleLanguageToggle = () => {
    dispatch(toggleLocale());
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className={`flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 ${isServicesOpen || mobileMenuOpen ? "bg-primary" : "bg-transparent"}`}>
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/Logo.png" alt="Logo" width={90} height={65} className="h-auto w-auto" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <div
              key={link.key}
              className="relative"
              onMouseEnter={() => link.hasDropdown && openServices()}
              onMouseLeave={() => link.hasDropdown && scheduleCloseServices()}
            >
              {link.href ? (
                <Link
                  href={link.href}
                  className="text-white text-sm hover:text-accent-hover transition-colors"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ) : (
                <span
                  className={`text-white text-sm cursor-default ${
                    link.hasDropdown ? "cursor-pointer" : ""
                  }`}
                >
                  {t(`nav.${link.key}`)}
                  {link.hasDropdown && (
                    <svg
                      className={`w-3 h-3 inline-block ml-1 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Right side: Search, Language, Book Appointment */}
        <div className="flex items-center gap-3">
          {/* Search Icon / Input */}
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                variant="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={t("nav.search")}
                autoFocus
                className="w-40 md:w-56"
              />
            </form>
          ) : (
            <button
              onClick={() => dispatch(setSearchOpen(true))}
              className="text-white hover:text-accent-hover transition-colors p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          )}

          {/* Language Toggle */}
          <button
            onClick={handleLanguageToggle}
            className="text-white text-sm font-medium hover:text-accent-hover transition-colors px-2"
          >
            {locale === "en" ? "AR" : "EN"}
          </button>

          {/* Book Appointment */}
          <Button variant="outline" className="hidden md:inline-flex text-xs">
            {t("nav.bookAppointment")}
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mega Menu Dropdown */}
      {isServicesOpen && (
        <DropdownMenu onMouseEnter={openServices} onMouseLeave={scheduleCloseServices} />
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary px-6 py-6">
          {navLinks.map((link) => (
            <div key={link.key} className="py-2">
              {link.href ? (
                <Link
                  href={link.href}
                  className="text-white text-sm block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ) : link.hasDropdown ? (
                <>
                  <button
                    className="flex items-center gap-1 text-white text-sm w-full text-start"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                  >
                    {t(`nav.${link.key}`)}
                    <svg
                      className={`w-3 h-3 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileServicesOpen && (
                    <div className="mt-2 pl-4 border-l border-white/20">
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.slug}`}
                          className="text-white/70 text-xs block py-1.5"
                          onClick={() => { setMobileMenuOpen(false); setMobileServicesOpen(false); }}
                        >
                          {locale === "ar" ? service.titleAr : service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <span className="text-white/70 text-sm block">
                  {t(`nav.${link.key}`)}
                </span>
              )}
            </div>
          ))}
          <div className="pt-3">
            <Button variant="outline" className="text-xs w-full text-center">
              {t("nav.bookAppointment")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
