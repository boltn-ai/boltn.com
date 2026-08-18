# CLAUDE.md — boltn.com Application Conventions

The website for boltn. Public repo. Brand, voice and operations documents live in the private
`boltn` repo and are consumed here, not owned here.

## Stack

- **Framework:** Next.js 16.1 with App Router and Turbopack
- **Styling:** Tailwind CSS 4 with CSS custom properties
- **UI primitives:** local components in `components/ui/`. Lucide for icons.
- **Fonts:** Playfair Display (display) + IBM Plex Mono (everything else) via `next/font/google`,
  with Georgia for body copy
- **Content:** velite compiles MDX posts from `content/blog/` and exposes them as `#content`
- **Linting:** Biome 2.4.7 — `pnpm lint`
- **Testing:** Node 22's built-in test runner — `pnpm test`
- **Package manager:** pnpm, run from the repo root

## File Organization

```
app/                      # Routes, layouts, route handlers
  globals.css             # Token definitions and the @theme inline exposure
  <route>/page.tsx        # A route
  <route>/actions.ts      # Server Actions, colocated with the route that uses them
  <route>/_lib/           # Private, non-routable logic for one route
  <route>/_components/    # Private components for one route
components/layout/        # Header, mobile nav, footer, cookie banner
components/ui/            # Shared presentational primitives
lib/                      # Shared utilities (cn)
content/blog/             # MDX posts, compiled by velite
public/                   # Static assets
```

There is no `src/` directory in this repo and never has been in its current form. Routes live at
`app/`, components at `components/`, utilities at `lib/`, static assets at `public/`. The `@/*`
TypeScript alias maps to the repo root.

Two conventions worth following when a route grows past a single file: put its Server Actions in
`actions.ts` beside the route (as `app/contact/actions.ts` and `app/assessment/actions.ts` do), and
put its pure logic and private components in `_lib/` and `_components/`. The leading underscore
keeps those folders out of the route tree.

## Conventions

### Routing and Components

- App Router with file-based routing in `app/`.
- Server Components by default. Add `"use client"` only when the component needs browser APIs,
  event handlers, or React hooks (`useState`, `useEffect`, `useActionState`, and so on).
- Page components export `default`. Layouts wrap children. Dynamic segments receive `params` as a
  Promise and must await it.

### Styling

- Tailwind utility classes for layout, spacing and typography. No CSS modules, no
  styled-components. The one sanctioned exception is the inline `style` prop, used for CSS-variable
  colours that are not exposed as utilities, for SVG fills and strokes, and for the 1px gap-grid
  technique — see STYLE_GUIDE section 7 in the private repo.
- **Tailwind 4 parenthesis syntax is mandatory** for CSS variables: `bg-(--accent)`,
  `text-(--text-muted)`, `border-(--border)`. The Tailwind 3 bracket form `bg-[--accent]` compiles
  to invalid CSS that every browser drops silently — no build error, no console warning, just an
  unstyled element. If a colour is not appearing, check this first.
- Applying an opacity modifier to a variable colour needs a `color:` type hint:
  `bg-(color:--bg)/80`. Without it the opacity is dropped.
- Use `cn()` from `@/lib/utils` for conditional class merging.
- Dark theme only. There is no light mode and no `.dark` class scope — tokens are defined on
  `:root`.
- Every corner is square. `* { border-radius: 0 }` is set in `globals.css`; do not use `rounded-*`
  utilities.
- Exactly four CSS transitions exist site-wide: service-card background on hover (200ms),
  service-card arrow colour on group-hover (200ms), nav link colour on hover (150ms), and CTA
  button opacity on hover (200ms). Do not add a fifth, and do not treat
  `components/layout/mobile-nav.tsx`'s `transition-all` as precedent — it predates the rule.

### Design Tokens

Defined in `:root` in `app/globals.css`:

