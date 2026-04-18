"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { services } from "@/data/services";

interface DropdownMenuProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function DropdownMenu({ onMouseEnter, onMouseLeave }: DropdownMenuProps) {
  const locale = useAppSelector((s) => s.ui.locale);

  return (
    <div
      className="absolute left-0 right-0 z-40 hidden lg:block md:mx-12 lg:mx-16 py-12 bg-primary rounded-bl-3xl rounded-br-3xl"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="px-12 lg:px-16 py-8">
        <div className="grid grid-cols-4 gap-x-8 gap-y-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="text-white/80 text-sm hover:text-white transition-colors"
            >
              {locale === "ar" ? service.titleAr : service.title}
            </Link>
          ))}
        </div>
        <div className="mt-8">
        </div>
      </div>
    </div>
  );
}
