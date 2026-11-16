#!/usr/bin/env node
// Claude Code Stop hook: an agent cannot finish a turn that leaves the working tree failing the
// quick checks (lint, design rules, private terms, types, unit tests). Exit code 2 sends it back.
// The build and budgets wait for pre-push and CI, which are the authority.
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8"));
const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

const changed = execFileSync("git", ["status", "--porcelain"], { cwd: root, encoding: "utf8" });
if (!changed.trim()) process.exit(0);

const r = spawnSync("pnpm", ["-s", "check:quick"], { cwd: root, encoding: "utf8" });
if (r.status === 0) process.exit(0);

const output = (r.stdout + r.stderr).trim().split("\n").slice(-40).join("\n");
if (input.stop_hook_active) {
	// Already sent back once this turn: report, but do not loop. Pre-push and CI still block.
	console.error(`Quick checks still failing:\n${output}`);
	process.exit(0);
}
console.error(`The working tree fails pnpm check:quick. Fix it before finishing:\n\n${output}`);
process.exit(2);
