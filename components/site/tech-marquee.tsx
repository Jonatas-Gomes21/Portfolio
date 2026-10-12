"use client";

import { useT } from "@/components/providers";
import { techs, TechLogo } from "@/components/site/tech-logos";
import { Marquee } from "@/components/ui/marquee";

/* Único marquee da página: só logos. Pausa no hover e vira grade estática com movimento reduzido. */
export function TechMarquee() {
  const t = useT();

  return (
    <section
      aria-label={t.tech.label}
      className="border-y border-line bg-sunken py-10"
    >
      <ul className="sr-only">
        {techs.map((tech) => (
          <li key={tech.name}>{tech.name}</li>
        ))}
      </ul>
      <Marquee
        pauseOnHover
        aria-hidden="true"
        className="marquee [--duration:18s] [--gap:4rem]"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        {techs.map((tech) => (
          <div key={tech.name} className="text-muted transition-colors hover:text-ink">
            <TechLogo tech={tech} size={40} title={false} />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
