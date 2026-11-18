"use client";
import { createRef, useRef, useState, type Ref } from "react";
import { useT } from "@/components/providers";
import { Reveal } from "@/components/site/reveal";
import { techs, TechLogo, type Tech } from "@/components/site/tech-logos";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

const byName = (n: string) => techs.find((t) => t.name === n) as Tech;
const frontend = ["TypeScript", "React", "Vite", "Tailwind CSS", "shadcn/ui", "Next.js"].map(byName);
const backend = ["Node.js", "Fastify", "Express", "Prisma", "PostgreSQL"].map(byName);

/* Camadas do projeto (0 interface, 1 API, 2 banco). "lights" são as camadas que acendem no hover;
   "beam" é a camada onde o feixe da tecnologia termina. */
const LAYERS: Record<string, { lights: number[]; beam: number }> = {
  TypeScript: { lights: [0, 1], beam: 0 },
  React: { lights: [0], beam: 0 },
  Vite: { lights: [0], beam: 0 },
  "Tailwind CSS": { lights: [0], beam: 0 },
  "shadcn/ui": { lights: [0], beam: 0 },
  "Next.js": { lights: [0, 1], beam: 0 },
  "Node.js": { lights: [1], beam: 1 },
  Fastify: { lights: [1], beam: 1 },
  Express: { lights: [1], beam: 1 },
  Prisma: { lights: [1, 2], beam: 2 },
  PostgreSQL: { lights: [2], beam: 2 },
};

/* Metade da largura de uma camada (w-52 menos o padding do cartão): o feixe termina na borda da camada, não no centro. */
const LAYER_HALF = 92;

type NodeProps = {
  tech: Tech;
  side: "left" | "right";
  nodeRef: Ref<HTMLDivElement>;
  active: string | null;
  onActive: (name: string | null) => void;
};

function TechNode({ tech, side, nodeRef, active, onActive }: NodeProps) {
  const t = useT();
  const isActive = active === tech.name;
  const tipId = `tip-${tech.name.replace(/[^a-z0-9]/gi, "").toLowerCase()}`;
  // escurece só o conteúdo (logo e texto): o círculo continua opaco e esconde o feixe que passa atrás
  const dim = active !== null && !isActive;
  const circle = (
    <div
      ref={nodeRef}
      className={cn(
        "z-10 grid size-14 shrink-0 place-items-center rounded-full border bg-raised transition-[border-color,box-shadow]",
        isActive ? "border-accent shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_22%,transparent)]" : "border-line",
      )}
    >
      <span className={cn("grid place-items-center transition-opacity", dim && "opacity-45")}>
        <TechLogo tech={tech} size={26} title={false} />
      </span>
    </div>
  );
  const label = <span className={cn("text-sm transition-opacity", dim && "opacity-45")}>{tech.name}</span>;
  return (
    <li className="relative">
      <button
        type="button"
        aria-describedby={tipId}
        aria-pressed={isActive}
        onMouseEnter={() => onActive(tech.name)}
        onMouseLeave={() => onActive(null)}
        onFocus={() => onActive(tech.name)}
        onBlur={() => onActive(null)}
        onClick={() => onActive(isActive ? null : tech.name)}
        className="flex items-center gap-3 rounded-control outline-offset-4"
      >
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
      </button>
      {/* Popover: abre do lado voltado para o centro, sobre o feixe, sem empurrar nada do layout */}
      <div
        id={tipId}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute top-1/2 z-30 w-[17.5rem] -translate-y-1/2 rounded-surface border border-line bg-panel p-4 text-left shadow-xl backdrop-blur-md transition-[opacity,visibility] duration-150",
          side === "left" ? "left-[calc(100%+0.75rem)]" : "right-[calc(100%+0.75rem)]",
          isActive ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <p className="font-display font-bold">{tech.name}</p>
        <p className="mt-1 text-sm text-muted">{t.stack.techs[tech.name]}</p>
        <p className="mt-3 flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-muted">
          {t.stack.layerLabel}
          {LAYERS[tech.name].lights.map((i) => (
            <Chip key={i}>{t.stack.layers[i]}</Chip>
          ))}
        </p>
      </div>
    </li>
  );
}

/* Feixes animados (Magic UI) das peças da stack até um único ponto, o projeto. Só no desktop; no celular entram os cartões.
   Passar o mouse (ou focar) numa tecnologia acende o feixe dela e apaga os outros. */
