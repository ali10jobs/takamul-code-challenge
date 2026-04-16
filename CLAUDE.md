# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A CMS-driven headless frontend code challenge for **Takamul Technologies**. Built with Next.js + Strapi.

**Scope — 3 pages only:**
1. Homepage
2. Service Detail Page (`/services/[service-id]`)
3. Search Page

**Do NOT build**: Contact Us, About Us, or Blog pages — these are design placeholders. Show them as unlinked items in navigation.

**Backend is optional**: Strapi CMS is preferred to demonstrate CMS familiarity, but you may use static/dummy data instead. Either way, multi-language support is mandatory.

**RTK Query can be ignored** — not required for this task.

## Commands

```bash
npm run dev          # Development
npm run build        # Build
npm run lint         # Lint
npm test             # Run all tests
npx jest <file>      # Run a single test
npx jest --watch     # Watch mode
```

## Tech Stack

| Concern | Library |
|---|---|
| Framework | Next.js (App or Pages Router, use SSG/SSR where applicable) |
| Styling | Tailwind CSS preferred (Shadcn/UI allowed per FAQ but Tailwind preferred to assess design skills) |
| State | Redux Toolkit (search query, language selection, form states) |
| Forms | Formik — required for Footer subscription, optional for Header search input |
| i18n | `i18next` or `next-intl` — EN + AR with full RTL support for Arabic |
| CMS/API | Strapi |
| Testing | Jest + React Testing Library |

## Tailwind Theme

Extend `tailwind.config.js` with this palette extracted from the designs:

```js
colors: {
  primary:        '#3b2314', // Navbar, Footer, mega-menu, image gradient overlays
  accent:         '#7d4c38', // Team/client card backgrounds, buttons
  'accent-hover': '#8e5a45', // Button/link hover state
  background:     '#f9f6f0', // Light page sections (Our Team, content areas)
  'text-main':    '#1c1917', // Primary text on light backgrounds
  divider:        '#d6d3d1', // Thin lines (footer separator, search result dividers)
  muted:          '#78716c', // Pagination numbers, inactive tabs
}
```

## Global Components

### Header / Navigation (present on all pages)

- **Logo**: Top-left corner
- **Nav links**: Home, About Us, Services (dropdown), Blog, Our Team, Contact Us — only Home and Services link to built pages; others are unlinked placeholders
- **"Book Appointment" button**: Outlined white button, top-right corner
- **Services Dropdown (Mega-menu)**: Full-width dropdown with `bg-primary`. Service links in ~4-column grid layout. Featured hero image at bottom-left. White "Read More" button inside the dropdown. (Instructions say "can be simple dropdown" but the design image shows a mega-menu — build what the image shows.)
- **Search icon**: Clicking opens a search input (optionally Formik). Submitting redirects to the Search Page.
- **Language Toggle**: AR/EN toggle visible in header. Updates Redux state and flips entire app to/from RTL.

### Footer (present on all pages)

- **Subscription row**: Email input + brown "Subscribe" button (Formik with email validation). Prevent duplicate submissions, show success/error messages. Emails stored in Strapi Subscribers collection.
- **"Contacts" label**: Displayed next to the social icons
- **Social icons**: Twitter, Facebook, Google+
- **Divider**: Thin line (`divider` color) separating subscription row from bottom links
- **Bottom links row**: About, Our Strategy, Our Advantages, Social Responsibility, Our Services
- **Copyright**: "© 2024. All rights reserved." — bottom-right
- **Multilingual**: All footer labels and links translated in AR/EN with RTL support

## Page Layouts

### Homepage (Landing Page.png)

**Hero Section:**
- Background images/videos fetched from CMS with grayscale/dark filter overlay
- Auto-play for background videos, smooth transitions for image sliders
- Vertical slider dots on the left side for slide navigation
- Overlay text: heading + description paragraph
- **"Read More" CTA button**: URL is CMS-configurable (internal or external link). Must NOT navigate to a hardcoded/fixed page — FAQ #7 is explicit about this.
- Multilingual text in AR/EN with RTL

**Our Team Section:**
- Light (`background`) section with title + description text
- 3 team member cards displayed side by side: image (with grayscale/dark filter), name, role
- Left/right navigation arrows for carousel browsing
- Social icons below each member card (phone, email, social media)
- Data fetched from CMS Team Members collection

**What Our Clients Are Saying Section:**
- Large introductory paragraph at the top
- Quoted testimonial block with testimonial text in quotation marks
- Author name + role (e.g., "Mohammed Saif", "CEO/Company")
- Navigation dots at the bottom for carousel
- Data fetched from CMS Clients/Testimonials collection

### Service Detail Page (`/services/[service-id]`) (Services Details.png)

- **Hero image** at top with grayscale/dark filter (header overlaid on top)
- **"< Back" button** to return to previous view
- **Page title**: e.g., "Legal Consultation Services"
- **Rich text body** with structured subsections, each with bullet points:
  - General Legal Consultations
  - Corporate Legal Consultations (with sub-bullets about advisory services)
  - Individual Legal Consultations (family issues, real estate, employment, criminal cases)
- Dynamic routing via slug (`[service-id]`) — each service has its own dedicated page
- Footer at bottom

### Search Page (Services Page.jpg)

