import assert from "node:assert/strict";
import { test } from "node:test";
import { type Answer, CURRENT_VERSION, decode, encode } from "./codec.ts";
import { MODEL_VERSION } from "./questions.ts";

const VALUES: Answer[] = [0, 1, 2, "unsure"];
const LENGTH = 11;
const TOTAL = 4 ** LENGTH; // 4,194,304

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

test("exhaustive round trip: decode(encode(a)) equals a for all 4,194,304 profiles", () => {
	for (let n = 0; n < TOTAL; n++) {
		const answers = profile(n);
		const code = encode(answers);
		const back = decode(code);
		if (back === null) {
			assert.fail(`decode returned null for a self-produced code: ${code}`);
		}
		assert.deepEqual(back, answers, `round trip failed at n=${n} (${code})`);
	}
});

test("every produced code is 13 characters and structurally well-formed", () => {
	const shape = /^[1][npyu]{11}[0-9a-z]$/;
	for (let n = 0; n < TOTAL; n++) {
		const code = encode(profile(n));
		assert.equal(code.length, 13, `wrong length at n=${n}: ${code}`);
		assert.match(code, shape, `bad shape at n=${n}: ${code}`);
	}
});

test("codes are unique across the whole state space", () => {
	const seen = new Set<string>();
	for (let n = 0; n < TOTAL; n++) {
		seen.add(encode(profile(n)));
	}
	assert.equal(seen.size, TOTAL);
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
