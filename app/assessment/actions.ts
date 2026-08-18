"use server";

// The Quick assessment's only Server Action: validate 11 answers, encode them, redirect.
//
// Placed unprefixed beside the route, matching `app/contact/actions.ts`. The private
// folders under `app/assessment/` are `_lib` and `_components` only.
//
// This action writes nothing, anywhere. D-09/D-10 deleted the datastore — the answers live
// in the URL and the result page is the only artefact. D-21 removed email capture, so no
// message is sent, no personal data is collected, and `app/legal/privacy/page.tsx` stays
// accurate without being touched (D-23). The discovery-call CTA is the only conversion path.

import { redirect } from "next/navigation";
import { type Answer, encode } from "./_lib/codec.ts";
import { DIMENSIONS } from "./_lib/questions.ts";

export type SubmitState = { error: string | null };

const INCOMPLETE = "Answer all eleven before seeing the result.";

export async function submitAssessment(
	_prevState: SubmitState,
	formData: FormData,
): Promise<SubmitState> {
	const answers: Answer[] = [];

	// THE TRUST BOUNDARY (T-04-06). Every field name and value here is attacker-controlled;
	// the client-side `required` attribute is a convenience for real users and proves
	// nothing. Iterate the fixed DIMENSIONS list rather than the submitted keys, so extra
	// or renamed fields are ignored rather than interpreted, and accept an explicit
	// allow-list of exactly four string values. Three comparisons do not warrant a
	// schema-validation library (D-08), and none is installed.
	for (const dimension of DIMENSIONS) {
		const raw = formData.get(dimension.key)?.toString();

		// "unsure" is checked FIRST and EXPLICITLY, before any numeric branch. It is a real
		// answer (D-04), not a missing one: if it ever falls through to a coercion it
		// becomes 0 and silently reads as "No", which scores identically and so cannot be
		// caught by any assertion on the number alone.
		if (raw === "unsure") {
			answers.push("unsure");
			continue;
		}

		if (raw === "0" || raw === "1" || raw === "2") {
			answers.push(Number(raw) as 0 | 1 | 2);
			continue;
		}

		// Anything else — a missing field, an empty string, "3", an injected value.
		return { error: INCOMPLETE };
	}

	// The loop above pushes exactly one entry per dimension or returns early, so `answers`
	// is guaranteed to be DIMENSIONS-length here. `encode` throws only on a wrong-length
	// array, which is therefore unreachable — there is nothing to handle, and the next line
	// explains why that matters.
	const code = encode(answers);

	// ⚠ DO NOT WRAP THIS IN try/catch, AND DO NOT ADD ONE ANYWHERE IN THIS FILE.
	// `redirect` signals by throwing NEXT_REDIRECT. A guard around it swallows the throw and
	// turns a successful submission into a generic error with nothing in the server log.
	// `app/contact/actions.ts` is guard-shaped because it wraps a fallible network call and
	// never redirects; it is the template an implementer will reach for, and no other file
	// in this repo demonstrates the correct shape. This call must stay at the top level of
	// the function body.
	//
	// The redirect target is always our own `encode` output prefixed with a literal path —
	// never a value read out of the request (T-04-07). There is no `next` or `returnTo`
	// parameter and there must never be one.
	//
	// Next.js performs a client-side navigation when JavaScript is available and emits a 303
	// for progressive-enhancement submits, so the whole instrument works with JS disabled.
	redirect(`/assessment/r/${code}`);
}
