"use client";

import { AnimatedGradientText } from "@/components/ui/animatedGradientText";
import { AnimatedNumber } from "@/components/ui/animatedNumber";
import { BlurFade } from "@/components/ui/blurFade";
import { useInView } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";
import { useRef } from "react";

// ─── Big name blur-in (letter by letter) ──────────────────────────────────────

function BlurLetters({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex justify-center">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="font-mono font-bold tracking-tighter"
          style={{
            display: "inline-block",
            filter: inView ? "blur(0)" : "blur(14px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(-24px)",
            transition: `filter 0.6s ease-out, opacity 0.6s ease-out, transform 0.6s ease-out`,
            transitionDelay: `${baseDelay + i * 65}ms`,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

// ─── Hobby visualizations ─────────────────────────────────────────────────────

function ShuttlecockIcon() {
  return (
    <svg width="22" height="30" viewBox="0 0 28 36" fill="none" aria-hidden>
      <circle cx="14" cy="11" r="11" stroke="#22c55e" strokeWidth="1.5" opacity="0.65" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <line
            key={i}
            x1="14" y1="27"
            x2={14 + 11 * Math.sin(a)}
            y2={11 + 11 * Math.cos(a)}
            stroke="#22c55e" strokeWidth="1" opacity="0.4"
          />
        );
      })}
      <ellipse cx="14" cy="29" rx="5" ry="4" fill="#22c55e" opacity="0.55" />
    </svg>
  );
}

function WavesIcon() {
  return (
    <svg width="30" height="18" viewBox="0 0 40 24" fill="none" aria-hidden>
      <path
        d="M0 12 Q5 6 10 12 Q15 18 20 12 Q25 6 30 12 Q35 18 40 12"
        stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.75"
      />
      <path
        d="M0 19 Q5 13 10 19 Q15 25 20 19 Q25 13 30 19 Q35 25 40 19"
        stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"
      />
    </svg>
  );
}

function MiniVinyl({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#111" stroke="#2a2a2a" strokeWidth="0.5" />
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="#1e1e1e" strokeWidth="1" />
      <circle cx="12" cy="12" r="6" fill="none" stroke="#1e1e1e" strokeWidth="1" />
      <circle cx="12" cy="12" r="3.5" fill={color} opacity="0.85" />
      <circle cx="12" cy="12" r="1.2" fill="#050505" />
    </svg>
  );
}

const VINYLS = [
  { color: "#86efac", title: "Billie Eilish — When We All Fall Asleep, Where Do We Go?" },
  { color: "#fbbf24", title: "Kendrick Lamar — good kid, m.A.A.d city" },
  { color: "#a78bfa", title: "Måneskin — Chosen" },
];

const SPORTS = [
  { abbr: "A", label: "Arsenal", color: "#EF0107" },
  { abbr: "O", label: "OKC Thunder", color: "#007AC1" },
  { abbr: "R", label: "Baltimore Ravens", color: "#241773" },
  { abbr: "E", label: "Edmonton Oilers", color: "#FF4C00" },
];

// ─── Stats ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 300, suffix: "+", label: "Students Mentored" },
  { value: 3, suffix: "", label: "Years Teaching" },
  { value: 2, suffix: "", label: "Active Research Projects" },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[640px] w-[640px] rounded-full bg-green-500/5 blur-[120px]"
      />
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Hobbies panel (desktop only) ───────────────────────────────────── */}
      <aside className="absolute left-6 top-24 z-10 hidden w-[200px] flex-col gap-3.5 lg:flex">
        <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
          Beyond the lab
        </p>

        {/* Reading */}
        <div className="flex items-center gap-2.5">
          <BookOpen size={16} className="shrink-0 text-green-500" />
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-zinc-300">Reading</p>
            <a
              href="#about"
              className="text-[10px] text-zinc-600 transition-colors hover:text-green-500"
            >
              See current shelf ↓
            </a>
          </div>
        </div>

        {/* Badminton */}
        <div className="flex items-center gap-2.5">
          <ShuttlecockIcon />
          <div>
            <p className="text-[11px] font-medium text-zinc-300">Badminton</p>
            <p className="text-[10px] text-zinc-600">Competitive</p>
          </div>
        </div>

        {/* Swimming */}
        <div className="flex items-center gap-2.5">
          <WavesIcon />
          <div>
            <p className="text-[11px] font-medium text-zinc-300">Swimming</p>
            <span className="text-[9px] text-sky-400 border border-sky-400/40 rounded-full px-1.5 py-0.5 leading-none">
              learning
            </span>
          </div>
        </div>

        {/* Vinyl */}
        <div className="flex items-center gap-2.5">
          <div className="flex gap-0.5 shrink-0">
            {VINYLS.map((v) => (
              <div key={v.color} title={v.title}>
                <MiniVinyl color={v.color} />
              </div>
            ))}
          </div>
          <div>
            <p className="text-[11px] font-medium text-zinc-300">Vinyl</p>
            <p className="text-[10px] text-zinc-600">3 records</p>
          </div>
        </div>

        {/* Sports */}
        <div className="flex items-center gap-2.5">
          <div className="grid grid-cols-2 gap-1 shrink-0">
            {SPORTS.map(({ abbr, label, color }) => (
              <div
                key={abbr}
                title={label}
                className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-[8px] font-bold text-white"
                style={{ backgroundColor: color }}
              >
                {abbr}
              </div>
            ))}
          </div>
          <div>
            <p className="text-[11px] font-medium text-zinc-300">Sports</p>
            <p className="text-[10px] leading-snug text-zinc-600">
              Arsenal · OKC
              <br />
              Ravens · Oilers
            </p>
          </div>
        </div>
      </aside>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div className="relative flex flex-col items-center">
        <BlurFade delay={0} duration={0.6}>
          <p className="mb-6 text-sm font-medium uppercase tracking-widest text-green-500">
            PhD Student · Computer Science · Georgia State University
          </p>
        </BlurFade>

        {/* Big name */}
        <div className="text-[72px] leading-none text-green-400 sm:text-[100px] lg:text-[120px]">
          <BlurLetters text="JESSE" baseDelay={50} />
          <BlurLetters text="ANNAN" baseDelay={380} />
        </div>

        <BlurFade delay={0.75} duration={0.6}>
          <p className="mt-6 max-w-xl text-lg text-zinc-400 sm:text-xl">
            <AnimatedGradientText colorFrom="#22c55e" colorTo="#86efac">
              ML researcher
            </AnimatedGradientText>{" "}
            working on medical imaging and human trajectory prediction.
          </p>
        </BlurFade>

        <BlurFade delay={0.9} duration={0.6}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#research"
              className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-600"
            >
              View Research
            </a>
            <a
              href="#projects"
              className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
            >
              Get in Touch
            </a>
          </div>
        </BlurFade>
      </div>

      {/* ── Stats ──────────────────────────────────────────────────────────── */}
      <BlurFade delay={1.05} duration={0.6}>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-10 border-t border-zinc-800/60 pt-10">
          {STATS.map(({ value, suffix, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold tabular-nums text-zinc-100">
                <AnimatedNumber value={value} suffix={suffix} />
              </div>
              <div className="mt-1 text-xs text-zinc-500">{label}</div>
            </div>
          ))}
        </div>
      </BlurFade>

      <BlurFade delay={1.15} duration={0.6}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
          <span>Medical Imaging · Human Motion Prediction</span>
          <span>·</span>
          <span>Python · PyTorch · Deep Learning</span>
        </div>
      </BlurFade>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown size={20} className="animate-bounce text-zinc-600" />
      </div>
    </section>
  );
}
