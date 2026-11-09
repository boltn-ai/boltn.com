import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "#content";
import { CtaButton } from "@/components/ui/cta-button";
import { FOCUS, ROLE } from "@/lib/profile";

export const metadata: Metadata = {
	title: { absolute: "Steve Bolton: engineering maturity and AI-assisted development" },
	description: `Steve Bolton is a ${ROLE} working on ${FOCUS}. Writing on engineering maturity, and what AI agents do to the systems and teams they land in.`,
};

// The hero diagram: problems spread around the typical one. The peak is the typical problem,
// where the model's average answer is excellent; the brick tail is the unusual problem that is
// yours. A concept diagram, not data: no axis values are claimed. Two drawings of the same
// curve, one for a wide screen and one for a phone, each in units close to screen pixels so
// the notes stay legible.
type Frame = {
	w: number;
	h: number;
	base: number;
	peakX: number;
	sigma: number;
	peakH: number;
	tailX: number;
	note: number;
	strong: number;
	line: number;
	/** Wide screens hang notes beside the peak and above the tail; phones stack them. */
	layout: "wide" | "narrow";
};

const wide: Frame = {
	w: 1312,
	h: 600,
	base: 540,
	peakX: 820,
	sigma: 150,
	peakH: 440,
	tailX: 1060,
	note: 15,
	strong: 20,
	line: 24,
	layout: "wide",
};

const narrow: Frame = {
	w: 360,
	h: 330,
	base: 250,
	peakX: 170,
	sigma: 50,
	peakH: 170,
	tailX: 250,
	note: 15,
	strong: 19,
	line: 22,
	layout: "narrow",
};

function Distribution({ f, className }: { f: Frame; className?: string }) {
	const y = (x: number) => {
		const z = (x - f.peakX) / f.sigma;
		return f.base - f.peakH * Math.exp(-0.5 * z * z);
	};
	const points = (from: number, to: number) => {
		const out: string[] = [];
		for (let x = from; x < to; x += 4) out.push(`${x},${y(x).toFixed(1)}`);
		out.push(`${to},${y(to).toFixed(1)}`);
		return out.join(" L ");
	};
	const top = f.base - f.peakH;
	const isWide = f.layout === "wide";
	const peakNoteX = isWide ? f.peakX + 14 : f.peakX;
	const peakAnchor = isWide ? "start" : "middle";
	const below = (row: number) => f.base + f.line * (row + 0.3);
	return (
		<svg
			viewBox={`0 0 ${f.w} ${f.h}`}
			className={`distribution ${className ?? ""}`}
			role="img"
			aria-label="Diagram: problems spread around the typical one. At the peak, the typical problem, the average answer is excellent, cheap and the same for everyone. Out in the unusual tail, marked in brick, is your problem, where the answer needs checking."
		>
			<path className="mass" d={`M 0,${f.base} L ${points(0, f.w)} L ${f.w},${f.base} Z`} />
			<path
				className="tail"
				d={`M ${f.tailX},${f.base} L ${points(f.tailX, f.w)} L ${f.w},${f.base} Z`}
			/>
			<path className="curve" d={`M ${points(0, f.w)}`} />
			<line className="base" x1="0" y1={f.base} x2={f.w} y2={f.base} />
			<line
				className="guide"
				x1={f.peakX}
				y1={f.base + 6}
				x2={f.peakX}
				y2={isWide ? top - f.line * 2.6 : top}
			/>

			<text
				className="note note--strong"
				fontSize={f.strong}
				x={peakNoteX}
				y={top - f.line * 1.6}
				textAnchor={peakAnchor}
			>
				The average answer
			</text>
			<text
				className="note"
				fontSize={f.note}
				x={peakNoteX}
				y={top - f.line * 0.6}
				textAnchor={peakAnchor}
			>
				Excellent, cheap, the same for everyone
			</text>

			<text className="note" fontSize={f.note} x={f.peakX} y={below(1)} textAnchor="middle">
				The typical problem
			</text>

			{isWide ? (
				<>
					<text
						className="note note--strong note--tail"
						fontSize={f.strong}
						x={f.w}
						y={y(f.tailX) - f.line * 2.4}
						textAnchor="end"
					>
						Your problem
					</text>
					<text
						className="note"
						fontSize={f.note}
						x={f.w}
						y={y(f.tailX) - f.line * 1.4}
						textAnchor="end"
					>
						Out here, the answer needs checking
					</text>
					<text className="note" fontSize={f.note} x="0" y={below(1)}>
						Unusual
					</text>
					<text className="note" fontSize={f.note} x={f.w} y={below(1)} textAnchor="end">
						Unusual
					</text>
				</>
			) : (
				<>
					<text
						className="note note--strong note--tail"
						fontSize={f.strong}
						x={f.w}
						y={below(2.2)}
						textAnchor="end"
					>
						Your problem
					</text>
					<text className="note" fontSize={f.note} x={f.w} y={below(3.2)} textAnchor="end">
						Out here, the answer needs checking
					</text>
				</>
			)}
		</svg>
	);
}

