"use client";

import type { CSSProperties } from "react";
import { useAvailableAssets } from "@/components/assets";
import { useT } from "@/components/providers";
import "./hero-gallery.css";

const COLUMNS = 5;
const DURATION = 42;

/* Usa as capturas dos projetos que existem em /public/projects. */
export function HeroGallery() {
  const t = useT();
  const available = useAvailableAssets();

  const images = t.projects.items
    .flatMap((p) => p.slides)
    .filter((s) => available[`projects/${s.file}`])
    .filter((s, i, all) => all.findIndex((o) => o.file === s.file) === i)
    .map((s) => ({ src: `/projects/${s.file}`, alt: s.alt }));

  if (images.length === 0) return null;

  const columns = Array.from({ length: COLUMNS }, (_, c) =>
    Array.from({ length: Math.max(3, Math.ceil(images.length / 2)) }, (_, i) => images[(c * 2 + i) % images.length]),
  );

  return (
    <div className="hg">
      <div className="hg-viewport">
        <div className="hg-plane" aria-hidden="true">
          {columns.map((column, c) => (
            <div
              key={c}
              className={`hg-column ${c % 2 ? "hg-column-down" : ""}`}
              style={{ "--hg-duration": `${DURATION + c * 5}s`, "--hg-delay": `${-c * 9 - 8}s` } as CSSProperties}
            >
              {[0, 1].map((copy) => (
                <div className="hg-group" key={copy}>
                  {column.map((item, i) => (
                    <div className="hg-card" key={`${i}-${item.src}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.src} alt="" width="640" height="440" draggable={false} decoding="async" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <ul className="hg-sr">
        {images.map((image) => (
          <li key={image.src}>{image.alt}</li>
        ))}
      </ul>
    </div>
  );
}
