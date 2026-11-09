"use client";

// The sticky "NN / 11 answered" indicator.
//
// Purely presentational: it holds no state, derives nothing, and persists nothing.
// The form owns the count and passes it down. Nothing here is load-bearing for
// submission — with JavaScript disabled this component simply does not render and the
// questions stay usable.
//
// Deliberately absent, and each absence is a rule rather than an oversight:
//   - No CSS motion of any kind. A fill whose width animates would be a fifth
//     transition and STYLE_GUIDE §6 permits exactly four.
//   - No bar, no fill, no inline graphic. D-13 removed the only chart from this phase
//     and the design register prefers text to ornament. That also keeps amber to its
//     four permitted contexts — an amber fill would be a fifth.
//   - Nothing written to terminal equipment. Draft answers in browser storage are
//     regulated by PECR reg. 6 whether or not they are a cookie, and the Cookie Policy
//     describes what is live today (T-04-13).

export function ProgressCounter({ answered, total }: { answered: number; total: number }) {
	return (
		// Sits below the header via the --header-h token rather than a hardcoded offset,
		// and one layer under the header's own stacking level. A bar pinned to the bottom
		// of the viewport was rejected: it collides with the cookie banner on a first-time
		// visitor's first page, which is exactly the reader this instrument targets.
		//
		// The status role below carries an implicit polite live region, so progress is
		// announced without interrupting. An assertive region would fire on all eleven
		// changes, which would be hostile.
		<div role="status" className="sticky top-16 z-[200] border-b border-rule bg-paper py-3">
			<div className="container">
				<p aria-hidden="true" className="byline">
					<span className="agate text-ink">
						{String(answered).padStart(2, "0")} of {total}
					</span>{" "}
					answered
				</p>
				{/* The natural-language form, so a screen reader does not read the visual
				    form as "zero three slash eleven". */}
				<span className="sr-only">
					{answered} of {total} answered
				</span>
			</div>
		</div>
	);
}
