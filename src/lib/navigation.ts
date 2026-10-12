import type { SectionKey, Sections } from "@/lib/content-types";

const ALL_LINKS: { name: string; href: string; section?: SectionKey }[] = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills", section: "skills" },
  { name: "Experience", href: "/#experience", section: "experience" },
  { name: "Projects", href: "/#projects", section: "projects" },
  { name: "Education", href: "/#education", section: "education" },
  { name: "Research", href: "/#research", section: "publications" },
  { name: "Contact", href: "/#contact" },
];

export type NavLink = { name: string; href: string };

/** Navbar and footer links, without sections the dashboard has switched off. */
export function getNavLinks(sections: Sections): NavLink[] {
  return ALL_LINKS.filter(l => !l.section || sections[l.section]).map(({ name, href }) => ({ name, href }));
}
