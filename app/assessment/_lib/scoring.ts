// Scoring for the Quick assessment's 11 answers.
//
// SERVER-ONLY BY CONVENTION. Import this module only from Server Components and Server
// Actions — never from a Client Component, i.e. any file carrying the client directive.
// (That directive is not spelled out here on purpose: the leakage checks in this phase grep
// for it, and a mention in prose would read as a hit.) The rule is enforced against the build
// artefact, not the source: plan 04-07 greps `.next/static/` for the band names below and
// fails if any of them ship to the browser. That grep checks the output, which is what
// actually matters; the `server-only` package would only check the intent, and adding a
// dependency to restate something a grep already verifies is not justified.
//
// Honest scope note: this module is not secret. Once answers live in the URL (D-09) and the
// result page renders a band, the mapping is recoverable by enumerating 4,194,304 URLs —
// about 1.3 seconds of work. D-19 publishes all 11 dimensions deliberately anyway. The real
// instrument is the 106-question Full assessment and the per-dimension narratives file that
// sits beside MODEL.md, which D-14 and the repo-scope rule keep out of this repo entirely.
//
// SOURCE OF TRUTH: `ops/assessment/MODEL.md` in the boltn-private repo — §4 for the core
// score, the five thresholds and the band names; §7 for the narratives. This file is a
// manual transcription across a repo boundary with no CI link. If the two disagree,
// MODEL.md wins and this file is the thing that is wrong.

import type { Answer } from "./codec.ts";
import { DIMENSIONS } from "./questions.ts";

export type ScoreResult = {
	/** Sum of the 7 capability answers. 0-14. */
	rawCore: number;
	/** `rawCore * 10`, presented as an indicative 0-140 figure (D-02). */
	indicative: number;
	/** One of the five MODEL.md §4 band names, verbatim. */
	band: string;
	/** The matching MODEL.md §7 Quick (leadership register) paragraph, verbatim. */
	narrative: string;
	/** Names of every dimension — core or not — answered `"unsure"`, in DIMENSIONS order. */
	blindSpots: string[];
	unsureCount: number;
	confidence: "High" | "Moderate" | "Low" | "Indicative only";
};

/**
 * MODEL.md §4 core bands, evaluated top-down: the first threshold the indicative score
 * meets or exceeds wins.
 *
 * The five names are byte-identical to MODEL.md §4 and plan 04-07's bundle grep matches on
 * these exact strings — a typo here silently disables that gate. Do not "tidy" them.
 */
const BANDS: ReadonlyArray<readonly [number, string]> = [
	[110, "Living systems"],
	[80, "Engineering-grade AI adoption"],
	[50, "Emerging discipline"],
	[25, "Aspiration exceeding execution"],
	[0, "Not ready"],
];

/**
 * MODEL.md §7, "Core band narratives (Quick — leadership register)", verbatim.
 *
 * The Quick register is deliberate: MODEL.md also carries a Full register, but those
 * paragraphs are written for a facilitated debrief and read wrong on a self-serve page.
 *
 * Rendering this paragraph at all is a planning-time reading of D-12 plus D-15, not an
 * explicit instruction: a band shown with no prose reads as a grade handed down, which D-15
 * and VOICE.md forbid. It is one paragraph to delete if Steve rules otherwise at the plan
 * 04-07 checkpoint.
 *
 * This is NOT a per-dimension narrative. D-14 stands: the per-dimension narratives file in
 * boltn-private must not be copied into this repo.
 */
const NARRATIVES: Record<string, string> = {
	"Living systems":
		"At a leadership level this reads as fully operationalised: AI is how engineering works, not a project it runs. Your job now is oversight — keep asking for the evidence that the autonomy is still earned.",
	"Engineering-grade AI adoption":
		"This reads as a mature, engineered practice. The questions to keep asking your leaders: is it the default everywhere, and can we still prove it pays?",
	"Emerging discipline":
		"The picture is promising but uneven — strong instincts, partial foundations. The leadership question is not 'how do we do more AI' but 'which foundation is weakest, and are we fixing it before we scale.'",
	"Aspiration exceeding execution":
		"Ambition is running ahead of the plumbing. Much of the AI use rests on trust rather than tested, measured foundations. The right next step is to treat the low-scoring basics as prerequisites, not a later phase.",
	"Not ready":
		"This is an early-stage picture, which is a fine place to start. The value here is direction: name the one foundation to build first rather than buying more tools.",
};

