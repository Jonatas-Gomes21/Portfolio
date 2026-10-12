# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)
- No test runner is configured.

## Next.js version warning

`AGENTS.md` states this is Next.js 16 with breaking changes versus common training data. Before writing Next-specific code, read the relevant guide in `node_modules/next/dist/docs/`. `next.config.ts` enables `cacheComponents`, `partialPrefetching` and `experimental.agentFeedback`, and routes `*.css` through `@tailwindcss/turbopack` (Tailwind v4, no `tailwind.config`; theme lives in `app/globals.css`).

## Architecture

Single-page bilingual (PT/EN) personal portfolio. One route (`app/page.tsx`) renders `components/site/portfolio.tsx`, which composes the section components in `components/site/`.

- **All copy lives in `lib/content.ts`**: a typed `dict` keyed by `Lang` (`"pt" | "en"`), plus shared `links` and `siteUrl` (`NEXT_PUBLIC_SITE_URL`). Add or change text there for both languages; components read it via `useT()`. `app/layout.tsx` metadata/JSON-LD use `dict.pt` only (server always renders PT).
- **Language** (`components/providers.tsx`): stored in `localStorage` through `useSyncExternalStore`. The server renders PT; the client corrects after hydration and updates `<html lang>` and `document.title`. Motion is wrapped in `MotionConfig reducedMotion="user"`.
- **Theme**: dark by default; `[data-theme="light"]` swaps CSS variables in `app/globals.css`. An inline script in `layout.tsx` applies the saved theme before first paint. Colors are exposed to Tailwind as `bg`, `raised`, `sunken`, `line`, `ink`, `muted`, `accent`, `on-accent`, `panel`.
- **Design rules** (documented in `globals.css`): controls are pill-shaped (`--radius-control`), surfaces use `--radius-surface`; a single orange accent, always with dark text on top.
- **Missing-asset handling**: `app/page.tsx` checks on the server which expected files exist in `public/` (`me.jpg`, `me-recorte.png`, each project slide from `dict.pt.projects.items[].slides`) and passes the map down; `components/assets.tsx` (`useAsset`) lets components render a labelled placeholder instead of a broken image. New images referenced from content must go under `public/` (project shots in `public/projects/`).
- UI primitives are shadcn-style (`components.json`, new-york, Phosphor icons, `cn()` in `lib/utils.ts`); `@/*` path alias. `referencias/` holds design reference images, not code.
- Also present: `app/opengraph-image.tsx`, `app/robots.ts`, `app/sitemap.ts`.
