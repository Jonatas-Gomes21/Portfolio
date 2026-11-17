"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import "./project-hero.css";

export type GalleryImage = {
  src: string;
  alt: string;
};

export type ProjectHeroProps = {
  brand?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  images?: GalleryImage[];
  navigation?: { label: string; href: string }[];
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  /** Duration of a complete loop in seconds. */
  duration?: number;
  className?: string;
};

const defaultImages: GalleryImage[] = [
  { src: "/gallery/studio.svg", alt: "Landing page de um estúdio criativo, com tipografia lilás" },
  { src: "/gallery/analytics.svg", alt: "Dashboard escuro com gráficos de desempenho" },
  { src: "/gallery/portfolio.svg", alt: "Portfólio editorial com formas botânicas e tons creme" },
  { src: "/gallery/finance.svg", alt: "Dashboard financeiro claro com detalhes em verde" },
  { src: "/gallery/music.svg", alt: "Player de música com capa laranja e controles de áudio" },
  { src: "/gallery/shop.svg", alt: "Loja de objetos de design com uma luminária escultural" },
  { src: "/gallery/newsletter.svg", alt: "Página de newsletter lilás com composição tipográfica" },
  { src: "/gallery/travel.svg", alt: "Página de viagens com uma paisagem montanhosa" },
];

const defaultNavigation = [
  { label: "Componentes", href: "#galeria" },
  { label: "Playground", href: "?demo=input" },
  { label: "Projeto", href: "#sobre" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M7 17 17 7M7 7h10v10" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrandMark() {
  return (
    <svg className="ph-brand-mark" width="27" height="27" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 2v28M2 16h28M6.1 6.1l19.8 19.8M6.1 25.9 25.9 6.1" stroke="currentColor" strokeWidth="5" />
    </svg>
  );
}

export default function ProjectHero({
  brand = "forma.",
  eyebrow = "Um bom começo para sua próxima grande ideia",
  title = (
    <>
      Seu próximo projeto.
      <br />
      Um novo ponto de vista.
    </>
  ),
  description = (
    <>
      Componentes independentes. Possibilidades infinitas.
      <br />
      Dê forma às suas ideias com interfaces que fazem a diferença.
    </>
  ),
  images = defaultImages,
  navigation = defaultNavigation,
  primaryAction = { label: "Explorar componentes", href: "#galeria" },
  secondaryAction = { label: "Abrir playground", href: "?demo=input" },
  duration = 42,
  className = "",
}: ProjectHeroProps) {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 42;
  const columns = Array.from({ length: 5 }, (_, columnIndex) =>
    Array.from({ length: Math.max(3, Math.ceil(images.length / 2)) }, (_, imageIndex) =>
      images[(columnIndex * 2 + imageIndex) % images.length],
    ).filter((item): item is GalleryImage => Boolean(item)),
  );

  return (
    <div className={`project-hero ${light ? "ph-light" : ""} ${className}`}>
      <header className="ph-header">
        <div className="ph-header-inner">
          <a className="ph-brand" href="#sobre" aria-label={`${brand} — início`}>
            <BrandMark />
            <span>{brand}</span>
          </a>
          <nav className="ph-desktop-nav" aria-label="Navegação principal">
            {navigation.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="ph-header-actions">
            <button
              className="ph-theme"
              type="button"
              aria-label={light ? "Ativar tema escuro" : "Ativar tema claro"}
              aria-pressed={light}
              onClick={() => setLight((current) => !current)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 5a7 7 0 0 1 0 14Z" fill="currentColor" />
              </svg>
            </button>
            <a className="ph-header-cta" href={primaryAction.href}>
              Começar um projeto <Arrow diagonal />
            </a>
            <button
              className="ph-menu-toggle"
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="ph-mobile-menu"
              onClick={() => setMenuOpen((current) => !current)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d={menuOpen ? "m6 6 12 12M6 18 18 6" : "M4 8h16M4 16h16"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="ph-mobile-menu" className="ph-mobile-nav" aria-label="Navegação móvel">
            {navigation.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
                <Arrow diagonal />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main className="ph-main">
        <section className="ph-intro" id="sobre" aria-labelledby="ph-title">
          <div className="ph-eyebrow">
            <span />
            {eyebrow}
          </div>
          <h1 id="ph-title">{title}</h1>
          <p className="ph-description">{description}</p>
          <div className="ph-hero-actions">
            <a className="ph-primary" href={primaryAction.href}>
              {primaryAction.label}
              <Arrow diagonal />
            </a>
            <a className="ph-secondary" href={secondaryAction.href}>
              {secondaryAction.label}
              <Arrow />
            </a>
          </div>
          <div className="ph-caption">
            <span className="ph-caption-line" />
            PENSADO NOS DETALHES. FEITO PARA VOCÊ.
            <span className="ph-caption-line" />
          </div>
        </section>

        <section className="ph-gallery" id="galeria" aria-label="Galeria de interfaces em movimento">
          <div className="ph-gallery-viewport">
            <div className="ph-gallery-plane" aria-hidden="true">
              {columns.map((column, columnIndex) => (
                <div
                  className={`ph-column ${columnIndex % 2 ? "ph-column-down" : ""}`}
                  key={columnIndex}
                  style={
                    {
                      "--ph-duration": `${safeDuration + columnIndex * 5}s`,
                      "--ph-delay": `${-columnIndex * 9 - 8}s`,
                    } as CSSProperties
                  }
                >
                  {[0, 1].map((copy) => (
                    <div className="ph-image-group" key={copy}>
                      {column.map((item, index) => (
                        <div className="ph-image-card" key={`${index}-${item.src}`}>
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
          <ul className="ph-sr-only">
            {images.map((image, index) => (
              <li key={`${index}-${image.src}`}>{image.alt}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
