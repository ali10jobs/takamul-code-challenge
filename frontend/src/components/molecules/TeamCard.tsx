"use client";

import Image from "next/image";
import SocialIcon from "@/components/atoms/SocialIcon";
import { useAppSelector } from "@/store/hooks";
import type { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  const locale = useAppSelector((s) => s.ui.locale);
  const name = locale === "ar" ? member.nameAr : member.name;
  const role = locale === "ar" ? member.roleAr : member.role;

  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative w-full aspect-square overflow-hidden rounded-sm mb-4">
        <Image
          src={member.image}
          alt={name}
          fill
          className="object-cover img-dark-filter group-hover:filter-none transition-all duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h3 className="text-lg font-semibold text-text-main">{name}</h3>
      <p className="text-sm text-muted mb-3">{role}</p>
      <div className="flex items-center gap-3">
        <SocialIcon type="phone" href={`tel:${member.phone}`} size="sm" className="text-primary hover:text-accent" />
        <SocialIcon type="email" href={`mailto:${member.email}`} size="sm" className="text-primary hover:text-accent" />
        <SocialIcon type="social" href={member.social} size="sm" className="text-primary hover:text-accent" />
      </div>
    </div>
  );
}
