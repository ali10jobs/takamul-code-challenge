"use client";

import { useAppSelector } from "@/store/hooks";
import type { ClientTestimonial } from "@/data/clients";

interface TestimonialCardProps {
  testimonial: ClientTestimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const locale = useAppSelector((s) => s.ui.locale);
  const name = locale === "ar" ? testimonial.nameAr : testimonial.name;
  const role = locale === "ar" ? testimonial.roleAr : testimonial.role;
  const quote = locale === "ar" ? testimonial.quoteAr : testimonial.quote;

  return (
    <div className="flex flex-col items-center text-center px-4 md:px-12">
      <blockquote className="text-text-main text-base md:text-lg leading-relaxed mb-8 max-w-3xl italic">
        {quote}
      </blockquote>
      <div className="flex flex-col items-center">
        <h4 className="text-lg font-bold text-text-main">{name}</h4>
        <p className="text-sm text-muted">{role}</p>
      </div>
    </div>
  );
}
