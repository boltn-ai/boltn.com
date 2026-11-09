# CLAUDE.md — boltn.com Application Conventions

Steve Bolton's personal site, served at boltn.com: writing, evidence of work, and the AI maturity
assessment. Public repo. It was the boltn consultancy site until 2026-10-16; the retired consulting
pages are in `archive/consulting/` (not routed). Brand, voice and operations documents live in the
private `boltn` repo and are consumed here, not owned here.

## Stack

- **Framework:** Next.js 16.1 with App Router and Turbopack
- **Styling:** Tailwind CSS 4 with CSS custom properties
- **UI primitives:** local components in `components/ui/`. Lucide for icons.
- **Fonts:** Zilla Slab (display), Spectral (body) and Libre Franklin (figures only) via
  `next/font/google`
- **Content:** velite compiles MDX posts from `content/blog/` and exposes them as `#content`
- **Linting:** Biome 2.4.7 — `pnpm lint`
- **Testing:** Node 22's built-in test runner — `pnpm test`
- **Package manager:** pnpm, run from the repo root

## File Organization

```
app/                      # Routes, layouts, route handlers
  globals.css             # Hallmark stamp, imports, components layer (buttons, rules, prose)
  tokens.css              # Design tokens: @theme static (colours, faces, sizes) and :root (space, motion)
  base.css                # Element defaults, imported into the base layer
  <route>/page.tsx        # A route
  <route>/actions.ts      # Server Actions, colocated with the route that uses them
  <route>/_lib/           # Private, non-routable logic for one route
  <route>/_components/    # Private components for one route
components/layout/        # Header, mobile nav, footer
archive/                  # Retired pages, not routed; each folder has a README
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

The site was redesigned on 2026-11-07 with the Hallmark skill, theme **Newsprint**: pale newsprint
paper, warm black ink, Zilla Slab heads over a Spectral body, hairline and double rules, and one
dried-brick accent. The stamp at the top of `app/globals.css` records the decisions, waivers and
review outcomes; read it before changing the design. The retired dark/amber/Playfair system is
described in the private repo's brand archive.

- Tailwind utility classes for layout, spacing and typography. No CSS modules, no
  styled-components. Shared patterns live as small classes in the `components` layer of
  `globals.css`: `.btn` with `.btn--primary` / `--secondary` / `--paper` / `--on-ink`, `.field`,
  `.link`, `.title-link`, `.byline`, `.agate`, `.rule`, `.rule--double`, `.well`, `.prose`,
  `.slab` (the ink nav and ink band), `.legal-block`.
- Every colour and face comes from a token. Because the tokens sit in `@theme static`, each is a
  utility: `bg-paper`, `text-ink`, `text-ink-2`, `text-muted`, `border-rule`, `text-accent`,
  `font-display`, `text-section`, `text-title`, `text-lead`. Never a hex or a `font-family`
  literal in JSX or class strings. The one exception is the share-image generators, which cannot
  read CSS variables and take their hex values from `lib/og-theme.ts`; keep those in step with
  `tokens.css` by hand.
- `.container` is redefined with `@utility container` to the capped, centred container
  (`--container` 1440px, `--gutter`); Tailwind's breakpoint-stepped version is replaced.
- Use `cn()` from `@/lib/utils` for conditional class merging.
- Light only. Radius 0 and no shadows anywhere: rules carry the structure, never boxes.
- Labels, dates, captions and nav are sentence case in the body face. No uppercase, no letter
  spacing, no monospace labels, no eyebrows above headings, no arrows glued to link text, no
  middle-dot-joined meta strings. Libre Franklin (`.agate`) is only for figures in a ruled list.
- The brick accent is a signal, under 5% of any screen: links, the focus ring, the diagram's tail.
  Never a fill behind text.
- Motion is state only: colour and underline-thickness transitions on hover. No reveals.
- Copy uses no em or en dashes: a comma, a colon, a full stop or parentheses.

### Design Tokens

`app/tokens.css`, written by the Hallmark scaffold for Newsprint:

| Group | Tokens |
|-------|--------|
| Paper | `--color-paper`, `--color-paper-2`, `--color-paper-3` |
| Ink | `--color-ink`, `--color-ink-2`, `--color-muted` |
| Rules | `--color-rule` (hairlines), `--color-rule-2` (double rules, strong lines) |
| Accent | `--color-accent` (dried brick), `--color-accent-ink`, `--color-accent-line` (on ink), `--color-focus` |
| Type | `--font-display`, `--font-body`, `--font-outlier`; `--text-display`, `--text-display-s`, `--text-section`, `--text-title`, `--text-lead` and `--text-xs` to `--text-3xl` |
| Space | `--space-3xs` to `--space-4xl`, `--section-gap-s` / `--section-gap` / `--section-gap-l`, `--gutter`, `--gap-columns` |
| Motion | `--dur-micro`, `--dur-short`, `--dur-long`, `--ease-out`, `--ease-in`, `--ease-in-out` |

### Fonts

Loaded in `app/layout.tsx` via `next/font/google`, exposed as `--font-zilla`, `--font-spectral` and
`--font-franklin` and consumed by the font tokens:

- **Zilla Slab 700** for every heading, the wordmark and controls. One weight, never italic.
- **Spectral 400 and 500**, with 400 italic for emphasis in running text, for everything else.
  Article prose is 18px at 1.7 in a 65ch column.
- **Libre Franklin 500** for dates, reading times and figures in ruled lists, nothing else.

### Components

- The live primitives are `components/ui/section.tsx`, `components/ui/page-header.tsx` and
  `components/ui/cta-button.tsx`. Reach for those first.
- **`components/ui/button.tsx` is dead and must not be imported.** It has zero importers and its
  shadcn colour tokens no longer exist. Use `CtaButton` (`variant` primary, secondary or paper),
  or a raw `<button className="btn btn--primary">`.
- The About headshot renders only when `public/headshot.jpg` exists; the theme prints it in black
  and white.
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
- Reintroduce the dark theme, amber, Playfair, IBM Plex Mono or Georgia italic body text.
- Use CSS modules or styled-components. Inline `style` for variable colours is the exception.
- Import `components/ui/button.tsx`.
- Use `rounded-*` or `shadow-*` utilities, `transition-all`, or uppercase tracked labels.
- Add entrance animations, scroll triggers, parallax, or a motion library.
- Hardcode hex values or font families in JSX or class strings: reference the token.
- Modify files in `ops/` — brand and operations content lives in the private repo.
- Commit `next-env.d.ts` churn. `pnpm dev` rewrites the file and `pnpm build` rewrites it back; the
  committed state is the build variant.
