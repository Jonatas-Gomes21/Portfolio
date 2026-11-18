"use client";

import { useEffect, useRef } from "react";

/* Estrelas: uma lista gigante de box-shadow num div de 1x1px (Math.random, então só no cliente). */
function starShadow(count: number, blur: number, aMin: number, aMax: number) {
  return Array.from({ length: count }, () => {
    const a = (aMin + Math.random() * (aMax - aMin)).toFixed(2);
    return `${(Math.random() * 100).toFixed(2)}vw ${(Math.random() * 100).toFixed(2)}vh ${blur}px 0 rgba(255,255,255,${a})`;
  }).join(",");
}

/* Fundo global do site (o mesmo do hero). O visual vem de .site-bg em globals.css; some no tema claro. */
export function SiteBackground() {
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (a.current) a.current.style.boxShadow = starShadow(150, 0, 0.05, 0.3);
    if (b.current) b.current.style.boxShadow = starShadow(18, 1.2, 0.35, 0.7);
  }, []);

  return (
    <div className="site-bg" aria-hidden="true">
      <div className="site-stars" ref={a} />
      <div className="site-stars" ref={b} />
    </div>
  );
}
