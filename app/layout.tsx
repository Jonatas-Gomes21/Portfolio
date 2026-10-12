import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { dict, links, siteUrl } from "@/lib/content";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const pt = dict.pt.meta;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: pt.title,
  description: pt.description,
  applicationName: "Jonatas Gomes",
  authors: [{ name: "Jonatas Gomes", url: links.github }],
  creator: "Jonatas Gomes",
  keywords: [
    "desenvolvedor full stack",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Lauro de Freitas",
    "Bahia",
    "freelancer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Jonatas Gomes",
    title: pt.title,
    description: pt.description,
    locale: "pt_BR",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: pt.title,
    description: pt.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0e10" },
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
  ],
};

/* Aplica o tema salvo antes da primeira pintura, para não piscar. O padrão é escuro. */
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jonatas Gomes",
  alternateName: "Jhon",
  jobTitle: "Full stack developer",
  email: `mailto:${links.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lauro de Freitas",
    addressRegion: "BA",
    addressCountry: "BR",
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: "UNIFACS" },
  sameAs: [links.github, links.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
