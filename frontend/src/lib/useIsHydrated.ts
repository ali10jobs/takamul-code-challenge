"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useIsHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

export function useT() {
  const { t, i18n } = useTranslation();
  const hydrated = useIsHydrated();
  return hydrated ? t : i18n.getFixedT("en");
}
