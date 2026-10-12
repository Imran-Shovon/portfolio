"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, BookOpen, Calendar, FileText, UserRound, X } from "lucide-react";
import { TextReveal } from "@/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const RESEARCH_GATE_PROFILE_LINK = "https://www.researchgate.net/profile/Md-Biswas-16?ev=hdr_xprf";
const MANGO_DISEASE_PAPER_LINK = "https://www.researchgate.net/profile/Md-Rahman-40/publication/370418634_A_Deep_Learning_Based_Smartphone_Application_for_Detecting_Mango_Diseases_and_Pesticide_Suggestions/links/644f5d6b809a5350213ef10e/A-Deep-Learning-Based-Smartphone-Application-for-Detecting-Mango-Diseases-and-Pesticide-Suggestions.pdf";
const SUICIDE_PAPER_LINK = "https://books.google.com.bd/books?hl=en&lr=&id=CNN-EAAAQBAJ&oi=fnd&pg=PA279&dq=Identifying+the+Signature+of+Suicidality+:+A+Machine+Learning+Approach&ots=WQc7RMFMrk&sig=q1dkRQ0mitLeh-5-isKLM0HVvsc&redir_esc=y#v=onepage&q=Identifying%20the%20Signature%20of%20Suicidality%20%3A%20A%20Machine%20Learning%20Approach&f=false";
const LANE_DETECTION_PAPER_LINK = "https://ieeexplore.ieee.org/abstract/document/9689883";

const papers = [
  {
    title: "A Deep Learning Based Smartphone Application for Detecting Mango Diseases and Pesticide Suggestions",
    duration: "May 2023",
    image: "/image/paper/Mango_Disease_Detection.png",
    description: "This paper has proposed a new machine learning to classify diseases, insects, and their solutions. It includes a sufficient number of mango tree plants, insects, and diseases datasets with pesticide suggestions.",
    publisher: "IJCDS",
    publisherFull: "International Journal of Computing and Digital Systems",
    keywords: ["Deep Learning", "Mobile App", "Agriculture"],
    accent: "#10B981",
    profile: RESEARCH_GATE_PROFILE_LINK,
    paper: MANGO_DISEASE_PAPER_LINK,
  },
  {
    title: "Identifying the Signature of Suicidality : A Machine Learning Approach",
    duration: "June 2022",
    image: "/image/paper/Suicide.png",
    description: "This research proposes a machine learning-based prediction model in this respect. This research uses four traditional machine learning techniques to look at suicidality in various groups of people. To achieve higher levels of accuracy, we have included feature engineering in our suggested model.",
    publisher: "EUDL",
    publisherFull: "European Union Digital Library",
    keywords: ["Machine Learning", "Feature Engineering", "Mental Health"],
    accent: "#8b5cf6",
    profile: RESEARCH_GATE_PROFILE_LINK,
    paper: SUICIDE_PAPER_LINK,
  },
  {
    title: "Lane Detection for Autonomous Vehicle Management: PHT Approach",
    duration: "December 2021",
    image: "/image/paper/Lane_Detection.png",
    description: "This research paper presents the design of a prototype autonomous guided vehicle which will detect and follow the lanes using the Probabilistic Hough Transform (PHT) algorithm. To do so, we convert our RGB road images into an HSV color model and then apply Gaussian smoothing to the converted grayscale image. For detection purposes, we process our region of interest (ROI) using a polygon clipping algorithm. Then, we apply Probabilistic Hough Transform upon the ROI image while setting all the parameters in our proposed lane detection algorithm.",
    publisher: "IEEE",
    publisherFull: "IEEE Xplore",
    keywords: ["Computer Vision", "Hough Transform", "Autonomous Vehicles"],
    accent: "#3b82f6",
    profile: RESEARCH_GATE_PROFILE_LINK,
    paper: LANE_DETECTION_PAPER_LINK,
  },
];

type Paper = (typeof papers)[number];

const years = papers.map(p => Number(p.duration.split(" ").pop()));
const stats = [
  { value: String(papers.length).padStart(2, "0"), label: "Publications" },
  { value: papers.map(p => p.publisher).join(" · "), label: "Publishers" },
  { value: `${Math.min(...years)}–${Math.max(...years)}`, label: "Active years" },
];

