// URL codec for the Quick assessment's 11 answers.
//
// STRICTLY PURE: no framework imports, no environment access, no crypto module, no I/O.
// Purity is what lets a Server Action, a Server Component and (if ever needed) a client
// component all import this, and what makes it exhaustively testable by `node --test`
// with zero mocking. Do not add a dependency here.
//
// This module IS the persistence layer. D-09/D-10 deleted the datastore: 22 bits of
// state do not justify a database, so the result lives in the URL and is permanent.
//
// FORMAT (13 characters): version(1) + answers(11) + check(1)
//   e.g. https://boltn.com/assessment/r/1yypnnpnpnpu7
// Answer alphabet `npyu`: n = No (0), p = Partly (1), y = Yes (2), u = Not sure.
// `u` is deliberate — a literal `?` is the query-string delimiter and must never reach
// a URL, so the "Not sure" answer is encoded rather than escaped. No percent-encoding
// is ever needed for a code.
//
// Answer order is the canonical `DIMENSIONS` order in `questions.ts`:
// cap1, cap2, cap3, cap4, cap5, cap6, cap7, sec, cost, flu, iface.

import { MODEL_VERSION } from "./questions.ts";

/**
 * The four answer values from MODEL.md §2.
 *
 * `"unsure"` is a string literal on purpose — it is the D-04 defence. It makes
 * `sum += answer` a type error, and nullish-coalescing an answer into a zero becomes a
 * no-op that TypeScript flags, so "Not sure"
 * cannot silently collapse into "No". Never model it as `null`, `undefined`, `-1` or `NaN`.
 *
 * A fifth state exists in the browser before submission — `undefined`, meaning *unanswered*.
 * It has no encoding, and it must not get one: submission is blocked until all 11 are
 * answered, which is what makes every valid code a complete result.
 */
export type Answer = 0 | 1 | 2 | "unsure";

const ALPHABET = "npyu"; // 0 = No, 1 = Partly, 2 = Yes, 3 = Not sure
const CHECK = "0123456789abcdefghjkmnpqrstvwxyz"; // 32 chars, Crockford-ish

/** Equal to `MODEL_VERSION` by construction, so the question set and the codec cannot drift. */
export const CURRENT_VERSION: string = MODEL_VERSION;

/**
 * Version registry, keyed by the code's first character.
 *
 * RETENTION RULE — read before changing the question set. When the question set changes,
 * add a `"2"` entry and **keep `"1"` forever**. Links already shared keep decoding against
 * the table they were issued under, which is the entire point of the version marker.
 * Deleting an old entry is a silent failure that only bites months later, when someone
 * opens an old link and gets a 404 for a result that was promised to be permanent.
 */
const VERSIONS: Record<string, { length: number }> = {
	"1": { length: 11 },
};

const idx = (a: Answer): number => (a === "unsure" ? 3 : a);

/**
 * Check character: arithmetic over char codes, seeded at 7, mod 32.
 *
 * TAMPER-EVIDENCE — considered and deliberately limited to this. An HMAC was rejected:
 * it needs a server secret (which breaks this module's purity), it makes links
 * non-reproducible across preview and production, and rotating the secret would
 * invalidate every result ever shared — contradicting D-09's "the result is permanent".
 * Forgery is not a threat worth defending: the instrument is free, unauthenticated and
 * self-reported, so anyone wanting a top band just answers Yes eleven times. There is no
 * gate to bypass. The check character earns its three lines only because it catches
 * single-character substitution, which the fixed length cannot see and which would
 * otherwise render a plausible but wrong band. Do not "upgrade" this to a signature.
 */
function checkChar(payload: string): string {
	let h = 7;
	for (let i = 0; i < payload.length; i++) {
		h = (h * 31 + payload.charCodeAt(i)) % 32;
	}
	return CHECK[h];
}

/** Throws only on a wrong-length answer set — an internal programming error, not user input. */
export function encode(answers: Answer[], version: string = CURRENT_VERSION): string {
	const spec = VERSIONS[version];
	if (!spec || answers.length !== spec.length) {
		throw new Error("bad answer set");
	}
	const payload = version + answers.map((a) => ALPHABET[idx(a)]).join("");
	return payload + checkChar(payload);
}

/**
 * Total: returns `null` for ANY malformed input and never throws.
 *
 * This is the only untrusted input this module handles — an arbitrary attacker-controlled
 * path segment off the network. Guards run in order: non-string, too short, unknown
 * version, wrong length for that version, check-character mismatch, illegal answer
 * character. Work is bounded to a fixed 13-character scan: no integer parsing, no
 * dynamic evaluation, no regex backtracking, and no allocation proportional to input.
 */
export function decode(code: string): Answer[] | null {
	if (typeof code !== "string" || code.length < 3) return null;

	const version = code[0];
	const spec = VERSIONS[version];
	if (!spec) return null; // unknown or future version — not a link this deployment issued
	if (code.length !== 1 + spec.length + 1) return null; // truncated or padded

	const payload = code.slice(0, -1);
	if (checkChar(payload) !== code[code.length - 1]) return null; // corrupted in transit

	const out: Answer[] = [];
	for (let i = 1; i <= spec.length; i++) {
		const k = ALPHABET.indexOf(code[i]);
		if (k < 0) return null; // illegal answer character
		out.push(k === 3 ? "unsure" : (k as 0 | 1 | 2));
	}
	return out;
}