function Diagram() {
  const t = useT();
  const containerRef = useRef<HTMLDivElement>(null);
  const [layerRefs] = useState(() => [0, 1, 2].map(() => createRef<HTMLLIElement>()));
  const [frontRefs] = useState(() => frontend.map(() => createRef<HTMLDivElement>()));
  const [backRefs] = useState(() => backend.map(() => createRef<HTMLDivElement>()));
  const [active, setActive] = useState<string | null>(null);
  const [layerHover, setLayerHover] = useState<number | null>(null);

  const beamProps = (name: string, i: number) => {
    const on = active === name;
    return {
      duration: on ? 2.2 : 4 + (i % 3),
      delay: on ? 0 : i * 0.4,
      pathColor: on ? "var(--accent)" : "var(--line)",
      pathWidth: on ? 3 : 2,
      pathOpacity: active && !on ? 0.35 : 1,
      // com uma tecnologia em foco, só o feixe dela leva o pulso de luz
      ...(active && !on ? { gradientStartColor: "transparent", gradientStopColor: "transparent" } : {}),
    };
  };

  return (
    <div className="hidden lg:block">
      {/* items-start: os títulos Frontend e Backend ficam na mesma altura, mesmo com 6 x 5 itens */}
      <div
        ref={containerRef}
        className="relative hidden w-full items-start justify-between gap-16 px-4 text-ink lg:flex"
      >
        <div>
          <h3 className="mb-6 border-b border-line pb-3 text-right font-mono text-sm text-muted">{t.stack.frontend}</h3>
          <ul className="flex flex-col items-end gap-4">
            {frontend.map((tech, i) => (
              <TechNode
                key={tech.name}
                tech={tech}
                side="left"
                nodeRef={frontRefs[i]}
                active={active}
                onActive={setActive}
              />
            ))}
          </ul>
        </div>

        {/* Centro: o projeto em camadas. No hover, acendem as camadas da tecnologia em foco. */}
        <div className="relative z-10 w-52 shrink-0 self-center rounded-surface border border-line bg-panel p-3 backdrop-blur-md">
          <p className="px-2 pb-2 font-mono text-xs text-muted">{t.stack.center}</p>
          <ul className="flex flex-col gap-2">
            {t.stack.layers.map((name, i) => {
              const lit = (active !== null && LAYERS[active].lights.includes(i)) || layerHover === i;
              return (
                <li
                  key={name}
                  ref={layerRefs[i]}
                  tabIndex={0}
                  aria-describedby={`layer-tip-${i}`}
                  onMouseEnter={() => setLayerHover(i)}
                  onMouseLeave={() => setLayerHover(null)}
                  onFocus={() => setLayerHover(i)}
                  onBlur={() => setLayerHover(null)}
                  className={cn(
                    "flex h-11 cursor-default items-center gap-2.5 rounded-control border px-4 text-sm font-medium outline-offset-2 transition-colors",
                    lit ? "border-accent bg-accent text-on-accent" : "border-line bg-raised text-ink",
                    (active !== null || layerHover !== null) && !lit && "text-muted",
                  )}
                >
                  <span aria-hidden="true" className={cn("size-2 rounded-full", lit ? "bg-on-accent" : "bg-accent")} />
                  {name}
                </li>
              );
            })}
          </ul>
          {/* Popover leigo: o que é cada camada, abaixo do cartão */}
          {t.stack.layers.map((name, i) => (
            <div
              key={name}
              id={`layer-tip-${i}`}
              role="tooltip"
              className={cn(
                "pointer-events-none absolute left-1/2 top-[calc(100%+0.75rem)] z-30 w-64 -translate-x-1/2 rounded-surface border border-line bg-panel p-4 text-left shadow-xl backdrop-blur-md transition-[opacity,visibility] duration-150",
                layerHover === i ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              <p className="font-display font-bold">{name}</p>
              <p className="mt-1 text-sm text-muted">{t.stack.layerDescs[i]}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="mb-6 border-b border-line pb-3 font-mono text-sm text-muted">{t.stack.backend}</h3>
          <ul className="flex flex-col gap-4">
            {backend.map((tech, i) => (
              <TechNode
                key={tech.name}
                tech={tech}
                side="right"
                nodeRef={backRefs[i]}
                active={active}
                onActive={setActive}
              />
            ))}
          </ul>
        </div>

        {frontRefs.map((ref, i) => (
          <AnimatedBeam key={frontend[i].name} containerRef={containerRef} fromRef={ref} toRef={layerRefs[LAYERS[frontend[i].name].beam]} endXOffset={-LAYER_HALF} {...beamProps(frontend[i].name, i)} />
        ))}
        {backRefs.map((ref, i) => (
          <AnimatedBeam key={backend[i].name} containerRef={containerRef} fromRef={ref} toRef={layerRefs[LAYERS[backend[i].name].beam]} endXOffset={LAYER_HALF} reverse {...beamProps(backend[i].name, i)} />
        ))}
      </div>
    </div>
  );
}

/* Celular/tablet: sem feixes, cada tecnologia vira um cartão com a descrição e onde foi usada. */
function Group({ title, items }: { title: string; items: Tech[] }) {
  const t = useT();
  return (
    <div>
      <h3 className="border-b border-line pb-3 font-mono text-sm text-muted">{title}</h3>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((tech) => {
          return (
            <li key={tech.name} className="flex gap-3 rounded-surface border border-line bg-raised p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-sunken">
                <TechLogo tech={tech} size={22} title={false} />
              </span>
              <div>
                <p className="font-medium">{tech.name}</p>
                <p className="mt-0.5 text-sm text-muted">{t.stack.techs[tech.name]}</p>
                <p className="mt-2 flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-muted">
                  {t.stack.layerLabel}
                  {LAYERS[tech.name].lights.map((i) => (
                    <Chip key={i}>{t.stack.layers[i]}</Chip>
                  ))}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Stack() {
  const t = useT();
  return (
    <section aria-labelledby="stack-title" className="bg-band-sunken px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2
          id="stack-title"
          className="mt-3 max-w-[24ch] text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
        >
          {t.stack.title}
        </h2>
        <p className="mt-4 text-lg text-muted">{t.stack.note}</p>
        {/* Dica de interação do diagrama (só existe no desktop, onde há hover). */}
        <p className="mt-3 hidden font-mono text-sm text-muted lg:block">{t.stack.hint}</p>

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
