// The /assessment route: the framing argument, then the eleven questions.
//
// A Server Component, exporting its own metadata. There is no layout file here on purpose —
// the contact route only has one because its page runs in the browser and a browser page
// cannot export metadata. That constraint does not apply to this page: the single browser
// boundary on this route is `AssessmentForm`, and the cards are handed to it as children.
//
// D-19 governs everything above the form. The whole framework is published, including the
// trade-off insight, because it is the most differentiated idea in the instrument and hiding
// an argument to protect it contradicts VOICE.md’s “specificity is the proof”. The 106-question
// instrument and the per-dimension interpretation stay private — neither is here, and a list of
// eleven names gives neither away.
//
// The capability / calibration / enablement split below is DERIVED from each dimension’s
// `kind`, never from a parallel list of names kept in this file. A hardcoded list would drift
// from `_lib/questions.ts` the first time the question set moves, and the specific way it
// would drift is the dangerous one: Human Fluency landing in the trade-off group. It is
// `enablement` — more-is-better, simply banded on its own. D-19 and MODEL.md §1 name exactly
// three trade-offs, and Human Fluency is not one of them.

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { AssessmentForm } from "./_components/assessment-form";
import { QuestionCard } from "./_components/question-card";
import { DIMENSIONS } from "./_lib/questions.ts";

export const metadata: Metadata = {
	title: "AI Maturity Assessment",
	description:
		"Eleven questions on how your engineering organisation actually works with AI. About three minutes, and you keep the result as a link.",
};

// Georgia italic, reserved by plan 04-03 for exactly this page’s framing prose so that the
// questions themselves (Playfair) stay typographically distinct from the argument around them.
const PROSE = "max-w-[65ch] text-ink-2";

function Heading({ children }: { children: React.ReactNode }) {
	return <h2 className="text-3xl text-ink">{children}</h2>;
}

const KIND_COPY = [
	{
		kind: "capability" as const,
		label: "Capability: more is better",
		summary:
			"Seven dimensions where a higher answer is straightforwardly better. These are the only ones that count towards the score.",
	},
	{
		kind: "calibration" as const,
		label: "Calibration: trade-offs, not maxima",
		summary:
			"Three dimensions to read against the friction they create rather than as things to maximise. Lock an agent down far enough and it is safe and useless; leave it open and it is fast and exposed. Where the right point sits depends on what you are building and who for, which is why these sit outside the score.",
	},
	{
		kind: "enablement" as const,
		label: "Enablement: banded on its own",
		summary:
			"More is better here too. It is not a trade-off. It moves on a slower timescale than the rest, so it is banded separately instead of being folded into the score.",
	},
];

export default function AssessmentPage() {
	return (
		<>
			<PageHeader
				headline="AI Maturity Assessment"
				subtitle="Eleven questions on how your engineering organisation actually works with AI. About three minutes, and you keep the result."
			/>

			<Section className="pt-0">
				<div className="doc-block">
					<Heading>What this measures</Heading>

					{/* D-20, stated as prose rather than buried in a note. It is the single most common
				    misreading of the phrase “AI maturity”, and a reader who answers the wrong
				    question gets a result that describes an organisation they do not work for. */}
					<p className={PROSE}>
						This assesses AI in your engineering workflow: how your teams design, build and ship
						software with AI in the loop. It does not assess AI in your product. Whether you put a
						model in front of your customers is a different question with different answers, and
						nothing below is about it.
					</p>

					{/* The bridge back to /thinking/ai-maturity-signals, which opens “These six signals are
				    not a maturity score. They are a diagnostic.” This page shows a number, so the copy
				    has to reconcile with that rather than quietly contradict it. */}
					<p className={`${PROSE} mt-6`}>
						You will get a number, and you should hold it loosely. It is a diagnostic, not a grade.
						Eleven questions across eleven dimensions means the score moves in ten-point steps, so a
						single answer can carry you across a boundary, which is why the band is what carries the
						meaning and the number is labelled indicative. The part worth your attention is the one
						you cannot see from inside: the dimensions where the honest answer was “Not sure”.
					</p>
				</div>

				<div className="mt-24 border-t border-rule pt-12">
					<Heading>The eleven dimensions</Heading>

					<p className={`${PROSE} mt-6`}>
						Nothing is withheld here. The whole framework is below, one question per dimension,
						because the framework is the argument, and an argument you cannot read is not one you
						can disagree with.
					</p>

					<div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
						{KIND_COPY.map((group) => {
							const members = DIMENSIONS.filter((dimension) => dimension.kind === group.kind);
							return (
								<div key={group.kind} className="border-t border-rule-2 pt-6">
									<h3 className="text-ink">{group.label}</h3>
									<p className={`${PROSE} mt-3`}>{group.summary}</p>
									<ul className="mt-6 border-t border-rule">
										{members.map((dimension) => (
											<li key={dimension.key} className="border-b border-rule py-2 text-ink">
												{dimension.name}
											</li>
										))}
									</ul>
								</div>
							);
						})}
					</div>
				</div>

				<div className="doc-block mt-24 border-t border-rule pt-12">
					<Heading>What it costs you</Heading>

					<p className={PROSE}>
						Eleven questions, one per dimension. About three minutes. It is free, there is no email
						address to hand over and no name to give. The result is a link: keep it, send it to
						whoever needs to see it. Your answers travel in the link itself, so there is nothing
						stored on my side to leak or to lose.
					</p>

					<p className={`${PROSE} mt-6`}>
						“Not sure” is a real answer and not a way of skipping. It is what produces the named
						blind spots on the result, which for most teams is the useful part. Use it where it is
						true.
					</p>

					<p className={`${PROSE} mt-6`}>
						Rather see one before you answer?{" "}
						<Link href="/assessment/r/1yypnnpnpnpu7" className="link">
							Here is a worked example for Northwind
						</Link>
						, a synthetic organisation invented for this page. It is not a client and the profile is
						not anyone’s.
					</p>
				</div>
			</Section>

			{/* The cards are built here, on the server, and handed to the browser-side shell as
			    children — so the question set never crosses the boundary as data. `number` is a
			    display string, zero-padded, matching the counter’s own numerals. */}
			<AssessmentForm>
				{DIMENSIONS.map((dimension, index) => (
					<QuestionCard
						key={dimension.key}
						dimension={dimension}
						number={String(index + 1).padStart(2, "0")}
					/>
				))}
			</AssessmentForm>
		</>
	);
}
