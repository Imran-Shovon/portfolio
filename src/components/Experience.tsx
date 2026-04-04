"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Frontend Developer",
    company: "Tech Solutions Ltd.",
    duration: "Jan 2024 – Present",
    type: "Full-time",
    accent: "var(--color-accent-blue)",
    responsibilities: [
      "Built and maintained responsive web applications using React and Next.js",
      "Led UI/UX redesign initiatives resulting in 40% improved user engagement",
      "Collaborated with backend teams to integrate RESTful APIs",
      "Implemented GSAP animations and interactive user experiences",
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
  },
  {
    role: "Junior Web Developer",
    company: "Creative Agency BD",
    duration: "Jun 2023 – Dec 2023",
    type: "Part-time",
    accent: "var(--color-accent-purple)",
    responsibilities: [
      "Developed responsive landing pages and marketing websites for clients",
      "Worked with design teams to translate Figma mockups into pixel-perfect code",
      "Optimized website performance and improved load times by 30%",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "Figma"],
  },
  {
    role: "Web Development Intern",
    company: "StartupHub Bangladesh",
    duration: "Jan 2023 – May 2023",
    type: "Internship",
    accent: "var(--color-accent-cyan)",
    responsibilities: [
      "Assisted in building internal dashboard interfaces using React",
      "Gained hands-on experience with Git workflows and agile development",
      "Created reusable component libraries for the front-end team",
    ],
    tech: ["React", "CSS", "Git", "GitHub"],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.8, ease: "power3.out",
          scrollTrigger: { trigger: lineRef.current, start: "top 80%" },
        }
      );

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 82%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 relative" style={{ backgroundColor: "var(--color-base)" }}>
      <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
        <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] rounded-full blur-[140px] opacity-10" style={{ backgroundColor: "var(--color-accent-cyan)" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-col items-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-accent-cyan)" }}>Career Path</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: "var(--font-sora)" }}>
            Work <span style={{ background: "linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Experience</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-cyan))" }} />
        </div>

        {/* Timeline — vertical left-aligned */}
        <div className="relative pl-8 md:pl-12">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-0 top-2 bottom-2 w-[2px] origin-top"
            style={{ background: "linear-gradient(180deg, var(--color-accent-blue), var(--color-accent-purple), var(--color-accent-cyan))" }}
          />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <div
                key={i}
                ref={el => { itemsRef.current[i] = el; }}
                className="relative"
              >
                {/* Dot on line */}
                <div
                  className="absolute left-[-29px] md:left-[-37px] top-5 w-4 h-4 rounded-full border-2 z-10"
                  style={{ borderColor: exp.accent, backgroundColor: "var(--color-base)", boxShadow: `0 0 10px ${exp.accent}60` }}
                />

                <div
                  className="p-6 rounded-2xl transition-all duration-300 glass-card"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${exp.accent}40`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg shrink-0 mt-0.5" style={{ backgroundColor: `${exp.accent}15` }}>
                        <Briefcase size={16} style={{ color: exp.accent }} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white" style={{ fontFamily: "var(--font-sora)" }}>{exp.role}</h3>
                        <p className="font-medium text-sm" style={{ color: exp.accent }}>{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 shrink-0">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {exp.duration}</span>
                      <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: `${exp.accent}15`, color: exp.accent }}>{exp.type}</span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <ul className="space-y-2 mb-4">
                    {exp.responsibilities.map((r, j) => (
                      <li key={j} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: exp.accent }} />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map(t => (
                      <span key={t} className="px-2 py-1 text-xs rounded-md text-gray-400"
                        style={{ backgroundColor: `${exp.accent}10`, border: `1px solid ${exp.accent}25`, color: exp.accent }}
                      >{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
