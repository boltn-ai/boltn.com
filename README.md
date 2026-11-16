# boltn.com

Source for [boltn.com](https://boltn.com), Steve Bolton's personal site: essays on engineering
maturity and AI-assisted development, a record of work, and a short AI maturity assessment.

## Stack

- Next.js 16 (App Router, statically generated) and React 19, deployed on Vercel
- TypeScript in strict mode
- Tailwind CSS 4 over design tokens in `app/tokens.css`
- MDX essays compiled by [velite](https://velite.js.org) from `content/blog/`
- Biome for linting and formatting, Node's built-in test runner for tests
- Vercel Analytics (cookieless); the site sets no cookies

## How it is built

Most of the code is written with AI coding agents, chiefly Claude Code, with me setting the
direction and reviewing every change. The agent works from [`CLAUDE.md`](CLAUDE.md), which holds
the repo's conventions: file layout, the design tokens and the rule that no colour or font is
used outside them, and how routes are organised.

What I don't take on trust is checked mechanically, and [CI](.github/workflows/ci.yml) runs the
same checks on every pull request:

- `pnpm lint`: Biome
- `tsc --noEmit`: strict type-check
- `pnpm test`: unit tests for the assessment's scoring, question logic and shareable-result
  encoding
- `next build`: a full static build

Changes go in through pull requests with conventional commit messages.

## Running it

Requires Node 22 and pnpm 8 (pinned in `.mise.toml`).

```sh
pnpm install
pnpm dev      # velite in watch mode + next dev on http://localhost:3000
pnpm lint
pnpm test
pnpm build
```

The contact form needs `RESEND_API_KEY` and `CONTACT_EMAIL` in `.env.local`; everything else runs
without configuration.

## Layout

```
app/          routes, layouts, server actions, global CSS and tokens
components/   layout and shared UI components
content/blog/ essays (MDX)
lib/          shared utilities and profile text
public/       static assets
```
