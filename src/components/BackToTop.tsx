"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full text-white transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-purple))",
        boxShadow: "0 0 24px rgba(59,130,246,0.4)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.85)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget.style.boxShadow) = "0 0 36px rgba(59,130,246,0.65)";
        (e.currentTarget.style.transform) = "translateY(-3px) scale(1.08)";
      }}
      onMouseLeave={e => {
        (e.currentTarget.style.boxShadow) = "0 0 24px rgba(59,130,246,0.4)";
        (e.currentTarget.style.transform) = "translateY(0) scale(1)";
      }}
    >
      <ArrowUp size={20} />
    </button>
  );
}
