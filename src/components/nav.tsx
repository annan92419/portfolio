"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        scrolled ? "border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm" : ""
      }`}
    >
      <a
        href="#hero"
        className="text-sm font-semibold text-zinc-100 hover:text-green-400 transition-colors"
      >
        Jesse Annan
      </a>
      <div className="hidden items-center gap-6 sm:flex">
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-100"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
