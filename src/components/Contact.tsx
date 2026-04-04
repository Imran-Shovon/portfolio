"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(infoRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(formRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset after 4 seconds for demo
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass = "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 text-text placeholder-gray-500";
  const inputStyle = { background: "var(--input-bg)", border: "1px solid var(--input-border)" };

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative" style={{ backgroundColor: "var(--color-base)" }}>
      <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-8" style={{ backgroundColor: "var(--color-accent-blue)", opacity: 0.06 }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-accent-blue)" }}>Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: "var(--font-sora)" }}>
            Let&apos;s <span style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Connect</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))" }} />
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <div ref={infoRef} className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-sora)" }}>Have a project in mind?</h3>
              <p className="text-gray-400 leading-relaxed">I&apos;m always open to discussing new opportunities, interesting projects, or research collaborations. Let&apos;s build something amazing together.</p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { icon: Mail, label: "Email", value: "shovonbiswas.cse@gmail.com", color: "var(--color-accent-blue)" },
                { icon: Phone, label: "Phone", value: "+880 1776752696", color: "var(--color-accent-purple)" },
                { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh", color: "var(--color-accent-cyan)" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
                  style={{ background: "var(--tag-bg)", border: "1px solid var(--border)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}30`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${color}15` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">{label}</div>
                    <div className="text-sm text-gray-300">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {[
                { icon: <GithubIcon size={20} />, href: "#", label: "GitHub", color: "white" },
                { icon: <LinkedinIcon size={20} />, href: "#", label: "LinkedIn", color: "var(--color-accent-blue)" },
                { icon: <Mail size={20} />, href: "mailto:shovonbiswas.cse@gmail.com", label: "Email", color: "var(--color-accent-purple)" },
              ].map(({ icon, href, label, color }) => (
                <a key={label} href={href}
                  className="p-3 rounded-xl text-gray-500 transition-all duration-300"
                  style={{ background: "var(--tag-bg)", border: "1px solid var(--border)" }}
                  onMouseEnter={e => { (e.currentTarget.style.color) = color; (e.currentTarget.style.borderColor) = `${color}40`; }}
                  onMouseLeave={e => { (e.currentTarget.style.color) = ""; (e.currentTarget.style.borderColor) = "var(--border)"; }}
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div ref={formRef} className="lg:col-span-3">
            <div className="p-8 rounded-2xl glass-card">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Name</label>
                      <input
                        name="name" type="text" required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass} style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = "var(--color-accent-blue)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "var(--input-border)")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
                      <input
                        name="email" type="email" required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass} style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = "var(--color-accent-blue)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "var(--input-border)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Subject</label>
                    <input
                      name="subject" type="text" required
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      className={inputClass} style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--color-accent-purple)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "var(--input-border)")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Message</label>
                    <textarea
                      name="message" required rows={6}
                      placeholder="Tell me about your project or idea..."
                      value={formData.message}
                      onChange={handleChange}
                      className={inputClass + " resize-none"} style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--color-accent-cyan)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "var(--input-border)")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 group"
                    style={{
                      background: "linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-purple))",
                      boxShadow: "0 0 30px rgba(59,130,246,0.25)",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 40px rgba(59,130,246,0.5)")}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 30px rgba(59,130,246,0.25)")}
                  >
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
