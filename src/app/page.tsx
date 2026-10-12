import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Research } from "@/components/Research";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/PageLoader";
import { BackToTop } from "@/components/BackToTop";
import { getContactEndpoint, getSiteContent } from "@/lib/content";
import { getNavLinks } from "@/lib/navigation";

export default async function Home() {
  const { site, profile, skillCategories, experiences, projects, education, publications } = await getSiteContent();
  const { sections } = site;
  const links = getNavLinks(sections);
  const researchGate = profile.socials.find(s => s.platform === "researchgate")?.url ?? "";

  return (
    <>
      <PageLoader brand={profile.shortName} tagline={profile.loaderTagline} />
      <BackToTop />
      <main className="relative min-h-screen" style={{ backgroundColor: "var(--color-base)" }}>
        <Navbar links={links} brand={profile.shortName} resumeUrl={profile.resumeUrl} />
        <Hero profile={profile} />
        <About profile={profile} />
        {sections.skills && <Skills categories={skillCategories} techBadges={profile.techBadges} />}
        {sections.experience && <Experience experiences={experiences} />}
        {sections.projects && <Projects projects={projects} limit={4} />}
        {sections.education && <Education education={education} />}
        {sections.publications && <Research papers={publications} profileUrl={researchGate} />}
        <Contact profile={profile} endpoint={getContactEndpoint()} />
        <Footer profile={profile} links={links} />
      </main>
    </>
  );
}
