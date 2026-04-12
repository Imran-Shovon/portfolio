"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { TextReveal } from "@/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: "Bachelor of Science in Computer Science & Engineering",
    university: "Banglaesh University of Business and Technology (BUBT)",
    duration: "2018 – 2022",
    expectedGrad: "Completed 2022",
    cgpa: "3.74 / 4.00",
    achievements: [
      "Merit Scholarship Recipient (2022, 2023)",
      "Best Final Year Project Award Nominee",
      "Dean's List – 3 consecutive semesters",
      "CSE Society Technical Lead",
    ],
    accent: "var(--color-accent-blue)",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    university: "Chuadanga Govt. College",
    duration: "2014 – 2016",
    expectedGrad: "Completed 2016",
    cgpa: "4.42 / 5.00",
    achievements: [
      "Perfect GPA in Science stream",
      "Board Scholarship recipient",
      "Science Olympiad – District Champion",
    ],
    accent: "var(--color-accent-purple)",
  },
];

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-24 relative" style={{ backgroundColor: "var(--color-base)" }}>
      <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] opacity-10" style={{ backgroundColor: "var(--color-accent-purple)" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <TextReveal className="flex flex-col items-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-accent-purple)" }}>Academic Background</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: "var(--font-sora)" }}>
            My <span style={{ background: "linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Education</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-cyan))" }} />
        </TextReveal>

        <div ref={cardsRef} className="flex flex-col gap-8">
          {educationData.map((edu) => (
            <div
              key={edu.degree}
              className="relative p-8 rounded-2xl transition-all duration-300 glass-card"
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${edu.accent}40`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              {/* Left accent bar */}
              <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full" style={{ backgroundColor: edu.accent }} />

              <div className="pl-2">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl shrink-0" style={{ backgroundColor: `${edu.accent}15` }}>
                      <GraduationCap size={24} style={{ color: edu.accent }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1" style={{ fontFamily: "var(--font-sora)" }}>{edu.degree}</h3>
                      <p className="font-medium" style={{ color: edu.accent }}>{edu.university}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-2 text-sm text-gray-500 justify-end mb-1">
                      <Calendar size={13} />
                      <span>{edu.duration}</span>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: edu.accent }}>{edu.cgpa}</div>
                    <div className="text-xs text-gray-600">CGPA</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600 mb-5">
                  <span className="px-2 py-1 rounded-full" style={{ backgroundColor: `${edu.accent}15`, color: edu.accent }}>{edu.expectedGrad}</span>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                    <Award size={14} style={{ color: edu.accent }} />
                    Academic Achievements
                  </h4>
                  <div className="flex flex-col gap-2">
                    {edu.achievements.map((a, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: edu.accent }} />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
