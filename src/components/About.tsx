"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Globe, Briefcase, FileText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "2+", label: "Years Experience", icon: Briefcase },
  { value: "20+", label: "Projects Completed", icon: Code },
  { value: "3+", label: "Research Papers", icon: FileText },
  { value: "15+", label: "Technologies Mastered", icon: Globe },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(statsRef.current?.children ? Array.from(statsRef.current.children) : [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative" style={{ backgroundColor: "var(--color-base)" }}>
      {/* Section gradient accent */}
      <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
        <div className="absolute top-1/2 right-[-10%] w-[400px] h-[400px] rounded-full blur-[140px] opacity-10" style={{ backgroundColor: "var(--color-accent-purple)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-col items-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-accent-blue)" }}>Who I Am</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: "var(--font-sora)" }}>
            About <span style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Me</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div ref={textRef}>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              I&apos;m <span className="text-white font-semibold">Imran Shovon</span>, a passionate Frontend Developer based in Bangladesh with a deep love for building premium digital experiences. My journey started with a curiosity for how things work on the web, and has evolved into a professional career crafting high-quality applications.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Beyond developing beautiful interfaces, I actively engage in academic research, exploring the intersection of <span className="font-semibold" style={{ color: "var(--color-accent-cyan)" }}>technology and data science</span>. I believe that strong engineering and thoughtful UX design are inseparable.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              My goal is to contribute to projects that make a real difference — whether through elegant user interfaces, robust web applications, or meaningful research contributions.
            </p>

            <div className="flex flex-wrap gap-4">
              {["Detail-Oriented", "Creative", "Research-Driven", "Team Player"].map(tag => (
                <span key={tag} className="px-4 py-2 text-sm rounded-full border text-gray-300" style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="group relative p-6 rounded-2xl transition-all duration-300 cursor-default"
                style={{
                  background: "linear-gradient(145deg, rgba(17,24,39,0.8), rgba(11,15,25,0.4))",
                  border: "1px solid rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
              >
                <Icon size={24} className="mb-3" style={{ color: "var(--color-accent-blue)" }} />
                <div className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-sora)" }}>{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
