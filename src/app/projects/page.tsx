import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { getSiteContent } from "@/lib/content";
import { getNavLinks } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getSiteContent();
  return {
    title: `Projects | ${profile.shortName}`,
    description: `All projects by ${profile.fullName}${profile.headline ? ` - ${profile.headline}` : ""}.`,
  };
}

export default async function ProjectsPage() {
  const { site, profile, projects } = await getSiteContent();
  if (!site.sections.projects) notFound();
  const links = getNavLinks(site.sections);

  return (
    <>
      <BackToTop />
      <main className="relative min-h-screen pt-16" style={{ backgroundColor: "var(--color-surface)" }}>
        <Navbar links={links} brand={profile.shortName} resumeUrl={profile.resumeUrl} />
        <Projects projects={projects} />
        <Footer profile={profile} links={links} />
      </main>
    </>
  );
}
