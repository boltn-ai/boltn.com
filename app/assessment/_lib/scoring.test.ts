// Tests for the Quick instrument's scoring function.
//
// The fixtures below are transcribed from `ops/assessment/MODEL.md` §4 (bands), §7 (Quick
// narratives) and §8 (the Northwind worked example) in the boltn-private repo. They are
// never re-derived: if a test here disagrees with MODEL.md, MODEL.md wins.
//
// Imports use explicit `.ts` extensions and relative paths — the `@/*` path alias does not
// resolve under `node --test`.

import assert from "node:assert/strict";
import { test } from "node:test";

import type { Answer } from "./codec.ts";
import { DIMENSIONS } from "./questions.ts";
import { BAND_SLUGS, bandSlug, score } from "./scoring.ts";

/** Build an 11-answer profile from 7 capability answers plus the 4 non-core ones. */
function profile(caps: Answer[], nonCore: Answer[] = [0, 0, 0, 0]): Answer[] {
	assert.equal(caps.length, 7, "fixture error: 7 capability answers required");
	assert.equal(nonCore.length, 4, "fixture error: 4 non-core answers required");
	return [...caps, ...nonCore];
}

/** Seven capability answers (each 0/1/2) summing to exactly `r`. */
function capsSummingTo(r: number): Answer[] {
	assert.ok(r >= 0 && r <= 14, "fixture error: rawCore out of range");
	const caps: Answer[] = [0, 0, 0, 0, 0, 0, 0];
	let left = r;
	for (let i = 0; i < 7 && left > 0; i++) {
		const v = left >= 2 ? 2 : 1;
		caps[i] = v;
		left -= v;
	}
	return caps;
}

/**
 * The exhaustive band table — all 15 reachable states.
 * MODEL.md §4's five thresholds, tabulated. Quick can only produce these 15 scores, so
 * this is the complete fixture, not a sample.
 */
const BAND_TABLE: ReadonlyArray<readonly [number, number, string]> = [
	[0, 0, "Not ready"],
	[1, 10, "Not ready"],
	[2, 20, "Not ready"],
	[3, 30, "Aspiration exceeding execution"],
	[4, 40, "Aspiration exceeding execution"],
	[5, 50, "Emerging discipline"],
	[6, 60, "Emerging discipline"],
	[7, 70, "Emerging discipline"],
	[8, 80, "Engineering-grade AI adoption"],
	[9, 90, "Engineering-grade AI adoption"],
	[10, 100, "Engineering-grade AI adoption"],
	[11, 110, "Living systems"],
	[12, 120, "Living systems"],
	[13, 130, "Living systems"],
	[14, 140, "Living systems"],
];

test("exhaustive: every reachable rawCore 0-14 scales x10 and lands in the MODEL.md band", () => {
	assert.equal(BAND_TABLE.length, 15, "the table must cover all 15 reachable states");

	for (const [rawCore, indicative, band] of BAND_TABLE) {
		const result = score(profile(capsSummingTo(rawCore)));
		assert.equal(result.rawCore, rawCore, `rawCore for ${rawCore}`);
		assert.equal(result.indicative, indicative, `indicative for rawCore ${rawCore}`);
		assert.equal(result.band, band, `band for indicative ${indicative}`);
		assert.equal(result.indicative, result.rawCore * 10, "indicative is always rawCore x10");
	}
});

test("the 4 non-core dimensions contribute nothing to the core score", () => {
	// All seven capability answers No, all four non-core answers Yes.
	const result = score([0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2]);
	assert.equal(result.rawCore, 0);
	assert.equal(result.indicative, 0);
	assert.equal(result.band, "Not ready");

	// And the mirror: maxing the core with all non-core at No still tops out.
	const maxed = score([2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0]);
	assert.equal(maxed.rawCore, 14);
	assert.equal(maxed.indicative, 140);
	assert.equal(maxed.band, "Living systems");
});

