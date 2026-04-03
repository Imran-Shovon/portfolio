"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Database, Cpu, Globe, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    color: "var(--color-accent-blue)",
    skills: [
      { name: "HTML / CSS", level: 95 },
      { name: "JavaScript / TypeScript", level: 90 },
      { name: "React / Next.js", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Angular", level: 72 },
      { name: "Astro", level: 70 },
      { name: "GSAP", level: 80 },
    ],
  },
  {
    title: "Backend",
    icon: Database,
    color: "var(--color-accent-purple)",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 78 },
      { name: "REST APIs", level: 85 },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: Cpu,
    color: "var(--color-accent-cyan)",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Figma", level: 75 },
      { name: "VS Code", level: 95 },
      { name: "Bootstrap", level: 85 },
    ],
  },
  {
    title: "Research / Academic",
    icon: BookOpen,
    color: "#F59E0B",
    skills: [
      { name: "Data Analysis", level: 78 },
      { name: "Machine Learning", level: 70 },
      { name: "Research Writing", level: 82 },
    ],
  },
];

const techBadges = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Angular", "Astro",
  "Tailwind CSS", "Bootstrap", "GSAP", "Node.js", "Express", "Git", "GitHub", "Figma",
  "Data Analysis", "Machine Learning", "Research Writing", "VS Code",
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-5" style={{ backgroundColor: "var(--color-accent-blue)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-accent-purple)" }}>What I Know</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: "var(--font-sora)" }}>
            My <span style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Skills</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-cyan))" }} />
        </div>

        {/* Skill Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {skillCategories.map(({ title, icon: Icon, color, skills }) => (
            <div
              key={title}
              className="p-6 rounded-2xl transition-all duration-300"
              style={{
                background: "linear-gradient(145deg, rgba(11,15,25,0.8), rgba(17,24,39,0.4))",
                border: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}40`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-sora)" }}>{title}</h3>
              </div>

              <div className="flex flex-col gap-4">
                {skills.map(({ name, level }) => (
                  <div key={name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">{name}</span>
                      <span className="text-sm font-medium" style={{ color }}>{level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${level}%`,
                          background: `linear-gradient(90deg, ${color}, ${color}99)`,
                          boxShadow: `0 0 8px ${color}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Cloud */}
        <div className="flex flex-wrap gap-3 justify-center">
          {techBadges.map(tech => (
            <span
              key={tech}
              className="px-4 py-2 text-sm rounded-full text-gray-300 transition-all duration-300 cursor-default"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseEnter={e => {
                (e.currentTarget.style.color) = "white";
                (e.currentTarget.style.borderColor) = "var(--color-accent-blue)";
                (e.currentTarget.style.background) = "rgba(59,130,246,0.1)";
              }}
              onMouseLeave={e => {
                (e.currentTarget.style.color) = "";
                (e.currentTarget.style.borderColor) = "rgba(255,255,255,0.08)";
                (e.currentTarget.style.background) = "rgba(255,255,255,0.04)";
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