/** Band name to URL slug, for the OG image route (plan 04-05). */
export const BAND_SLUGS: Record<string, string> = {
	"Living systems": "living-systems",
	"Engineering-grade AI adoption": "engineering-grade",
	"Emerging discipline": "emerging-discipline",
	"Aspiration exceeding execution": "aspiration-exceeding-execution",
	"Not ready": "not-ready",
};

/**
 * The ONLY place in the codebase where "Not sure" becomes zero.
 *
 * Deliberately not exported and never called from another module. The `"unsure"` answer
 * scores 0 but is a first-class answer (D-04, MODEL.md §2) — it drives the blind-spot list
 * and lowers the confidence indicator. A bug that collapses `"unsure"` into `No` produces
 * *arithmetically correct* output, so no score-based test can see it; only the blind spots
 * and the confidence indicator can. That is why `scoring.test.ts` asserts all three together.
 *
 * Never nullish-coalesce an answer into a zero, never numeric-coerce one with a falsy
 * fallback, never test one for falsiness, and never add one to a running total directly.
 * The `Answer` union makes all four a type error; keep it that way.
 */
function points(a: Answer): 0 | 1 | 2 {
	return a === "unsure" ? 0 : a;
}

function bandFor(indicative: number): string {
	for (const [min, name] of BANDS) {
		if (indicative >= min) return name;
	}
	// Unreachable: the last threshold is 0 and `indicative` is never negative.
	throw new Error(`No band for indicative score ${indicative}`);
}

/**
 * Confidence from the number of "Not sure" answers.
 *
 * These four thresholds are a judgement call made at planning time, NOT upstream policy.
 * MODEL.md §2 and §4 require only that a confidence indicator exists and that each
 * "Not sure" lowers it; the exact cut points are ours. Flagged for Steve at the plan 04-07
 * checkpoint — changing them is a one-line edit with no structural impact.
 */
function confidenceFor(unsureCount: number): ScoreResult["confidence"] {
	if (unsureCount === 0) return "High";
	if (unsureCount <= 2) return "Moderate";
	if (unsureCount <= 5) return "Low";
	return "Indicative only";
}

/** Band name to URL slug. Throws on an unknown band — an internal programming error. */
export function bandSlug(band: string): string {
	const slug = BAND_SLUGS[band];
	if (!slug) throw new Error(`Unknown band: ${band}`);
	return slug;
}

/**
 * Score a complete set of 11 answers, in canonical `DIMENSIONS` order.
 *
 * MODEL.md §4's cross-cutting bands for `sec`, `cost`, `flu` and `iface` are deliberately
 * NOT implemented. They are calibrated against the Full instrument's maxima (24/20/12/16)
 * and cannot be rendered from a single Quick answer, and D-12 excludes them from the result
 * anyway. Do not add them here.
 *
 * Throws only on a wrong-length answer set — an internal programming error, not user input.
 * `submitAssessment` validates the form before calling this.
 */
export function score(answers: Answer[]): ScoreResult {
	if (answers.length !== DIMENSIONS.length) {
		throw new Error(`Expected ${DIMENSIONS.length} answers, got ${answers.length}`);
	}

	let rawCore = 0;
	const blindSpots: string[] = [];

	for (let i = 0; i < DIMENSIONS.length; i++) {
		const dimension = DIMENSIONS[i];
		const answer = answers[i];

		// The core score is selected by the `kind` field, never by index arithmetic or a
		// slice — so a future question-set change cannot silently shift which dimensions
		// are core.
		if (dimension.kind === "capability") {
			rawCore += points(answer);
		}

		// A blind spot is any dimension answered "Not sure", core or not. Northwind's
		// Interface & Discovery proves the non-core case is intended (MODEL.md §8).
		if (answer === "unsure") {
			blindSpots.push(dimension.name);
		}
	}

	const indicative = rawCore * 10;
	const band = bandFor(indicative);
	const unsureCount = blindSpots.length;

	return {
		rawCore,
		indicative,
		band,
		narrative: NARRATIVES[band],
		blindSpots,
		unsureCount,
		confidence: confidenceFor(unsureCount),
	};
}
