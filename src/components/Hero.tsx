"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Hero() {
  const greetRef = useRef<HTMLParagraphElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(greetRef.current,   { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.6 })
      .fromTo(title1Ref.current,  { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.4")
      .fromTo(title2Ref.current,  { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.6")
      .fromTo(descRef.current,    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .fromTo(buttonsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4")
      .fromTo(socialsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
      .fromTo(profileRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, ease: "back.out(1.4)" }, "-=1.2");

    // Float blobs
    gsap.to(blob1Ref.current, { y: "-40px", x: "20px", duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(blob2Ref.current, { y: "50px", x: "-25px", duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
    gsap.to(blob3Ref.current, { y: "-30px", x: "30px", duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden" style={{ backgroundColor: "var(--color-base)" }}>
      {/* Background Blobs */}
      <div ref={blob1Ref} className="absolute -z-0 top-[5%] left-[-5%] w-[450px] h-[450px] rounded-full blur-[130px] opacity-25" style={{ backgroundColor: "var(--color-accent-blue)" }} />
      <div ref={blob2Ref} className="absolute -z-0 bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-20" style={{ backgroundColor: "var(--color-accent-purple)" }} />
      <div ref={blob3Ref} className="absolute -z-0 top-[50%] left-[40%] w-[300px] h-[300px] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: "var(--color-accent-cyan)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
          
          {/* Text */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <p ref={greetRef} className="text-base md:text-lg font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--color-accent-blue)" }}>
              Hi, I&apos;m Imran Shovon
            </p>

            <h1 ref={title1Ref} className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-tight mb-2 text-white" style={{ fontFamily: "var(--font-sora)" }}>
              Frontend Developer
            </h1>

            <div ref={title2Ref} className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold leading-tight mb-8" style={{ fontFamily: "var(--font-sora)" }}>
              <span className="text-gray-500">&amp;&nbsp;</span>
              <span style={{
                background: "linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-cyan))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Research Enthusiast
              </span>
            </div>

            <p ref={descRef} className="text-base md:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
              Building premium digital experiences with a focus on seamless interactions, elegant UI, and robust technology. Passionate about crafting interfaces that inspire.
            </p>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-purple))",
                  boxShadow: "0 0 30px rgba(59,130,246,0.3)",
                }}
              >
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 border"
                style={{ borderColor: "var(--border-alt)", backgroundColor: "var(--tag-bg)", color: "var(--color-text)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border-hover)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-alt)")}
              >
                Download Resume
                <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 border"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--tag-bg)", color: "var(--text-muted)" }}
                onMouseEnter={e => { (e.currentTarget.style.color = "var(--color-text)"); (e.currentTarget.style.borderColor = "var(--color-accent-cyan)"); }}
                onMouseLeave={e => { (e.currentTarget.style.color = "var(--text-muted)"); (e.currentTarget.style.borderColor = "var(--border)"); }}
              >
                Contact Me
                <Mail size={18} />
              </a>
            </div>

            {/* Social Icons */}
            <div ref={socialsRef} className="flex items-center gap-5 justify-center lg:justify-start">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors duration-300" onMouseEnter={e=>(e.currentTarget.style.color="var(--color-text)")} onMouseLeave={e=>(e.currentTarget.style.color="")}>
                <GithubIcon size={22} />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors duration-300" style={{}} onMouseEnter={e=>(e.currentTarget.style.color="var(--color-accent-blue)")} onMouseLeave={e=>(e.currentTarget.style.color="")}>
                <LinkedinIcon size={22} />
              </a>
              <a href="#contact" className="text-gray-500 transition-colors duration-300" onMouseEnter={e=>(e.currentTarget.style.color="var(--color-accent-purple)")} onMouseLeave={e=>(e.currentTarget.style.color="")}>
                <Mail size={22} />
              </a>
            </div>
          </div>

          {/* Profile Visual */}
          <div ref={profileRef} className="w-full lg:w-2/5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px]">
              <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-[spin_12s_linear_infinite]" />
              <div className="absolute inset-3 rounded-full border border-purple-500/20 animate-[spin_18s_linear_infinite_reverse]" />
              <div className="absolute inset-6 rounded-full border border-cyan-500/10 animate-[spin_25s_linear_infinite]" />
              <div className="absolute inset-10 rounded-full overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <Image src="/image/shovon.jpeg" alt="Imran Shovon" fill className="object-cover object-top" priority />
              </div>
              {/* Decorative dots */}
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-accent-blue)" }} />
              <div className="absolute bottom-6 left-6 w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-accent-cyan)" }} />
              <div className="absolute bottom-12 right-8 w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-accent-purple)" }} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-600 to-transparent" />
        </div>
      </div>
    </section>
  );
}
