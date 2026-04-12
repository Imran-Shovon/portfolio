"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  /** Animation direction: "up" (default), "left", "right", "fade" */
  direction?: "up" | "left" | "right" | "fade";
  /** Delay in seconds before animation starts (default 0) */
  delay?: number;
  /** Duration in seconds (default 0.85) */
  duration?: number;
  /** Distance to travel in px (default 40) */
  distance?: number;
  /** Stagger children instead of the element itself */
  stagger?: number;
  /** Start trigger position (default "top 82%") */
  start?: string;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.85,
  distance = 40,
  stagger,
  start = "top 82%",
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger
      ? Array.from(el.children)
      : el;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = { opacity: 1, duration, delay, ease: "power3.out" };

    if (direction === "up") {
      fromVars.y = distance;
      toVars.y = 0;
    } else if (direction === "left") {
      fromVars.x = -distance;
      toVars.x = 0;
    } else if (direction === "right") {
      fromVars.x = distance;
      toVars.x = 0;
    }
    // "fade" just uses opacity

    if (stagger) {
      (toVars as gsap.TweenVars).stagger = stagger;
    }

    toVars.scrollTrigger = {
      trigger: el,
      start,
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromVars, toVars);
    }, el);

    return () => ctx.revert();
  }, [direction, delay, duration, distance, stagger, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Animate a heading with a clip-path reveal + slide-up on scroll.
 * Use this to wrap section headings for the "text reveal" effect.
 */
export function TextReveal({
  children,
  delay = 0,
  className,
  start = "top 85%",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          y: 50,
          opacity: 0,
          clipPath: "inset(100% 0 0 0)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.9,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, start]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      {children}
    </div>
  );
}
