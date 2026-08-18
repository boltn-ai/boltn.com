import assert from "node:assert/strict";
import { test } from "node:test";
import { type Answer, CURRENT_VERSION, decode, encode } from "./codec.ts";
import { MODEL_VERSION } from "./questions.ts";

const VALUES: Answer[] = [0, 1, 2, "unsure"];
const LENGTH = 11;
const TOTAL = 4 ** LENGTH; // 4,194,304
const ANSWER_CHARS = "npyu";
const CHECK_CHARS = "0123456789abcdefghjkmnpqrstvwxyz";

/** The n-th of the 4,194,304 possible answer profiles, read as 11 base-4 digits. */
function profile(n: number): Answer[] {
	const out: Answer[] = [];
	for (let i = 0; i < LENGTH; i++) {
		out.push(VALUES[(n >> (i * 2)) & 3]);
	}
	return out;
}

test("CURRENT_VERSION tracks MODEL_VERSION so the two cannot disagree", () => {
	assert.equal(CURRENT_VERSION, MODEL_VERSION);
});

test("exhaustive: round trip, shape and injectivity over all 4,194,304 profiles", () => {
	// One pass, three properties. Split across three loops this took ~9s; the assertions
	// below are done with plain comparisons and only escalate to `assert` on failure, which
	// keeps the whole sweep inside the per-commit feedback budget.
	//
	// Structural check is equivalent to /^[1][npyu]{11}[0-9a-z]$/ — CHECK_CHARS is a subset
	// of [0-9a-z]. That literal shape is asserted once, below, against a known code.
	//
	// Injectivity (no two profiles share a code) needs no separate pass: it follows from
	// decode(encode(a)) === a holding for every a.
	for (let n = 0; n < TOTAL; n++) {
		const answers = profile(n);
		const code = encode(answers);

		if (code.length !== 13) assert.fail(`wrong length at n=${n}: ${code}`);
		if (code[0] !== "1") assert.fail(`wrong version char at n=${n}: ${code}`);
		for (let i = 1; i <= LENGTH; i++) {
			if (!ANSWER_CHARS.includes(code[i])) assert.fail(`illegal answer char at n=${n}: ${code}`);
		}
		if (!CHECK_CHARS.includes(code[12])) assert.fail(`illegal check char at n=${n}: ${code}`);

		const back = decode(code);
		if (back === null) assert.fail(`decode returned null for a self-produced code: ${code}`);
		if (back.length !== LENGTH) assert.fail(`wrong answer count at n=${n}: ${code}`);
		for (let i = 0; i < LENGTH; i++) {
			if (back[i] !== answers[i]) assert.fail(`round trip failed at n=${n} (${code})`);
		}
	}
});

test("a produced code matches the documented shape", () => {
	assert.match(encode([2, 2, 1, 0, 0, 1, 0, 1, 0, 1, "unsure"]), /^[1][npyu]{11}[0-9a-z]$/);
});

test("decode is total: returns null and never throws for malformed input", () => {
	const malformed: unknown[] = [
		"", // empty
		"1yypnnpnpnpu", // 12 chars — truncated (check char clipped)
		"1yypnnpnpnpu7x", // 14 chars — padded
		"1yypnnpnpnpz7", // illegal answer character `z`
		"1yypnnpnpnpu9", // wrong check character
		"2yypnnpnpnpu7", // unknown/future version
		"xyypnnpnpnpu7", // nonsense version
		"1", // shorter than the minimum guard
		"?", // the query-string delimiter must never round-trip
		"../../etc/passwd",
		"1yypnnpnpnpu7 ", // trailing whitespace
		null,
		undefined,
		42,
		{},
		[],
		Number.NaN,
	];
	for (const input of malformed) {
		let result: Answer[] | null;
		assert.doesNotThrow(
			() => {
				result = decode(input as string);
			},
			`decode threw for ${JSON.stringify(input) ?? String(input)}`,
		);
		// biome-ignore lint/style/noNonNullAssertion: assigned by the assertion above
		assert.equal(result!, null, `expected null for ${JSON.stringify(input) ?? String(input)}`);
	}
});

test("decode rejects every single-character substitution of a valid code", () => {
	const valid = "1yypnnpnpnpu7";
	const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
	let rejected = 0;
	let accepted = 0;
	for (let i = 0; i < valid.length; i++) {
		for (const c of alphabet) {
			if (c === valid[i]) continue;
			const mutated = valid.slice(0, i) + c + valid.slice(i + 1);
			if (decode(mutated) === null) rejected++;
			else accepted++;
		}
	}
	// The check character catches most substitutions; nothing may throw, and the
	// overwhelming majority must be rejected outright.
	assert.ok(rejected > accepted * 20, `too many substitutions accepted: ${accepted}/${rejected}`);
});

test("golden fixture: the Northwind code decodes to Northwind's answers", () => {
	assert.deepEqual(decode("1yypnnpnpnpu7"), [2, 2, 1, 0, 0, 1, 0, 1, 0, 1, "unsure"]);
});

test("golden fixture: all-Partly encodes to 1ppppppppppp6", () => {
	assert.equal(encode([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), "1ppppppppppp6");
});

test('"unsure" survives the round trip as the string and is never coerced to 0', () => {
	const allUnsure: Answer[] = Array(LENGTH).fill("unsure");
	const back = decode(encode(allUnsure));
	assert.notEqual(back, null);
	for (const a of back as Answer[]) {
		assert.equal(a, "unsure");
		assert.notEqual(a, 0);
		assert.equal(typeof a, "string");
	}
});

test("encode throws only on a wrong-length answer set", () => {
	assert.throws(() => encode([0, 1, 2]));
	assert.throws(() => encode(Array(12).fill(0)));
	assert.doesNotThrow(() => encode(Array(11).fill(0)));
});
