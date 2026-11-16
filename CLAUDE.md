# CLAUDE.md: boltn.com

Steve Bolton's personal site: essays, a record of work and the AI maturity assessment. This is a
public repo, so everything committed here is published, commit messages included. Brand, voice and
operations documents and retired pages live in the private `boltn` repo.

This file holds only what the checks cannot enforce. Mechanical rules live in the harness
(`docs/harness.md`), which will stop you before a reviewer has to.

## Definition of done

`pnpm check` passes, and the pull request says why any budget in `harness/budgets.json` went up.

- After each edit, a hook formats and lints the file and checks it against the design rules and
  the private-term list. Fix what it reports before moving on.
- A turn cannot end with `pnpm check:quick` failing. Git hooks run the same checks at commit and
  push; never skip them. CI is the authority, and Steve merges.
- Do not change the harness (`harness/`, `.github/`, `lefthook.yml`, `biome.json`, `knip.jsonc`,
  `.claude/settings.json`) to make a check pass. If a check is wrong, say so and propose the fix.
- If something reaches review that a machine could have caught, the fix is a new check or test,
  not a new line in this file.

## Commands

- `pnpm dev`: velite in watch mode and the Next.js dev server
- `pnpm check:quick`: lint, design rules, private terms, types, unit tests (seconds)
- `pnpm check`: all of that plus the secrets scan, knip, a production build and the budgets
- `pnpm exec biome check --write <files>`: fix formatting in the files you changed
- `pnpm check:budgets --tighten`: lower budgets after a change that shrank something

## Code

- No `src/`. The `@/*` alias maps to the repo root.
- Server Components by default; add `"use client"` only for browser APIs, event handlers or hooks.
  Dynamic segments receive `params` as a Promise.
- Code private to one route goes in `<route>/_lib/` and `<route>/_components/`; its Server Actions
  in `<route>/actions.ts`.
- Essays are MDX in `content/blog/`, compiled by velite and imported as `#content`.
- Unit tests use Node's built-in runner, which strips types but does not resolve the `@/*` alias:
  tested modules and their imports use relative paths with explicit `.ts` extensions.
- Reach for the existing primitives first: `Section`, `PageHeader` and `CtaButton` in
  `components/ui/`, and the shared classes in the components layer of `app/globals.css`.

## Design: Newsprint

Read the stamp at the top of `app/globals.css` before changing the design. Tokens are in
`app/tokens.css`, and each is a Tailwind utility (`bg-paper`, `text-ink`, `font-display`). The
checks enforce tokens, no boxes, no tracked capitals and no dashes in copy. They cannot judge:

- Light only. Hairline and double rules carry the structure, never boxes or cards.
- The brick accent is a signal, under 5% of any screen: links, the focus ring, a diagram's tail.
  Never a fill behind text.
- Labels, dates, captions and nav are sentence case in the body face: no monospace labels, no
  eyebrows above headings, no arrows glued to link text, no middle-dot-joined meta strings.
- Zilla Slab 700 for headings, one weight, never italic. Spectral for everything else, italic for
  emphasis. Libre Franklin (`.agate`) only for dates, reading times and figures in ruled lists.
- Motion is state only: colour and underline changes on hover. No reveals, scroll effects or
  motion library.
- The share-image generators cannot read CSS variables; keep `lib/og-theme.ts` in step with
  `app/tokens.css` by hand.

## Writing

- British English. The checks catch dashes and private terms, not tone or truth.
- A claim resting on an experiment with AI agents needs its prompts and outputs recorded and a
  rerun that agrees, before it is published.
- A personal site: no agency or consultancy framing, and no worked example that would let a reader
  conclude a named former colleague was wrong.
