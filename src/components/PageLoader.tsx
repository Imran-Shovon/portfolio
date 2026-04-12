"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the line then name in
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: "power3.out" }
    )
      .fromTo(
        nameRef.current,
        { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "power4.out" },
        "-=0.2"
      )
      // Hold for a moment
      .to({}, { duration: 0.9 })
      // Slide loader upward off screen
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => setVisible(false),
      });
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      {/* Subtle background blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{ backgroundColor: "var(--color-accent-blue)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] opacity-15 pointer-events-none"
        style={{ backgroundColor: "var(--color-accent-purple)" }}
      />

      <div className="flex flex-col items-center gap-4 relative z-10">
        {/* Decorative line */}
        <div
          ref={lineRef}
          className="h-px w-24 origin-left"
          style={{
            background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))",
          }}
        />

        {/* Name */}
        <div
          ref={nameRef}
          className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold tracking-tight select-none"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          <span style={{ color: "var(--color-accent-blue)" }}>S</span>
          <span style={{ color: "var(--color-text)" }}>hovon</span>
          <span style={{ color: "var(--color-accent-cyan)" }}>.</span>
        </div>

        {/* Tagline */}
        <p
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Frontend Developer
        </p>
      </div>
    </div>
  );
}
