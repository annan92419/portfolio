"use client";

import { BlurFade } from "@/components/ui/blurFade";
import { MagicCard } from "@/components/ui/magicCard";

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const papers = [
  {
    title: "Brain Tumor Inpainting via Conditional VAE",
    area: "Medical Imaging · PhD Research",
    description:
      "A three-phase deep learning architecture for reconstructing healthy brain tissue from tumor-affected MRI scans. Given only a corrupted scan, the model synthesizes what the brain should look like without the tumor — enabling non-invasive tumor assessment and surgical planning.",
    architecture: [
      "Shared ViT encoder with patch embeddings (T1/T1ce/T2/FLAIR)",
      "Dual-latent conditional VAE with PriorViT + PriorMLP",
      "Cross-attention fusion of Sobel edge features",
      "U-Net decoder with Adaptive Group Norm",
      "Three-phase curriculum: autoencoder → single-latent → edge-aware",
    ],
    metrics: [
      { label: "Masked PSNR", value: "23.41 dB" },
      { label: "SSIM", value: "0.93" },
      { label: "LPIPS", value: "0.08" },
      { label: "Dataset", value: "BraTS 2023" },
    ],
    stack: ["PyTorch", "Vision Transformers", "Conditional VAE", "U-Net", "nibabel"],
    github: "https://github.com/annan92419/brain-tumor-inpainting",
    repoNote: "Private Research Repository",
  },
  {
    title: "Dual-Stream Trajectory Prediction",
    area: "Human Motion · PhD Research",
    description:
      "A novel dual-stream attention architecture for multi-agent trajectory prediction in crowded scenes, predicting K plausible future paths from observed motion history. Introduces three-part positional encoding designed to address limitations of standard sinusoidal PE on short trajectory sequences.",
    architecture: [
      "Dual-stream encoder: even/odd temporal subsampling branches",
      "tAPE: frequency-scaled sinusoidal PE for short sequences",
      "AgentIdentityPE: learnable target vs. neighbor embeddings",
      "MPDPE: closed-form constant-velocity proximity encoding",
      "CVAE decoder with β-annealing for stable KL training",
    ],
    metrics: [
      { label: "Metric", value: "minADE / minFDE" },
      { label: "Samples", value: "K = 20" },
      { label: "Benchmark", value: "ETH / UCY" },
      { label: "Input", value: "6D state (pos, vel, acc)" },
    ],
    stack: ["PyTorch", "Transformers", "CVAE", "Multi-agent Attention"],
    github: "https://github.com/annan92419/dual-stream-traj",
    repoNote: "Private Research Repository",
  },
];

export function Research() {
  return (
    <section id="research" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <BlurFade>
          <div className="mb-3 flex items-center gap-3">
            <h2 className="text-3xl font-bold text-zinc-50">Research</h2>
            <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400 ring-1 ring-green-500/20">
              PhD
            </span>
          </div>
          <p className="mb-12 text-zinc-500">
            Original work in medical imaging and human motion prediction.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {papers.map((paper, i) => (
            <BlurFade key={paper.title} delay={i * 0.1}>
              <MagicCard
                className="flex h-full flex-col p-7"
                gradientColor="#22c55e"
                gradientOpacity={0.09}
              >
                <div className="flex-1">
                  <p className="mb-2 text-xs font-medium text-green-400">
                    {paper.area}
                  </p>
                  <h3 className="mb-3 text-xl font-semibold leading-snug text-zinc-50">
                    {paper.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {paper.description}
                  </p>

                  <div className="mt-5">
                    <p className="mb-2 text-xs font-medium uppercase tracking-widest text-zinc-600">
                      Architecture
                    </p>
                    <ul className="space-y-1">
                      {paper.architecture.map((item) => (
                        <li key={item} className="flex gap-2 text-xs text-zinc-500">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green-500/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg bg-zinc-950/60 p-3">
                  {paper.metrics.map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs text-zinc-600">{label}</p>
                      <p className="text-sm font-semibold text-zinc-200">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {paper.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={paper.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    <GitHubIcon size={13} />
                    {paper.repoNote}
                  </a>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
