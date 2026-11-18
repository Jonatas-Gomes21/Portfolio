"use client";

import { useRef } from "react";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/*
 * Hero Parallax (Aceternity UI), adaptado ao site: o cabeçalho vem de fora, os cards são
 * responsivos, usam os tokens do tema e há uma versão estática para prefers-reduced-motion.
 * Três fileiras de 5 cards (proporção 5:4, a mesma das telas, sem corte) deslizam em sentidos opostos conforme a rolagem e o conjunto se
 * endireita (rotateX/rotateZ) nos primeiros 20% do percurso. A altura segue o conteúdo (cabeçalho + fileiras)
 * e o grid termina logo abaixo do cabeçalho (translateY final 60), sem vão.
 */
export type ParallaxProduct = {
  title: string;
  link: string;
  thumbnail: string;
};

export function HeroParallax({
  products,
  header,
}: {
  products: ParallaxProduct[];
  header: React.ReactNode;
}) {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.35, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 60]), springConfig);

  /* Sem movimento: cabeçalho e uma grade simples, sem a altura de 300vh. */
  if (reduce) {
    return (
      <div className="relative">
        {header}
        <ul className="mx-auto grid max-w-6xl gap-5 px-5 pb-16 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
          {products.slice(0, 6).map((product, i) => (
            <li key={`${product.title}-${i}`}>
              <a href={product.link} target="_blank" rel="noopener noreferrer" className="block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  width="600"
                  height="400"
                  className="aspect-[3/2] w-full rounded-surface border border-line object-cover object-left-top"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative flex flex-col self-auto overflow-hidden pb-24 pt-12 antialiased [perspective:1000px] [transform-style:preserve-3d] md:pb-40 md:pt-24"
    >
      {header}
      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        <motion.div className="mb-10 flex flex-row-reverse space-x-10 space-x-reverse md:mb-20 md:space-x-20">
          {firstRow.map((product, i) => (
            <ProductCard key={`${product.title}-${i}`} product={product} translate={translateX} />
          ))}
        </motion.div>
        <motion.div className="mb-10 flex flex-row space-x-10 md:mb-20 md:space-x-20">
          {secondRow.map((product, i) => (
            <ProductCard key={`${product.title}-${i}`} product={product} translate={translateXReverse} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-10 space-x-reverse md:space-x-20">
          {thirdRow.map((product, i) => (
            <ProductCard key={`${product.title}-${i}`} product={product} translate={translateX} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function ProductCard({
  product,
  translate,
}: {
  product: ParallaxProduct;
  translate: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product relative h-[230px] w-72 shrink-0 overflow-hidden rounded-surface border border-line md:h-96 md:w-[30rem]"
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={product.title}
        className="block h-full w-full group-hover/product:shadow-2xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          alt=""
          width="600"
          height="600"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-left-top"
        />
      </a>
      <div className="pointer-events-none absolute inset-0 bg-black opacity-0 group-hover/product:opacity-80" />
      <h3 className="pointer-events-none absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover/product:opacity-100">
        {product.title}
      </h3>
    </motion.div>
  );
}
