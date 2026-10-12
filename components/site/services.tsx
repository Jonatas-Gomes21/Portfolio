"use client";

import Image from "next/image";
import { useT } from "@/components/providers";
import { useAsset } from "@/components/assets";
import { Reveal } from "@/components/site/reveal";
import { techs, TechLogo } from "@/components/site/tech-logos";
import { Chip } from "@/components/ui/chip";

function LogoList({ names }: { names: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {names.map((name) => {
        const tech = techs.find((t) => t.name === name);
        return (
          <li
            key={name}
            className="flex items-center gap-2 rounded-control border border-line px-3 py-1.5 text-sm"
          >
            {tech && <TechLogo tech={tech} size={16} title={false} />}
            {name}
          </li>
        );
      })}
    </ul>
  );
}

/* Layout editorial assimétrico: um item principal que ocupa duas linhas e dois itens menores empilhados. Cada célula tem tom e conteúdo próprios. */
export function Services() {
  const t = useT();
  const [sites, systems, apis] = t.services.items;
  const shot = t.projects.items[0].slides[0];
  const hasShot = useAsset(`projects/${shot.file}`);

  return (
    <section
      aria-labelledby="services-title"
      className="bg-bg px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="services-title"
          className="max-w-[22ch] text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
        >
          {t.services.title}
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-surface border border-line bg-line md:grid-cols-12 md:grid-rows-2">
          <Reveal className="flex flex-col justify-between gap-10 bg-raised p-8 md:col-span-7 md:row-span-2 md:p-12">
            <h3 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
              {sites.title}
            </h3>
            {hasShot && (
              <Image
                src={`/projects/${shot.file}`}
                alt={shot.alt}
                width={1365}
                height={679}
                sizes="(min-width: 768px) 560px, 100vw"
                className="aspect-[16/8] w-full rounded-surface border border-line object-cover object-top"
              />
            )}
            <div>
              <p className="max-w-[44ch] text-lg leading-relaxed text-muted">{sites.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {sites.list.map((l) => (
                  <li key={l}>
                    <Chip>{l}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="bg-bg p-8 md:col-span-5 md:p-10">
            <h3 className="font-display text-3xl font-bold tracking-tight">{systems.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{systems.text}</p>
            <LogoList names={systems.list} />
          </Reveal>

          <Reveal delay={0.16} className="bg-sunken p-8 md:col-span-5 md:p-10">
            <h3 className="font-display text-3xl font-bold tracking-tight">{apis.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{apis.text}</p>
            <LogoList names={apis.list} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
