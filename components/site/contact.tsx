"use client";

import {
  ChatCircleText,
  DownloadSimple,
  Envelope,
  GithubLogo,
  LinkedinLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { useT } from "@/components/providers";
import { Eyebrow } from "@/components/site/eyebrow";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { links } from "@/lib/content";

export function Contact() {
  const t = useT();
  const channels = [
    { label: t.contact.email, detail: links.email, href: `mailto:${links.email}`, icon: Envelope, external: false },
    { label: t.contact.whatsapp, detail: links.whatsappLabel, href: links.whatsapp, icon: WhatsappLogo, external: true },
    { label: t.contact.linkedin, detail: "jonatasgomes-dev", href: links.linkedin, icon: LinkedinLogo, external: true },
    { label: t.contact.github, detail: "Jonatas-Gomes21", href: links.github, icon: GithubLogo, external: true },
  ];

  return (
    <section
      id="contato"
      aria-labelledby="contact-title"
      className="bg-raised px-5 py-24 md:px-8 md:py-32"
    >
      <Reveal className="mx-auto max-w-6xl">
        <Eyebrow>{t.contact.eyebrow}</Eyebrow>
        <h2
          id="contact-title"
          className="mt-4 max-w-[14ch] text-balance font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-8xl"
        >
          {t.contact.title}
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">{t.contact.text}</p>

        <div className="mt-10">
          <Button asChild size="lg">
            <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
              <ChatCircleText size={22} weight="bold" aria-hidden="true" />
              {t.cta}
              <span className="sr-only"> ({t.contact.newTab})</span>
            </a>
          </Button>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {channels.map(({ label, detail, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full items-center gap-3 rounded-surface border border-line bg-bg px-5 py-4 transition-colors hover:border-ink"
              >
                <Icon size={26} aria-hidden="true" className="shrink-0" />
                <span className="min-w-0">
                  <span className="block font-display font-bold">{label}</span>
                  <span className="block truncate text-sm text-muted">{detail}</span>
                  {external && <span className="sr-only">({t.contact.newTab})</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button asChild variant="outline" size="md">
            <a href={links.resume} target="_blank" rel="noopener noreferrer">
              <DownloadSimple size={20} aria-hidden="true" />
              {t.contact.resume}
              <span className="sr-only"> ({t.contact.newTab})</span>
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
