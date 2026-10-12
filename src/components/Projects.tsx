"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Calendar, ChevronDown, ExternalLink, Lock } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { TextReveal } from "@/components/ScrollReveal";
import type { Project } from "@/lib/content-types";

gsap.registerPlugin(ScrollTrigger);

// `limit` shows only the first N projects plus a link to the full /projects page
export function Projects({ projects, limit }: { projects: Project[]; limit?: number }) {
  const visibleProjects = limit ? projects.slice(0, limit) : projects;
  const hasMore = visibleProjects.length < projects.length;
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      Array.from(cardsRef.current?.children ?? []).forEach(card => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [projects, limit]);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
        <div className="absolute top-1/2 right-[-5%] w-[500px] h-[500px] rounded-full blur-[160px]" style={{ backgroundColor: "var(--color-accent-blue)", opacity: 0.07 }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {!limit && (
          <Link href="/#projects"
            className="inline-flex items-center gap-2 mt-4 mb-8 text-sm font-medium transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <ArrowLeft size={16} /> Back to home
          </Link>
        )}

        <TextReveal className="flex flex-col items-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-accent-blue)" }}>My Work</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: "var(--font-sora)" }}>
            {limit ? "Featured" : "All"} <span style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Projects</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))" }} />
        </TextReveal>

        <div ref={cardsRef} className="flex flex-col gap-8">
          {visibleProjects.map((project, i) => {
            const isOpen = expanded === project.id;
            return (
              <article
                key={project.id}
                className="group relative grid lg:grid-cols-2 gap-6 lg:gap-10 items-center p-5 md:p-7 rounded-2xl transition-all duration-300 glass-card"
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${project.accent}40`;
                  e.currentTarget.style.boxShadow = `0 20px 60px ${project.accent}14`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "0 4px 30px rgba(0,0,0,0.12)";
                }}
              >
                {/* Screenshot in a browser frame */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div
                    className="rounded-xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-1"
                    style={{ border: "1px solid var(--border-alt)", backgroundColor: "var(--card-solid)", boxShadow: `0 16px 40px ${project.accent}1f` }}
                  >
                    <div className="flex items-center gap-1.5 px-3 h-7" style={{ borderBottom: "1px solid var(--border)" }}>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="relative aspect-[1880/862] overflow-hidden">
                      {project.image && <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(min-width: 1024px) 460px, 100vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-medium">
                    <span className="px-2.5 py-1 rounded-full uppercase tracking-wider" style={{ backgroundColor: `${project.accent}18`, color: project.accent }}>
                      {project.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <Calendar size={12} /> {project.duration}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 leading-snug" style={{ fontFamily: "var(--font-sora)" }}>
                    {project.title}
                  </h3>

                  <p className="text-sm md:text-[15px] text-gray-400 leading-relaxed">
                    {isOpen ? project.description : project.summary}
                  </p>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : project.id)}
                    aria-expanded={isOpen}
                    className="self-start mt-2 mb-5 inline-flex items-center gap-1 text-xs font-semibold"
                    style={{ color: project.accent }}
                  >
                    {isOpen ? "Show less" : "Read more"}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(t => (
                      <span key={t} className="px-2.5 py-1 text-xs rounded-md font-medium"
                        style={{ backgroundColor: "var(--tag-bg)", border: "1px solid var(--tag-border)", color: "var(--text-muted)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white font-semibold transition-all hover:-translate-y-0.5"
                        style={{ backgroundColor: project.accent, boxShadow: `0 0 20px ${project.accent}40` }}
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
                        style={{ backgroundColor: "var(--tag-bg)", border: "1px solid var(--border-hover)", color: "var(--color-text)" }}
                      >
                        <GithubIcon size={14} /> Code
                      </a>
                    )}
                    {!project.liveUrl && !project.githubUrl && (
                      <span className="inline-flex items-center gap-2 text-xs text-gray-500">
                        <Lock size={13} /> Private / internal project
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-12">
            <Link href="/projects"
              className="group/btn inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm text-white font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))", boxShadow: "0 0 24px rgba(59,130,246,0.35)" }}
            >
              View all {projects.length} projects
              <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
