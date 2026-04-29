"use client";

import { FlaskConical, Code2, Briefcase, Trophy, User, Mail } from "lucide-react";

const menuItems = [
  { title: "Research",   icon: <FlaskConical size={20} />, gradientFrom: "#a955ff", gradientTo: "#ea51ff", href: "#research"   },
  { title: "Projects",   icon: <Code2        size={20} />, gradientFrom: "#56CCF2", gradientTo: "#2F80ED", href: "#projects"   },
  { title: "Experience", icon: <Briefcase    size={20} />, gradientFrom: "#FF9966", gradientTo: "#FF5E62", href: "#experience" },
  { title: "Awards",     icon: <Trophy       size={20} />, gradientFrom: "#80FF72", gradientTo: "#7EE8FA", href: "#awards"     },
  { title: "About",      icon: <User         size={20} />, gradientFrom: "#ffa9c6", gradientTo: "#f434e2", href: "#about"      },
  { title: "Contact",    icon: <Mail         size={20} />, gradientFrom: "#f7971e", gradientTo: "#ffd200", href: "#contact"    },
];

export function GradientMenu({ activeSection }: { activeSection?: string }) {
  return (
    <ul className="flex gap-3">
      {menuItems.map(({ title, icon, gradientFrom, gradientTo, href }) => {
        const id = href.slice(1);
        const isActive = activeSection === id;
        return (
          <li
            key={href}
            style={
              { "--gradient-from": gradientFrom, "--gradient-to": gradientTo } as React.CSSProperties
            }
            className={`relative h-[38px] rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer group
              ${isActive ? "w-[120px] shadow-none" : "w-[38px] bg-zinc-800 shadow-md hover:w-[120px] hover:shadow-none"}`}
          >
            {/* gradient fill */}
            <span
              className={`absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] transition-opacity duration-500
                ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            />
            {/* glow */}
            <span
              className={`absolute top-[6px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[12px] -z-10 transition-opacity duration-500
                ${isActive ? "opacity-40" : "opacity-0 group-hover:opacity-40"}`}
            />

            <a href={href} className="absolute inset-0 rounded-full" aria-label={title} />

            {/* icon — hidden when active or hovered */}
            <span
              className={`relative z-10 text-zinc-400 transition-all duration-300
                ${isActive ? "scale-0" : "scale-100 group-hover:scale-0"}`}
            >
              {icon}
            </span>

            {/* label */}
            <span
              className={`absolute z-10 text-white text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 delay-100
                ${isActive ? "scale-100" : "scale-0 group-hover:scale-100"}`}
            >
              {title}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
