import {
  siExpress,
  siFastify,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siShadcnui,
  siTailwindcss,
  siTypescript,
  siVite,
} from "simple-icons";

/* Logos reais do Simple Icons, todos em monocromático para não competir com o destaque. */
export const techs = [
  { name: "TypeScript", icon: siTypescript },
  { name: "React", icon: siReact },
  { name: "Vite", icon: siVite },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "shadcn/ui", icon: siShadcnui },
  { name: "Next.js", icon: siNextdotjs },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Fastify", icon: siFastify },
  { name: "Express", icon: siExpress },
  { name: "Prisma", icon: siPrisma },
  { name: "PostgreSQL", icon: siPostgresql },
] as const;

export type Tech = (typeof techs)[number];

export function TechLogo({
  tech,
  size = 32,
  title = true,
  className,
}: {
  tech: Tech;
  size?: number;
  title?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-label={title ? tech.name : undefined}
      aria-hidden={title ? undefined : true}
      fill="currentColor"
      className={className}
    >
      {title && <title>{tech.name}</title>}
      <path d={tech.icon.path} />
    </svg>
  );
}
