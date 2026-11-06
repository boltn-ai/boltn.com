// The /assessment/r/{code} result — a permanent page that is a pure function of its URL.
//
// There is no datastore, no lookup, no record and no expiry (D-09, D-24). The eleven answers
// travel in the path segment; the band is derived here, on the server, at render time. The
// link works forever, costs nothing to keep alive, and holds no personal data — because there
// is no personal data anywhere in the flow. Nothing identifies who took the assessment.
//
// The path segment is the primary untrusted input of this phase: /assessment/r/{anything} is
// attacker-controlled and publicly reachable. It is treated as opaque and handed only to the
// total decoder in `_lib/codec.ts`, which returns null for anything this deployment did not
// issue. The raw segment is never rendered, never interpolated into a filesystem path, a URL
// fetch or a template, and never reaches JSX. Only decoded, typed values and derived strings
// from fixed sets — five band names, eleven dimension names, four confidence labels — are
// displayed, and React escapes those by default (T-04-19, T-04-20).
//
// D-12 fixes the contents: band name, indicative score, named blind spots. The confidence
// indicator comes with them because D-04 requires one. Nothing else — no chart, no
// per-dimension reading, no capture field, no offer. D-14 keeps the per-dimension
// interpretation out of this public repo entirely.
//
// Register per D-15 and VOICE.md: this reads as recognition, not as a grade and not as a
// congratulation. `Not ready` in particular has to land as a normal starting point, which is
// how MODEL.md already writes it — the narrative below is transcribed, never paraphrased.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaButton } from "@/components/ui/cta-button";
import { Section } from "@/components/ui/section";
import { decode } from "../../_lib/codec.ts";
import { bandSlug, score } from "../../_lib/scoring.ts";

// Georgia italic, matching /assessment's framing prose so the two pages read as one voice.
const PROSE_CLASS = "max-w-2xl text-[14px] leading-[1.75] text-(--text-muted)";
const PROSE_STYLE = {
	fontFamily: "Georgia, 'Times New Roman', serif",
	fontStyle: "italic",
} as const;

// A mono 9px uppercase label. Deliberately the faintest thing on the page: these are
// signposts, and none of them may compete with the band name for attention (D-03).
const LABEL_CLASS = "block font-mono text-[9px] uppercase tracking-[0.25em] text-(--text-faint)";

const BLOCK_CLASS = "mt-14 border-t border-(--border) pt-6";

// The site's section-marker idiom: a 20px amber rule above a mono eyebrow. Amber here is
// STYLE_GUIDE §1 permitted context 1. Duplicated from /assessment rather than extracted,
// because extracting it would mean editing a file this plan does not own.
function SectionMarker({ label }: { label: string }) {
	return (
		<div className="mb-6">
			<div className="mb-2 h-px w-5 bg-(--accent)" />
			<span
				className="font-mono text-[9px] uppercase tracking-[0.25em]"
				style={{ color: "rgba(200,132,42,0.75)" }}
			>
				{label}
			</span>
		</div>
	);
}

/**
 * Present, and empty on purpose.
 *
 * The URL space is 4,194,304 codes, so there is nothing worth enumerating at build time. An
 * empty array means: prerender none, then render each path on its first visit and serve it
 * from the ISR cache afterwards. Deleting this function is NOT equivalent — the route would
 * become dynamic on every request, and every visit would re-run the decode and the render.
 *
 * If a future phase turns on `cacheComponents` in next.config.ts, an empty array becomes a
 * build error rather than a silent behaviour change. That is a loud failure and a fine one,
 * but worth knowing before someone flips the flag. next.config.ts is `{}` today.
 */
export function generateStaticParams() {
	return [];
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ code: string }>;
}): Promise<Metadata> {
	const { code } = await params;
	const answers = decode(code);
	// No robots directive on this branch on purpose: the page this metadata belongs to sends
	// a 404, and a 404 is already excluded from the index by its status.
	if (!answers) return { title: "Result not found" };

	const result = score(answers);
	const title = `${result.band} — AI Maturity Assessment`;

	return {
		// absolute: skip the root layout's "%s | Steve Bolton" template, because the band name is
		// the whole point of the title and it needs the full SERP budget in a share preview.
		title: { absolute: title },
		description: `An indicative ${result.indicative} out of 140 across eleven dimensions of AI maturity in the engineering workflow. The band is the finding; the scale moves in ten-point steps.`,
		// 4.2 million codes is 4.2 million thin pages, and this site's value is a small number
		// of substantial ones. `follow` stays true so the links out still count.
		//
		// Do NOT add a Disallow for this path to app/robots.ts. A robots.txt disallow blocks
		// the unfurl fetchers at LinkedIn, Slack and X along with the indexers, which would
		// kill the social preview on exactly the shared links this page exists to create. A
		// meta directive only works if the page stays fetchable. Leave that file alone.
		robots: { index: false, follow: true },
		openGraph: {
			title,
			description: `AI Maturity Assessment — ${result.band}`,
			// Re-declared because Next.js shallow-merges metadata: a child openGraph replaces
			// the parent's outright rather than merging into it. This repo has a scar for it.
			siteName: "Steve Bolton",
			images: [
				{
					url: `/assessment/og/${bandSlug(result.band)}`,
					width: 1200,
					height: 630,
					alt: result.band,
				},
			],
		},
	};
}

