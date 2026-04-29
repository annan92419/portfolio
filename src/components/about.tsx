"use client";

import { BookOpen } from "lucide-react";
import { BlurFade } from "@/components/ui/blurFade";
import { ReadingSection } from "@/components/ui/goodreadsCurrentlyReading";

export function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <hr className="section-rule" />
        <BlurFade>
          <h2 className="mb-10 text-3xl font-bold text-zinc-50">About</h2>
        </BlurFade>

        <div className="space-y-5 text-base leading-8 text-zinc-400">
          <BlurFade delay={0.05}>
            <p>
              I&apos;m a Computer Science PhD student at Georgia State
              University, where I also hold an MS in Mathematics &amp; Computer
              Science (GPA 3.81, Scientific Computing track). My current
              research focuses on two problems: synthesizing healthy brain
              tissue from tumor-affected MRI scans, and predicting plausible
              future trajectories for agents in crowded scenes. Both sit at the
              intersection of deep learning and real-world perception, and both
              are works in progress toward publication.
            </p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <p>
              Before the PhD, I developed a strong foundation in statistical
              modeling and computer vision through graduate coursework and
              independent projects — from RetinaNet-based tumor detection
              (94% mAP) to logistic regression sentiment analysis on 14K+ tweets
              to the first ML study of student hostel pricing at KNUST, Ghana.
              That last project, which I led as an undergrad, taught me that the
              hardest part of applied ML is often the data — we manually
              collected 500 survey responses across 70 hostels.
            </p>
          </BlurFade>

          <BlurFade delay={0.15}>
            <p>
              I&apos;ve spent three years teaching and mentoring — staying in
              close contact with 6 students across statistics, data science, and CS theory — and that
              work has shaped how I think about research communication. I write
              code and papers with the same goal: make the idea clear enough
              that someone else can build on it. Beyond the lab, I&apos;m
              drawn to sports science — the idea of applying ML and data
              analysis to athletic performance and human movement is something
              I actively want to build toward. I&apos;m looking for research
              collaborations, internships, and roles in ML engineering or
              applied AI where that combination of rigor and curiosity is valued.
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.2}>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-zinc-800 pt-8 text-sm sm:grid-cols-4">
            {[
              { label: "Program", value: "PhD · Computer Science" },
              { label: "School", value: "Georgia State" },
              { label: "Expected", value: "May 2030" },
              { label: "GPA", value: "3.81 (MS)" },
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

        <BlurFade delay={0.25}>
          <div id="books" className="mt-14 border-t border-zinc-800 pt-10">
            <h3 className="mb-8 flex items-center gap-2 text-xl font-bold text-zinc-50">
              <BookOpen size={20} className="text-green-400" />
              Reading
            </h3>
            <ReadingSection goodreadsUserId="173107363" maxCurrently={3} maxRead={50} />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
