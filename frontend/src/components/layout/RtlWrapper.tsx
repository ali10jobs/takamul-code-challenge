"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setLocale, type Locale } from "@/store/uiSlice";
import { useTranslation } from "react-i18next";

export default function RtlWrapper({ children }: { children: React.ReactNode }) {
  const { locale, isRTL } = useAppSelector((s) => s.ui);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  // Restore persisted locale once on mount — runs only on client, after hydration
  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "ar") dispatch(setLocale("ar"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    i18n.changeLanguage(locale);
  }, [locale, isRTL, i18n]);

  return <>{children}</>;
}
