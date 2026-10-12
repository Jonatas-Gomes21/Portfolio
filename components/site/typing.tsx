"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/* Digitação leve: aparece uma vez por idioma, só para dar vida à linha de apresentação. O texto completo fica no HTML para leitores de tela. */
export function Typing({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, 45);
    return () => {
      clearInterval(id);
      setCount(0);
    };
  }, [text, reduce]);

  const shown = reduce ? text : text.slice(0, count);

  return (
    <p className="font-mono text-[0.8rem] text-muted sm:text-sm md:text-base">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        <span className="text-accent">&gt;</span> {shown}
        <span className="caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-accent" />
      </span>
    </p>
  );
}