test("MODEL.md §4 example 1: all-Partly gives 70, Emerging discipline", () => {
	const result = score([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
	assert.equal(result.rawCore, 7);
	assert.equal(result.indicative, 70);
	assert.equal(result.band, "Emerging discipline");
});

test("MODEL.md §4 example 2: all-Partly plus one capability Yes gives 80, Engineering-grade", () => {
	const result = score([2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
	assert.equal(result.rawCore, 8);
	assert.equal(result.indicative, 80);
	assert.equal(result.band, "Engineering-grade AI adoption");

	// Raising a NON-core answer instead must not move the band.
	const nonCoreRaise = score([1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1]);
	assert.equal(nonCoreRaise.indicative, 70);
	assert.equal(nonCoreRaise.band, "Emerging discipline");
});

/** MODEL.md §8 / EXAMPLE-northwind.json `quick` — the calibration fixture. */
const NORTHWIND: Answer[] = [2, 2, 1, 0, 0, 1, 0, 1, 0, 1, "unsure"];

test("MODEL.md §8 example 3: Northwind scores rawCore 6, indicative 60, Emerging discipline", () => {
	const result = score(NORTHWIND);
	assert.equal(result.rawCore, 6);
	assert.equal(result.indicative, 60);
	assert.equal(result.band, "Emerging discipline");
});

test("D-04: a Not sure scores 0 AND names a blind spot AND lowers confidence — all three", () => {
	// One "unsure" on cap4 (Testing Agent Behaviour); everything else Partly.
	const withUnsure = score([1, 1, 1, "unsure", 1, 1, 1, 1, 1, 1, 1]);

	// 1. It contributes 0 to the core score — six Partly answers, not seven.
	assert.equal(withUnsure.rawCore, 6, "Not sure must contribute 0 points");
	assert.equal(withUnsure.indicative, 60);

	// 2. It is named as a blind spot. This is the assertion a ?-collapses-to-No bug fails:
	//    the arithmetic of collapsing is correct, so only the blind spot and the confidence
	//    indicator can catch it.
	assert.ok(
		withUnsure.blindSpots.includes("Testing Agent Behaviour"),
		"Not sure must name the dimension as a blind spot",
	);

	// 3. It lowers the confidence indicator.
	assert.equal(withUnsure.unsureCount, 1);
	assert.equal(withUnsure.confidence, "Moderate");

	// The contrast case: an explicit No scores the same number but is NOT a blind spot and
	// leaves confidence untouched.
	const withNo = score([1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1]);
	assert.equal(withNo.rawCore, withUnsure.rawCore, "No and Not sure score identically");
	assert.deepEqual(withNo.blindSpots, [], "an explicit No is not a blind spot");
	assert.equal(withNo.unsureCount, 0);
	assert.equal(withNo.confidence, "High");
});

test("a blind spot can be a non-core dimension (Northwind's Interface & Discovery)", () => {
	const result = score(NORTHWIND);
	assert.deepEqual(result.blindSpots, ["Interface & Discovery"]);
	assert.equal(result.unsureCount, 1);
	assert.equal(result.confidence, "Moderate");
	// It is a blind spot despite contributing nothing to the number.
	assert.equal(result.rawCore, 6);
});

test("blind spots are reported in canonical DIMENSIONS order, by dimension name", () => {
	const answers: Answer[] = ["unsure", 1, 1, 1, 1, 1, "unsure", 1, 1, 1, "unsure"];
	const result = score(answers);
	assert.deepEqual(result.blindSpots, [
		"Codebase Readiness",
		"Meta-Agents",
		"Interface & Discovery",
	]);
	// Every blind spot name is a real dimension name.
	const names = DIMENSIONS.map((d) => d.name);
	for (const spot of result.blindSpots) {
		assert.ok(names.includes(spot), `${spot} is not a DIMENSIONS name`);
	}
});

test("confidence bands: 0 High, 1-2 Moderate, 3-5 Low, 6+ Indicative only", () => {
	const expected: ReadonlyArray<readonly [number, string]> = [
		[0, "High"],
		[1, "Moderate"],
		[2, "Moderate"],
		[3, "Low"],
		[4, "Low"],
		[5, "Low"],
		[6, "Indicative only"],
		[11, "Indicative only"],
	];

	for (const [unsureCount, confidence] of expected) {
		const answers: Answer[] = [];
		for (let i = 0; i < 11; i++) {
			answers.push(i < unsureCount ? "unsure" : 1);
		}
		const result = score(answers);
		assert.equal(result.unsureCount, unsureCount, `unsureCount for ${unsureCount} unsures`);
		assert.equal(result.confidence, confidence, `confidence for ${unsureCount} unsures`);
		assert.equal(result.blindSpots.length, unsureCount, "blindSpots.length === unsureCount");
	}
});

test("bandSlug produces the five URL slugs, and every band in the table has one", () => {
	assert.equal(bandSlug("Living systems"), "living-systems");
	assert.equal(bandSlug("Engineering-grade AI adoption"), "engineering-grade");
	assert.equal(bandSlug("Emerging discipline"), "emerging-discipline");
	assert.equal(bandSlug("Aspiration exceeding execution"), "aspiration-exceeding-execution");
	assert.equal(bandSlug("Not ready"), "not-ready");

	// Every band reachable from the exhaustive table has a slug, and slugs are URL-safe
	// and unique.
	const seen = new Set<string>();
	for (const [, , band] of BAND_TABLE) {
		const slug = bandSlug(band);
		assert.match(slug, /^[a-z0-9-]+$/, `${band} slug is not URL-safe`);
		assert.ok(band in BAND_SLUGS, `${band} is missing from BAND_SLUGS`);
		seen.add(slug);
	}
	assert.equal(seen.size, 5, "the five bands must map to five distinct slugs");
	assert.equal(Object.keys(BAND_SLUGS).length, 5);
});

test("every band carries a non-empty, distinct Quick-register narrative", () => {
	const narratives = new Set<string>();
	for (const [rawCore, , band] of BAND_TABLE) {
		const result = score(profile(capsSummingTo(rawCore)));
		assert.ok(result.narrative.length > 0, `${band} has no narrative`);
		narratives.add(result.narrative);
	}
	assert.equal(narratives.size, 5, "one distinct narrative per band");

	// MODEL.md §7, Quick (leadership) register — verbatim opening, not the Full register.
	assert.ok(
		score([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]).narrative.startsWith(
			"The picture is promising but uneven",
		),
		"Emerging discipline must use the Quick leadership-register paragraph",
	);
});

test("score rejects a wrong-length answer set", () => {
	assert.throws(() => score([1, 1, 1]));
	assert.throws(() => score([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]));
});
