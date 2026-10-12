"use client";

import { BrandName } from "@/components/BrandName";
import { SocialIcon } from "@/components/SocialIcon";
import type { Profile } from "@/lib/content-types";
import type { NavLink } from "@/lib/navigation";
import { ChevronRight } from "lucide-react";

export function Footer({ profile, links: quickLinks }: { profile: Profile; links: NavLink[] }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative pt-16 pb-8"
      style={{
        backgroundColor: "var(--color-surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              <BrandName name={profile.shortName} />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              {profile.footerTagline}
            </p>
            <div className="flex gap-3">
              {profile.socials.map(({ platform, url, label }) => (
                <a
                  key={`${platform}-${url}`}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl text-gray-600 transition-all duration-300"
                  style={{
                    background: "var(--tag-bg)",
                    border: "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-text)";
                    e.currentTarget.style.borderColor =
                      "var(--color-accent-blue)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  <SocialIcon platform={platform} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1 text-sm text-gray-500 transition-colors duration-200 group"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-text)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  <ChevronRight
                    size={12}
                    className="text-blue-500 group-hover:translate-x-0.5 transition-transform"
                  />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Snippet */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-gray-500">
              {profile.contact.email && <div>
                📧{" "}
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-text)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  {profile.contact.email}
                </a>
              </div>}
              {profile.contact.location && <div>📍 {profile.contact.location}</div>}
              {profile.availability && <div>🕒 {profile.availability}</div>}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs text-gray-600">
            © {year} {profile.fullName}. All rights reserved. Built with Next.js &
            GSAP.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-gray-600 transition-all duration-300 px-4 py-2 rounded-full"
            style={{
              background: "var(--tag-bg)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-accent-blue)";
              e.currentTarget.style.color = "var(--color-text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "";
            }}
          >
            Back to Top
            <span className="group-hover:-translate-y-0.5 transition-transform inline-block">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