export default async function ResultPage({ params }: { params: Promise<{ code: string }> }) {
	// In Next.js 16 the route params arrive as a Promise and have to be unwrapped in BOTH
	// exported functions. Reading `.code` off the un-awaited object yields undefined, the
	// decoder defensively returns null, and every result on the site renders the invalid-link
	// page forever with nothing in any log. This repo shipped exactly that bug once already —
	// commit 5a269c7, in the per-post OG generator — and it is the most-copied stale pattern
	// from pre-15 tutorials.
	const { code } = await params;

	const answers = decode(code);
	// A 200 on a URL that never existed is a soft-404 and an SEO liability. This sends a real
	// 404 and renders the segment-scoped not-found file next door, so the reader gets copy
	// about clipped assessment links instead of the site-wide "This page does not exist".
	if (!answers) notFound();

	const result = score(answers);

	return (
		<Section className="max-w-3xl">
			<SectionMarker label="Your result" />

			{/* The band is the page's subject, so it is the h1 and it is the largest thing here.
			    D-03 requires it to outweigh the number, and prominence comes from type scale —
			    amber on the band name would be an unsanctioned fifth amber context. */}
			<h1 className="font-display text-[40px] font-normal leading-[1.1] text-(--text-primary) md:text-[56px]">
				{result.band}
			</h1>

			{/* MODEL.md §7, Quick leadership register, transcribed verbatim in scoring.ts. */}
			<p className={`${PROSE_CLASS} mt-6`} style={PROSE_STYLE}>
				{result.narrative}
			</p>

			<div className={BLOCK_CLASS}>
				<span className={LABEL_CLASS}>Indicative score</span>
				<p className="mt-3 font-mono text-[24px] tracking-[0.06em] text-(--text-body)">
					{result.indicative}
					<span className="text-(--text-faint)"> / 140</span>
				</p>
				{/* MODEL.md §4 instructs that the limitation be stated in the UI rather than
				    implied, so it is said in words and not left to the word "indicative". */}
				<p className={`${PROSE_CLASS} mt-4`} style={PROSE_STYLE}>
					Read that as a position, not a measurement. One question per dimension means the scale
					moves in ten-point steps, so a single answer moving from Partly to Yes can carry you
					across a band boundary. The band above is what carries the meaning. A precise figure out
					of 140 needs the full framework, which asks 106 questions rather than eleven.
				</p>
			</div>

			<div className={BLOCK_CLASS}>
				<span className={LABEL_CLASS}>Blind spots</span>
				{result.blindSpots.length > 0 ? (
					<>
						<ul className="mt-4 space-y-1">
							{result.blindSpots.map((name) => (
								<li key={name} className="text-[16px] leading-[1.6] text-(--text-primary)">
									{name}
								</li>
							))}
						</ul>
						<p className={`${PROSE_CLASS} mt-4`} style={PROSE_STYLE}>
							{result.blindSpots.length === 1
								? "That is the dimension where"
								: "Those are the dimensions where"}{" "}
							the honest answer was “Not sure”. It is not a low score. It is a gap in what the
							organisation can see about itself, which is a different problem and usually a more
							useful one. Some of these sit outside the score entirely, so they do not move the
							number at all — that does not make them smaller.
						</p>
					</>
				) : (
					<p className={`${PROSE_CLASS} mt-4`} style={PROSE_STYLE}>
						None named — you had a real answer for all eleven dimensions, which is less common than
						it sounds. One sanity check is worth the minute it costs: the dimensions leaders are
						surest about are often the ones measured least.
					</p>
				)}
			</div>

			<div className={BLOCK_CLASS}>
				<span className={LABEL_CLASS}>Confidence</span>
				<p className="mt-3 font-mono text-[14px] uppercase tracking-[0.18em] text-(--text-body)">
					{result.confidence}
				</p>
				<p className={`${PROSE_CLASS} mt-4`} style={PROSE_STYLE}>
					{result.unsureCount === 0
						? "Every dimension got a definite answer, so this reading rests on what you know rather than on what you assume."
						: `${result.unsureCount} of the eleven answers ${
								result.unsureCount === 1 ? "was" : "were"
							} “Not sure”, so the number is carrying less weight and the list above is carrying more.`}{" "}
					That is a finding rather than a penalty. Being able to name what you cannot see is the
					part of this that survives contact with a real conversation.
				</p>
			</div>

			<div className={BLOCK_CLASS}>
				<p className={PROSE_CLASS} style={PROSE_STYLE}>
					This page is rebuilt from the link every time it is opened. Your answers are in the URL
					and nowhere else, so there is nothing on my side to leak or to lose — and nothing to come
					back for. Keep the link and send it to whoever needs to see it.
				</p>
				<p className={`${PROSE_CLASS} mt-6`} style={PROSE_STYLE}>
					The useful next step is not more of this. It is deciding which of the above to fix first,
					given the architecture and the team you actually have rather than the ones a framework
					assumes.
				</p>
				<div className="mt-8 max-w-sm">
					<CtaButton href="/thinking">Read the thinking behind it</CtaButton>
				</div>
			</div>
		</Section>
	);
}