// Paper first page shown as a tilted sheet stacked on a second sheet
function DocPreview({ paper }: { paper: Paper }) {
  return (
    <div className="relative w-full max-w-[280px] aspect-[4/3] mx-auto">
      <div
        className="absolute inset-0 rounded-xl rotate-[5deg] transition-transform duration-500 group-hover:rotate-[8deg] group-hover:translate-x-2"
        style={{ backgroundColor: `${paper.accent}20`, border: `1px solid ${paper.accent}30` }}
      />
      <div
        className="absolute inset-0 rounded-xl overflow-hidden -rotate-[3deg] transition-transform duration-500 group-hover:rotate-0 group-hover:-translate-y-1"
        style={{ border: "1px solid var(--border-alt)", backgroundColor: "#fff", boxShadow: `0 20px 40px rgba(0,0,0,0.25), 0 0 30px ${paper.accent}20` }}
      >
        <Image
          src={paper.image}
          alt={`${paper.title} first page`}
          fill
          sizes="280px"
          className="object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.95))" }} />
        <span
          className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider"
          style={{ backgroundColor: paper.accent, color: "#fff" }}
        >
          {paper.publisher}
        </span>
      </div>
    </div>
  );
}

export function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        statsRef.current?.children ? Array.from(statsRef.current.children) : [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        }
      );
      Array.from(listRef.current?.children ?? []).forEach(row => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 82%" } });
        tl.fromTo(row, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
          .fromTo(row.querySelector(".doc-preview"), { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!selectedPaper) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPaper(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedPaper]);

  return (
    <section id="research" ref={sectionRef} className="py-24 relative" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px]" style={{ backgroundColor: "var(--color-accent-blue)", opacity: 0.08 }} />
        <div className="absolute top-10 right-[-8%] w-[420px] h-[420px] rounded-full blur-[150px]" style={{ backgroundColor: "var(--color-accent-cyan)", opacity: 0.07 }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <TextReveal className="flex flex-col items-center mb-12">
          <span className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-accent-cyan)" }}>Academic Contributions</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: "var(--font-sora)" }}>
            Research <span style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Publications</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-cyan))" }} />
        </TextReveal>

        {/* Stats strip */}
        <div ref={statsRef} className="grid grid-cols-3 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 sm:gap-4 mb-12">
          {stats.map(s => (
            <div key={s.label} className="glass-card rounded-2xl px-3 py-3 sm:px-5 sm:py-4 min-w-0">
              <p className="text-sm sm:text-xl font-bold text-white break-words" style={{ fontFamily: "var(--font-sora)" }}>{s.value}</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
          <a href={RESEARCH_GATE_PROFILE_LINK} target="_blank" rel="noopener noreferrer"
            className="group/rg col-span-3 sm:col-span-1 flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-cyan))", boxShadow: "0 0 24px rgba(6,182,212,0.3)" }}
          >
            <UserRound size={16} /> ResearchGate
            <ArrowUpRight size={15} className="transition-transform group-hover/rg:translate-x-0.5 group-hover/rg:-translate-y-0.5" />
          </a>
        </div>

        {/* Publication rows */}
        <div ref={listRef} className="flex flex-col gap-6">
          {papers.map((paper, i) => (
            <article
              key={paper.title}
              className="group relative overflow-hidden rounded-2xl p-6 md:p-8 glass-card transition-all duration-500 grid gap-6 md:gap-8 md:grid-cols-[72px_1fr_260px] items-center"
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${paper.accent}40`;
                e.currentTarget.style.boxShadow = `0 24px 60px ${paper.accent}14`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "0 4px 30px rgba(0,0,0,0.12)";
              }}
            >
              {/* Accent edge */}
              <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-r-full" style={{ background: `linear-gradient(180deg, ${paper.accent}, transparent)` }} />

              {/* Index + year */}
              <div className="flex md:flex-col items-baseline md:items-start gap-3 md:gap-1 self-start">
                <span
                  className="text-5xl font-bold leading-none"
                  style={{ fontFamily: "var(--font-sora)", color: "transparent", WebkitTextStroke: `1.5px ${paper.accent}` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold tracking-wider" style={{ color: paper.accent }}>
                  {paper.duration.split(" ").pop()}
                </span>
              </div>

              {/* Content */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold"
                    style={{ backgroundColor: `${paper.accent}15`, border: `1px solid ${paper.accent}30`, color: paper.accent }}
                  >
                    <BookOpen size={12} /> {paper.publisherFull}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <Calendar size={12} /> {paper.duration}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-white leading-snug mb-3" style={{ fontFamily: "var(--font-sora)" }}>
                  <button type="button" onClick={() => setSelectedPaper(paper)} className="text-left focus:outline-none focus-visible:underline" style={{ color: "inherit" }}>
                    {paper.title}
                  </button>
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed mb-4 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  {paper.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {paper.keywords.map(k => (
                    <span key={k} className="px-2.5 py-1 text-xs rounded-md font-medium"
                      style={{ backgroundColor: "var(--tag-bg)", border: "1px solid var(--tag-border)", color: "var(--text-muted)" }}
                    >
                      {k}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a href={paper.paper} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white font-semibold transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: paper.accent, boxShadow: `0 0 20px ${paper.accent}40` }}
                  >
                    Read paper <ArrowUpRight size={14} />
                  </a>
                  <button type="button" onClick={() => setSelectedPaper(paper)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: "var(--tag-bg)", border: "1px solid var(--border-hover)", color: "var(--color-text)" }}
                  >
                    <FileText size={14} /> Abstract
                  </button>
                </div>
              </div>

              {/* Document preview */}
              <div className="doc-preview order-first md:order-none">
                <DocPreview paper={paper} />
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedPaper && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          style={{ backgroundColor: "rgba(3,7,18,0.78)", backdropFilter: "blur(10px)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="research-modal-title"
          onClick={() => setSelectedPaper(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl glass-card"
            style={{ backgroundColor: "var(--card-solid)", borderColor: `${selectedPaper.accent}30` }}
            onClick={event => event.stopPropagation()}
          >
            <div className="absolute top-0 left-10 right-10 h-px" style={{ background: `linear-gradient(90deg, transparent, ${selectedPaper.accent}, transparent)` }} />
            <button
              type="button"
              aria-label="Close publication details"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all"
              style={{ backgroundColor: "var(--overlay-bg)", border: "1px solid var(--border-hover)", color: "var(--color-text)" }}
              onClick={() => setSelectedPaper(null)}
            >
              <X size={18} />
            </button>

            <div className="p-6 md:p-10 grid gap-8 md:grid-cols-[1fr_220px] items-start">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5 pr-10 md:pr-0 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold"
                    style={{ backgroundColor: `${selectedPaper.accent}15`, border: `1px solid ${selectedPaper.accent}30`, color: selectedPaper.accent }}
                  >
                    <BookOpen size={12} /> {selectedPaper.publisherFull}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <Calendar size={12} /> {selectedPaper.duration}
                  </span>
                </div>

                <h3 id="research-modal-title" className="text-2xl font-semibold text-white mb-6 leading-snug" style={{ fontFamily: "var(--font-sora)" }}>
                  {selectedPaper.title}
                </h3>

                <div className="mb-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
                    <FileText size={12} /> Abstract
                  </div>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    {selectedPaper.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-7">
                  {selectedPaper.keywords.map(k => (
                    <span key={k} className="px-2.5 py-1 text-xs rounded-md font-medium"
                      style={{ backgroundColor: "var(--tag-bg)", border: "1px solid var(--tag-border)", color: "var(--text-muted)" }}
                    >
                      {k}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={selectedPaper.paper} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white font-semibold transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: selectedPaper.accent, boxShadow: `0 0 20px ${selectedPaper.accent}40` }}
                  >
                    Read paper <ArrowUpRight size={14} />
                  </a>
                  <a href={selectedPaper.profile} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: "var(--overlay-bg)", border: "1px solid var(--border-hover)", color: "var(--color-text)" }}
                  >
                    <UserRound size={14} /> ResearchGate Profile
                  </a>
                </div>
              </div>

              <div className="group hidden md:block pt-12">
                <DocPreview paper={selectedPaper} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
