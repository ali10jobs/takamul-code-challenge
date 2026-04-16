"use client";

import Link from "next/link";
import Divider from "@/components/atoms/Divider";
import { useTranslation } from "react-i18next";

interface SearchResultItemProps {
  title: string;
  href: string;
}

export default function SearchResultItem({ title, href }: SearchResultItemProps) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="py-4">
        <p className="text-text-main text-sm mb-1">{title}</p>
        <Link
          href={href}
          className="text-primary text-sm font-medium underline hover:text-accent transition-colors"
        >
          {t("nav.readMore")}
        </Link>
      </div>
      <Divider />
    </div>
  );
}
