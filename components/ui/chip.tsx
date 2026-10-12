import * as React from "react";
import { cn } from "@/lib/utils";

/* Chip de tecnologia: é um controle visual, então segue a regra da pílula. */
export function Chip({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-control border border-line px-3 py-1 font-mono text-[0.78rem] text-ink",
        className,
      )}
      {...props}
    />
  );
}
