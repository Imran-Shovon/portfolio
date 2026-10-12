import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Projects | Shovon",
  description: "All projects by Md Shovon Biswas - Frontend Developer.",
};

export default function ProjectsPage() {
  return (
    <>
      <BackToTop />
      <main className="relative min-h-screen pt-16" style={{ backgroundColor: "var(--color-surface)" }}>
        <Navbar />
        <Projects />
        <Footer />
      </main>
    </>
  );
}
