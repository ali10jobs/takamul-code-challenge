export interface NavLink {
  key: string;
  href: string | null;
  hasDropdown?: boolean;
}

export const navLinks: NavLink[] = [
  { key: "home", href: "/" },
  { key: "aboutUs", href: null },
  { key: "services", href: null, hasDropdown: true },
  { key: "blog", href: null },
  { key: "ourTeam", href: null },
  { key: "contactUs", href: null },
];

export const footerLinks = [
  { key: "about", href: null },
  { key: "ourStrategy", href: null },
  { key: "ourAdvantages", href: null },
  { key: "socialResponsibility", href: null },
  { key: "ourServices", href: null },
];
