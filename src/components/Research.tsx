"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Microscope, BookOpen, FileText, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const papers = [
  {
    title: "Enhancing Web Application Performance through Lazy Loading Strategies and Component-Driven Architecture",
    abstract: "This paper investigates various lazy loading strategies in modern JavaScript frameworks, evaluating their impact on Core Web Vitals, user experience metrics, and overall application performance. We propose a hybrid component-driven approach that reduces initial bundle size by up to 42%.",
    status: "Published",
    statusColor: "#10B981",
    journal: "International Journal of Web Engineering (IJWE)",
    year: "2024",
    supervisor: "Dr. Md. Rafiqul Islam",
    conference: "IEEE Web Technologies Conference 2024",
    tags: ["Web Performance", "Lazy Loading", "React", "Core Web Vitals"],
  },
  {
    title: "Machine Learning-Based Predictive Models for Academic Performance Analysis in Bangladeshi Universities",
    abstract: "This research applies supervised learning algorithms — including Random Forest, XGBoost, and LSTM — to predict student academic outcomes using demographic, socio-economic, and behavioral data. The proposed model achieves 87.3% prediction accuracy on real university datasets.",
    status: "Under Review",
    statusColor: "var(--color-accent-blue)",
    journal: "Journal of Educational Data Mining (JEDM)",
    year: "2024",
    supervisor: "Dr. Fatema Khatun",
    conference: "AAAI Workshop on AI in Education 2025",
    tags: ["Machine Learning", "Education", "XGBoost", "LSTM", "Data Analysis"],
  },
  {
    title: "A Comparative Study of Modern Frontend Frameworks for Single-Page Application Development",
    abstract: "This comparative analysis evaluates React, Angular, Vue.js, and Svelte across dimensions including performance benchmarks, developer experience, bundle size, and scalability. Results provide evidence-based guidance for framework selection in enterprise-level applications.",
    status: "In Progress",
    statusColor: "#F59E0B",
    journal: "ACM Computing Surveys",
    year: "2025",
    supervisor: "Dr. Mohammad Aziz",
    conference: "ACM CHI 2025",
    tags: ["Frontend Frameworks", "SPA", "React", "Angular", "Performance"],
  },
];

export function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="research" ref={sectionRef} className="py-24 relative" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-8" style={{ backgroundColor: "var(--color-accent-blue)", opacity: 0.08 }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-accent-cyan)" }}>Academic Contributions</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: "var(--font-sora)" }}>
            Research <span style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Publications</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-cyan))" }} />
        </div>

        <div ref={cardsRef} className="flex flex-col gap-8">
          {papers.map((paper, i) => (
            <div
              key={i}
              className="relative p-8 rounded-2xl transition-all duration-300 glass-card"
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(6,182,212,0.25)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              {/* Status badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: "rgba(6,182,212,0.1)" }}>
                    <Microscope size={18} style={{ color: "var(--color-accent-cyan)" }} />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: `${paper.statusColor}20`, color: paper.statusColor }}>
                    ● {paper.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock size={13} /> {paper.year}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-4 leading-snug" style={{ fontFamily: "var(--font-sora)" }}>
                {paper.title}
              </h3>

              {/* Abstract */}
              <div className="mb-5">
                <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
                  <FileText size={12} /> Abstract
                </div>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                  {paper.abstract}
                </p>
              </div>

              {/* Meta */}
              <div className="grid sm:grid-cols-2 gap-3 mb-5 text-sm">
                <div className="flex items-start gap-2 text-gray-500">
                  <BookOpen size={14} className="shrink-0 mt-0.5" style={{ color: "var(--color-accent-cyan)" }} />
                  <span>{paper.journal}</span>
                </div>
                <div className="text-gray-500">
                  <span className="text-gray-600 text-xs uppercase tracking-wide">Supervisor: </span>
                  <span>{paper.supervisor}</span>
                </div>
                <div className="sm:col-span-2 text-gray-500 text-xs">
                  <span className="text-gray-600 uppercase tracking-wide">Conference/Venue: </span>
                  <span className="italic">{paper.conference}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {paper.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs rounded-md text-gray-400"
                    style={{ backgroundColor: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.15)", color: "rgba(6,182,212,0.9)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
