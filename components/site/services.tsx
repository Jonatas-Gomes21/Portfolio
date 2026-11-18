"use client";

import { useState } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { useT } from "@/components/providers";
import { Reveal } from "@/components/site/reveal";
import { techs, TechLogo } from "@/components/site/tech-logos";
import { Chip } from "@/components/ui/chip";

function LogoList({ names }: { names: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
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

type Item = { title: string; text: string; list: string[] };

/* Uma linha do acordeão: título enorme sempre visível; texto e tecnologias expandem abaixo. A altura anima via grid-template-rows (0fr → 1fr). */
function Row({
  n,
  item,
  open,
  onToggle,
  delay,
  asChips,
}: {
  n: number;
  item: Item;
  open: boolean;
  onToggle: () => void;
  delay: number;
  asChips?: boolean;
}) {
  const panelId = `service-panel-${n}`;
  const Icon = open ? Minus : Plus;

  return (
    <Reveal delay={delay} className="border-b border-line first:border-t">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-center gap-5 py-7 text-left md:gap-10 md:py-10"
        >
          <span className="w-8 font-display text-sm font-bold text-muted md:w-12 md:text-base">
            {String(n).padStart(2, "0")}
          </span>
          <span
            className={`flex-1 font-display text-4xl font-bold tracking-tight transition-colors md:text-7xl ${
              open ? "text-ink" : "text-muted group-hover:text-ink"
            }`}
          >
            {item.title}
          </span>
          <span
            aria-hidden
            className={`flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors md:size-12 ${
              open
                ? "border-transparent bg-accent text-on-accent"
                : "border-line text-muted group-hover:border-ink group-hover:text-ink"
            }`}
          >
            <Icon size={20} weight="bold" />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-label={item.title}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-10 pl-13 md:pb-12 md:pl-22">
            <p className="max-w-[56ch] text-lg leading-relaxed text-muted">{item.text}</p>
            <div className="mt-6">
              {asChips ? (
                <ul className="flex flex-wrap gap-2">
                  {item.list.map((l) => (
                    <li key={l}>
                      <Chip>{l}</Chip>
                    </li>
                  ))}
                </ul>
              ) : (
                <LogoList names={item.list} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* Acordeão grande (site → API → sistema, na ordem do título). Um item aberto por vez; começa com o primeiro aberto. */
export function Services() {
  const t = useT();
  const [sites, systems, apis] = t.services.items;
  const [open, setOpen] = useState<number | null>(0);

  const rows: { item: Item; asChips?: boolean }[] = [
    { item: sites, asChips: true },
    { item: apis },
    { item: systems },
  ];

  return (
    <section
      aria-labelledby="services-title"
      className="bg-band px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="services-title"
          className="max-w-[22ch] text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
        >
          {t.services.title}
        </h2>

        <div className="mt-14">
          {rows.map(({ item, asChips }, i) => (
            <Row
              key={i}
              n={i + 1}
              item={item}
              asChips={asChips}
              delay={i * 0.08}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
