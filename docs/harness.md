# The validation harness

This site is maintained by one person and AI coding agents. Agents produce plausible changes
quickly, so the risk is not that a change looks wrong; it is that a wrong change looks right. The
harness exists to catch five kinds of failure before they reach the live site:

1. **Leaks.** This is a public repo. A private name, place or fact in a page, a comment or a
   commit message is published the moment it is pushed.
2. **Breakage.** A route that no longer builds, a type error, a broken assessment.
3. **Drift.** Small departures from the design system that each look harmless.
4. **Bloat.** Dependencies, dead code and weight that accumulate over many small changes, none of
   which is big enough to notice on its own.
5. **Erosion.** An agent making a check pass by loosening the check, or skipping it.

## Principles

- **Each check is defined once.** `package.json` scripts are the only definition. The editor hook,
  the git hooks and CI all call them; the layers differ in which checks they run and over which
  files, never in what a check means.
- **Fail at the earliest layer that can run the check.** Formatting fails within a second of the
  edit; a broken build fails before the push, not in CI.
- **The hooks are for speed. CI is the authority.** Any hook can be skipped. `main` is protected
  and only accepts changes through a pull request that passed CI, and a person merges it.
- **A rule a machine can check is a check, not an instruction.** `CLAUDE.md` holds only what needs
  judgement. When something reaches review that a check could have caught, the fix is a check.
- **Growth must be argued for.** Size and complexity are ratcheted: shrinking is free, growing
  means raising a budget in the same pull request, where the diff shows it.
- **Use the well-known tool unless a small script is clearer.** A custom check must be short, have
  one job and be readable in a minute.

## Layers

| Layer | Runs | Time | Checks |
|---|---|---|---|
| Edit | Claude Code `PostToolUse` hook, on the edited file | < 1 s | Biome (format and lint), design rules, private terms |
| End of turn | Claude Code `Stop` hook, when the tree has changes | ~6 s | `pnpm check:quick` |
| Commit | lefthook `pre-commit` and `commit-msg`, on staged files | < 1 s | Biome, design rules, private terms, gitleaks; commit message format and private terms |
| Push | lefthook `pre-push` | ~15 s | `pnpm check` |
| Pull request | GitHub Actions, required for `main` | minutes | `pnpm check`, plus private terms in commit messages and the PR title and body |

`pnpm check:quick` is lint, design rules, private terms, type-check and unit tests. `pnpm check`
adds a full-history secrets scan, knip, a production build and the budgets.

## Checks and why each tool

| Check | Tool | Why this one |
|---|---|---|
| Format and lint | [Biome](https://biomejs.dev) | One fast tool for TypeScript, JSON and CSS. Warnings are errors, so the baseline stays clean. |
| Types | `tsc --noEmit`, strict | The compiler is the cheapest test there is. |
| Unit tests | Node's built-in test runner | No test framework to install or configure; it strips TypeScript types natively. |
| Dead code and dependencies | [knip](https://knip.dev) | Finds unused files, exports and dependencies. Its first run here found a dead component and five unused packages. |
| Secrets | [gitleaks](https://github.com/gitleaks/gitleaks) | The standard scanner; staged changes at commit, the whole history in CI. |
| Git hooks | [lefthook](https://lefthook.dev) | One package and one YAML file, runs checks in parallel and passes staged file lists. Replaces husky, lint-staged and commitlint. |
| Design rules | `harness/check-design-rules.mjs` | The Newsprint rules a machine can check: colours and fonts only through tokens, no rounded corners or shadows, no tracked capitals, no `transition: all`, no dashes in copy. A lint plugin would need more configuration than the rules themselves. |
| Private terms | `harness/check-private-terms.mjs` | No tool can do this one: the list must stay out of the public repo, or it would publish what it protects. It comes from a CI secret or a local path, and findings name the list entry's number, never the matched text, so CI logs stay clean. |
| Commit messages | `harness/check-commit-message.mjs` | Conventional commits in one regular expression, instead of commitlint and its configuration. |
| Budgets | `harness/check-budgets.mjs` | See below. Bundle-size tools target libraries and fit a statically generated site badly. |
| Agent guard rails | `.claude/settings.json` | Agents may not skip hooks, force-push, push to `main`, merge or deploy, and must ask before editing the harness. |

## Budgets

`harness/budgets.json` caps what grows quietly:

| Budget | Measures |
|---|---|
| `dependencies` | runtime and development dependencies in `package.json` |
| `clientJsKb` | all client JavaScript, gzipped |
| `cssKb` | all stylesheets, gzipped |
| `largestPageKb` | the largest prerendered HTML page, gzipped |
| `sourceLines` | TypeScript and CSS in `app/`, `components/` and `lib/` |
| `agentContextLines` | `CLAUDE.md`, which every agent session loads |

A change that exceeds a budget fails. The fix is to shrink the change, or to raise the number in
the same pull request and say why in the commit message. After a change that shrinks something,
`pnpm check:budgets --tighten` lowers each budget to current use plus 10%. The budget on
`CLAUDE.md` is deliberate: agent context grows the same way code does, one reasonable line at a
time.

## Limits

- **The agent guard rails are not security.** Claude Code's deny rules match command prefixes and
  can be worded around. The controls that hold are branch protection, required CI and a person
  merging.
- **Checks catch the mechanical, not the true.** Tone, whether an essay's claim holds up, and
  whether a design choice is right are for review.
- **The design check reads text, not syntax.** It strips comments and code blocks, and is tested
  against deliberate violations, but it can be fooled by unusual formatting.

## Deliberately not here

- **Coverage thresholds.** Agents meet a percentage by writing tests that assert little.
- **ESLint and Prettier.** Biome covers both.
- **A prose linter such as Vale.** For one author, the dash and private-term checks cover what a
  machine can usefully check; tone is for review.
- **Storybook, hosted visual testing, SonarQube, mutation testing.** Each costs more to keep running
  than it would find on a site of this size.

## Next

1. **Checks on the built site:** link checking with [lychee](https://lychee.cli.rs), a test that
   the security headers are sent, and [Playwright](https://playwright.dev) smoke tests of the
   journeys that matter (completing the assessment and opening its result link, the contact form
   with email mocked, redirects, the 404 page, RSS and the sitemap), with
   [axe](https://github.com/dequelabs/axe-core) accessibility checks on every route.
2. **Outer layers:** Lighthouse CI budgets against Vercel preview deployments, actionlint and
   zizmor on the workflows with actions pinned to commits, grouped Dependabot updates, a weekly
   check of the production site and its external links, and possibly a few visual snapshots.

## Setting up a clone

```sh
pnpm install          # also installs the git hooks
mise install          # gitleaks, pinned in .mise.toml
git config --local boltn.privateTermsFile <path to the private list>
```

Without the private list, set `PRIVATE_TERMS_OPTIONAL=1` and the check is skipped with a warning.
