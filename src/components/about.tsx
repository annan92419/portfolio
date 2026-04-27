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
              working through ideas in computability and complexity with a new
              cohort of students.
            </p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <p>
              Over the past few years I&apos;ve mentored more than 300 students
              across statistics, data science, and CS theory courses. One of the
              things I&apos;m most proud of: during my Foundations of Data
              Science TA role, average homework scores climbed from 88.9% to
              96.7% across the semester. I care about clarity as much as
              correctness — whether that&apos;s in a model or an explanation.
            </p>
          </BlurFade>

          <BlurFade delay={0.15}>
            <p>
              My projects tend to start with a real problem and build outward.
              LingoScape came from wanting to make translation genuinely
              accessible across languages; the tumor detection work came from
              wanting to see if strong object detectors could help clinicians
              triage MRI scans faster. I&apos;m actively looking for research
              collaborations, summer internships, and industry roles in machine
              learning engineering or applied AI research where rigorous thinking
              and practical impact go hand in hand.
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.2}>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-zinc-800 pt-8 text-sm sm:grid-cols-4">
            {[
              { label: "Program", value: "PhD · Computer Science" },
              { label: "School", value: "Georgia State University" },
              { label: "Expected", value: "May 2030" },
              { label: "GPA", value: "3.77 (MS)" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs uppercase tracking-widest text-zinc-600">
                  {label}
                </p>
                <p className="mt-1 text-zinc-300">{value}</p>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
