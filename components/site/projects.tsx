"use client";

import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import { useT } from "@/components/providers";
import { Eyebrow } from "@/components/site/eyebrow";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { HeroParallax, type ParallaxProduct } from "@/components/ui/hero-parallax";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/content";

/* Telas de cada projeto usadas no parallax (em /public/projects/parallax), uma lista por projeto.
   Cada projeto mostra só as próprias telas; são 15 por projeto, uma para cada card do parallax. */
const SHOTS: Record<string, string[]> = {
  "amigo-pet": Array.from({ length: 15 }, (_, i) => `/projects/parallax/amigo-${i + 1}.jpg`),
  fl23: Array.from({ length: 15 }, (_, i) => `/projects/parallax/fl23-${i + 1}.jpg`),
};

function useProjectShots(project: Project): ParallaxProduct[] {
  const files = SHOTS[project.id] ?? [];
  if (files.length === 0) return [];
  // 15 cards (3 fileiras de 5)
  return Array.from({ length: 15 }, (_, i) => ({
    title: project.name,
    link: project.demo.href,
    thumbnail: files[i % files.length],
  }));
}

/* Card informativo: o problema, o que foi construído, a stack e os links. */
function ProjectInfo({ project }: { project: Project }) {
  return (
    <div className="relative z-10 rounded-surface border border-line bg-panel p-6 backdrop-blur-md md:p-8">
      <p className="font-mono text-xs uppercase tracking-wider text-muted">{project.problemLabel}</p>
      <p className="mt-1.5 leading-relaxed">{project.problem}</p>

      <p className="mt-5 font-mono text-xs uppercase tracking-wider text-muted">{project.builtLabel}</p>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-accent">
        {project.built.map((b) => (
          <li key={b} className="leading-snug text-ink">
            {b}
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
        {project.chips.map((c) => (
          <li key={c}>
            <Chip>{c}</Chip>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap gap-3">
        <Button asChild size="md">
          <a href={project.demo.href} target="_blank" rel="noopener noreferrer">
            {project.demo.label}
            <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </Button>
        {project.code && (
          <Button asChild variant="outline" size="md">
            <a href={project.code.href} target="_blank" rel="noopener noreferrer">
              <GithubLogo size={18} aria-hidden="true" />
              {project.code.label}
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

/* Um projeto por vez: o nome ao lado do card informativo e, abaixo, o parallax só com as telas dele. */
function ProjectShowcase({ project, flip }: { project: Project; flip: boolean }) {
  const shots = useProjectShots(project);

  const header = (
    <div className="relative left-0 top-0 mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className={cn("lg:col-span-5", flip && "lg:order-2")}>
          <h3 className="font-display text-4xl font-bold tracking-tight md:text-6xl">{project.name}</h3>
          {project.status && (
            <span className="mt-4 inline-block rounded-control bg-accent px-3 py-1 font-mono text-xs font-medium text-on-accent">
              {project.status}
            </span>
          )}
          <p className="mt-4 max-w-[34ch] text-lg text-muted md:text-xl">{project.meta}</p>
        </div>
        <div className={cn("lg:col-span-7", flip && "lg:order-1")}>
          <ProjectInfo project={project} />
        </div>
      </div>
    </div>
  );

  return (
    <div id={project.id}>
      {shots.length > 0 ? (
        <HeroParallax products={shots} header={header} />
      ) : (
        <div className="pb-24 md:pb-32">{header}</div>
      )}
    </div>
  );
}

export function Projects() {
  const t = useT();

  return (
    <section id="projetos" className="bg-band" aria-labelledby="projetos-title">
      <div className="mx-auto max-w-6xl px-5 pb-6 pt-24 md:px-8 md:pt-32">
        <Eyebrow>{t.projects.eyebrow}</Eyebrow>
        <h2
          id="projetos-title"
          className="mt-3 max-w-[22ch] text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
        >
          {t.projects.title}
        </h2>
      </div>
      {t.projects.items.map((p, i) => (
        <ProjectShowcase key={p.id} project={p} flip={i % 2 === 1} />
      ))}
    </section>
  );
}
