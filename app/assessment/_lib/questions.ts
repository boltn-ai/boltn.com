// The Quick instrument's 11 dimensions and questions.
//
// SOURCE OF TRUTH: `ops/assessment/MODEL.md` §§3 and 5 in the boltn-private repo,
// model dated 2026-08-17. This file is a manual transcription across a repo boundary.
// There is no CI link between the two repos: if this file and MODEL.md ever disagree,
// MODEL.md wins and this file is the thing that is wrong. The drift defences are this
// comment, `questions.test.ts`, and the codec's version marker — nothing else.
//
// The array order below IS the answer-index order used by `codec.ts` and `scoring.ts`.
// Reordering it silently invalidates every result link ever issued.

export type DimensionKey =
	| "cap1"
	| "cap2"
	| "cap3"
	| "cap4"
	| "cap5"
	| "cap6"
	| "cap7"
	| "sec"
	| "cost"
	| "flu"
	| "iface";

export type Dimension = {
	key: DimensionKey;
	name: string;
	/**
	 * From MODEL.md §3's Kind column.
	 * - `capability`  — more-is-better; the only kind that contributes to the core score.
	 * - `calibration` — a trade-off, read against friction rather than as a maximum.
	 *                   D-19 names exactly three: Security & Guardrails, Cost & Economic
	 *                   Governance, Interface & Discovery.
	 * - `enablement`  — more-is-better but outside the core score, banded separately.
	 *                   Human Fluency only. It is NOT a trade-off; typing it `calibration`
	 *                   would put trade-off framing on it in the result copy and read as
	 *                   incoherent.
	 */
	kind: "capability" | "calibration" | "enablement";
	question: string;
};

/** Bump when the question set changes. Consumed by `codec.ts` as the version-registry key. */
export const MODEL_VERSION = "1";

export const DIMENSIONS: readonly Dimension[] = [
	{
		key: "cap1",
		name: "Codebase Readiness",
		kind: "capability",
		question: "Can a new engineer get productive quickly, or does our codebase fight them?",
	},
	{
		key: "cap2",
		name: "Context Architecture",
		kind: "capability",
		question:
			"Have we written down and maintained guidance for our AI tools about how our systems work — or are they guessing from defaults?",
	},
	{
		key: "cap3",
		name: "Skills as Software",
		kind: "capability",
		question:
			"Do we build reusable, reviewed AI workflows — or does everyone improvise their own prompts?",
	},
	{
		key: "cap4",
		name: "Testing Agent Behaviour",
		kind: "capability",
		question: "Do we verify that AI-generated work is actually correct — or trust it and hope?",
	},
	{
		key: "cap5",
		name: "Observability & Measurement",
		kind: "capability",
		question:
			"Can we show with data whether AI tooling makes us faster and better — or is it a feeling?",
	},
	{
		key: "cap6",
		name: "Organisational Readiness",
		kind: "capability",
		question: "Is AI adoption owned, resourced and led — or a few enthusiasts' side project?",
	},
	{
		key: "cap7",
		name: "Meta-Agents",
		kind: "capability",
		question:
			"Do our AI systems help maintain and improve themselves — or does every improvement need a person?",
	},
	{
		key: "sec",
		name: "Security & Guardrails",
		kind: "calibration",
		question:
			"Are there real guardrails on what our AI agents can see and do — secrets, production, untrusted input?",
	},
	{
		key: "cost",
		name: "Cost & Economic Governance",
		kind: "calibration",
		question: "Do we know what our AI tooling costs — and whether it is paying for itself?",
	},
	{
		key: "flu",
		name: "Human Fluency",
		kind: "enablement",
		question:
			"Is working well with AI a competency across the org — engineers, product, design — or just a specialist few?",
	},
	{
		key: "iface",
		name: "Interface & Discovery",
		kind: "calibration",
		question:
			"When a document or tool our agents rely on turns out to be wrong, do we fix the source — or do people quietly work around it?",
	},
];
