"use client";

import { BlurFade } from "@/components/ui/blurFade";
import { motion } from "framer-motion";

const roles = [
  {
    title: "Graduate Teaching Assistant",
    course: "Theory Foundations of Computer Science",
    org: "Georgia State University",
    period: "Jan 2025 – May 2025",
    bullets: [
      "Evaluated assignments for over 70 students, providing personalized feedback and guidance.",
      "Led weekly lab sessions to reinforce core concepts in computability, complexity, and formal languages.",
    ],
  },
  {
    title: "Graduate Teaching Assistant",
    course: "Foundations of Data Science",
    org: "Georgia State University",
    period: "Aug 2024 – Dec 2024",
    bullets: [
      "Evaluated data science assignments for over 55 students with detailed, individualized feedback.",
      "Led weekly office hours mentoring students in Python and data visualization — average homework scores rose from 88.9% to 96.7%.",
    ],
  },
  {
    title: "Graduate Lab Assistant",
    course: "Elementary Statistics",
    org: "Georgia State University",
    period: "Aug 2022 – Jul 2024",
    bullets: [
      "Visualized statistical concepts to help over 200 students build intuition for key ideas.",
      "Documented common challenges and effective teaching strategies, contributing to an 8% improvement in student performance.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <hr className="section-rule" />
        <BlurFade>
          <h2 className="mb-3 text-3xl font-bold text-zinc-50">Experience</h2>
          <p className="mb-12 text-zinc-500">
            Three years of teaching and mentoring, staying in close contact with 6 students.
          </p>
        </BlurFade>

        <div className="relative pl-8">
          {/* Animated timeline line */}
          <motion.div
            aria-hidden
            className="absolute left-0 top-0 w-px bg-zinc-800"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 4%, black 92%, transparent)",
            }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            viewport={{ once: true }}
          />

          <div className="space-y-10">
            {roles.map((role, i) => (
              <BlurFade key={role.course} delay={i * 0.1}>
                <div className="relative">
                  <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-green-500 bg-zinc-950" />
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-zinc-100">{role.title}</p>
                      <p className="text-sm text-green-400">{role.course}</p>
                      <p className="text-xs text-zinc-600">{role.org}</p>
                    </div>
                    <span className="mt-1 shrink-0 text-xs text-zinc-600 sm:mt-0">
                      {role.period}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {role.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-zinc-400">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-700" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
