#!/usr/bin/env node
// Dependency changes travel alone, and nothing freshly published gets in.
//
// 1. A commit that changes a dependency version (package.json dependency fields, the lockfile,
//    pnpm-workspace.yaml, .mise.toml, or a workflow's `uses:` line) changes only dependency files
//    and has the scope (deps): `build(deps): bump next to 16.2.0`.
// 2. A pull request that contains such a commit is a dependency PR: every commit, and the title
//    (which becomes the squash commit), has the (deps) scope. Code an upgrade forces goes in its
//    own (deps)-scoped commit, e.g. `refactor(deps): adapt to the next 17 API`.
// 3. In a pull request, every package newly locked must have been published at least
//    minimumReleaseAge minutes ago (pnpm-workspace.yaml, default 3 days), unless excluded there.
//    Compromised releases are usually caught within days; pnpm enforces this when it resolves,
//    and this catches what arrives another way (a Dependabot PR, a hand-edited lockfile).
//
// Usage: node harness/check-dependencies.mjs --commit-msg <file>        (commit-msg hook)
//        node harness/check-dependencies.mjs --range <base>..<head> [--title <PR title>]
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const DEPENDENCY_FILES = [
	/^package\.json$/,
	/^pnpm-lock\.yaml$/,
	/^pnpm-workspace\.yaml$/,
	/^\.mise\.toml$/,
	/^\.github\//,
	/^harness\/budgets\.json$/,
];
const DEPENDENCY_FIELDS = [
	"dependencies",
	"devDependencies",
	"optionalDependencies",
	"peerDependencies",
	"packageManager",
	"engines",
	"pnpm",
];
const DEPS_SCOPE = /^[a-z]+\(deps(?:-dev)?\)!?: /; // deps-dev: Dependabot's scope for devDependencies

const git = (...args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 << 20 });
const show = (spec) => {
	try {
		return git("show", spec);
	} catch {
		return null;
	}
};
const fields = (json) => {
	if (!json) return "{}";
	const pkg = JSON.parse(json);
	return JSON.stringify(DEPENDENCY_FIELDS.map((f) => pkg[f] ?? null));
};
const otherFields = (json) => {
	if (!json) return "{}";
	const pkg = JSON.parse(json);
	for (const f of DEPENDENCY_FIELDS) delete pkg[f];
	return JSON.stringify(pkg);
};

/** Classify one change set. `before`/`after` are git revisions; after ":" means the index. */
function classify(files, before, after, diffArgs) {
	const read = (rev, path) => show(rev === ":" ? `:${path}` : `${rev}:${path}`);
	const reasons = [];
	let packageJsonMixed = false;
	for (const file of files) {
		if (file === "pnpm-lock.yaml" || file === "pnpm-workspace.yaml" || file === ".mise.toml") {
			reasons.push(file);
		} else if (file === "package.json") {
			const [a, b] = [read(before, file), read(after, file)];
			if (fields(a) !== fields(b)) {
				reasons.push("package.json dependency fields");
				packageJsonMixed = otherFields(a) !== otherFields(b);
			}
		} else if (/^\.github\/workflows\//.test(file)) {
			const diff = git("diff", ...diffArgs, "--", file);
			if (/^[+-]\s*(-\s+)?uses:/m.test(diff)) reasons.push(`${file} uses:`);
		}
	}
	const strays = files.filter((f) => !DEPENDENCY_FILES.some((re) => re.test(f)));
	if (packageJsonMixed) strays.push("package.json (non-dependency fields)");
	return { changesDependencies: reasons.length > 0, reasons, strays };
}

const problems = [];
const args = process.argv.slice(2);
const opt = (name) => {
	const i = args.indexOf(name);
	return i >= 0 ? args[i + 1] : undefined;
};

function checkCommit(label, subject, result) {
	if (!result.changesDependencies) return;
	if (result.strays.length) {
		problems.push(
			`${label}: changes dependencies (${result.reasons.join(", ")}) and other files ` +
				`(${result.strays.join(", ")}). Put dependency changes in a commit of their own.`,
		);
	}
	if (!DEPS_SCOPE.test(subject)) {
		problems.push(`${label}: changes dependencies, so its subject needs the (deps) scope.`);
	}
}

