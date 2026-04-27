"use client";

import { AnimatedGradientText } from "@/components/ui/animatedGradientText";
import { BlurFade } from "@/components/ui/blurFade";

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
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

      <BlurFade delay={0.5} duration={0.6}>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600">
          <span>Medical Imaging · Human Motion Prediction · NLP</span>
          <span>·</span>
          <span>Python · PyTorch · Deep Learning · Statistical Modeling</span>
        </div>
      </BlurFade>
    </section>
  );
}
