# src/CLAUDE.md — Next.js Application Conventions

## Stack

- **Framework:** Next.js 16.1 with App Router and Turbopack
- **Styling:** Tailwind CSS 4 with CSS custom properties
- **Components:** shadcn/ui (base-nova style, Lucide icons)
- **Fonts:** Geist Sans (body) + Geist Mono (code), loaded via `next/font/google`
- **Linting:** Biome 2.4.7 (run from repo root: `pnpm biome check src/`)
- **Package manager:** pnpm (run from `src/` for app dependencies)

## Conventions

### Routing and Components

- App Router with file-based routing in `app/`
- Server Components by default. Add `"use client"` only when the component needs
  browser APIs, event handlers, or React hooks (useState, useEffect, etc.)
- Page components export `default` function. Layouts wrap children.

### Styling

- Tailwind utility classes for all styling. No inline styles, no CSS modules.
- Use `cn()` from `@/lib/utils` for conditional class merging.
- boltn color tokens defined as CSS custom properties in `app/globals.css`.
- Dark theme only — no light mode toggle. `<html>` has `className="dark"`.
- Key tokens: `--background` (#0a0a0a), `--foreground` (#fafafa), `--primary` (#22c55e green),
  `--muted-foreground` (#a1a1aa), `--border` (#3f3f46), `--card` (#18181b).

### Components

- shadcn/ui components live in `components/ui/` — do not modify directly unless necessary.
- Custom components go in `components/` (not in `ui/`).
- Import shadcn components: `import { Button } from "@/components/ui/button"`.

### Fonts

- Geist Sans: `--font-geist-sans` (body text, headings)
- Geist Mono: `--font-geist-mono` (code, monospace accents)
- Applied via CSS variables in the root layout.

### File Organization

```
src/
  app/            # Routes and layouts
  components/     # Custom components
  components/ui/  # shadcn/ui components (managed by CLI)
  lib/            # Utilities (cn, etc.)
  public/         # Static assets
```

### Linting

- Biome handles formatting and linting. No ESLint.
- Run from repo root: `pnpm biome check src/`
- Auto-fix: `pnpm biome check src/ --write`
- Biome config: `biome.json` at repo root with `tailwindDirectives: true` for CSS.

### Testing

Not configured yet (deferred to Phase 5).

## Do Not

- Add ESLint or Prettier — Biome handles both.
- Create light mode styles — dark only.
- Modify files in `ops/` from this directory.
- Use CSS modules or styled-components.
