"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Poppins } from "next/font/google";
import { useT } from "@/components/providers";
import "./hero-vision.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-poppins",
  display: "swap",
});

/* ---- Geometria do anel 3D (a câmera fica no centro do cilindro, então cada card encara a câmera) ---- */
const N = 37; // cards
const STEP = 360 / N; // passo angular
const R = 891; // raio = perspectiva
const CULL = 42; // acima disso (graus) o card some: só a frente do anel aparece
const FADE = 16; // faixa (graus) antes do CULL em que o card esmaece até sumir
const SPEED = 1.9; // graus por segundo

/* ---- Escala da tela de design ---- */
const CW = 1172; // largura de design
const TAB_MAX = 1080;
const TAB_MIN = 701;
const DW_MIN = 920;
const PHONE_MAX = 700;

/* Posiciona os cards. Ângulo com sinal em -180..180; fora de ±CULL fica oculto. */
function placeCards(cards: (HTMLDivElement | null)[], phase: number) {
  for (let i = 0; i < cards.length; i++) {
    const el = cards[i];
    if (!el) continue;
    const a = ((((i * STEP + phase) % 360) + 540) % 360) - 180;
    if (Math.abs(a) > CULL) {
      el.style.visibility = "hidden";
      continue;
    }
    el.style.visibility = "visible";
    // esmaece nas pontas do anel em vez de sumir de repente
    el.style.opacity = String(Math.min(1, (CULL - Math.abs(a)) / FADE));
    const r = (a * Math.PI) / 180;
    const c = Math.cos(r);
    el.style.transform = `translate3d(${R * Math.sin(r)}px,0,${R * (1 - c)}px) rotateY(${-a}deg)`;
    // bordas escurecem, frente fica mais viva
    el.style.filter = `brightness(${0.84 + 0.5 * (1 / c - 1)})`;
  }
}

/* Estrelas: uma lista gigante de box-shadow num div de 1x1px. Gerada no cliente (Math.random). */
function starShadow(count: number, blur: number, aMin: number, aMax: number) {
  return Array.from({ length: count }, () => {
    const a = (aMin + Math.random() * (aMax - aMin)).toFixed(2);
    return `${(Math.random() * 100).toFixed(2)}vw ${(Math.random() * 100).toFixed(2)}vh ${blur}px 0 rgba(255,255,255,${a})`;
  }).join(",");
}

/* Telas de celular (390x900, mesma proporção do card) dos dois projetos, intercaladas para que
   dois cards vizinhos nunca sejam do mesmo site. Arquivos em /public/projects/ring. */
const RING = [
  { src: "/projects/ring/amigo-1.jpg", project: "Amigo Pet" },
  { src: "/projects/ring/fl23-1.jpg", project: "FL23 Barbearia" },
  { src: "/projects/ring/amigo-2.jpg", project: "Amigo Pet" },
  { src: "/projects/ring/fl23-2.jpg", project: "FL23 Barbearia" },
  { src: "/projects/ring/amigo-3.jpg", project: "Amigo Pet" },
  { src: "/projects/ring/fl23-3.jpg", project: "FL23 Barbearia" },
  { src: "/projects/ring/amigo-4.jpg", project: "Amigo Pet" },
  { src: "/projects/ring/fl23-4.jpg", project: "FL23 Barbearia" },
  { src: "/projects/ring/amigo-5.jpg", project: "Amigo Pet" },
  { src: "/projects/ring/fl23-5.jpg", project: "FL23 Barbearia" },
  { src: "/projects/ring/amigo-6.jpg", project: "Amigo Pet" },
  { src: "/projects/ring/fl23-6.jpg", project: "FL23 Barbearia" },
  { src: "/projects/ring/amigo-7.jpg", project: "Amigo Pet" },
  { src: "/projects/ring/fl23-7.jpg", project: "FL23 Barbearia" },
];

