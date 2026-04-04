"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { Menu, X, Sun, Moon, Monitor, Check } from "lucide-react";
import Link from "next/link";
import { useTheme, type Theme } from "@/components/ThemeProvider";

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

const themeOptions: { id: Theme; label: string; Icon: typeof Sun }[] = [
  { id: "dark",   label: "Dark",   Icon: Moon    },
  { id: "light",  label: "Light",  Icon: Sun     },
  { id: "system", label: "System", Icon: Monitor },
];

export function Navbar() {
  const [isOpen,       setIsOpen]       = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [activeSection, setActive]      = useState("home");
  const [themeOpen,    setThemeOpen]    = useState(false);

  const navRef   = useRef<HTMLElement>(null);
  const menuRef  = useRef<HTMLDivElement>(null);
  const desktopDropRef  = useRef<HTMLDivElement>(null);
  const mobileDropRef = useRef<HTMLDivElement>(null);

  const { theme: currentTheme, setTheme } = useTheme();

  // Active section + scroll glass
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
    const ids = navLinks.map(l => l.href.replace("#", ""));
    for (let i = ids.length - 1; i >= 0; i--) {
      const el = document.getElementById(ids[i]);
      if (el && window.scrollY >= el.offsetTop - 120) { setActive(ids[i]); break; }
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

  // Mobile menu animate
  useEffect(() => {
    if (!menuRef.current) return;
    if (isOpen) {
      gsap.to(menuRef.current, { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(menuRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power3.in" });
    }
  }, [isOpen]);

  // Close theme dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedOutsideDesktop = desktopDropRef.current && !desktopDropRef.current.contains(target);
      const clickedOutsideMobile = mobileDropRef.current && !mobileDropRef.current.contains(target);
      
      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setThemeOpen(false);
      }
    };
    if (themeOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [themeOpen]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const ThemeIcon = !mounted ? Moon : currentTheme === "light" ? Sun : currentTheme === "system" ? Monitor : Moon;

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
        backgroundColor: "var(--nav-bg)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border)",
      } : {
        paddingTop: "1.25rem",
        paddingBottom: "1.25rem",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight select-none" style={{ fontFamily: "var(--font-sora)" }}>
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
                className="text-sm font-medium transition-colors duration-300 relative pb-0.5"
                style={{ color: isActive ? "var(--color-text)" : "var(--text-muted)" }}
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

          {/* Theme Toggle */}
          <div ref={desktopDropRef} className="relative">
            <button
              onClick={() => setThemeOpen(o => !o)}
              aria-label="Toggle colour theme"
              className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200"
              style={{
                background: "var(--tag-bg)",
                border: "1px solid var(--border-alt)",
                color: "var(--text-muted)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-text)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              <ThemeIcon size={16} />
            </button>

            {themeOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-44 rounded-2xl overflow-hidden z-50 shadow-2xl"
                style={{
                  background: "var(--card-solid)",
                  border: "1px solid var(--border-alt)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                }}
              >
                <div className="py-1.5 px-1.5 flex flex-col gap-0.5">
                  {themeOptions.map(({ id, label, Icon }) => {
                    const active = currentTheme === id;
                    return (
                      <button
                        key={id}
                        onClick={() => { setTheme(id); setThemeOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                        style={{
                          color: active ? "var(--color-accent-blue)" : "var(--text-muted)",
                          background: active ? "var(--tag-bg)" : "transparent",
                        }}
                        onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "var(--tag-bg)"; }}
                        onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                      >
                        <Icon size={15} />
                        <span className="flex-1 text-left">{label}</span>
                        {active && <Check size={13} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Resume */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border"
            style={{ borderColor: "var(--color-accent-blue)", color: "var(--color-accent-blue)" }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "var(--color-accent-blue)";
              el.style.color = "white";
              el.style.boxShadow = "0 0 20px rgba(59,130,246,0.4)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "transparent";
              el.style.color = "var(--color-accent-blue)";
              el.style.boxShadow = "";
            }}
          >
            Resume
          </a>
        </nav>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <div ref={mobileDropRef} className="relative flex items-center">
            <button
              onClick={() => setThemeOpen(o => !o)}
              aria-label="Toggle theme"
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
              style={{ color: "var(--text-muted)", background: "var(--tag-bg)", border: "1px solid var(--border)" }}
            >
              <ThemeIcon size={15} />
            </button>
            {themeOpen && (
              <div
                className="absolute right-0 top-12 w-40 rounded-2xl overflow-hidden z-50 shadow-2xl"
                style={{
                  background: "var(--card-solid)",
                  border: "1px solid var(--border-alt)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <div className="py-1.5 px-1.5 flex flex-col gap-0.5">
                  {themeOptions.map(({ id, label, Icon }) => {
                    const active = currentTheme === id;
                    return (
                      <button
                        key={id}
                        onClick={() => { setTheme(id); setThemeOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                        style={{
                          color: active ? "var(--color-accent-blue)" : "var(--text-muted)",
                          background: active ? "var(--tag-bg)" : "transparent",
                        }}
                      >
                        <Icon size={14} />
                        <span className="flex-1 text-left">{label}</span>
                        {active && <Check size={12} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          
          <button
            className="transition-colors p-1"
            style={{ color: "var(--text-muted)" }}
            onClick={() => setIsOpen(o => !o)}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-text)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="md:hidden overflow-hidden"
        style={{ height: 0, opacity: 0, backgroundColor: "var(--nav-mobile-bg)", backdropFilter: "blur(14px)" }}
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
                style={{ color: isActive ? "var(--color-text)" : "var(--text-muted)" }}
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
