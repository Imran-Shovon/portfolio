"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Calendar, ChevronDown, ExternalLink, Lock } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { TextReveal } from "@/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Redlime Forge – Website Builder Platform",
    type: "Professional",
    duration: "Nov 2025 – Present",
    image: "/image/project/redlime-forge.png",
    summary: "An internal website builder platform at Redlime Solutions. Every client site below is built, configured and published from this panel.",
    description: "Redlime Forge is the website builder platform behind Redlime Solutions' client work. It is a single React application that powers many independent sites: each domain loads the same runtime and renders its own pages, branding and content. As a Frontend Developer, I work on the builder panel and the shared rendering engine, building reusable, animated page sections that client sites are composed from. Access to the panel itself is restricted to the team.",
    tech: ["React", "Vite", "React Router", "GSAP", "Framer Motion"],
    accent: "#8b5cf6",
    live: "https://panel.redlimesolutions.com/",
    github: "",
  },
  {
    title: "Docmedilink",
    type: "Professional",
    duration: "2025 – 2026",
    image: "/image/project/docmedilink.png",
    summary: "A telehealth website with the tagline \"Exceptional Care, Anywhere\", presenting services, a nationwide clinician network and patient login.",
    description: "Docmedilink is a telehealth brand offering cutting-edge virtual care through a nationwide network of expert providers. I built its marketing site on Redlime Forge, including the animated hero with hand-drawn illustration accents, gradient headline typography, and the Services, Clinicians, About and Contact pages.",
    tech: ["React", "Redlime Forge", "GSAP", "Responsive UI"],
    accent: "#3b82f6",
    live: "https://docmedilink.com/",
    github: "",
  },
  {
    title: "ThriveWell Rx",
    type: "Professional",
    duration: "2025 – 2026",
    image: "/image/project/thrivewellrx.png",
    summary: "A site for a white-label telehealth infrastructure provider that helps clinics, pharmacies and wellness brands launch digital health products.",
    description: "ThriveWell Rx provides end-to-end white-label telehealth infrastructure: technology, provider access, pharmacy fulfillment, compliance support and patient operations. I built the site on Redlime Forge, with a soft gradient hero, device mockups of the patient app, a Solutions menu, LegitScript and FAQ pages, and demo booking calls to action.",
    tech: ["React", "Redlime Forge", "GSAP", "Responsive UI"],
    accent: "#06b6d4",
    live: "https://thrivewellrx.com/",
    github: "",
  },
  {
    title: "Dosevana",
    type: "Professional",
    duration: "2025 – 2026",
    image: "/image/project/dosevana.png",
    summary: "A landing site for a done-for-you medical partnership that helps med spas, gyms and wellness businesses add wellness revenue.",
    description: "Dosevana (by ThriveWell) is a done-for-you medical partnership that gives wellness businesses, med spas and fitness centers HIPAA-compliant tech, a 50-state physician network and clinical protocols. I built the conversion-focused site on Redlime Forge, covering the hero, hand-drawn decorative accents, the Other Solutions menu, FAQ and the demo request flow.",
    tech: ["React", "Redlime Forge", "GSAP", "Responsive UI"],
    accent: "#F59E0B",
    live: "https://dosevana.com/",
    github: "",
  },
  {
    title: "American Wellness Partners",
    type: "Professional",
    duration: "2025 – 2026",
    image: "/image/project/american-wellness-partners.png",
    summary: "A site that pitches a turnkey GLP-1 and peptide clinic business model to prospective clinic owners.",
    description: "American Wellness Partners offers a complete turnkey business model, technical support and marketing for launching a cash-only GLP-1 and peptide clinic. I built the site on Redlime Forge, with a full-bleed photo hero and key selling points, plus sections for The Opportunity, Our Model, Onboarding, The Economics and FAQ, and territory availability and call booking calls to action.",
    tech: ["React", "Redlime Forge", "GSAP", "Responsive UI"],
    accent: "#10B981",
    live: "https://americanwellnesspartners.com/",
    github: "",
  },
  {
    title: "Sanuma Taxation",
    type: "Professional",
    duration: "2025 – 2026",
    image: "/image/project/sanuma-taxation.png",
    summary: "A dark, editorial-style site for an international tax and compliance advisory firm with offices across six countries.",
    description: "Sanuma Taxation Procedures Co. L.L.C is an international tax and compliance advisory firm. I built its site on Redlime Forge, with a serif \"Elegant & Simple\" hero, a scrolling news ticker, office cards with coordinates for six locations (Dubai, Sharjah, Toronto, Helsinki, Dhaka and Kuala Lumpur), and the About, Services, Blog, Career and Contact pages.",
    tech: ["React", "Redlime Forge", "GSAP", "Responsive UI"],
    accent: "#F59E0B",
    live: "https://sanumaweb.redlimesolutions.com/",
    github: "",
  },
  {
    title: "Redlime Solutions",
    type: "Professional",
    duration: "2025 – 2026",
    image: "/image/project/redlime-solutions.png",
    summary: "The corporate website for Redlime Solutions, with a full-screen video hero: \"Rejuvenating your business by reducing cost and delivering results that endure.\"",
    description: "The company website for Redlime Solutions, built on the firm's own Redlime Forge platform. It features a full-screen background video hero with layered typography, a transparent navigation bar, and the About the Firm, Services, Career and Contact pages.",
    tech: ["React", "Redlime Forge", "GSAP", "Responsive UI"],
    accent: "#F43F5E",
    live: "https://redlimesolutions.com/",
    github: "",
  },
  {
    title: "RL Technologies Limited",
    type: "Professional",
    duration: "2025 – 2026",
    image: "/image/project/rl-technologies.png",
    summary: "The website for RL Technologies Limited, a sister brand that reuses the Redlime Solutions layout with its own identity.",
    description: "RL Technologies Limited's website runs on Redlime Forge and shares its page structure with the Redlime Solutions site: a full-screen video hero, About the Firm, Services, Career and Contact. It is a good example of the platform's multi-brand reuse, since the same sections are restyled with a different logo, branding and content.",
    tech: ["React", "Redlime Forge", "GSAP", "Responsive UI"],
    accent: "#F43F5E",
    live: "https://rltechltd.com/",
    github: "",
  },
  {
    title: "Redlime Grow",
    type: "Professional",
    duration: "2025 – 2026",
    image: "/image/project/redlime-grow.png",
    summary: "A SaaS landing page for a client acquisition system: \"We don't just buy traffic, we build infrastructure.\"",
    description: "Redlime Grow is a growth and client acquisition service powered by automation and the client's own data. I built the landing page on Redlime Forge, with a dark hero over a glowing world network map, a free Growth Blueprint call to action, and the services, features and contact sections.",
    tech: ["React", "Redlime Forge", "GSAP", "Responsive UI"],
    accent: "#10B981",
    live: "https://redlimegrow.com/",
    github: "",
  },
  {
    title: "QR Studio",
    type: "Professional",
    duration: "2025 – 2026",
    image: "/image/project/qr-studio.png",
    summary: "A browser-based QR code generator with custom colors, dot and corner styles, a center logo, and PNG/SVG export.",
    description: "QR Studio is a QR code generator that runs entirely in the browser. Users enter a URL and customize the foreground and background colors, export size, margin, dot style, corner style and error correction level, and can add an optional center logo. A live preview updates as they edit, codes export as high-resolution PNG or SVG with no watermark, and history is saved locally on the device.",
    tech: ["React", "Redlime Forge", "QR Encoding", "PNG/SVG Export"],
    accent: "#10B981",
    live: "https://qr.redlimesolutions.com/",
    github: "",
  },
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
];

// `limit` shows only the first N projects plus a link to the full /projects page
export function Projects({ limit }: { limit?: number }) {
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
  }, []);

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
