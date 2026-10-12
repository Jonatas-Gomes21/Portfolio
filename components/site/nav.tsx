"use client";

import { useEffect, useRef, useState } from "react";
import { List, Moon, Sun, X } from "@phosphor-icons/react";
import { useLang, useT } from "@/components/providers";
import { cn } from "@/lib/utils";

const ids = ["inicio", "projetos", "trajetoria", "contato"] as const;

export function Nav() {
  const t = useT();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const labels = [t.nav.home, t.nav.projects, t.nav.path, t.nav.contact];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function toggleTheme() {
    const el = document.documentElement;
    const next = el.dataset.theme === "light" ? "dark" : "light";
    el.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  const linkClass =
    "rounded-control px-4 py-2 text-[0.92rem] text-muted transition-colors hover:text-ink";

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto max-w-4xl">
        <nav
          aria-label={t.nav.label}
          className="flex h-16 items-center justify-between gap-2 rounded-control border border-line bg-panel pl-3 pr-2 backdrop-blur-md md:pl-5"
        >
          <a
            href="#inicio"
            aria-label={t.nav.homeAria}
            className="flex items-center gap-2 rounded-control font-display text-lg font-bold tracking-tight"
          >
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-full bg-accent text-sm font-bold text-on-accent"
            >
              JG
            </span>
            <span className="hidden sm:inline">Jonatas</span>
          </a>

          <ul className="hidden items-center md:flex">
            {ids.map((id, i) => (
              <li key={id}>
                <a href={`#${id}`} className={linkClass}>
                  {labels[i]}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <div
              role="group"
              aria-label={t.nav.langLabel}
              className="flex items-center rounded-control border border-line p-0.5 font-mono text-xs"
            >
              {(["pt", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  lang={l === "pt" ? "pt-BR" : "en"}
                  aria-pressed={lang === l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "rounded-control px-2.5 py-1.5 uppercase transition-colors",
                    lang === l
                      ? "bg-accent text-on-accent"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t.nav.themeLabel}
              className="grid size-10 place-items-center rounded-control text-muted transition-colors hover:text-ink"
            >
              <Moon size={20} className="theme-icon-moon" aria-hidden="true" />
              <Sun size={20} className="theme-icon-sun" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-control text-ink md:hidden"
            >
              {open ? <X size={22} aria-hidden="true" /> : <List size={22} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {open && (
          <div
            id="menu-mobile"
            ref={menuRef}
            className="mt-2 rounded-surface border border-line bg-panel p-2 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col">
              {ids.map((id, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-control px-4 py-3 text-base text-ink hover:bg-raised"
                  >
                    {labels[i]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