const messageFile = opt("--commit-msg");
const range = opt("--range");

if (messageFile) {
	const subject = readFileSync(messageFile, "utf8").split("\n")[0];
	const files = git("diff", "--cached", "--name-only").split("\n").filter(Boolean);
	checkCommit("this commit", subject, classify(files, "HEAD", ":", ["--cached"]));
} else if (range) {
	const [base, head] = range.split("..");
	const commits = git("rev-list", "--reverse", "--no-merges", `${base}..${head}`)
		.split("\n")
		.filter(Boolean);
	let dependencyPr = false;
	const subjects = [];
	for (const sha of commits) {
		const subject = git("log", "-1", "--format=%s", sha).trim();
		subjects.push([sha.slice(0, 7), subject]);
		const files = git("diff-tree", "--no-commit-id", "--name-only", "-r", "--root", sha)
			.split("\n")
			.filter(Boolean);
		const result = classify(files, `${sha}^`, sha, [`${sha}^`, sha]);
		if (result.changesDependencies) dependencyPr = true;
		checkCommit(`${sha.slice(0, 7)} "${subject}"`, subject, result);
	}
	if (dependencyPr) {
		for (const [sha, subject] of subjects) {
			if (!DEPS_SCOPE.test(subject)) {
				problems.push(
					`${sha} "${subject}": this is a dependency PR, so every commit needs the (deps) scope. ` +
						"Move other work to its own PR.",
				);
			}
		}
		const title = opt("--title");
		if (title !== undefined && !DEPS_SCOPE.test(title)) {
			problems.push(`PR title "${title}": a dependency PR's title needs the (deps) scope.`);
		}
	}
	await checkReleaseAge(base, head);
} else {
	console.error("usage: --commit-msg <file> | --range <base>..<head> [--title <title>]");
	process.exit(2);
}

async function checkReleaseAge(base, head) {
	const diff = git("diff", base, head, "--", "pnpm-lock.yaml");
	if (!diff) return;
	const settings = existsSync("pnpm-workspace.yaml")
		? readFileSync("pnpm-workspace.yaml", "utf8")
		: "";
	const minutes = Number(settings.match(/^minimumReleaseAge:\s*(\d+)/m)?.[1] ?? 4320);
	const block = settings.match(/^minimumReleaseAgeExclude:\n((?:[ \t]+-.*\n?)*)/m)?.[1] ?? "";
	const excluded = [...block.matchAll(/-\s+['"]?([^'"\s#]+)/g)].map((m) => m[1]);
	const locked = new Set();
	for (const m of diff.matchAll(/^\+ {2}'?\/?((?:@[^/\s']+\/)?[^@\s'/(]+)@(\d[^('":\s]*)/gm)) {
		locked.add(`${m[1]}@${m[2]}`);
	}
	const cutoff = Date.now() - minutes * 60_000;
	const fresh = [];
	await Promise.all(
		[...locked].map(async (spec) => {
			const at = spec.lastIndexOf("@");
			const [name, version] = [spec.slice(0, at), spec.slice(at + 1)];
			if (excluded.includes(name) || excluded.includes(spec)) return;
			const res = await fetch(`https://registry.npmjs.org/${name.replace("/", "%2f")}`);
			if (!res.ok) {
				problems.push(`${spec}: could not read its publish date (HTTP ${res.status}).`);
				return;
			}
			const published = Date.parse((await res.json()).time?.[version] ?? "");
			if (!(published <= cutoff))
				fresh.push(`${spec} (published ${new Date(published).toISOString()})`);
		}),
	);
	for (const f of fresh.sort()) {
		problems.push(
			`${f}: younger than minimumReleaseAge (${minutes} minutes). Wait, or add it to ` +
				"minimumReleaseAgeExclude in pnpm-workspace.yaml with the reason (a security fix).",
		);
	}
	console.log(`dependencies: checked the release age of ${locked.size} newly locked package(s).`);
}

for (const p of problems) console.error(p);
if (problems.length) {
	console.error(`\ndependencies: ${problems.length} problem(s).`);
	process.exit(1);
}
