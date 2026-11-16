#!/usr/bin/env node
// Conventional commit subject: type(scope): description. One regex instead of commitlint.
// Usage: node harness/check-commit-message.mjs <message-file>   (lefthook's commit-msg passes it)
import { readFileSync } from "node:fs";

const subject = readFileSync(process.argv[2], "utf8").split("\n")[0];
const conventional =
	/^(feat|fix|docs|chore|refactor|test|ci|perf|build|style|revert)(\([a-z0-9./-]+\))?!?: \S.{0,98}$/;
const generated = /^(Merge |Revert "|fixup! |squash! |amend! )/;

if (!conventional.test(subject) && !generated.test(subject)) {
	console.error(`commit message: "${subject}"`);
	console.error("Use type(scope): description, at most 100 characters. Types: feat, fix, docs,");
	console.error("chore, refactor, test, ci, perf, build, style, revert.");
	process.exit(1);
}
