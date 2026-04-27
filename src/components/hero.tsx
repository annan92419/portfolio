"use client";

import { AnimatedGradientText } from "@/components/ui/animatedGradientText";
import { AnimatedNumber } from "@/components/ui/animatedNumber";
import { BlurFade } from "@/components/ui/blurFade";

const stats = [
  { value: 300, suffix: "+", label: "Students Mentored" },
  { value: 3, suffix: "", label: "Years Teaching" },
  { value: 2, suffix: "", label: "Active Research Projects" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Ambient green glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[640px] w-[640px] rounded-full bg-green-500/5 blur-[120px]"
      />
      {/* Dot grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <BlurFade delay={0} duration={0.6}>
        <p className="mb-4 text-sm font-medium tracking-widest text-green-500 uppercase">
          PhD Student · Computer Science · Georgia State University
        </p>
      </BlurFade>

      <BlurFade delay={0.1} duration={0.6}>
        <h1 className="text-5xl font-bold tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl">
          Jesse Annan
        </h1>
      </BlurFade>

      <BlurFade delay={0.2} duration={0.6}>
        <p className="mt-5 max-w-2xl text-xl text-zinc-400 sm:text-2xl">
          <AnimatedGradientText colorFrom="#22c55e" colorTo="#86efac">
            ML researcher
          </AnimatedGradientText>{" "}
          working on medical imaging and human trajectory prediction.
        </p>
      </BlurFade>

      <BlurFade delay={0.35} duration={0.6}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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

      {/* Stat counters */}
      <BlurFade delay={0.5} duration={0.6}>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-10 border-t border-zinc-800/60 pt-10">
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold tabular-nums text-zinc-100">
                <AnimatedNumber value={value} suffix={suffix} />
              </div>
              <div className="mt-1 text-xs text-zinc-500">{label}</div>
            </div>
          ))}
        </div>
      </BlurFade>

      <BlurFade delay={0.62} duration={0.6}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
          <span>Medical Imaging · Human Motion Prediction · NLP</span>
          <span>·</span>
          <span>Python · PyTorch · Deep Learning · Statistical Modeling</span>
        </div>
      </BlurFade>
    </section>
  );
}
