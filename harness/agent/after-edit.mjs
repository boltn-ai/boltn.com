#!/usr/bin/env node
// Claude Code PostToolUse hook: after an agent edits a file, format and lint that file and check it
// against the design rules. Exit code 2 hands the problems back to the agent to fix straight away.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const input = JSON.parse(readFileSync(0, "utf8"));
const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const absolute = input.tool_input?.file_path;
if (!absolute || !existsSync(absolute)) process.exit(0);
const file = path.relative(root, absolute);
if (file.startsWith("..")) process.exit(0);

const problems = [];
const run = (cmd, args) => {
	const r = spawnSync(cmd, args, { cwd: root, encoding: "utf8" });
	if (r.status !== 0) problems.push((r.stdout + r.stderr).trim());
};

if (/\.(tsx?|mjs|json|css)$/.test(file)) {
	run(path.join(root, "node_modules/.bin/biome"), [
		"check",
		"--write",
		"--error-on-warnings",
		"--no-errors-on-unmatched",
		file,
	]);
}
run("node", ["harness/check-design-rules.mjs", file]);
run("node", ["harness/check-private-terms.mjs", file]);

if (problems.length) {
	console.error(`Checks failed for ${file}:\n\n${problems.join("\n\n")}`);
	process.exit(2);
}
