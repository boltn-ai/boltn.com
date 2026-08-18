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
	"flex cursor-pointer items-center gap-3 p-4 font-mono text-[10px] uppercase tracking-[0.18em] text-(--text-muted) transition-colors duration-150 hover:text-(--text-body) has-[:checked]:bg-(--bg-subtle) has-[:checked]:text-(--text-primary)";

export function QuestionCard({ dimension, number }: { dimension: Dimension; number: string }) {
	return (
		// Legends break out of the fieldset border box by default. With no border this is
		// cosmetic, but the reset stays explicit.
		<fieldset className="border-0 p-0 m-0">
			<legend className="mb-4 block">
				{/* Amber is permitted here: STYLE_GUIDE §1 context 2, numbered metadata —
				    identical in form to "01 / Assessment" on the home page. */}
				<span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-(--accent)">
					{number} / {dimension.name}
				</span>
				{/* The question is the card's heading, so it takes Playfair Display.
				    Georgia italic stays reserved for the page's framing prose (plan 04-04).
				    A discretion call — reviewed at the 04-07 checkpoint. */}
				<span
					className="mt-2 block text-[20px] font-normal leading-[1.2] text-(--text-primary)"
					style={{ fontFamily: "var(--font-display)" }}
				>
					{dimension.question}
				</span>
			</legend>

			{/* The site's hairline card idiom, verbatim: a 1px grid gap painted with --border,
			    each cell repainting --bg. STYLE_GUIDE §7 sanctions the inline style prop for
			    this technique and for CSS-variable colours; the no-inline-styles rule is about
			    layout. */}
			<div
				className="grid grid-cols-2 sm:grid-cols-4"
				style={{ gap: "1px", background: "var(--border)" }}
			>
				{OPTIONS.map((option) => (
					// The label wraps its input (implicit association), so the whole segment is
					// the hit target.
					<label key={option.value} className={OPTION_CLASS} style={{ background: "var(--bg)" }}>
						{/* The input stays visible and square. `appearance-none` plus the global
						    border-radius reset yields a square indicator, which is on-brand — and
						    a visible input means the global :focus-visible amber outline applies
						    for free. That focus ring is not a fifth amber context.
						    Every radio in a card shares the dimension key as its group name;
						    `required` lets the browser block an incomplete native submit. */}
						<input
							type="radio"
							name={dimension.key}
							value={option.value}
							required
							className="h-3 w-3 shrink-0 appearance-none border border-(--border-hi) checked:bg-(--text-primary)"
						/>
						{option.label}
					</label>
				))}
			</div>
		</fieldset>
	);
}