type Work = {
	name: string;
	description: string;
	/** When set, the title links to this route. */
	href?: string;
	action?: string;
};

const work: Work[] = [
	{
		name: "A build signal people trust again",
		description:
			"Integration tests on a multi-million-line open-source monorepo were failing constantly and being ignored. A merge queue, the flaky tests driven out, builds gated and green. The full CI cycle went from three hours to under one.",
	},
	{
		name: "Agent tooling engineers actually used",
		description:
			"Claude skills for CI failure triage and issue workflow, adopted by the dotCMS team, each one reporting where it failed and where it spent more tokens than it needed. Plus the context architecture that let agents navigate the monorepo.",
	},
	{
		href: "/assessment",
		action: "Take the assessment",
		name: "AI Maturity Assessment",
		description:
			"Eleven questions on how an engineering organisation actually works with AI, built from my maturity framework. Free, no sign-up, and the result lives in the link.",
	},
];

function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

export default function Home() {
	const latest = posts
		.filter((post) => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 3);

	return (
		<>
			{/* Hero: the thesis, drawn. The text sits above the diagram's empty left tail. */}
			<section className="container grid grid-cols-1 content-between gap-10 pt-12 pb-4 lg:min-h-[calc(100dvh-4rem)] lg:grid-rows-1 lg:gap-12 lg:py-12">
				<div className="lg:col-start-1 lg:row-start-1 relative z-[10] lg:max-w-[48rem] lg:self-start lg:pt-8">
					<h1 className="text-ink">AI answers the average problem.</h1>
					<hr className="rule mt-8 max-w-[36rem]" />
					<p className="lead mt-6 text-ink-2">
						The work now is knowing how yours differs, and checking the answer.
					</p>
					<div className="mt-10 flex flex-wrap items-center gap-4">
						<CtaButton href="/thinking">Read the writing</CtaButton>
						<CtaButton href="/about" variant="secondary">
							About me
						</CtaButton>
					</div>
				</div>
				<div className="min-w-0 lg:col-start-1 lg:row-start-1 lg:self-end">
					<Distribution f={wide} className="hidden md:block" />
					<Distribution f={narrow} className="md:hidden" />
				</div>
			</section>

			{/* Latest writing: an index */}
			<section className="container pt-(--section-gap-s)">
				<hr className="rule--double" />
				<div className="grid grid-cols-1 gap-10 pt-12 md:grid-cols-12 md:gap-8">
					<div className="md:col-span-4">
						<h2 className="text-ink">Latest writing</h2>
						<p className="mt-6">
							<Link href="/thinking" className="link">
								All the writing
							</Link>
						</p>
					</div>
					<ol className="md:col-span-8">
						{latest.map((post, i) => (
							<li
								key={post.slug}
								className="grid grid-cols-1 gap-3 border-t border-rule py-8 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8"
							>
								<div className="min-w-0">
									<h3 className={i === 0 ? "text-2xl" : undefined}>
										<Link href={`/thinking/${post.slug}`} className="title-link">
											{post.title}
										</Link>
									</h3>
									<p className="mt-3 max-w-[60ch] text-ink-2">{post.excerpt}</p>
								</div>
								<p className="agate text-sm text-muted sm:pt-1 sm:text-right">
									<time dateTime={post.date}>{formatDate(post.date)}</time>
									<br />
									{Math.max(1, Math.round(post.metadata.wordCount / 200))} min read
								</p>
							</li>
						))}
					</ol>
				</div>
			</section>

			{/* Who is writing: a statement */}
			<section className="container pt-(--section-gap)">
				<p className="max-w-[40ch] font-display text-section leading-[1.12] tracking-[-0.02em] text-ink">
					I&rsquo;m a {ROLE} working on {FOCUS}. I write about engineering maturity and what
					AI-assisted development does to it. The teams that pull ahead are the ones that know how
					their systems actually work, and can point AI precisely at the hard parts.
				</p>
			</section>

			{/* Selected work: rows */}
			<section className="container pt-(--section-gap)">
				<h2 className="text-ink">Selected work</h2>
				<ul className="mt-12 border-t border-rule-2">
					{work.map((item) => (
						<li
							key={item.name}
							className="grid grid-cols-1 gap-4 border-b border-rule py-10 md:grid-cols-12 md:gap-8"
						>
							<h3 className="text-ink md:col-span-5">
								{item.href ? (
									<Link href={item.href} className="title-link">
										{item.name}
									</Link>
								) : (
									item.name
								)}
							</h3>
							<div className="md:col-span-7">
								<p className="max-w-[65ch] text-ink-2">{item.description}</p>
								{item.href && item.action && (
									<p className="mt-4">
										<Link href={item.href} className="link">
											{item.action}
										</Link>
									</p>
								)}
							</div>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
