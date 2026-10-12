"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code } from "lucide-react";
import { TextReveal } from "@/components/ScrollReveal";
import type { Profile } from "@/lib/content-types";
import { ICONS } from "@/lib/icons";

gsap.registerPlugin(ScrollTrigger);

/** Paragraphs are plain text from the dashboard; the owner's name keeps its bold highlight. */
function Paragraph({ text, name }: { text: string; name: string }) {
  if (!name || !text.includes(name)) return <>{text}</>;
  const [before, ...after] = text.split(name);
  return (
    <>
      {before}
      <span className="text-white font-semibold">{name}</span>
      {after.join(name)}
    </>
  );
}

export function About({ profile }: { profile: Profile }) {
  const paragraphs = profile.aboutParagraphs;
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

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Heading */}
        <TextReveal className="flex flex-col items-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-accent-blue)" }}>Who I Am</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: "var(--font-sora)" }}>
            About <span style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Me</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))" }} />
        </TextReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div ref={textRef}>
            {paragraphs.map((text, i) => (
              <p key={i} className={`text-gray-400 text-lg leading-relaxed ${i === paragraphs.length - 1 ? "mb-8" : "mb-6"}`}>
                <Paragraph text={text} name={profile.fullName} />
              </p>
            ))}

            <div className="flex flex-wrap gap-4">
              {profile.traits.map(tag => (
                <span key={tag} className="px-4 py-2 text-sm rounded-full border text-gray-300" style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {profile.stats.map(({ value, label, icon }) => {
              const Icon = ICONS[icon] ?? Code;
              return (
              <div key={label} className="group relative p-6 rounded-2xl transition-all duration-300 cursor-default glass-card"
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <Icon size={24} className="mb-3" style={{ color: "var(--color-accent-blue)" }} />
                <div className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-sora)" }}>{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
