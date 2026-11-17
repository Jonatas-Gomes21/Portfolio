import type { Metadata } from "next";
import ProjectHero from "@/components/project-hero/project-hero";

export const metadata: Metadata = {
  title: "Forma — Seu próximo projeto",
  icons: { icon: { url: "/forma.svg", type: "image/svg+xml" } },
  robots: { index: false, follow: false },
};

/* Não existe rota de playground ainda, então os destinos usam só as âncoras da própria página. */
export default function Page() {
  return (
    <ProjectHero
      navigation={[
        { label: "Componentes", href: "#galeria" },
        { label: "Projeto", href: "#sobre" },
      ]}
      secondaryAction={{ label: "Abrir playground", href: "#galeria" }}
    />
  );
}
