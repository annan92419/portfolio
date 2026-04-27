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
      "Full-stack multilingual platform supporting 15 languages with real-time speech-to-text, text translation, and text-to-speech. Built with a 5-person team — placed 2nd among 28 teams at the GSU CS demo competition.",
    highlight: "2nd / 28 teams · <500ms latency",
    stack: ["Node.js", "Express", "Supabase", "Web Speech API", "PostgreSQL"],
    github: "https://github.com/annan92419/CSC-SWE-Lingo_Master_Coders",
    link: null,
    date: "Nov 2024",
  },
  {
    name: "Brain Tumor Detection",
    subtitle: "Object Detection · RetinaNet",
    description:
      "Trained RetinaNet (ResNet-50 + FPN) on 1,229 brain MRI scans using Detectron2. Achieved state-of-the-art detection accuracy across multiple IoU thresholds on Google Colab Pro with A100 GPUs.",
    highlight: "94% mAP @ IoU 0.5 · 91% @ IoU 0.75",
    stack: ["Python", "PyTorch", "Detectron2", "RetinaNet", "Google Colab"],
    github: "https://github.com/annan92419/GaState",
    link: null,
    date: "Jul 2024",
  },
  {
    name: "US Airline Sentiment Analysis",
    subtitle: "NLP · Twitter Feedback",
    description:
      "Sentiment classifier for airline customer feedback using logistic regression on 14,640 tweets. Expanded feature dimensionality from 8.5K to 61K via TF-IDF and n-gram preprocessing.",
    highlight: "78.9% accuracy · 84% precision on negatives",
    stack: ["Python", "Scikit-Learn", "TF-IDF", "Logistic Regression"],
    github: "https://github.com/annan92419/GaState",
    link: null,
    date: "Jul 2023",
  },
  {
    name: "Student Hostel Price Prediction",
    subtitle: "Undergraduate Research · KNUST",
    description:
      "First-ever ML study of the KNUST student hostel market. Manually collected 500 responses from 70 hostels and trained multiple regression models to predict room prices from location, amenities, and proximity features.",
    highlight: "R² > 0.75 · 77%+ accuracy across all models",
    stack: ["Python", "Ridge Regression", "Neural Network", "Survey Data"],
    github: "https://github.com/annan92419/undergrad_project",
    link: null,
    date: "2022",
  },
];

export function Projects() {
  return (

    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <hr className="section-rule" />
        <BlurFade>
          <h2 className="mb-3 text-3xl font-bold text-zinc-50">Projects</h2>
          <p className="mb-12 text-zinc-500">
            Applied engineering and data science across NLP, computer vision,
            and systems.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <BlurFade key={project.name} delay={i * 0.08}>
              <MagicCard
                className="flex h-full flex-col p-6"
                gradientColor="#22c55e"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-zinc-50">
                      {project.name}
                    </h3>
                    <span className="shrink-0 text-xs text-zinc-600">
                      {project.date}
                    </span>
                  </div>
                  <p className="mb-2 text-xs font-medium text-green-400">
                    {project.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {project.description}
                  </p>
                  {project.highlight && (
                    <p className="mt-3 text-xs font-medium text-zinc-300">
                      {project.highlight}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    <GitHubIcon size={13} />
                    GitHub
                  </a>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-200"
                    >
                      <ExternalLink size={13} />
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
