"use client";
import { useT } from "@/components/providers";
import { Reveal } from "@/components/site/reveal";
import { techs, TechLogo, type Tech } from "@/components/site/tech-logos";

const byName = (n: string) => techs.find((t) => t.name === n) as Tech;
const frontend = ["TypeScript", "React", "Vite", "Tailwind CSS", "shadcn/ui", "Next.js"].map(byName);
const backend = ["Node.js", "Fastify", "Express", "Prisma", "PostgreSQL"].map(byName);

const CX = 500;
const CY = 392;
const placed = [
  ...frontend.map((tech, i) => ({ tech, x: 62 + i * 80 })),
  ...backend.map((tech, i) => ({ tech, x: 562 + i * 90 })),
];

/* Versão simples do bloco convergente: as peças da stack descem até um único ponto, o projeto. Sem órbitas. */
function Diagram() {
  const t = useT();

  return (
    <svg
      viewBox="0 0 1000 450"
      className="hidden w-full text-ink lg:block"
      role="img"
      aria-label={`${t.stack.frontend}: ${frontend.map((f) => f.name).join(", ")}. ${t.stack.backend}: ${backend.map((f) => f.name).join(", ")}. ${t.stack.center}.`}
    >
      <g fontFamily="var(--font-mono)" fontSize="13" fill="var(--ink-muted)">
        <text x="262" y="22" textAnchor="middle">{t.stack.frontend}</text>
        <text x="742" y="22" textAnchor="middle">{t.stack.backend}</text>
      </g>
      <line x1="30" y1="36" x2="490" y2="36" stroke="var(--line)" />
      <line x1="530" y1="36" x2="970" y2="36" stroke="var(--line)" />

      {placed.map(({ tech, x }) => (
        <path
          key={tech.name}
          d={`M ${x} 150 C ${x} 270, ${CX} 250, ${CX} ${CY - 26}`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeOpacity="0.9"
        />
      ))}

      {placed.map(({ tech, x }) => (
        <g key={tech.name}>
          <circle cx={x} cy={86} r={30} fill="var(--bg-raised)" stroke="var(--line)" />
          <svg x={x - 14} y={72} width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d={tech.icon.path} />
          </svg>
          <text x={x} y={138} textAnchor="middle" fontFamily="var(--font-body)" fontSize="13" fill="var(--ink)">
            {tech.name}
          </text>
        </g>
      ))}

      <rect x={CX - 78} y={CY - 26} width="156" height="52" rx="26" fill="var(--accent)" />
      <text x={CX} y={CY + 6} textAnchor="middle" fontFamily="var(--font-display)" fontWeight="700" fontSize="18" fill="var(--on-accent)">
        {t.stack.center}
      </text>
    </svg>
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
