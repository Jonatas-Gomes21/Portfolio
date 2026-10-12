"use client";

import { useT } from "@/components/providers";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

/* Linha central com pontos e itens alternando de lado no desktop. Abaixo de 768 px a linha vai para a esquerda e tudo empilha. */
export function Timeline() {
  const t = useT();
  return (
    <section
      id="trajetoria"
      aria-labelledby="timeline-title"
      className="bg-sunken px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="timeline-title"
          className="text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
        >
          {t.timeline.title}
        </h2>

        <ol className="relative mt-16">
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-1/2 md:-translate-x-1/2"
          />
          {t.timeline.items.map((item, i) => {
            const right = i % 2 === 1;
            return (
              <Reveal
                as="li"
                key={item.title}
                className="relative grid pb-14 pl-9 last:pb-0 md:grid-cols-2 md:gap-16 md:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 size-[15px] rounded-full border-[3px] border-sunken bg-accent ring-1 ring-accent md:left-1/2 md:-translate-x-1/2"
                />
                <div
                  className={cn(
                    right ? "md:col-start-2" : "md:col-start-1 md:text-right",
                  )}
                >
                  <p className="font-mono text-sm text-muted">
                    {item.kind} · {item.period}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-lg">{item.place}</p>
                  <p className="mt-2 text-muted">{item.detail}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
