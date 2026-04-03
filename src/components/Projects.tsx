"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Premium E-Commerce Platform",
    description: "A full-featured e-commerce application with real-time inventory, advanced filtering, and seamless checkout flow. Built with a focus on performance and UX.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "REST API"],
    gradient: "from-blue-500/20 to-purple-500/20",
    accent: "var(--color-accent-blue)",
    live: "#",
    github: "#",
  },
  {
    title: "AI-Powered Dashboard",
    description: "An analytics dashboard integrating machine learning predictions with interactive data visualizations, real-time updates, and role-based access control.",
    tech: ["React", "TypeScript", "Chart.js", "Python", "FastAPI"],
    gradient: "from-purple-500/20 to-cyan-500/20",
    accent: "var(--color-accent-purple)",
    live: "#",
    github: "#",
  },
  {
    title: "Research Management System",
    description: "A collaborative platform for academic researchers to organize papers, track citations, manage team collaborations, and generate academic reports.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "GSAP"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    accent: "var(--color-accent-cyan)",
    live: "#",
    github: "#",
  },
  {
    title: "3D Portfolio Showcase",
    description: "An immersive 3D portfolio experience with interactive elements, particle systems, and smooth scroll-based storytelling using GSAP and Three.js.",
    tech: ["React", "Three.js", "GSAP", "WebGL", "Vite"],
    gradient: "from-amber-500/20 to-rose-500/20",
    accent: "#F59E0B",
    live: "#",
    github: "#",
  },
  {
    title: "Real-time Chat Application",
    description: "A scalable real-time messaging application featuring WebSocket connections, end-to-end encryption, file sharing, and group chat functionality.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    gradient: "from-rose-500/20 to-purple-500/20",
    accent: "#F43F5E",
    live: "#",
    github: "#",
  },
  {
    title: "Angular Admin Panel",
    description: "A comprehensive admin panel built with Angular, featuring dynamic theming, drag-and-drop layout customization, and granular permission management.",
    tech: ["Angular", "TypeScript", "RxJS", "NgRx", "SCSS"],
    gradient: "from-emerald-500/20 to-cyan-500/20",
    accent: "#10B981",
    live: "#",
    github: "#",
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
        <div className="absolute top-1/2 right-[-5%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-8" style={{ backgroundColor: "var(--color-accent-blue)", opacity: 0.07 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-accent-blue)" }}>My Work</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: "var(--font-sora)" }}>
            Featured <span style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Projects</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))" }} />
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative rounded-2xl overflow-hidden transition-all duration-400 cursor-pointer"
              style={{
                background: "linear-gradient(145deg, rgba(17,24,39,0.9), rgba(11,15,25,0.6))",
                border: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={e => {
                (e.currentTarget.style.transform) = "translateY(-6px)";
                (e.currentTarget.style.borderColor) = `${project.accent}40`;
                (e.currentTarget.style.boxShadow) = `0 20px 60px ${project.accent}15`;
              }}
              onMouseLeave={e => {
                (e.currentTarget.style.transform) = "";
                (e.currentTarget.style.borderColor) = "rgba(255,255,255,0.05)";
                (e.currentTarget.style.boxShadow) = "";
              }}
            >
              {/* Card top gradient strip */}
              <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} style={{ background: `linear-gradient(90deg, ${project.accent}80, transparent)` }} />

              {/* Card body */}
              <div className="p-6">
                <div className={`h-44 rounded-xl mb-5 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
                  style={{ background: `radial-gradient(circle at 30% 50%, ${project.accent}20, rgba(11,15,25,0.8))` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <span className="text-7xl font-bold text-white" style={{ fontFamily: "var(--font-sora)", color: project.accent }}>
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  <div className="relative z-10 px-4 text-center">
                    <div className="text-4xl mb-2">🚀</div>
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: "rgba(11,15,25,0.8)", backdropFilter: "blur(4px)" }}
                  >
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white font-medium transition-all"
                      style={{ backgroundColor: project.accent }}
                      onClick={e => e.stopPropagation()}
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white font-medium transition-all"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
                      onClick={e => e.stopPropagation()}
                    >
                      <GithubIcon size={14} /> Code
                    </a>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "var(--font-sora)" }}>{project.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="px-2 py-1 text-xs rounded-md font-medium"
                      style={{ backgroundColor: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}25` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
