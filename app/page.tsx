import fs from "node:fs";
import path from "node:path";
import { Portfolio } from "@/components/site/portfolio";
import { dict } from "@/lib/content";

/* Arquivos esperados em /public. O que não existir vira um espaço marcado na página. */
const expected = [
  "me.jpeg",
  ...dict.pt.projects.items.flatMap((p) => p.slides.map((s) => `projects/${s.file}`)),
];

export default function Page() {
  const available = Object.fromEntries(
    expected.map((file) => [file, fs.existsSync(path.join(process.cwd(), "public", file))]),
  );
  return <Portfolio available={available} />;
}
