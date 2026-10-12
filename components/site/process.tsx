"use client";

import { useT } from "@/components/providers";
import { Reveal } from "@/components/site/reveal";

/* Verbos grandes, em escada, no lugar de passos numerados. Título fixo à esquerda no desktop. */
export function Process() {
  const t = useT();
  return (
    <section
      aria-labelledby="process-title"
      className="bg-raised px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2
              id="process-title"
              className="text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
            >
              {t.process.title}
            </h2>
          </div>
        </div>

        <ol className="lg:col-span-8">
          {t.process.steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.verb}
              className="grid gap-2 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-baseline md:gap-8"
            >
              <h3
                className="font-display text-4xl font-bold tracking-tight md:text-6xl"
                style={{ paddingLeft: `${i * 0.5}rem` }}
              >
                {s.verb}
              </h3>
              <p className="max-w-[44ch] leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
