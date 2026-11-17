"use client";
import { createRef, useRef, useState, type Ref } from "react";
import { useT } from "@/components/providers";
import { Reveal } from "@/components/site/reveal";
import { techs, TechLogo, type Tech } from "@/components/site/tech-logos";
import { AnimatedBeam } from "@/components/ui/animated-beam";
const byName = (n: string) => techs.find((t) => t.name === n) as Tech;
const frontend = ["TypeScript", "React", "Vite", "Tailwind CSS", "shadcn/ui", "Next.js"].map(byName);
const backend = ["Node.js", "Fastify", "Express", "Prisma", "PostgreSQL"].map(byName);

function TechNode({ tech, side, nodeRef }: { tech: Tech; side: "left" | "right"; nodeRef: Ref<HTMLDivElement> }) {
  const circle = (
    <div
      ref={nodeRef}
      className="z-10 grid size-14 shrink-0 place-items-center rounded-full border border-line bg-raised"
    >
      <TechLogo tech={tech} size={26} title={false} />
    </div>
  );
  const label = <span className="text-sm">{tech.name}</span>;
  return (
    <li className="flex items-center gap-3">
      {side === "left" ? (
        <>
          {label}
          {circle}
        </>
      ) : (
        <>
          {circle}
          {label}
        </>
      )}
    </li>
  );
}

/* Feixes animados (Magic UI) das peças da stack até um único ponto, o projeto. Só no desktop; no celular entram as listas. */
function Diagram() {
  const t = useT();
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const [frontRefs] = useState(() => frontend.map(() => createRef<HTMLDivElement>()));
  const [backRefs] = useState(() => backend.map(() => createRef<HTMLDivElement>()));

  return (
    <div
      ref={containerRef}
      className="relative hidden w-full items-center justify-between gap-16 px-4 text-ink lg:flex"
    >
      <div>
        <h3 className="mb-6 border-b border-line pb-3 text-right font-mono text-sm text-muted">{t.stack.frontend}</h3>
        <ul className="flex flex-col items-end gap-4">
          {frontend.map((tech, i) => (
            <TechNode key={tech.name} tech={tech} side="left" nodeRef={frontRefs[i]} />
          ))}
        </ul>
      </div>

      <div
        ref={centerRef}
        className="z-10 flex h-14 shrink-0 items-center rounded-control bg-accent px-8 font-display text-lg font-bold text-on-accent"
      >
        {t.stack.center}      </div>

      <div>
        <h3 className="mb-6 border-b border-line pb-3 font-mono text-sm text-muted">{t.stack.backend}</h3>
        <ul className="flex flex-col gap-4">
          {backend.map((tech, i) => (
            <TechNode key={tech.name} tech={tech} side="right" nodeRef={backRefs[i]} />
          ))}
        </ul>
      </div>

      {frontRefs.map((ref, i) => (
        <AnimatedBeam key={frontend[i].name} containerRef={containerRef} fromRef={ref} toRef={centerRef} duration={4 + (i % 3)} delay={i * 0.4} />
      ))}
      {backRefs.map((ref, i) => (
        <AnimatedBeam key={backend[i].name} containerRef={containerRef} fromRef={ref} toRef={centerRef} reverse duration={4 + (i % 3)} delay={i * 0.4} />
      ))}
    </div>
  );
}

function Group({ title, items }: { title: string; items: Tech[] }) {
  return (
    <div>
      <h3 className="font-mono text-sm text-muted">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((tech) => (
          <li
            key={tech.name}
            className="flex items-center gap-2 rounded-control border border-line bg-raised px-3 py-2 text-sm"
          >
            <TechLogo tech={tech} size={18} title={false} />
            {tech.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Stack() {
  const t = useT();
  return (
    <section
      aria-labelledby="stack-title"
      className="bg-sunken px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="stack-title"
          className="mt-3 max-w-[24ch] text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
        >
          {t.stack.title}
        </h2>
        <p className="mt-4 text-lg text-muted">{t.stack.note}</p>

        <Reveal className="mt-12">
          <Diagram />
          <div className="space-y-8 lg:hidden">
            <Group title={t.stack.frontend} items={frontend} />
            <Group title={t.stack.backend} items={backend} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
