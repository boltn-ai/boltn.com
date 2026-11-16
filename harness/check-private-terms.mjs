#!/usr/bin/env node
// Fails if a public file or commit message contains a term from the private list: names, places
// and facts that must never appear on this site. The list cannot live in a public repo, because it
// would publish what it protects. It comes from PRIVATE_TERMS (newline-separated, a CI secret),
// PRIVATE_TERMS_FILE (a path), or the uncommitted local git config, which git hooks and agents
// also see: git config --local boltn.privateTermsFile <path>. Findings name the line and the list entry's number,
// never the matched text, so CI logs stay clean.
//
// List format: one JavaScript regular expression per line, case-insensitive; prefix "case:" for a
// case-sensitive entry. Blank lines and lines starting with # are ignored.
//
// Usage: node harness/check-private-terms.mjs [files...]          (no files: every tracked file)
//        node harness/check-private-terms.mjs --message <file>    (a commit message)
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { readText, report, targetFiles } from "./files.mjs";

function gitConfig(key) {
	try {
		return execFileSync("git", ["config", "--get", key], { encoding: "utf8" }).trim();
	} catch {
		return "";
	}
}

function loadTerms() {
	let raw = process.env.PRIVATE_TERMS;
	const path = process.env.PRIVATE_TERMS_FILE || gitConfig("boltn.privateTermsFile");
	if (!raw && path && existsSync(path)) raw = readFileSync(path, "utf8");
	if (!raw) {
		if (process.env.PRIVATE_TERMS_OPTIONAL === "1") {
			console.warn("private terms: no list configured, skipped (PRIVATE_TERMS_OPTIONAL=1).");
			process.exit(0);
		}
		console.error(
			"private terms: no list found. Run git config --local boltn.privateTermsFile <path>, or set\n" +
				"PRIVATE_TERMS_FILE or PRIVATE_TERMS. In a fork without the list, set PRIVATE_TERMS_OPTIONAL=1.",
		);
		process.exit(1);
	}
	const terms = [];
	raw.split("\n").forEach((line, i) => {
		const entry = line.trim();
		if (!entry || entry.startsWith("#")) return;
		const caseSensitive = entry.startsWith("case:");
		const source = caseSensitive ? entry.slice(5) : entry;
		terms.push({ n: i + 1, re: new RegExp(source, caseSensitive ? "u" : "iu") });
	});
	return terms;
}

const args = process.argv.slice(2);
const terms = loadTerms();
const messageAt = args.indexOf("--message");
const files = messageAt >= 0 ? [args[messageAt + 1]] : targetFiles(args);

const findings = [];
for (const file of files) {
	const text = readText(file);
	if (text === null) continue;
	text.split("\n").forEach((line, i) => {
		for (const t of terms) {
			if (t.re.test(line)) {
				const where = messageAt >= 0 ? "commit message" : file;
				findings.push({
					file: where,
					line: i + 1,
					message: `matches private-terms entry on line ${t.n}`,
				});
			}
		}
	});
}
report("private terms", findings);
