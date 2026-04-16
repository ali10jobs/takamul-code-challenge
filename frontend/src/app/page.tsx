import { getHeroSlides, getTeamMembers, getClientTestimonials } from "@/lib/strapi";
import HomepageClient from "./HomepageClient";

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