- **Hero section** at top: dark background image with grayscale filter, centered search input bar + "Book Appointment" button
- **"< Back" link** below the hero
- **Left sidebar**: Two tabs — "Team" and "Services". Each tab filters and displays paginated results for the search term.
- **Right panel**: Search results displayed as items, each with title text + "Read more" link, separated by horizontal dividers
- Search query read from URL/Redux state
- **Pagination (STRICT — API-driven)**:
  - Must be driven by CMS API calls (Strapi `pagination[page]` + `pagination[pageSize]`), NOT frontend array slicing
  - 9–10 results per page
  - UI: `< 1 2 3 [page number input box] 999 >` — prev/next arrows, numbered pages, a text input for jumping to a specific page, and total page count
- Footer at bottom

## Architecture

### API / Data Fetching

All Strapi calls go through a single configured client (`lib/strapi.ts`) that auto-injects locale (from i18n state) and pagination params. Pages use SSG/SSR for CMS data. Pagination on the Search Page **must** be API-driven (Strapi `pagination[page]` + `pagination[pageSize]=9`) — never frontend array slicing.

Implement proper error handling for all API requests. Show loading states (skeleton loaders or spinners) during client-side data fetches.

### Design System (Tailwind — Atomic Design)

Reusable components extracted from repeated patterns across the design images, organized in three layers:

**Primitives (atoms):**
- `<Button />` — 3 variants: solid brown ("Subscribe", "Read More" in mega-menu), outlined white ("Book Appointment"), icon-only (slider arrows, pagination arrows)
- `<Input />` — 2 contexts: header search bar (transparent/dark background), footer email field (white background)
- `<SocialIcon />` — reused in team member cards AND footer (Twitter, Facebook, Google+, phone, email)
- `<Divider />` — reused between search result items and above footer bottom links

**Composed (molecules):**
- `<TeamCard />` — image + name + role + social icons row
- `<TestimonialCard />` — quote block + author name + role
- `<SearchResultItem />` — title text + "Read more" link + divider
- `<PaginationBar />` — prev/next arrows + numbered pages + page number input box + total count

**Layout (organisms):**
- `<HeroSection />` — background media + dark/grayscale overlay + vertical slider dots + CTA button
- `<Carousel />` — reused for team members (left/right arrows) AND client testimonials (navigation dots) with different children

## Performance

- **SSG/SSR**: Use appropriate rendering strategy for CMS data fetches
- **ISR**: Utilize Incremental Static Regeneration with a set revalidation timeframe where applicable
- **Image Optimization**: Use `next/image` for all media. Maintain grayscale/dark filter style per design.
- **Lazy Loading**: Use `next/dynamic` for client-heavy components (Hero video player, Client Testimonials slider)
- **Fonts**: Use `next/font` to self-host English and Arabic fonts. Use `size-adjust` to eliminate CLS.
- **Loading States**: Show skeleton loaders or CSS spinners during all client-side API data fetches
- **Redux Optimization**: Code-split the Redux store. Only inject the `search` slice when the user interacts with search or navigates to the Search Page.
- **Responsive**: The entire website must be fully responsive across all viewports (mobile, tablet, desktop). All pages, global components (header, footer), and design system components must adapt properly.

## i18n / RTL

- Use `i18next` or `next-intl` for translations.
- Locale stored in Redux state and persisted.
- When locale is `ar`, set `dir="rtl"` on `<html>`. Tailwind RTL variants (`rtl:`) handle mirroring.
- All hardcoded labels (form placeholders, "Read More", "Back", "Subscribe", "Contacts", "Book Appointment", nav links, footer links, copyright, etc.) must go through the i18n dictionary.

## Testing Focus

Three focused test areas using Jest + React Testing Library:

1. **Redux slice** — assert toggling locale EN → AR updates state correctly and RTL direction flag flips.
2. **Formik subscription form** — assert invalid email is rejected, valid email shows success state, and duplicate-email API error is surfaced in UI.
3. **Pagination logic** — unit-test page-count math against mocked Strapi paginated responses: 0 results (no pages), exactly 9 (1 page), 10 (2 pages).

## Strapi Collections

| Collection | Key Fields |
|---|---|
| Global/Navigation | multilingual nav links, services dropdown list |
| Homepage (Single Type) | hero media (images/videos), slider content, CTA URL (configurable — not hardcoded) |
| Services (Collection) | title, slug, description, rich text content blocks |
| Team Members (Collection) | image, name, role |
| Clients/Testimonials (Collection) | logo/image, testimonial quote, name, role/company |
| Subscribers (Collection) | email (validate uniqueness server-side) |
| Pages & Blog | schemas only — no frontend pages built for these |

## Execution Steps

1. Initialize Next.js project with Tailwind CSS, Redux Toolkit, and i18n setup
2. Configure Tailwind theme (palette above) and RTL directional support
3. Set up Strapi with all collections above (or create dummy data files)
4. Build `lib/strapi.ts` client with auto locale/pagination injection
5. Build the Design System atoms → molecules → organisms
6. Build Global Layout (Header with mega-menu, Footer with Formik subscription)
7. Implement Homepage (Hero with slider, Our Team carousel, Clients carousel)
8. Implement Service Detail Page (dynamic route, rich text rendering)
9. Implement Search Page (tabs, results, API-driven pagination)
10. Add i18n translations for AR/EN and verify full RTL support
11. Responsive pass — entire website must work across mobile, tablet, and desktop
12. Set up Jest + RTL and write the 3 required tests
