"use client";

import { useEffect, useState } from "react";
import { GradientMenu } from "@/components/ui/gradient-menu";

const links = [
  { href: "#research", label: "Research" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#awards", label: "Awards" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.slice(1));

    const sectionObservers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });

    // #books is a zero-height anchor — fires when it enters the top 60% of viewport
    const booksEl = document.getElementById("books");
    const booksObs = booksEl ? new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActiveSection("books"); },
      { rootMargin: "0px 0px -40% 0px" }
    ) : null;
    booksObs?.observe(booksEl!);

    // #contact is short — only activate when it's well into the viewport (not just peeking)
    const contactEl = document.getElementById("contact");
    const contactObs = contactEl ? new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActiveSection("contact"); },
      { rootMargin: "-15% 0px -50% 0px" }
    ) : null;
    contactObs?.observe(contactEl!);

    return () => {
      sectionObservers.forEach((obs) => obs?.disconnect());
      booksObs?.disconnect();
      contactObs?.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm"
          : ""
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="text-base font-semibold tracking-tight text-zinc-100 transition-colors hover:text-green-400"
        >
          Jesse Annan
        </a>

        {/* Desktop gradient pills */}
        <div className="hidden sm:flex">
          <GradientMenu activeSection={activeSection} />
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col items-center justify-center gap-[5px] p-1 sm:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-5 bg-zinc-400 transition-all duration-200 ${
              mobileOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-zinc-400 transition-all duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-zinc-400 transition-all duration-200 ${
              mobileOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-zinc-800/60 bg-zinc-950/95 px-6 py-5 backdrop-blur-sm sm:hidden">
          <div className="flex flex-col gap-4">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === href.slice(1)
                    ? "text-green-400"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
