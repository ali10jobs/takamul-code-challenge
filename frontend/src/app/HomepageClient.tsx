"use client";

import { useState } from "react";
import { useT } from "@/lib/useIsHydrated";
import HeroSection from "@/components/organisms/HeroSection";
import Carousel from "@/components/organisms/Carousel";
import TeamCard from "@/components/molecules/TeamCard";
import TestimonialCard from "@/components/molecules/TestimonialCard";
import Image from "next/image";
import type { HeroSlide } from "@/data/hero";
import type { TeamMember } from "@/data/team";
import type { ClientTestimonial } from "@/data/clients";

interface HomepageClientProps {
  slides: HeroSlide[];
  team: TeamMember[];
  testimonials: ClientTestimonial[];
}

export default function HomepageClient({
  slides,
  team,
  testimonials,
}: HomepageClientProps) {
  const t = useT();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [loadedTestimonials, setLoadedTestimonials] = useState<Set<string>>(
    new Set()
  );
  const markTestimonialLoaded = (src: string) =>
    setLoadedTestimonials((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  const activeTestimonialSrc = testimonials[activeTestimonial]?.image;
  const activeTestimonialLoaded = activeTestimonialSrc
    ? loadedTestimonials.has(activeTestimonialSrc)
    : true;

  return (
    <>
      {/* Hero Section */}
      <HeroSection slides={slides} />

      {/* Our Team Section */}
      <section className="bg-background py-16 md:py-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
              {t("team.title")}
            </h2>
            <p className="text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {t("team.description")}
            </p>
          </div>

          {/* Desktop: Carousel with arrows */}
          <div className="hidden md:block">
            <Carousel variant="arrows" theme="primary" itemsPerView={3}>
              {team.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </Carousel>
          </div>

          {/* Mobile: Single item carousel */}
          <div className="md:hidden">
            <Carousel variant="dots" theme="primary" itemsPerView={1}>
              {team.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* What Our Clients Are Saying Section */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main text-center mb-4">
            {t("clients.title")}
          </h2>
          <p className="text-muted text-sm md:text-base max-w-3xl mx-auto text-center leading-relaxed mb-12">
            {t("clients.intro")}
          </p>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Client Image — syncs with the active testimonial via onIndexChange */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="relative aspect-[3/4] w-full max-w-xs mx-auto overflow-hidden rounded-sm bg-divider/80">
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 animate-pulse bg-divider/80 transition-opacity duration-300 ${
                    activeTestimonialLoaded ? "opacity-0" : "opacity-100"
                  }`}
                />
                {testimonials.map((testimonial, idx) => (
                  <Image
                    key={testimonial.id ?? testimonial.image}
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className={`object-cover img-dark-filter transition-opacity duration-500 ${
                      idx === activeTestimonial ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={idx === 0}
                    onLoad={() => markTestimonialLoaded(testimonial.image)}
                  />
                ))}
              </div>
            </div>

            {/* Testimonial Carousel */}
            <div className="w-full md:w-2/3">
              <Carousel
                variant="dots"
                autoPlay
                autoPlayInterval={6000}
                onIndexChange={setActiveTestimonial}
              >
                {testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
