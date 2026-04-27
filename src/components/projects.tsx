"use client";

import { BlurFade } from "@/components/ui/blurFade";
import { MagicCard } from "@/components/ui/magicCard";
import { ExternalLink } from "lucide-react";

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const projects = [
  {
    name: "LingoScape",
    subtitle: "Multi-Modal Translation Platform",
    description:
      "Architected a multilingual platform supporting 15 languages with real-time translation and extensible video conferencing infrastructure. Placed 2nd among 28 teams in the GSU CS demo competition.",
    stack: ["PostgreSQL", "JavaScript", "HTML", "CSS", "Supabase"],
    github: "https://github.com/annan92419",
    link: null,
  },
  {
    name: "Brain Tumor Detection",
    subtitle: "Deep Learning with RetinaNet",
    description:
      "Refined a deep learning tumor detection system achieving 94% mAP (IoU 0.5) on brain MRI scans, with robust performance across diverse tumor sizes in a 123-image clinical test set.",
    stack: ["Python", "PyTorch", "RetinaNet"],
    github: "https://github.com/annan92419",
    link: null,
  },
  {
    name: "Student Performance Analysis",
    subtitle: "Statistical Modeling with SAS",
    description:
      "Analyzed academic performance disparities between two schools, identifying key drivers of absenteeism through demographic data. Built a random-effect model attaining 85% accuracy.",
    stack: ["SAS", "Statistical Modeling", "Data Analysis"],
    github: "https://github.com/annan92419",
    link: null,
  },
];

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <BlurFade>
          <h2 className="mb-3 text-3xl font-bold text-zinc-50">Projects</h2>
          <p className="mb-12 text-zinc-500">
            A selection of work spanning ML research and full-stack engineering.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <BlurFade key={project.name} delay={i * 0.1}>
              <MagicCard className="flex h-full flex-col p-6">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-zinc-50">
                    {project.name}
                  </h3>
                  <p className="mb-3 text-xs font-medium text-blue-500">
                    {project.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    <GitHubIcon size={14} />
                    GitHub
                  </a>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-200"
                    >
                      <ExternalLink size={14} />
                      Live
                    </a>
                  ) : (
                    <span className="text-xs text-zinc-700">Coming soon</span>
                  )}
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
