"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import { useT } from "@/components/providers";
import { useAsset } from "@/components/assets";
import { Eyebrow } from "@/components/site/eyebrow";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/content";

function Slide({ project, index }: { project: Project; index: number }) {
  const slide = project.slides[index];
  const exists = useAsset(`projects/${slide.file}`);

  if (!exists) {
    return (
      <div className="grid aspect-[1365/677] w-full place-items-center rounded-surface border border-dashed border-line bg-raised p-6 text-center">
        <p className="font-mono text-sm text-muted">
          {project.missingLabel}: /public/projects/{slide.file}
        </p>
      </div>
    );
  }
  return (
    <Image
      src={`/projects/${slide.file}`}
      alt={slide.alt}
      width={1365}
      height={677}
      sizes="(min-width: 1024px) 720px, 100vw"
      className="aspect-[1365/677] w-full rounded-surface border border-line object-cover object-top"
    />
  );
}

function ProjectBlock({ project, flip }: { project: Project; flip: boolean }) {
  const [active, setActive] = useState(0);

  return (
    <Reveal className="relative">
      <article className="grid items-center lg:grid-cols-12">
        {/* Imagem */}
        <div
          className={cn(
            "lg:row-start-1",
            flip ? "lg:col-start-6 lg:col-end-13" : "lg:col-start-1 lg:col-end-8",
          )}
        >
          <Slide project={project} index={active} />
          <div
            role="group"
            aria-label={project.name}
            className="mt-3 flex flex-wrap gap-2"
          >
            {project.slides.map((s, i) => (
              <button
                key={s.file}
                type="button"
                aria-pressed={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-control border px-3.5 py-1.5 font-mono text-xs transition-colors",
                  active === i
                    ? "border-accent bg-accent text-on-accent"
                    : "border-line text-muted hover:text-ink",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Painel translúcido sobre o print */}
        <div
          className={cn(
            "relative z-10 mt-6 rounded-surface border border-line bg-panel p-6 backdrop-blur-md md:p-8 lg:row-start-1 lg:mt-0",
            flip
              ? "lg:col-start-1 lg:col-end-6 lg:-mr-24"
              : "lg:col-start-8 lg:col-end-13 lg:-ml-24",
          )}
        >
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-3xl font-bold tracking-tight">
              {project.name}
            </h3>
            {project.status && (
              <span className="rounded-control bg-accent px-3 py-1 font-mono text-xs font-medium text-on-accent">
                {project.status}
              </span>
            )}
          </div>
          <p className="mt-2 text-muted">{project.meta}</p>

          <p className="mt-5 font-mono text-xs uppercase tracking-wider text-muted">
            {project.problemLabel}
          </p>
          <p className="mt-1.5 leading-relaxed">{project.problem}</p>

          <p className="mt-5 font-mono text-xs uppercase tracking-wider text-muted">
            {project.builtLabel}
          </p>
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
      </article>
    </Reveal>
  );
}

export function Projects() {
  const t = useT();
  return (
    <section
      id="projetos"
      className="bg-bg px-5 py-24 md:px-8 md:py-32"
      aria-labelledby="projetos-title"
    >
      <div className="mx-auto max-w-6xl">
        <Eyebrow>{t.projects.eyebrow}</Eyebrow>
        <h2
          id="projetos-title"
          className="mt-3 max-w-[22ch] text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
        >
          {t.projects.title}
        </h2>
        <div className="mt-14 space-y-24 md:space-y-32">
          {t.projects.items.map((p, i) => (
            <ProjectBlock key={p.id} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
