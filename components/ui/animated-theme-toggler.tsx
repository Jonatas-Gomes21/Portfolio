"use client";

import { useCallback, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/*
 * Alternador de tema animado (Magic UI, animated-theme-toggler), adaptado a este projeto:
 * - o tema vive em `data-theme` no <html> (não em class "dark") e é salvo em localStorage["theme"];
 * - ícones Phosphor, e os dois ficam no HTML com a escolha feita por CSS (.theme-icon-*), sem salto na hidratação;
 * - só a variante "circle": a nova aparência se expande em círculo a partir do botão.
 * Sem View Transitions API, ou com movimento reduzido, o tema troca na hora.
 */

type Props = Omit<React.ComponentPropsWithoutRef<"button">, "onClick"> & {
  duration?: number;
  iconSize?: number;
};

export function AnimatedThemeToggler({ className, duration = 500, iconSize = 20, ...props }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => () => animRef.current?.cancel(), []);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const button = buttonRef.current;
    if (!button || busyRef.current) return;

    const apply = () => {
      const next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof document.startViewTransition !== "function") {
      apply();
      return;
    }

    // Porcentagens sobre a caixa de referência do snapshot (evita erro de escala em telas fracionadas).
    const w = window.innerWidth;
    const h = window.innerHeight;
    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
    const at = `${(x / w) * 100}% ${(y / h) * 100}%`;
    const radius = (r: number) => `${(r / (Math.hypot(w, h) / Math.SQRT2)) * 100}%`;
    const clipPath = [`circle(0% at ${at})`, `circle(${radius(maxRadius)} at ${at})`];

    busyRef.current = true;
    root.dataset.themeVt = "active";
    root.style.setProperty("--theme-vt-clip-from", clipPath[0]);

    const transition = document.startViewTransition(() => {
      flushSync(apply);
    });

    const cleanup = () => {
      busyRef.current = false;
      delete root.dataset.themeVt;
      root.style.removeProperty("--theme-vt-clip-from");
      animRef.current?.cancel();
      animRef.current = null;
    };
    transition.finished.finally(cleanup).catch(() => {});

    transition.ready
      .then(() => {
        animRef.current = root.animate(
          { clipPath },
          { duration, easing: "ease-in-out", fill: "forwards", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  }, [duration]);

  return (
    <button type="button" ref={buttonRef} onClick={toggle} className={cn(className)} {...props}>
      <Moon size={iconSize} className="theme-icon-moon" aria-hidden="true" />
      <Sun size={iconSize} className="theme-icon-sun" aria-hidden="true" />
    </button>
  );
}
