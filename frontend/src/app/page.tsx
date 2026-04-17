import { getHeroSlides, getTeamMembers, getClientTestimonials } from "@/lib/strapi";
import HomepageClient from "./HomepageClient";

// ISR: statically generate at build time, revalidate every 60s
export const revalidate = 60;

export default async function HomePage() {
  const [slides, team, testimonials] = await Promise.all([
    getHeroSlides(),
    getTeamMembers(),
    getClientTestimonials(),
  ]);

  return (
    <HomepageClient slides={slides} team={team} testimonials={testimonials} />
  );
}
