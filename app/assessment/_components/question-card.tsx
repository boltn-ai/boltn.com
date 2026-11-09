// One dimension of the Quick instrument, rendered as a native radio group.
//
// This is a Server Component on purpose. Displaying a question needs no browser JS —
// the browser owns radio-group state natively, which is also what gives us arrow-key
// cycling, a single tab stop per group, Home/End, and screen-reader group semantics
// announced against the legend element. None of that is worth reimplementing.
//
// Question text comes from `_lib/questions.ts`, which is transcribed from MODEL.md.
// Nothing in this file may paraphrase it.

import type { Dimension } from "../_lib/questions.ts";

// The four answers, in canonical order and at equal visual weight.
// D-04: the fourth is a real answer, not a skip. It must not be de-emphasised, relabelled
// or set apart — it is the answer that produces the blind-spot list on the result page.
// The values here are UX only. The trust boundary is the Server Action's allow-list.
const OPTIONS = [
	{ value: "2", label: "Yes" },
	{ value: "1", label: "Partly" },
	{ value: "0", label: "No" },
	{ value: "unsure", label: "Not sure" },
] as const;

// One shared class string, so the fourth option is provably identical to the other three.
//
// The hover pair below is an application of STYLE_GUIDE §6 permitted transition #3
// (nav link, muted to body, 150ms) — same property, same duration, same token pair.
// It is NOT a fifth transition. Flagged for review at the 04-07 checkpoint.
// No other motion is permitted in this file: the selected state changes background
// instantly, with nothing animating.
//
// Amber must not appear on the selected state — STYLE_GUIDE §1 permits amber in exactly
// four contexts and "selected answer segment" is not one of them. --bg-subtle is the
// sanctioned selected/hover surface.
const OPTION_CLASS =
	"relative flex min-h-12 cursor-pointer items-center justify-center bg-paper px-4 py-3 font-display text-ink-2 transition-colors duration-[120ms] hover:bg-paper-2 has-[:checked]:bg-ink has-[:checked]:text-paper has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-4 has-[:focus-visible]:outline-focus has-[:checked:focus-visible]:outline-paper";

export function QuestionCard({ dimension, number }: { dimension: Dimension; number: string }) {
	return (
		// Legends break out of the fieldset border box by default. With no border this is
		// cosmetic, but the reset stays explicit.
		<fieldset className="mx-0 min-w-0 border-0 p-0">
			<legend className="mb-4 block w-full border-t border-rule pt-10">
				<span className="byline block">
					<span className="agate">{number}</span> {dimension.name}
				</span>
				<span className="mt-2 block max-w-[40ch] font-display text-title leading-[1.2] tracking-[-0.02em] text-ink">
					{dimension.question}
				</span>
			</legend>

			{/* Hairline-ruled cells: a 1px grid gap painted with the rule colour, each cell paper. */}
			<div className="grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-4">
				{OPTIONS.map((option) => (
					// The label wraps its input (implicit association), so the whole segment is
					// the hit target.
					<label key={option.value} className={OPTION_CLASS}>
						{/* The radio is visually hidden but stays in the tab order; the chosen cell fills
						    with ink and the focus ring is drawn on the cell.
						    Every radio in a card shares the dimension key as its group name;
						    `required` lets the browser block an incomplete native submit. */}
						<input
							type="radio"
							name={dimension.key}
							value={option.value}
							required
							className="sr-only"
						/>
						{option.label}
					</label>
				))}
			</div>
		</fieldset>
	);
}
