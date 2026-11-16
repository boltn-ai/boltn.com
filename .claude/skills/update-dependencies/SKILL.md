---
name: update-dependencies
description: Check, update, add or remove dependencies (npm packages, pnpm itself, Node, mise tools, GitHub Actions) or review a Dependabot PR, as a dependency-only branch and PR. Use whenever a change would touch package.json dependencies, pnpm-lock.yaml, pnpm-workspace.yaml, .mise.toml or a workflow's uses line, including adding a package a feature needs.
---

# Updating dependencies

Dependency changes travel alone: their own commits, their own pull request, scope `(deps)`.
`harness/check-dependencies.mjs` enforces that at commit and in CI, and fails any newly locked
package published less than `minimumReleaseAge` ago. This skill is the judgement around it.

## 1. Start clean

- Branch from an up-to-date `main`: `deps/<topic>`, e.g. `deps/2026-11-patch` or `deps/add-zod`.
- Never on a branch with code changes. If a feature needs a new package, add it in a dependency PR
  first, merge that, then build the feature on top.

## 2. Find what to change

- Open Dependabot PRs: `gh pr list --author app/dependabot`.
- npm packages: `pnpm outdated`.
- Toolchain: `mise outdated` (Node, pnpm, gitleaks and the other tools in `.mise.toml`).
- pnpm itself: `packageManager` in `package.json`, and `pnpm` in `.mise.toml`. Keep them equal.
- Actions: Dependabot updates the SHA pins; check the `# vX.Y.Z` comment matches the SHA.

## 3. Judge each change

For every package that changes, including new transitive packages in the lockfile diff:

- **Age:** published at least 3 days ago. pnpm refuses younger versions when it resolves; CI checks
  the lockfile. Exclude a package (`minimumReleaseAgeExclude`) only for a security fix, and say so.
- **Changelog:** read the release notes between the two versions. Note breaking changes and
  security fixes in the PR body.
- **Provenance:** `npm view <pkg>@<version> dist.attestations` shows whether it was built and
  published from CI. If an earlier version had provenance and this one does not, stop and ask:
  `trustPolicy: no-downgrade` will refuse it, and that is the point.
- **Install scripts:** pnpm blocks dependency build scripts. If an install reports a new one, do
  not allow it by default. In `pnpm-workspace.yaml`, list it under `ignoredBuiltDependencies`, or
  under `onlyBuiltDependencies` only when the package does not work without its script, and
  explain why in the commit. (pnpm 11 renames these to `allowBuilds`.)
- **Weight:** a new package must be worth what it adds. Check the dependency budget and the
  lockfile diff for unexpected new transitive packages.

## 4. Make the change

- Exact versions only: `pnpm add -E <pkg>@<version>` (the workspace saves exact versions).
- One commit per logical change, subject in the `(deps)` scope:
  `build(deps): bump next from 16.1.6 to 16.2.0`, `build(deps-dev): add knip`,
  `ci(deps): pin actions/checkout to v4.2.2`.
- Patch and minor updates may share a PR. Each major update gets its own PR.
- If a major update forces code changes, put them in their own commit in the same PR, also in the
  `(deps)` scope: `refactor(deps): adapt to the next 17 metadata API`. Nothing else.
- If a budget goes up (dependencies, client JS), raise it in `harness/budgets.json` in the same PR
  and give the reason in the commit message.

## 5. Check and open the PR

- `pnpm check`, then
  `node harness/check-dependencies.mjs --range origin/main..HEAD --title "<PR title>"`.
- PR title in the `(deps)` scope. The body is a table: package, from, to, type (patch, minor,
  major, new, removed), published date, and notes (breaking changes, security fixes, provenance).
- Steve merges. Do not merge, even when CI is green.

## Reviewing a Dependabot PR

Check out its branch and apply section 3 to every change, including transitive packages in the
lockfile diff. If CI fails only on release age, leave it: re-run CI once the package is old enough.
