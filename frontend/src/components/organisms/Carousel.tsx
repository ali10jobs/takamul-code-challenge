"use client";

import { useState, useCallback, useEffect } from "react";
import Button from "@/components/atoms/Button";

type CarouselVariant = "arrows" | "dots";

interface CarouselProps {
  children: React.ReactNode[];
  variant?: CarouselVariant;
  itemsPerView?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function Carousel({
  children,
  variant = "arrows",
  itemsPerView = 3,
  autoPlay = false,
  autoPlayInterval = 5000,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = children.length;
  const maxIndex = variant === "dots" ? total - 1 : Math.max(0, total - itemsPerView);

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, next]);

  if (variant === "dots") {
    return (
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            <div className="flex">
              {children.map((child, idx) => (
                <div key={idx} className="w-full flex-shrink-0">
                  {child}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {children.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === current
                  ? "bg-accent"
                  : "bg-divider hover:bg-muted"
              }`}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Arrows variant
  return (
    <div className="relative">
      <div className="flex items-center">
        {/* Left Arrow */}
        <Button
          variant="icon"
          onClick={prev}
          className="text-text-main hover:text-accent flex-shrink-0 -ml-2 md:-ml-6"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>

        {/* Items */}
        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${current * (100 / itemsPerView)}%)`,
            }}
          >
            {children.map((child, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <Button
          variant="icon"
          onClick={next}
          className="text-text-main hover:text-accent flex-shrink-0 -mr-2 md:-mr-6"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
