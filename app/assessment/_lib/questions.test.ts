import assert from "node:assert/strict";
import { test } from "node:test";
import { DIMENSIONS, type DimensionKey, MODEL_VERSION } from "./questions.ts";

// Guards against silent cross-repo drift from boltn-private ops/assessment/MODEL.md §§3 and 5.
// There is no CI link between the two repos, so this file is one of the only drift defences.

const CANONICAL_ORDER: DimensionKey[] = [
	"cap1",
	"cap2",
	"cap3",
	"cap4",
	"cap5",
	"cap6",
	"cap7",
	"sec",
	"cost",
	"flu",
	"iface",
];

test("DIMENSIONS has exactly 11 entries", () => {
	assert.equal(DIMENSIONS.length, 11);
});

test("keys appear in the canonical answer-index order", () => {
	assert.deepEqual(
		DIMENSIONS.map((d) => d.key),
		CANONICAL_ORDER,
	);
});

test("keys are unique", () => {
	assert.equal(new Set(DIMENSIONS.map((d) => d.key)).size, DIMENSIONS.length);
});

test("exactly 7 capability dimensions, and they are cap1..cap7", () => {
	const capability = DIMENSIONS.filter((d) => d.kind === "capability");
	assert.equal(capability.length, 7);
	assert.deepEqual(
		capability.map((d) => d.key),
		["cap1", "cap2", "cap3", "cap4", "cap5", "cap6", "cap7"],
	);
});

test("exactly 3 calibration dimensions, and they are sec, cost, iface", () => {
	const calibration = DIMENSIONS.filter((d) => d.kind === "calibration");
	assert.equal(calibration.length, 3);
	assert.deepEqual(
		calibration.map((d) => d.key),
		["sec", "cost", "iface"],
	);
});

test("exactly 1 enablement dimension, and it is flu (Human Fluency)", () => {
	const enablement = DIMENSIONS.filter((d) => d.kind === "enablement");
	assert.equal(enablement.length, 1);
	assert.equal(enablement[0].key, "flu");
	assert.equal(enablement[0].name, "Human Fluency");
});

test("flu is NOT a calibration dimension (D-19 names exactly three trade-offs)", () => {
	const flu = DIMENSIONS.find((d) => d.key === "flu");
	assert.ok(flu, "flu dimension must exist");
	assert.notEqual(flu.kind, "calibration");
	assert.equal(flu.kind, "enablement");
});

test("every name and question is a non-empty string", () => {
	for (const d of DIMENSIONS) {
		assert.equal(typeof d.name, "string", `${d.key} name must be a string`);
		assert.ok(d.name.trim().length > 0, `${d.key} name must be non-empty`);
		assert.equal(typeof d.question, "string", `${d.key} question must be a string`);
		assert.ok(d.question.trim().length > 0, `${d.key} question must be non-empty`);
	}
});

test("names match MODEL.md §3's Dimension column", () => {
	assert.deepEqual(
		DIMENSIONS.map((d) => d.name),
		[
			"Codebase Readiness",
			"Context Architecture",
			"Skills as Software",
			"Testing Agent Behaviour",
			"Observability & Measurement",
			"Organisational Readiness",
			"Meta-Agents",
			"Security & Guardrails",
			"Cost & Economic Governance",
			"Human Fluency",
			"Interface & Discovery",
		],
	);
});

test('MODEL_VERSION is "1"', () => {
	assert.equal(MODEL_VERSION, "1");
});