export function HeroVision() {
  const t = useT();

  const stageRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const starARef = useRef<HTMLDivElement>(null);
  const starBRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const phaseRef = useRef(-2);
  const [ready, setReady] = useState(false);

  /* Escala: k = min(vw/W, vh/700). 700 (acima dos 657 da tela de design, com folga para o recuo do topo e o anel maior) mantém o card do anel
     inteiro na tela, sem sangrar pela borda de baixo. */
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const fit = () => {
      const vw = stage.clientWidth;
      const vh = stage.clientHeight;
      if (vw <= PHONE_MAX) {
        // celular: coluna em fluxo normal, sem escala
        canvas.style.removeProperty("--k");
        canvas.style.removeProperty("top");
        return;
      }
      // tablet: a janela de design estreita para o texto não encolher junto com a tela; contínua em 1080
      let W = vw >= TAB_MAX ? CW : DW_MIN + ((vw - TAB_MIN) * (CW - DW_MIN)) / (TAB_MAX - TAB_MIN);
      if (vh > vw * 1.15) W = Math.min(W, 900);
      const k = Math.min(vw / W, vh / 700);
      // a Nav fixa do site ocupa o topo: empurra a composição para o selo (y=95) nunca ficar sob ela
      const offset = Math.max(0, 100 - 95 * k);
      canvas.style.setProperty("--k", String(k));
      canvas.style.top = `${offset}px`;
    };

    fit();
    setReady(true);
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  /* Estrelas */
  useEffect(() => {
    if (starARef.current) starARef.current.style.boxShadow = starShadow(150, 0, 0.05, 0.3);
    if (starBRef.current) starBRef.current.style.boxShadow = starShadow(18, 1.2, 0.35, 0.7);
  }, []);

  /* Rotação contínua do anel; congela com prefers-reduced-motion (ainda renderiza, só não gira). */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    placeCards(cardsRef.current, phaseRef.current);
    if (reduce) return;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, 0.1); // limita o salto após aba em segundo plano
      last = now;
      phaseRef.current -= SPEED * dt;
      placeCards(cardsRef.current, phaseRef.current);
      raf = requestAnimationFrame(tick);
    };
    const onVis = () => {
      last = 0; // a aba voltou: não pula o tempo que passou
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <section
      id="inicio"
      ref={stageRef}
      data-ready={ready ? "" : undefined}
      className={`hv ${poppins.variable}`}
      aria-label={t.hero.typed}
    >
      <div className="hv-bg" />
      <div className="hv-stars" ref={starARef} aria-hidden="true" />
      <div className="hv-stars" ref={starBRef} aria-hidden="true" />

      <div className="hv-canvas" ref={canvasRef}>
        <div className="hv-stack">
          <div className="hv-badge hv-in" style={{ "--d": "270ms" } as React.CSSProperties}>
            <i aria-hidden="true">
              <svg viewBox="5 1 14 22" preserveAspectRatio="none" fill="rgba(16,112,152,.72)" stroke="rgba(190,236,255,.6)" strokeWidth="1.6" strokeLinejoin="round">
                <path d="M13.9 1.6 5.5 13.6a.7.7 0 0 0 .6 1.1h4.2l-1 7.7a.7.7 0 0 0 1.25.55l8.3-12.1a.7.7 0 0 0-.6-1.1h-4.2l1-7.7a.7.7 0 0 0-1.25-.55Z" />
              </svg>
            </i>
            <b>{t.hero.typed}</b>
          </div>

          <h1 className="hv-h1 hv-in" style={{ "--d": "380ms" } as React.CSSProperties}>
            {t.hero.title}
          </h1>
          <p className="hv-sub hv-in" style={{ "--d": "690ms" } as React.CSSProperties}>
            {t.hero.sub}
          </p>

          <div className="hv-ctas hv-in" style={{ "--d": "830ms" } as React.CSSProperties}>
            <a className="hv-btn" href="#contato">
              <span>{t.cta}</span>
            </a>
            <a className="hv-btn ghost" href="#projetos">
              <span>{t.hero.secondary}</span>
            </a>
          </div>
        </div>

        <div className="hv-showcase">
          {/* Anel decorativo: 37 cards ciclando pelas 14 telas de celular dos projetos */}
          <div className="hv-ring hv-in" style={{ "--d": "700ms" } as React.CSSProperties} aria-hidden="true">
            {Array.from({ length: N }, (_, i) => {
              const s = RING[i % RING.length];
              return (
                <div
                  key={i}
                  className="hv-card"
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                >
                  <div className="ph" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={s.src}
                    draggable={false}
                    decoding="async"
                    onError={(e) => e.currentTarget.parentElement?.classList.add("broken")}
                  />
                  <div className="shade" />
                  <span className="chip">{s.project}</span>
                  <div className="edge" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
