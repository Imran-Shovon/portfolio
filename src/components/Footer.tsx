"use client";

import { ChevronRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Research", href: "#research" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-16 pb-8" style={{ backgroundColor: "var(--color-surface)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-sora)" }}>
              <span style={{ color: "var(--color-accent-blue)" }}>I</span>
              <span style={{ color: "var(--color-text)" }}>mran</span>
              <span style={{ color: "var(--color-accent-cyan)" }}>.</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Frontend Developer & Research Enthusiast. Building premium digital experiences with passion and precision.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <GithubIcon size={18} />, href: "#", label: "GitHub" },
                { icon: <LinkedinIcon size={18} />, href: "#", label: "LinkedIn" },
                { icon: <Mail size={18} />, href: "mailto:imran@email.com", label: "Email" },
              ].map(({ icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="p-2.5 rounded-xl text-gray-600 transition-all duration-300"
                  style={{ background: "var(--tag-bg)", border: "1px solid var(--border)" }}
                  onMouseEnter={e => { (e.currentTarget.style.color) = "var(--color-text)"; (e.currentTarget.style.borderColor) = "var(--color-accent-blue)"; }}
                  onMouseLeave={e => { (e.currentTarget.style.color) = ""; (e.currentTarget.style.borderColor) = "var(--border)"; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1 text-sm text-gray-500 transition-colors duration-200 group"
                  onMouseEnter={e=>(e.currentTarget.style.color="var(--color-text)")}
                  onMouseLeave={e=>(e.currentTarget.style.color="")}
                >
                  <ChevronRight size={12} className="text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Snippet */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-500">
              <div>📧 <a href="mailto:imran.shovon@email.com" className="transition-colors" onMouseEnter={e=>(e.currentTarget.style.color="var(--color-text)")} onMouseLeave={e=>(e.currentTarget.style.color="")}>imran.shovon@email.com</a></div>
              <div>📍 Dhaka, Bangladesh</div>
              <div>🕒 Available for freelance & full-time</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-xs text-gray-600">
            © {year} Imran Shovon. All rights reserved. Built with Next.js & GSAP.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-gray-600 transition-all duration-300 px-4 py-2 rounded-full"
            style={{ background: "var(--tag-bg)", border: "1px solid var(--border)" }}
            onMouseEnter={e => { (e.currentTarget.style.borderColor = "var(--color-accent-blue)"); (e.currentTarget.style.color = "var(--color-text)"); }}
            onMouseLeave={e => { (e.currentTarget.style.borderColor = "var(--border)"); (e.currentTarget.style.color = ""); }}
          >
            Back to Top
            <span className="group-hover:-translate-y-0.5 transition-transform inline-block">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
