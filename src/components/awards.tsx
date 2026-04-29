"use client";

import { BlurFade } from "@/components/ui/blurFade";
import { Trophy } from "lucide-react";

const awards = [
  {
    title: "2nd Place — CS Demo Competition",
    description:
      "Led a 5-person team to build LingoScape, a multi-modal language translation app, placing 2nd among 28 teams.",
  },
  {
    title: "Top Graduate Lab Assistant",
    description:
      "Selected as top performer among 15 Graduate Lab Assistants for outstanding student mentorship at Commons Math Lab.",
  },
  {
    title: "Willey M. Suttle Math Award",
    description:
      "Recipient of the departmental award for academic excellence in mathematics.",
  },
];

const skills = {
  "Languages & Tools": [
    "Python",
    "PostgreSQL",
    "PyTorch",
    "Git",
    "GitHub",
    "LaTeX",
  ],
  "Machine Learning": [
    "ML Algorithms",
    "Deep Learning",

    "Computer Vision",
    "Feature Engineering",
    "Data Preprocessing",
  ],
  "Data & Visualization": [
    "Scikit-Learn",
    "Matplotlib",
    "Seaborn",
    "Statistical Modeling",
    "Supabase",
  ],
};

export function Awards() {
  return (
    <section id="awards" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <hr className="section-rule" />
        <BlurFade>
          <h2 className="mb-12 text-3xl font-bold text-zinc-50">
            Awards &amp; Skills
          </h2>
        </BlurFade>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <BlurFade>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Recognition
              </h3>
            </BlurFade>
            <div className="space-y-5">
              {awards.map((award, i) => (
                <BlurFade key={award.title} delay={i * 0.08}>
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                      <Trophy size={14} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        {award.title}
                      </p>
                      <p className="mt-0.5 text-sm text-zinc-500">
                        {award.description}
                      </p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>

          <div>
            <BlurFade delay={0.05}>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Technical Skills
              </h3>
            </BlurFade>
            <div className="space-y-5">
              {Object.entries(skills).map(([category, tags], i) => (
                <BlurFade key={category} delay={0.05 + i * 0.08}>
                  <div>
                    <p className="mb-2 text-xs text-zinc-600">{category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-xs text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
