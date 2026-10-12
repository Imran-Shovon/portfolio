/** Shapes of `GET /public/sites/:slug` from portfolio-backend. Shared by server and client components. */

export type SectionKey = "skills" | "experience" | "projects" | "education" | "publications";
export type Sections = Record<SectionKey, boolean>;

export type SocialPlatform = "github" | "linkedin" | "researchgate" | "email" | "other";

export interface Profile {
  fullName: string;
  shortName: string;
  greeting: string;
  headline: string;
  subHeadline: string;
  heroDescription: string;
  photo: string;
  resumeUrl: string;
  aboutParagraphs: string[];
  traits: string[];
  stats: { value: string; label: string; icon: string }[];
  techBadges: string[];
  loaderTagline: string;
  footerTagline: string;
  availability: string;
  contact: { email: string; phone: string; location: string; heading: string; blurb: string };
  socials: { platform: SocialPlatform; label: string; url: string }[];
  seo: { title: string; description: string };
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  skills: { name: string; level: number }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  type: string;
  accent: string;
  responsibilities: string[];
  tech: string[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  type: string;
  duration: string;
  image: string;
  summary: string;
  description: string;
  tech: string[];
  accent: string;
  /** "" hides the button. */
  liveUrl: string;
  githubUrl: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration?: string;
  status?: string;
  grade: string;
  gradeLabel: string;
  description: string;
  accent: string;
}

export interface Publication {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
  publisher: string;
  publisherFull: string;
  accent: string;
  tags: string[];
  paperUrl: string;
}

export interface SiteContent {
  site: { name: string; slug: string; sections: Sections };
  profile: Profile;
  skillCategories: SkillCategory[];
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  publications: Publication[];
}
