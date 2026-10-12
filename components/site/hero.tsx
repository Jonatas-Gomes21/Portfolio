"use client";

import { motion } from "motion/react";
import { ArrowDown, ChatCircleText } from "@phosphor-icons/react";
import { useT } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Typing } from "@/components/site/typing";
import { LightRays } from "@/components/ui/light-rays";

export function Hero() {
  const t = useT();

  return (
    <section
      id="inicio"
      className="relative bg-bg px-5 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40"
    >
      <LightRays aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl text-center">
        <div>
          <Typing text={t.hero.typed} />
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="mt-5 text-balance font-display text-[1.45rem] max-[340px]:text-[1.2rem] font-bold leading-[1.1] tracking-tight min-[400px]:text-[1.85rem] sm:text-4xl md:text-5xl sm:leading-[1.05] lg:text-[2.75rem] xl:text-[3.3rem]"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.08 }}
            className="mx-auto mt-6 max-w-[46ch] text-lg leading-relaxed text-muted"
          >
            {t.hero.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.16 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Button asChild size="lg">
              <a href="#contato">
                <ChatCircleText size={22} weight="bold" aria-hidden="true" />
                {t.cta}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#projetos">
                {t.hero.secondary}
                <ArrowDown size={20} aria-hidden="true" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
