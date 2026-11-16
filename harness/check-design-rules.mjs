#!/usr/bin/env node
// The Newsprint design rules that a machine can check. The judgement calls (one idea per screen,
// the accent under 5% of a screen) stay in CLAUDE.md; everything here was once a CLAUDE.md line.
// Usage: node harness/check-design-rules.mjs [files...]   (no files: every tracked file)
import { readText, report, stripComments, targetFiles } from "./files.mjs";

const SOURCE = /^(app|components|lib)\/.*\.(tsx?|css)$/;
const CLASSES = /^(app|components|lib)\/.*\.tsx?$/;
const CSS = /^(app|components|lib)\/.*\.css$/;
const COPY = /^((app|components|lib)\/.*\.tsx|content\/.*\.mdx)$/;

const rules = [
	{
		id: "colour-literal",
		files: SOURCE,
		except: ["app/tokens.css", "lib/og-theme.ts"],
		pattern: /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\(/i,
		message: "colour literal: use a token from app/tokens.css",
	},
	{
		id: "font-literal",
		files: SOURCE,
		except: ["app/tokens.css"],
		pattern: /font-family:(?!\s*var\()|fontFamily:\s*["'`]|\bfont-\[/,
		message: "font literal: use --font-display, --font-body or --font-outlier",
	},
	{
		id: "boxes",
		files: CLASSES,
		pattern: /(?<=["'`\s])(?:rounded|shadow)(?:-[^\s"'`]+)?(?=["'`\s])/,
		onlyIf: /className|class=|cn\(/,
		message: "rounded-* and shadow-* are not used: rules carry the structure, never boxes",
	},
	{
		id: "boxes-css",
		files: CSS,
		except: ["app/tokens.css"],
		pattern: /border-radius:(?!\s*0\b)|box-shadow:(?!\s*none\b)/,
		message: "radius is 0 and there are no shadows",
	},
	{
		id: "transition-all",
		files: SOURCE,
		pattern: /\btransition-all\b|transition:\s*all\b/,
		message: "never transition all: name the property",
	},
	{
		id: "tracked-caps",
		files: SOURCE,
		pattern:
			/(?<=["'`\s])(?:uppercase|tracking-(?:wide|wider|widest)|tracking-\[\d)|text-transform:\s*uppercase|letter-spacing:(?!\s*(?:var\(|-|(?:0|normal)\s*(?:;|\}|$)))/,
		message: "labels are sentence case and untracked",
	},
	{
		id: "dashes",
		files: COPY,
		// An en dash is allowed only in a number range (2015 – 2019, 200–500ms).
		pattern: /—|(?<!\d\s?)–|–(?!\s?\d)/,
		message: "copy uses no em or en dashes: a comma, colon, full stop or parentheses",
	},
];

function codeOnly(file, text) {
	if (file.endsWith(".mdx")) {
		// Skip fenced code blocks and inline code in essays.
		let fenced = false;
		return text
			.split("\n")
			.map((line) => {
				if (/^\s*(```|~~~)/.test(line)) {
					fenced = !fenced;
					return "";
				}
				return fenced ? "" : line.replace(/`[^`]*`/g, "");
			})
			.join("\n");
	}
	return stripComments(text);
}

const findings = [];
for (const file of targetFiles(process.argv.slice(2))) {
	const applicable = rules.filter((r) => r.files.test(file) && !r.except?.includes(file));
	if (!applicable.length) continue;
	const text = readText(file);
	if (text === null) continue;
	const lines = codeOnly(file, text).split("\n");
	lines.forEach((line, i) => {
		for (const rule of applicable) {
			if (rule.onlyIf && !rule.onlyIf.test(line)) continue;
			if (rule.pattern.test(line)) {
				findings.push({ file, line: i + 1, message: `${rule.message} [${rule.id}]` });
			}
		}
	});
}
report("design rules", findings);
