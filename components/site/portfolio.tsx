"use client";

import { AssetsProvider } from "@/components/assets";
import { Providers, useT } from "@/components/providers";
import { About } from "@/components/site/about";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { Nav } from "@/components/site/nav";
import { Process } from "@/components/site/process";
import { Projects } from "@/components/site/projects";
import { Services } from "@/components/site/services";
import { Stack } from "@/components/site/stack";
import { TechMarquee } from "@/components/site/tech-marquee";
import { Timeline } from "@/components/site/timeline";

function SkipLink() {
  const t = useT();
  return (
    <a
      href="#conteudo"
      className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-control bg-accent px-5 py-3 font-medium text-on-accent focus:translate-y-0"
    >
      {t.skip}
    </a>
  );
}

export function Portfolio({ available }: { available: Record<string, boolean> }) {
  return (
    <AssetsProvider value={available}>
      <Providers>
        <SkipLink />
        <Nav />
        <main id="conteudo">
          <Hero />
          <TechMarquee />
          <Projects />
          <Stack />
          <Services />
          <Process />
          <Timeline />
          <About />
          <Contact />
        </main>
        <Footer />
      </Providers>
    </AssetsProvider>
  );
}
