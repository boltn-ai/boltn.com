"use client";

// The ONLY client boundary on /assessment.
//
// It owns exactly two things: the answered count that drives the sticky indicator, and the
// pending/error state of the submission. It does NOT own the answers — the DOM does. Eleven
// controlled radio groups would mean eleven pieces of React state, a re-render of the whole
// page on every click, and a form that stops working when scripting is unavailable, in
// exchange for nothing this page needs.
//
// The eleven question cards arrive as `children` from the RSC page. That keeps `QuestionCard`
// a Server Component: its subtree is rendered on the server and passed through as an already
// -built React node, so nothing in it crosses this boundary.
//
// WHAT THIS FILE MUST NEVER IMPORT: the scoring module (T-04-15). Band names reaching the
// browser bundle is the one information-disclosure failure this route has, and 04-07 gates it
// against the build artefact. Scoring happens in the Server Action and on the result page.
//
// Also deliberately absent, each an instruction rather than an oversight:
//   - No motion library and no form or schema library (D-07/D-08). None is installed, and
//     nothing here needs one: three state values and eleven radio groups.
//   - No address field, no name field, no opt-in box, anywhere (D-21/D-22). The form posts
//     eleven radio values and nothing else, so there is no personal-data sink to reason about
//     and the live Privacy Policy stays accurate without being touched (D-23, T-04-17).
//   - Nothing written to terminal equipment. Draft answers in browser storage are regulated
//     by PECR reg. 6 whether or not they are a cookie (T-04-13).
//   - The stale shared button component is not used; it has zero importers and predates the
//     02.2 design system. The submit button below is the contact form's button verbatim.

import { useActionState, useState } from "react";
import { DIMENSIONS } from "../_lib/questions.ts";
import { type SubmitState, submitAssessment } from "../actions";
import { ProgressCounter } from "./progress-counter";

const initialState: SubmitState = { error: null };

const TOTAL = DIMENSIONS.length;

// Counted off the DOM rather than off React state. Radio groups only appear in the form data
// once one of their four inputs is checked, so a group with no value is simply absent.
// Iterating the fixed dimension list rather than the submitted entries means any field that is
// not one of the eleven — there are none today, and there must not be — cannot inflate the
// count. This is the same allow-list shape the Server Action uses at the trust boundary,
// though nothing here is trusted: the count is a display, not a gate.
function countAnswered(form: HTMLFormElement): number {
	const data = new FormData(form);
	let answered = 0;
	for (const dimension of DIMENSIONS) {
		if (data.get(dimension.key) !== null) {
			answered++;
		}
	}
	return answered;
}

export function AssessmentForm({ children }: { children: React.ReactNode }) {
	const [state, formAction, isPending] = useActionState(submitAssessment, initialState);
	const [answered, setAnswered] = useState(0);

	return (
		<>
			{state.error && (
				// The contact form's panel shape, verbatim. Those raw palette values are a known
				// inconsistency with STYLE_GUIDE §7, shared with the contact page — reused here on
				// purpose, because a third error style would be worse than one inconsistent one.
				//
				// Sited above the form rather than beside the button because the path that reaches
				// it is the scripting-disabled one: the browser's own required-field check blocks an
				// incomplete submit when scripting is on, so this panel is what a full page reload
				// lands on, at the top of the document.
				<div className="mx-auto mb-10 max-w-5xl px-6">
					<div
						role="alert"
						aria-live="assertive"
						className="border border-red-500/30 bg-red-500/10 p-4"
					>
						<p className="text-sm text-red-400">{state.error}</p>
					</div>
				</div>
			)}

			{/* Handing the dispatch function straight to the form's action attribute below is what
			    makes the scripting-disabled path work: React posts the form natively and the Server
			    Action's redirect answers with a 303. The change handler
			    is progressive decoration on top of that — when it does not run, the indicator simply
			    reads 00 and every question stays answerable and submittable. */}
			<form
				action={formAction}
				onChange={(event) => {
					setAnswered(countAnswered(event.currentTarget));
				}}
			>
				<ProgressCounter answered={answered} total={TOTAL} />

				<div className="mx-auto max-w-5xl space-y-16 px-6 pt-12 pb-24">
					{children}

					{/* The pending state is a label swap plus reduced opacity, and nothing else.
					    STYLE_GUIDE §6 bans animated loading indicators outright, so there is no
					    rotating glyph, no pulsing bar and no skeleton here. */}
					<button
						type="submit"
						disabled={isPending}
						className="w-full bg-(--accent) px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-(--bg) transition-opacity duration-200 hover:opacity-[0.88] disabled:opacity-50"
					>
						{isPending ? "Scoring…" : "See the result"}
					</button>
				</div>
			</form>
		</>
	);
}
