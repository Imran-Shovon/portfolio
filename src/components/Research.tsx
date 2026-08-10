"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Clock, ExternalLink, FileText, UserRound } from "lucide-react";
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
    tags: ["Publisher: IJCDS"],
    profile: RESEARCH_GATE_PROFILE_LINK,
    paper: MANGO_DISEASE_PAPER_LINK,
  },
  {
    title: "Identifying the Signature of Suicidality : A Machine Learning Approach",
    duration: "June 2022",
    image: "/image/paper/Suicide.png",
    description: "This research proposes a machine learning-based prediction model in this respect. This research uses four traditional machine learning techniques to look at suicidality in various groups of people. To achieve higher levels of accuracy, we have included feature engineering in our suggested model.",
    tags: ["Publisher: EUDL (European Union Digital Library)"],
    profile: RESEARCH_GATE_PROFILE_LINK,
    paper: SUICIDE_PAPER_LINK,
  },
  {
    title: "Lane Detection for Autonomous Vehicle Management: PHT Approach",
    duration: "December 2021",
    image: "/image/paper/Lane_Detection.png",
    description: "This research paper presents the design of a prototype autonomous guided vehicle which will detect and follow the lanes using the Probabilistic Hough Transform (PHT) algorithm. To do so, we convert our RGB road images into an HSV color model and then apply Gaussian smoothing to the converted grayscale image. For detection purposes, we process our region of interest (ROI) using a polygon clipping algorithm. Then, we apply Probabilistic Hough Transform upon the ROI image while setting all the parameters in our proposed lane detection algorithm.",
    tags: ["Publisher: IEEE"],
    profile: RESEARCH_GATE_PROFILE_LINK,
    paper: LANE_DETECTION_PAPER_LINK,
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
        <TextReveal className="flex flex-col items-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-accent-cyan)" }}>Academic Contributions</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: "var(--font-sora)" }}>
            Research <span style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Publications</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-cyan))" }} />
        </TextReveal>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <article
              key={paper.title}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 glass-card"
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(6,182,212,0.25)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div className="relative h-48 overflow-hidden" style={{ backgroundColor: "var(--card-solid)" }}>
                <Image
                  src={paper.image}
                  alt={paper.title}
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,14,26,0.08), rgba(10,14,26,0.72))" }} />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-sm font-medium text-white">
                  <Clock size={15} style={{ color: "var(--color-accent-cyan)" }} />
                  <span>{paper.duration}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 leading-snug" style={{ fontFamily: "var(--font-sora)" }}>
                  {paper.title}
                </h3>

                <div className="mb-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
                    <FileText size={12} /> Description
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {paper.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {paper.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-2 px-2 py-1 text-xs rounded-md text-gray-400"
                      style={{ backgroundColor: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.15)", color: "rgba(6,182,212,0.9)" }}
                    >
                      <BookOpen size={12} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={paper.paper} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white font-medium transition-all"
                    style={{ backgroundColor: "var(--color-accent-cyan)" }}
                  >
                    <ExternalLink size={14} /> See Live
                  </a>
                  <a href={paper.profile} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                    style={{ backgroundColor: "var(--overlay-bg)", border: "1px solid var(--border-hover)", color: "var(--color-text)" }}
                  >
                    <UserRound size={14} /> See Profile
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
