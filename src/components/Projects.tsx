"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ChevronDown, ExternalLink, Lock } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { TextReveal } from "@/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "e-KYC – Electronic Know Your Customer",
    type: "Professional",
    duration: "Jan 2022 – Present",
    image: "/image/project/ekyc.png",
    summary: "A digital eKYC onboarding solution used across multiple banks. I built responsive Angular interfaces and assisted with deployment workflows and DevOps.",
    description: "As a Junior Software Engineer, I contributed to the development and maintenance of a digital eKYC (Electronic Know Your Customer) solution used across multiple banks. My responsibilities included implementing responsive user interfaces using Angular. I also assisted in deployment workflows and DevOps practices. This role strengthened my foundation in full-stack development and taught me the importance of security, scalability, and performance in financial applications.",
    tech: ["Angular", ".NET", "SQL", "Nebular", "Bootstrap"],
    accent: "#3b82f6",
    live: "https://eaccount.bracbank.com/onboarding/common/welcome",
    github: "",
  },
  {
    title: "Jachai",
    type: "Professional",
    duration: "Jan 2022 – Present",
    image: "/image/project/jachai.png",
    summary: "A government-integrated platform for birth certificate verification via proxy APIs. I built Angular frontend components that consume secure endpoints and validate responses.",
    description: "At Jachai, I worked as a Junior Software Engineer on a government-integrated platform used for birth certificate verification via proxy APIs. I was involved in developing and maintaining frontend components using Angular. My responsibilities included consuming secure API endpoints, handling response validations, and ensuring reliable communication between client and server systems. This role enhanced my understanding of secure data handling, API-driven architectures, and real-world application of digital identity verification in government services.",
    tech: ["Angular", ".NET", "SQL", "Stored Procedures", "Redux"],
    accent: "#8b5cf6",
    live: "",
    github: "",
  },
  {
    title: "Swiggy API Clone",
    type: "Personal",
    duration: "2025",
    image: "/image/project/swiggy-clone.png",
    summary: "A food delivery interface in React powered by the real-time Swiggy API, showing restaurant listings, menus and live order data.",
    description: "As part of a personal project, I developed a dynamic food delivery interface using React.js and integrated the real-time Swiggy API to display restaurant listings, menus, and live order data. The project focused on rendering responsive UI components, optimizing API calls, and ensuring smooth user interactions with real-time data updates. This experience helped me strengthen my skills in React hooks, component architecture, API consumption, and performance optimization in single-page applications.",
    tech: ["React", "Swiggy API", "Redux"],
    accent: "#06b6d4",
    live: "https://react-ten-drab.vercel.app/",
    github: "https://github.com/Imran-Shovon/React.git",
  },
];

export function Projects() {
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
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
        <div className="absolute top-1/2 right-[-5%] w-[500px] h-[500px] rounded-full blur-[160px]" style={{ backgroundColor: "var(--color-accent-blue)", opacity: 0.07 }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <TextReveal className="flex flex-col items-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-accent-blue)" }}>My Work</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: "var(--font-sora)" }}>
            Featured <span style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Projects</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))" }} />
        </TextReveal>

        <div ref={cardsRef} className="flex flex-col gap-8">
          {projects.map((project, i) => {
            const isOpen = expanded === project.title;
            return (
              <article
                key={project.title}
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
                      <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(min-width: 1024px) 460px, 100vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
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
                    onClick={() => setExpanded(isOpen ? null : project.title)}
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
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white font-semibold transition-all hover:-translate-y-0.5"
                        style={{ backgroundColor: project.accent, boxShadow: `0 0 20px ${project.accent}40` }}
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
                        style={{ backgroundColor: "var(--tag-bg)", border: "1px solid var(--border-hover)", color: "var(--color-text)" }}
                      >
                        <GithubIcon size={14} /> Code
                      </a>
                    )}
                    {!project.live && !project.github && (
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
      </div>
    </section>
  );
}
