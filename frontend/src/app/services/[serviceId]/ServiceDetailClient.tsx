"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/useIsHydrated";
import { useAppSelector } from "@/store/hooks";
import { useIsHydrated } from "@/lib/useIsHydrated";
import type { Service } from "@/data/services";

interface ServiceDetailClientProps {
  service: Service;
}

export default function ServiceDetailClient({
  service,
}: ServiceDetailClientProps) {
  const t = useT();
  const router = useRouter();
  const storeLocale = useAppSelector((s) => s.ui.locale);
  const hydrated = useIsHydrated();
  const locale = hydrated ? storeLocale : "en";
  const [heroLoaded, setHeroLoaded] = useState(false);

  const title = locale === "ar" ? service.titleAr : service.title;
  const description =
    locale === "ar" ? service.descriptionAr : service.description;
  const content = locale === "ar" ? service.contentAr : service.content;

  return (
    <>
      {/* Hero Image */}
      <div className="relative w-full h-[300px] md:h-[400px] bg-primary">
        <div
          aria-hidden="true"
          className={`absolute inset-0 animate-pulse bg-gradient-to-br from-primary/80 via-primary/60 to-primary/80 transition-opacity duration-300 ${
            heroLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
        <Image
          src={service.image}
          alt={title}
          fill
          className={`object-cover img-dark-filter transition-opacity duration-500 ${
            heroLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority
          sizes="100vw"
          onLoad={() => setHeroLoaded(true)}
        />
        <div className="absolute inset-0 bg-primary/50" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
        {/* Back Button */}
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

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-text-main mb-6">
          {title}
        </h1>

        {/* Description */}
        <p className="text-text-main text-sm md:text-base leading-relaxed mb-10">
          {description}
        </p>

        {/* Content Sections */}
        {content.map((section, idx) => (
          <div key={idx} className="mb-8">
            <h2 className="text-lg md:text-xl font-bold text-text-main mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
              {section.heading}
            </h2>
            {section.description && (
              <p className="text-text-main text-sm leading-relaxed mb-4 ltr:pl-4 rtl:pr-4">
                {section.description}
              </p>
            )}
            {section.items.length > 0 && (
              <div className="ltr:pl-4 rtl:pr-4">
                <p className="text-text-main text-sm mb-2">
                  {locale === "ar"
                    ? "تشمل خدماتنا الاستشارية:"
                    : "Our advisory services include:"}
                </p>
                <ul className="list-disc ltr:pl-6 rtl:pr-6 space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="text-text-main text-sm leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {/* Closing paragraph */}
        <p className="text-text-main text-sm leading-relaxed mt-8 border-t border-divider pt-8">
          {locale === "ar"
            ? "في مكتب المحاماة، نسعى لتقديم أفضل الحلول القانونية لضمان حقوقكم وتقديم استشارات قانونية فعالة. تواصلوا معنا اليوم لتلقي خدمات قانونية مهنية وشاملة."
            : "At Law Firm, we aim to provide the best legal services to ensure your rights and offer effective legal solutions. Contact us today to receive professional and comprehensive legal services."}
        </p>
      </div>
    </>
  );
}
