"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";

export default function RtlWrapper({ children }: { children: React.ReactNode }) {
  const { locale, isRTL } = useAppSelector((s) => s.ui);
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    i18n.changeLanguage(locale);
  }, [locale, isRTL, i18n]);

  return <>{children}</>;
}
