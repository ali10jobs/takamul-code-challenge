import { services, Service } from "@/data/services";
import { teamMembers, TeamMember } from "@/data/team";
import { clientTestimonials, ClientTestimonial } from "@/data/clients";
import { heroSlides, HeroSlide } from "@/data/hero";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";
const PAGE_SIZE = 9;

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// Pagination helper
export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number = PAGE_SIZE
): PaginatedResponse<T> {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const start = (safePage - 1) * pageSize;
  const data = items.slice(start, start + pageSize);

  return {
    data,
    pagination: {
      page: safePage,
      pageSize,
      pageCount,
      total,
    },
  };
}

// If Strapi is configured, fetch from it; otherwise use dummy data
async function fetchFromStrapi<T>(
  endpoint: string,
  locale: string = "en",
  page: number = 1,
  pageSize: number = PAGE_SIZE
): Promise<PaginatedResponse<T> | null> {
  if (!STRAPI_URL) return null;

  try {
    const url = new URL(`/api/${endpoint}`, STRAPI_URL);
    url.searchParams.set("locale", locale);
    url.searchParams.set("pagination[page]", String(page));
    url.searchParams.set("pagination[pageSize]", String(pageSize));
    url.searchParams.set("populate", "*");

    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Strapi error: ${res.status}`);
    const json = await res.json();
    return {
      data: json.data,
      pagination: json.meta?.pagination ?? {
        page,
        pageSize,
        pageCount: 1,
        total: json.data?.length ?? 0,
      },
    };
  } catch {
    return null;
  }
}

// --- Public API ---

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const strapi = await fetchFromStrapi<HeroSlide>("homepage");
  if (strapi) return strapi.data;
  return heroSlides;
}

export async function getServices(): Promise<Service[]> {
  const strapi = await fetchFromStrapi<Service>("services", "en", 1, 100);
  if (strapi) return strapi.data;
  return services;
}

export async function getServiceBySlug(
  slug: string
): Promise<Service | undefined> {
  // Try Strapi first
  if (STRAPI_URL) {
    try {
      const url = new URL("/api/services", STRAPI_URL);
      url.searchParams.set("filters[slug][$eq]", slug);
      url.searchParams.set("populate", "*");
      const res = await fetch(url.toString(), { next: { revalidate: 60 } });
      if (res.ok) {
        const json = await res.json();
        if (json.data?.length > 0) return json.data[0];
      }
    } catch {
      // Fall through to dummy data
    }
  }
  return services.find((s) => s.slug === slug);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const strapi = await fetchFromStrapi<TeamMember>("team-members");
  if (strapi) return strapi.data;
  return teamMembers;
}

export async function getClientTestimonials(): Promise<ClientTestimonial[]> {
  const strapi = await fetchFromStrapi<ClientTestimonial>(
    "client-testimonials"
  );
  if (strapi) return strapi.data;
  return clientTestimonials;
}

// Search with API-driven pagination
export async function searchContent(
  query: string,
  tab: "team" | "services",
  page: number = 1,
  locale: string = "en"
): Promise<PaginatedResponse<TeamMember | Service>> {
  const q = query.toLowerCase();

  if (tab === "team") {
    const strapiResult = await fetchFromStrapi<TeamMember>(
      `team-members?filters[$or][0][name][$containsi]=${query}&filters[$or][1][role][$containsi]=${query}`,
      locale,
      page
    );
    if (strapiResult) return strapiResult;

    const filtered = teamMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.nameAr.includes(query) ||
        m.roleAr.includes(query)
    );
    return paginate(filtered, page);
  }

  // services tab
  const strapiResult = await fetchFromStrapi<Service>(
    `services?filters[$or][0][title][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}`,
    locale,
    page
  );
  if (strapiResult) return strapiResult;

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.titleAr.includes(query) ||
      s.descriptionAr.includes(query)
  );
  return paginate(filtered, page);
}

// Subscribe email
export async function subscribeEmail(
  email: string
): Promise<{ success: boolean; error?: string }> {
  if (STRAPI_URL) {
    try {
      const res = await fetch(`${STRAPI_URL}/api/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { email } }),
      });
      if (res.ok) return { success: true };
      const json = await res.json();
      if (res.status === 400) return { success: false, error: "duplicate" };
      return { success: false, error: json.error?.message || "Unknown error" };
    } catch {
      return { success: false, error: "Network error" };
    }
  }

  // Dummy: simulate with localStorage
  if (typeof window !== "undefined") {
    const subs = JSON.parse(localStorage.getItem("subscribers") || "[]");
    if (subs.includes(email)) {
      return { success: false, error: "duplicate" };
    }
    subs.push(email);
    localStorage.setItem("subscribers", JSON.stringify(subs));
  }
  return { success: true };
}
