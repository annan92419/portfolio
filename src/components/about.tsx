"use client";

import { BlurFade } from "@/components/ui/blurFade";

export function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <BlurFade>
          <h2 className="mb-10 text-3xl font-bold text-zinc-50">About</h2>
        </BlurFade>

        <div className="space-y-5 text-base leading-8 text-zinc-400">
          <BlurFade delay={0.05}>
            <p>
              I&apos;m a Computer Science PhD student at Georgia State
              University, where I also hold an MS in Mathematics &amp; Computer
              Science (GPA 3.77). My research sits at the intersection of
              machine learning and real-world applications — from deep learning
              for medical imaging to NLP and statistical modeling. I&apos;m
              currently a Teaching Assistant for Theory Foundations of CS,
              mentoring students through some of the field&apos;s most
              foundational ideas.
            </p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <p>
              Over the past few years I&apos;ve mentored more than 300 students
              across statistics, data science, and theory courses. That
              experience has shaped how I approach engineering: I care about
              clarity as much as correctness. My projects tend to start with a
              real problem — whether it&apos;s helping clinicians detect tumors
              faster or giving travelers frictionless translation — and build
              outward from there.
            </p>
          </BlurFade>

          <BlurFade delay={0.15}>
            <p>
              I&apos;m actively looking for research collaborations, summer
              internships, and industry roles in machine learning engineering or
              applied AI research. I thrive in environments that value
              intellectual rigor, iterative experimentation, and the kind of
              honest feedback that makes work better. If that sounds like your
              team, let&apos;s talk.
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-6 border-t border-zinc-800 pt-8 text-sm">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-600">
                Program
              </p>
              <p className="mt-1 text-zinc-300">PhD · Computer Science</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-600">
                School
              </p>
              <p className="mt-1 text-zinc-300">Georgia State University</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-600">
                Expected
              </p>
              <p className="mt-1 text-zinc-300">May 2030</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-600">
                GPA
              </p>
              <p className="mt-1 text-zinc-300">3.77</p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
