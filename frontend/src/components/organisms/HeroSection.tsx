"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import { useAppSelector } from "@/store/hooks";
import type { HeroSlide } from "@/data/hero";

interface HeroSectionProps {
  slides: HeroSlide[];
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<Set<string>>(new Set());
  const locale = useAppSelector((s) => s.ui.locale);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (slides.length === 0) return null;

  const slide = slides[current];
  const title = locale === "ar" ? slide.titleAr : slide.title;
  const description = locale === "ar" ? slide.descriptionAr : slide.description;
  const ctaLabel = locale === "ar" ? slide.ctaLabelAr : slide.ctaLabel;
  const isCurrentLoaded = loaded.has(slide.image);

  const markLoaded = (src: string) =>
    setLoaded((prev) => {
      if (prev.has(src)) return prev;
      const copy = new Set(prev);
      copy.add(src);
      return copy;
    });

  return (
    <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden bg-primary">
      {/* Skeleton placeholder visible until current image finishes decoding */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 z-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/80 animate-pulse transition-opacity duration-500 ${
          isCurrentLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Render all slide images stacked; only the current one is visible.
          This keeps already-loaded images in memory so slide transitions are instant. */}
      {slides.map((s, idx) => (
        <div
          key={s.id ?? s.image}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={idx !== current}
        >
          <Image
            src={s.image}
            alt={locale === "ar" ? s.titleAr : s.title}
            fill
            className="object-cover img-dark-filter"
            priority={idx === 0}
            sizes="100vw"
            onLoad={() => markLoaded(s.image)}
          />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
      ))}

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-4xl transition-opacity duration-500 ${
          isCurrentLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
          {description}
        </p>
        <div>
          <Button variant="solid-white" href={slide.ctaUrl}>
            {ctaLabel}
          </Button>
        </div>
      </div>

      {/* Vertical Slider Dots */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === current
                ? "bg-white h-6"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
