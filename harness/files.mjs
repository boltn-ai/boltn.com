// Shared by the harness checks: which files to look at, and their text without comments.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

/** Files named on the command line (from a hook), or every tracked file. */
export function targetFiles(args) {
	const named = args.filter((a) => !a.startsWith("--"));
	const files = named.length
		? named
		: execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" }).split("\0").filter(Boolean);
	return files.filter((f) => existsSync(f));
}

/** File contents, or null for binary files. */
export function readText(file) {
	const buf = readFileSync(file);
	if (buf.subarray(0, 8000).includes(0)) return null;
	return buf.toString("utf8");
}

/**
 * Blank out comments in JS/TS/CSS source, keeping line numbers and string contents.
 * Good enough for lint-style checks; not a parser.
 */
export function stripComments(src) {
	let out = "";
	let i = 0;
	let quote = null;
	while (i < src.length) {
		const c = src[i];
		const next = src[i + 1];
		if (quote) {
			out += c;
			if (c === "\\") {
				out += next ?? "";
				i += 2;
				continue;
			}
			// ' and " cannot span lines; resetting also stops an apostrophe in JSX text running on.
			if (c === quote || (c === "\n" && quote !== "`")) quote = null;
			i++;
		} else if (c === "/" && next === "*") {
			const end = src.indexOf("*/", i + 2);
			const stop = end === -1 ? src.length : end + 2;
			out += src.slice(i, stop).replace(/[^\n]/g, " ");
			i = stop;
		} else if (c === "/" && next === "/" && src[i - 1] !== ":") {
			const end = src.indexOf("\n", i);
			const stop = end === -1 ? src.length : end;
			out += " ".repeat(stop - i);
			i = stop;
		} else {
			if (c === '"' || c === "'" || c === "`") quote = c;
			out += c;
			i++;
		}
	}
	return out;
}

/** Report findings as file:line: message and exit non-zero if there are any. */
export function report(name, findings) {
	for (const f of findings) console.error(`${f.file}:${f.line}: ${f.message}`);
	if (findings.length) {
		console.error(`\n${name}: ${findings.length} problem(s).`);
		process.exit(1);
	}
}
