"use client";

import { useT } from "@/components/providers";
import { links } from "@/lib/content";

export function Footer() {
  const t = useT();
  const nav = [
    ["#inicio", t.nav.home],
    ["#projetos", t.nav.projects],
    ["#trajetoria", t.nav.path],
    ["#contato", t.nav.contact],
  ];
  const linkClass = "text-muted transition-colors hover:text-ink";

  return (
    <footer className="border-t border-line bg-sunken px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-display text-2xl font-bold tracking-tight">Jonatas Gomes</p>
          <p className="mt-2 max-w-[36ch] text-muted">{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.footer.navTitle} className="md:col-span-3">
          <h2 className="font-mono text-sm text-muted">{t.footer.navTitle}</h2>
          <ul className="mt-4 space-y-2">
            {nav.map(([href, label]) => (
              <li key={href}>
                <a href={href} className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-mono text-sm text-muted">{t.footer.contactTitle}</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={`mailto:${links.email}`} className={`${linkClass} break-all`}>
                {links.email}
              </a>
            </li>
            <li>
              <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp
              </a>
            </li>
            <li>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-14 max-w-6xl border-t border-line pt-6 text-sm text-muted">
        {t.footer.rights}
      </p>
    </footer>
  );
}
