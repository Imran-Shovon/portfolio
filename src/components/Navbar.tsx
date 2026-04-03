"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home",       href: "#home" },
  { name: "About",      href: "#about" },
  { name: "Skills",     href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects",   href: "#projects" },
  { name: "Education",  href: "#education" },
  { name: "Research",   href: "#research" },
  { name: "Contact",    href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [activeSection, setActive] = useState("home");
  const navRef  = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll detection for glassmorphism + active section
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    // Active section detection
    const sectionIds = navLinks.map(l => l.href.replace("#", ""));
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (el && window.scrollY >= el.offsetTop - 120) {
        setActive(sectionIds[i]);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Entry animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  // Mobile menu slide
  useEffect(() => {
    if (!menuRef.current) return;
    if (isOpen) {
      gsap.to(menuRef.current, { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(menuRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power3.in" });
    }
  }, [isOpen]);

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "py-3 border-b"
          : "py-5 bg-transparent",
      )}
      style={scrolled ? {
        backgroundColor: "rgba(11,15,25,0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderColor: "rgba(255,255,255,0.05)",
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight cursor-pointer select-none" style={{ fontFamily: "var(--font-sora)" }}>
          <span style={{ color: "var(--color-accent-blue)" }}>I</span>
          <span style={{ color: "var(--color-text)" }}>mran</span>
          <span style={{ color: "var(--color-accent-cyan)" }}>.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ name, href }) => {
            const id = href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <Link
                key={name}
                href={href}
                className="text-sm font-medium transition-colors duration-300 relative group pb-0.5"
                style={{ color: isActive ? "white" : "rgba(156,163,175,1)" }}
              >
                {name}
                <span
                  className="absolute left-0 -bottom-0.5 h-[2px] rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? "100%" : "0%",
                    background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))",
                  }}
                />
              </Link>
            );
          })}

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border"
            style={{
              borderColor: "var(--color-accent-blue)",
              color: "var(--color-accent-blue)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent-blue)";
              (e.currentTarget as HTMLElement).style.color = "white";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(59,130,246,0.4)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--color-accent-blue)";
              (e.currentTarget as HTMLElement).style.boxShadow = "";
            }}
          >
            Resume
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition-colors p-1"
          onClick={() => setIsOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="md:hidden overflow-hidden"
        style={{ height: 0, opacity: 0, backgroundColor: "rgba(11,15,25,0.97)", backdropFilter: "blur(14px)" }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map(({ name, href }) => {
            const id = href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <Link
                key={name}
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium transition-colors flex items-center gap-2"
                style={{ color: isActive ? "white" : "rgba(156,163,175,1)" }}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent-blue)" }} />
                )}
                {name}
              </Link>
            );
          })}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center px-5 py-3 rounded-full text-white font-semibold mt-2 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-purple))",
              boxShadow: "0 0 20px rgba(59,130,246,0.3)",
            }}
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
