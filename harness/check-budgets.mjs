#!/usr/bin/env node
// The bloat ratchet. Measures the things that grow quietly over many small AI changes and fails
// when one exceeds its budget in harness/budgets.json. Lowering a budget is free; raising one is
// an edit to that file in the same pull request, with the reason in the commit message, so every
// increase is visible in the diff.
//
// Usage: node harness/check-budgets.mjs            check (needs a production build in .next/)
//        node harness/check-budgets.mjs --tighten  lower each budget to current use + 10% headroom
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";

const BUDGETS = "harness/budgets.json";
const HEADROOM = 1.1;

function walk(dir, keep) {
	if (!existsSync(dir)) return [];
	return readdirSync(dir, { recursive: true })
		.map((f) => path.join(dir, f))
		.filter((f) => keep(f) && statSync(f).isFile());
}
const gzKb = (file) => gzipSync(readFileSync(file)).length / 1024;
const sum = (xs) => xs.reduce((a, b) => a + b, 0);
const lines = (file) => readFileSync(file, "utf8").split("\n").length;

if (!existsSync(".next/BUILD_ID")) {
	console.error("budgets: no production build in .next/. Run pnpm build first.");
	process.exit(1);
}

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const source = ["app", "components", "lib"].flatMap((d) => walk(d, (f) => /\.(tsx?|css)$/.test(f)));
const html = walk(".next/server/app", (f) => f.endsWith(".html"));

const measures = {
	dependencies: {
		unit: "",
		value:
			Object.keys(pkg.dependencies ?? {}).length + Object.keys(pkg.devDependencies ?? {}).length,
		what: "runtime and dev dependencies in package.json",
	},
	clientJsKb: {
		unit: " KB gz",
		value: sum(walk(".next/static/chunks", (f) => f.endsWith(".js")).map(gzKb)),
		what: "all client JavaScript chunks",
	},
	cssKb: {
		unit: " KB gz",
		value: sum(walk(".next/static", (f) => f.endsWith(".css")).map(gzKb)),
		what: "all stylesheets",
	},
	largestPageKb: {
		unit: " KB gz",
		value: Math.max(0, ...html.map(gzKb)),
		what: "the largest prerendered HTML page",
	},
	sourceLines: {
		unit: " lines",
		value: sum(source.map(lines)),
		what: "TypeScript and CSS in app/, components/ and lib/",
	},
	agentContextLines: {
		unit: " lines",
		value: lines("CLAUDE.md"),
		what: "CLAUDE.md, loaded into every agent session",
	},
};

const budgets = JSON.parse(readFileSync(BUDGETS, "utf8"));

if (process.argv.includes("--tighten")) {
	for (const [key, m] of Object.entries(measures)) {
		const tight = Math.ceil(m.value * HEADROOM);
		if (budgets[key] === undefined || tight < budgets[key]) budgets[key] = tight;
	}
	writeFileSync(BUDGETS, `${JSON.stringify(budgets, null, "\t")}\n`);
	console.log(`budgets: wrote ${BUDGETS}. Commit the lower budgets.`);
}

let over = 0;
for (const [key, m] of Object.entries(measures)) {
	const budget = budgets[key];
	if (budget === undefined) {
		console.error(`budgets: ${key} has no budget in ${BUDGETS}.`);
		over++;
		continue;
	}
	const used = Math.round(m.value * 10) / 10;
	const ok = m.value <= budget;
	if (!ok) over++;
	const pct = Math.round((m.value / budget) * 100);
	console.log(
		`${ok ? "ok  " : "OVER"} ${key.padEnd(18)} ${used}${m.unit} of ${budget} (${pct}%): ${m.what}`,
	);
}
if (over) {
	console.error(
		`\nbudgets: ${over} over. Shrink the change, or raise the budget in ${BUDGETS} in this PR and say why in the commit message.`,
	);
	process.exit(1);
}
