/* Rótulo de seção: barra de destaque (forma, não texto) com texto neutro, para manter contraste AA nos dois temas. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-sm text-muted">
      <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-accent" />
      {children}
    </p>
  );
}
