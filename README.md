# boltn.com

Source for [boltn.com](https://boltn.com), Steve Bolton's personal site: essays on engineering
maturity and AI-assisted development, a record of work, and a short AI maturity assessment.

## Stack

- Next.js 16 (App Router, statically generated) and React 19, deployed on Vercel
- TypeScript in strict mode
- Tailwind CSS 4 over design tokens in `app/tokens.css`
- MDX essays compiled by [velite](https://velite.js.org) from `content/blog/`
- Biome for linting and formatting, Node's built-in test runner for tests, knip, gitleaks and
  lefthook in the [harness](docs/harness.md)
- Vercel Analytics (cookieless); the site sets no cookies

## How it is built

Most of the code is written with AI coding agents, chiefly Claude Code, with me setting the
direction and reviewing every change. The agents work from [`CLAUDE.md`](CLAUDE.md) (also
`AGENTS.md`), which holds only what needs judgement: the design intent, the writing rules and the
definition of done.

Everything a machine can check is checked, at the earliest point that can check it: on each agent
edit, at commit, at push and in [CI](.github/workflows/ci.yml). The checks cover types, lint, unit
tests, design rules, secrets, private details that must never be published, dead code, and budgets
on size and dependencies so the site does not bloat over many small changes.
[`docs/harness.md`](docs/harness.md) describes each layer and why each tool is there.

Changes go in through pull requests with conventional commit messages, and I merge them.

## Running it

Requires Node 22, pnpm 8 and gitleaks, pinned in `.mise.toml`. `pnpm install` also installs the git
hooks; see [`docs/harness.md`](docs/harness.md#setting-up-a-clone) for the private-term list.

```sh
pnpm install
pnpm dev      # velite in watch mode + next dev on http://localhost:3000
pnpm check:quick   # lint, design rules, types, unit tests
pnpm check         # everything CI runs
```

The contact form needs `RESEND_API_KEY` and `CONTACT_EMAIL` in `.env.local`; everything else runs
without configuration.

## Layout

```
app/          routes, layouts, server actions, global CSS and tokens
components/   layout and shared UI components
content/blog/ essays (MDX)
docs/         the harness design
harness/      custom checks, budgets and agent hooks
lib/          shared utilities and profile text
public/       static assets
```
