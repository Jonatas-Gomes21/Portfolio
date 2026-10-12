"use client";

import Image from "next/image";
import { useT } from "@/components/providers";
import { useAsset } from "@/components/assets";
import { Reveal } from "@/components/site/reveal";

export function About() {
  const t = useT();
  const hasPhoto = useAsset("me.jpeg");

  return (
    <section
      aria-labelledby="about-title"
      className="bg-bg px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-5">
          {hasPhoto ? (
            <Image
              src="/me.jpeg"
              alt={t.about.photoAlt}
              width={3024}
              height={4032}
              sizes="(min-width: 768px) 440px, 100vw"
              className="aspect-[4/5] w-full rounded-surface border border-line object-cover"
            />
          ) : (
            <div className="grid aspect-[4/5] w-full place-items-center rounded-surface border border-dashed border-line bg-raised p-6 text-center">
              <p className="font-mono text-sm text-muted">
                {t.about.photoMissing}: /public/me.jpeg
              </p>
            </div>
          )}
        </Reveal>

        <div className="md:col-span-7">
          <h2
            id="about-title"
            className="text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
          >
            {t.about.title}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed">
            {t.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-surface border border-line bg-line sm:grid-cols-2">
            {t.about.facts.map((f) => (
              <div key={f.label} className="bg-raised p-6">
                <dt className="font-display text-xl font-bold">{f.label}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
