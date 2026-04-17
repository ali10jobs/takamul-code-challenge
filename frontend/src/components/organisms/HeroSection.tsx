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

  return (
    <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt={title}
          fill
          className="object-cover img-dark-filter transition-all duration-700"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-4xl">
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