| Group | Tokens |
|-------|--------|
| Surfaces | `--bg` (#0b0b09, warm black), `--bg-raised`, `--bg-subtle` (the card *hover* surface) |
| Borders | `--border`, `--border-mid`, `--border-hi` |
| Text | `--text-primary`, `--text-body`, `--text-muted`, `--text-faint` |
| Amber | `--accent` (#c8842a), `--accent-dim`, `--accent-faint` |
| Other | `--live` (availability dot only), `--header-h` (a layout metric, not a colour) |

Only a subset is exposed as Tailwind utilities through `@theme inline`: `bg`, `bg-raised`,
`bg-subtle`, `border`, `accent`, `text-primary`, `text-body`, `text-muted`, `text-faint`,
`font-display`, `font-mono`. Anything outside that list must be referenced with the parenthesis
syntax or an inline `style`.

Amber appears in exactly four contexts: section marker rules, numbered metadata glyphs, CTA button
fill, and the current/active navigation node. Nowhere else — no amber borders, backgrounds or
decoration.

The pre-02.2 shadcn token names were removed from `globals.css` during the 02.2 redesign. A handful
of older files still carry class names from that era (`bg-card`, `text-foreground`,
`border-border`), which resolve through the shadcn CSS import but are not boltn tokens. Do not use
them in new code.

### Fonts

Loaded in `app/layout.tsx` via `next/font/google`:

- **Playfair Display** — `--font-display`, a variable font, so no weight array. Headings only
  (H1/H2/H3). Never for body text, labels or navigation.
- **IBM Plex Mono** — `--font-mono`, not a variable font, so explicit `weight: ["400", "500"]`.
  It is the `body` font and carries all UI chrome, labels, nav and eyebrows.
- **Georgia** — web-safe, not loaded. Body copy paragraphs, applied italic via inline
  `style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}`.

The sans/mono pair used before the 02.2 redesign is retired. Do not reintroduce it, and do not add
`@font-face` or `@fontsource` packages.

### Components

- The live primitives are `components/ui/section.tsx`, `components/ui/page-header.tsx` and
  `components/ui/cta-button.tsx`. Reach for those first.
- **`components/ui/button.tsx` is dead and must not be imported.** It has zero importers across the
  repo and is stale in three ways: `rounded-lg` violates the zero-radius rule, `transition-all` is
  not one of the four permitted transitions, and its colour tokens no longer exist. Use `CtaButton`,
  or a raw `<button>` carrying the contact page's classes.
- The shadcn CLI is a dependency but this project is not shadcn-driven. Do not generate components
  with it without checking the output against the style guide first.
- Shared components go in `components/`. Components used by one route go in that route's
  `_components/` folder.

### Testing

- `pnpm test` runs `node --test "app/assessment/_lib/*.test.ts"` — Node 22's built-in runner with
  native TypeScript type-stripping. Zero test dependencies, no config file.
- Two constraints the runner imposes: imports need explicit `.ts` extensions, and they must be
  relative, because the `@/*` alias does not resolve under `node --test`.
- Broader testing infrastructure — component tests, end-to-end coverage, CI wiring — is Phase 6.
  Until then, pure logic gets unit tests and everything else is verified by build and smoke.

### Linting

- Biome handles formatting and linting. No ESLint, no Prettier.
- `pnpm lint` runs `biome check .` across the repo.
- `pnpm lint:fix` runs `biome check --write .`. **Scope any write to the files you changed** — the
  repo is not clean at baseline, and a repo-wide write pulls unrelated files into your commit.
- Config is `biome.json` at the repo root, with `tailwindDirectives: true` for CSS.
- Tabs, not spaces.

## Do Not

- Add ESLint or Prettier — Biome handles both.
- Create light mode styles — dark only.
- Use CSS modules or styled-components. Inline `style` for variable colours is the exception.
- Import `components/ui/button.tsx`.
- Use `rounded-*` utilities, or add a fifth CSS transition.
- Add entrance animations, scroll triggers, parallax, or a motion library.
- Hardcode hex values in JSX or class strings — reference the token.
- Modify files in `ops/` — brand and operations content lives in the private repo.
- Commit `next-env.d.ts` churn. `pnpm dev` rewrites the file and `pnpm build` rewrites it back; the
  committed state is the build variant.
