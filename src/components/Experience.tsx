"use client";

import { TextReveal } from "@/components/ScrollReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ChevronRight } from "lucide-react";
import { Fragment, useEffect, useRef } from "react";
import type { Experience as Exp } from "@/lib/content-types";

gsap.registerPlugin(ScrollTrigger);

const initials = (name: string) =>
  name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

// "November 2025 – Present" → ["2025", "Now"]
const yearRange = (duration: string) =>
  duration.split(" – ").map(part => (part === "Present" ? "Now" : part.split(" ").pop()));

// Wraps figures like "40%" in an accent-colored highlight
function Highlight({ text, accent }: { text: string; accent: string }) {
  return (
    <>
      {text.split(/(\d+%)/).map((part, i) =>
        /^\d+%$/.test(part) ? (
          <span key={i} className="font-semibold" style={{ color: accent }}>{part}</span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function PeriodMeta({ exp, current }: { exp: Exp; current: boolean }) {
  const [from, to] = yearRange(exp.duration);
  return (
    <>
      <p className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-sora)", color: exp.accent }}>
        {from} <span className="text-gray-500 font-normal">—</span> {to}
      </p>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 whitespace-nowrap">
        <Calendar size={11} /> {exp.duration}
      </p>
      <div className="mt-3 flex flex-wrap items-center md:justify-end gap-2">
        <span
          className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider"
          style={{ backgroundColor: `${exp.accent}15`, border: `1px solid ${exp.accent}30`, color: exp.accent }}
        >
          {exp.type}
        </span>
        {current && (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider"
            style={{ backgroundColor: "#10B98115", border: "1px solid #10B98130", color: "#10B981" }}
          >
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: "#10B981" }} />
              <span className="relative w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#10B981" }} />
            </span>
            Current
          </span>
        )}
      </div>
    </>
  );
}

export function Experience({ experiences }: { experiences: Exp[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress line fills as the timeline scrolls through the viewport
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: timelineRef.current, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
        },
      );

      gsap.utils.toArray<HTMLElement>(".exp-item").forEach(item => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 80%" } });
        tl.fromTo(item.querySelector(".exp-node"), { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(2)" })
          .fromTo(item.querySelector(".exp-meta"), { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.3")
          .fromTo(item.querySelector(".exp-card"), { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "<");
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [experiences]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 relative"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] rounded-full blur-[140px]"
          style={{ backgroundColor: "var(--color-accent-cyan)", opacity: 0.1 }}
        />
        <div
          className="absolute top-1/4 right-[-10%] w-[420px] h-[420px] rounded-full blur-[150px]"
          style={{ backgroundColor: "var(--color-accent-purple)", opacity: 0.08 }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Heading */}
        <TextReveal className="flex flex-col items-center mb-16">
          <span
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--color-accent-cyan)" }}
          >
            Career Path
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Work{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-cyan))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Experience
            </span>
          </h2>
          <div
            className="w-16 h-1 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-cyan))",
            }}
          />
        </TextReveal>

        {/* Timeline: period column | line | card */}
        <div ref={timelineRef} className="relative">
          {/* Track + scroll-driven progress line */}
          <div className="absolute top-0 bottom-0 left-[11px] md:left-[249px] w-[2px] rounded-full" style={{ backgroundColor: "var(--border)" }}>
            <div
              ref={progressRef}
              className="absolute inset-0 origin-top rounded-full"
              style={{
                background: "linear-gradient(180deg, var(--color-accent-blue), var(--color-accent-purple), var(--color-accent-cyan))",
                boxShadow: "0 0 12px rgba(139,92,246,0.5)",
              }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {experiences.map(exp => {
              const current = exp.duration.endsWith("Present");
              return (
                <div key={exp.id} className="exp-item relative grid md:grid-cols-[230px_1fr] gap-4 md:gap-10 pl-10 md:pl-0">
                  {/* Node on the line */}
                  <div className="exp-node absolute left-0 md:left-[238px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center z-10"
                    style={{ backgroundColor: "var(--color-base)", border: `2px solid ${exp.accent}`, boxShadow: `0 0 0 4px ${exp.accent}15, 0 0 18px ${exp.accent}60` }}
                  >
                    {current && <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: `${exp.accent}40` }} />}
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: exp.accent }} />
                  </div>

                  {/* Period column (sticks beside the card on desktop) */}
                  <div className="exp-meta md:text-right md:pr-6">
                    <div className="md:sticky md:top-28 md:flex md:flex-col md:items-end">
                      <PeriodMeta exp={exp} current={current} />
                    </div>
                  </div>

                  {/* Card (wrapper takes the entrance tween, inner div the hover lift) */}
                  <div className="exp-card md:ml-4">
                  <div
                    className="group relative overflow-hidden p-6 md:p-8 rounded-2xl transition-all duration-500 glass-card"
                    onMouseMove={e => {
                      const r = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                      e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${exp.accent}40`;
                      e.currentTarget.style.boxShadow = `0 24px 60px ${exp.accent}18`;
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.boxShadow = "0 4px 30px rgba(0,0,0,0.12)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Cursor spotlight */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${exp.accent}14, transparent 65%)` }}
                    />
                    {/* Accent hairline */}
                    <div className="absolute top-0 left-8 right-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${exp.accent}, transparent)` }} />

                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-sm font-bold tracking-wide"
                          style={{
                            fontFamily: "var(--font-sora)",
                            color: "#fff",
                            background: `linear-gradient(135deg, ${exp.accent}, ${exp.accent}99)`,
                            boxShadow: `0 8px 24px ${exp.accent}40, inset 0 1px 0 rgba(255,255,255,0.25)`,
                          }}
                        >
                          {initials(exp.company)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg md:text-xl font-semibold text-white leading-snug" style={{ fontFamily: "var(--font-sora)" }}>
                            {exp.role}
                          </h3>
                          <p className="text-sm font-medium mt-0.5" style={{ color: exp.accent }}>
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <ul className="space-y-3 mb-6">
                        {exp.responsibilities.map(r => (
                          <li key={r} className="text-sm md:text-[15px] text-gray-400 leading-relaxed flex items-start gap-2.5">
                            <ChevronRight size={15} className="shrink-0 mt-[3px]" style={{ color: exp.accent }} />
                            <span><Highlight text={r} accent={exp.accent} /></span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech */}
                      <div className="pt-5 flex flex-wrap gap-2" style={{ borderTop: "1px solid var(--border)" }}>
                        {exp.tech.map(t => (
                          <span
                            key={t}
                            className="px-2.5 py-1 text-xs rounded-md font-medium transition-colors duration-300"
                            style={{ backgroundColor: "var(--tag-bg)", border: "1px solid var(--tag-border)", color: "var(--text-muted)" }}
                            onMouseEnter={e => {
                              e.currentTarget.style.borderColor = `${exp.accent}60`;
                              e.currentTarget.style.color = exp.accent;
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.borderColor = "var(--tag-border)";
                              e.currentTarget.style.color = "var(--text-muted)";
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
