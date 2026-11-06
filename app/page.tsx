import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "#content";
import { CtaButton } from "@/components/ui/cta-button";
import { FOCUS, ROLE } from "@/lib/profile";

export const metadata: Metadata = {
	title: { absolute: "Steve Bolton — Engineering maturity and AI-assisted development" },
	description: `Steve Bolton is a ${ROLE} working on ${FOCUS}. Writing on engineering maturity, and what AI agents do to the systems and teams they land in.`,
};

function AdoptionArcChart() {
	return (
		<svg
			viewBox="0 0 320 200"
			width="100%"
			role="img"
			aria-label="AI adoption arc showing false confidence phase before the complexity wall"
		>
			{/* X axis */}
			<line
				x1="40"
				y1="170"
				x2="300"
				y2="170"
				style={{ stroke: "var(--border-mid)", strokeWidth: 1 }}
			/>
			{/* Y axis */}
			<line
				x1="40"
				y1="10"
				x2="40"
				y2="170"
				style={{ stroke: "var(--border-mid)", strokeWidth: 1 }}
			/>
			{/* Rising amber curve */}
			<path
				d="M 40,160 C 100,140 160,80 220,40"
				fill="none"
				style={{ stroke: "var(--accent)", strokeWidth: 1.5, opacity: 0.9 }}
			/>
			{/* Vertical dashed wall */}
			<line
				x1="220"
				y1="10"
				x2="220"
				y2="170"
				style={{
					stroke: "var(--accent)",
					strokeWidth: 1,
					strokeDasharray: "3,3",
					opacity: 0.35,
				}}
			/>
			{/* Declining dotted path */}
			<path
				d="M 220,40 C 250,60 270,100 290,150"
				fill="none"
				style={{
					stroke: "var(--text-body)",
					strokeWidth: 1,
					strokeDasharray: "4,3",
					opacity: 0.2,
				}}
			/>
			{/* Labels */}
			<text
				x="42"
				y="185"
				fontSize="8"
				textAnchor="start"
				letterSpacing="0.05em"
				style={{ fill: "var(--text-faint)", textTransform: "uppercase" }}
			>
				First agents
			</text>
			<text
				x="165"
				y="185"
				fontSize="8"
				textAnchor="middle"
				letterSpacing="0.05em"
				style={{ fill: "var(--text-faint)", textTransform: "uppercase" }}
			>
				Scale
			</text>
			<text
				x="290"
				y="185"
				fontSize="8"
				textAnchor="end"
				letterSpacing="0.05em"
				style={{ fill: "var(--text-faint)", textTransform: "uppercase" }}
			>
				Complexity
			</text>
			<text
				x="224"
				y="22"
				fontSize="8"
				textAnchor="start"
				letterSpacing="0.05em"
				style={{ fill: "var(--accent)", textTransform: "uppercase" }}
			>
				The wall
			</text>
			<text
				x="170"
				y="110"
				fontSize="9"
				textAnchor="middle"
				style={{
					fill: "var(--text-faint)",
					fontStyle: "italic",
					fontFamily: "Georgia, serif",
				}}
			>
				false confidence phase
			</text>
		</svg>
	);
}

type Work = {
	number: string;
	slug: string;
	name: string;
	description: string;
	/** When set, the whole card is a link to this route. */
	href?: string;
};

const work: Work[] = [
	{
		number: "01",
		slug: "CI",
		name: "A build signal people trust again",
		description:
			"Integration tests on a multi-million-line open-source monorepo were failing constantly and being ignored. A merge queue, the flaky tests driven out, builds gated and green. The full CI cycle went from three hours to under one.",
	},
	{
		number: "02",
		slug: "Agents",
		name: "Agent tooling engineers actually used",
		description:
			"Claude skills for CI failure triage and issue workflow, adopted by the dotCMS team — each one reporting where it failed and where it spent more tokens than it needed. Plus the context architecture that let agents navigate the monorepo.",
	},
	{
		number: "03",
		href: "/assessment",
		slug: "Assessment",
		name: "AI Maturity Assessment",
		description:
			"Eleven questions on how an engineering organisation actually works with AI, built from my maturity framework. Free, no sign-up, and the result lives in the link.",
	},
];

export default function Home() {
	const latest = posts
		.filter((post) => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 3);

	return (
		<main>
			{/* Two-column hero */}
			<section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
				<div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
					{/* Left column */}
					<div>
						{/* Section marker */}
						<div className="mb-6">
							<div className="mb-2 h-px w-5 bg-(--accent)" />
							<span
								className="font-mono text-[9px] uppercase tracking-[0.25em]"
								style={{ color: "rgba(200,132,42,0.75)" }}
							>
								Steve Bolton
							</span>
						</div>

						{/* H1 */}
						<h1
							className="font-serif font-normal leading-[1.02] text-(--text-primary)"
							style={{
								fontFamily: "var(--font-display)",
								fontSize: "clamp(42px, 5.5vw, 64px)",
							}}
						>
							The complexity didn&rsquo;t disappear when you moved it into agents.{" "}
							<em style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
								You just can&rsquo;t see it yet.
							</em>
						</h1>

						{/* Ruled divider */}
						<div className="my-6 border-t border-(--border)" />

						{/* Lede paragraph */}
						<p
							className="text-[14px] leading-[1.75] text-(--text-muted)"
							style={{
								fontFamily: "Georgia, 'Times New Roman', serif",
								fontStyle: "italic",
							}}
						>
							<span style={{ color: "var(--accent)" }}>&sect;</span> I&rsquo;m a {ROLE} working on{" "}
							{FOCUS}. I write about engineering maturity and what AI-assisted development does to
							it. The teams that pull ahead are the ones that know how their systems actually work,
							and can point AI precisely at the hard parts.
						</p>
					</div>

					{/* Right column */}
					<div>
						<p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-(--text-faint)">
							The adoption arc
						</p>
						<div className="border border-(--border) p-4">
							<AdoptionArcChart />
						</div>
						<div className="mt-6">
							<CtaButton href="/thinking">Read the thinking</CtaButton>
							<Link
								href="/about"
								className="mt-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-(--text-muted) transition-colors duration-150 hover:text-(--text-body)"
							>
								About me &rarr;
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Section divider */}
			<div className="mx-auto max-w-6xl px-6">
				<div className="my-12 flex items-center gap-4">
					<div className="flex-1 border-t border-(--border)" />
					<span className="font-mono text-[9px] uppercase tracking-[0.2em] text-(--text-faint)">
						&sect; 01 — Selected work
					</span>
					<div className="flex-1 border-t border-(--border)" />
				</div>
			</div>

			{/* Selected work */}
			<section className="mx-auto max-w-6xl px-6 pb-24">
				{/* Section marker */}
				<div className="mb-8">
					<div className="mb-2 h-px w-5 bg-(--accent)" />
					<span
						className="font-mono text-[9px] uppercase tracking-[0.25em]"
						style={{ color: "rgba(200,132,42,0.75)" }}
					>
						Selected work
					</span>
				</div>

				{/* Gap-grid */}
				<div
					className="grid grid-cols-1 md:grid-cols-3"
					style={{ gap: "1px", background: "var(--border)" }}
				>
					{work.map((item) => {
						const cardClassName = "group p-6 transition-colors duration-200 hover:bg-(--bg-subtle)";
						const cardStyle = { background: "var(--bg)" };
						const cardBody = (
							<>
								<p className="mb-3 font-mono text-[9px] uppercase tracking-[0.22em] text-(--accent)">
									{item.number} / {item.slug}
								</p>
								<h3
									className="mb-3 text-[20px] font-normal leading-[1.2] text-(--text-primary)"
									style={{ fontFamily: "var(--font-display)" }}
								>
									{item.name}
								</h3>
								<p
									className="mb-4 text-[12px] leading-[1.6] text-(--text-muted)"
									style={{
										fontFamily: "Georgia, 'Times New Roman', serif",
										fontStyle: "italic",
									}}
								>
									{item.description}
								</p>
								<span
									className="font-mono text-[12px] transition-colors duration-200 group-hover:text-(--accent)"
									style={{ color: "rgba(200,132,42,0)" }}
									aria-hidden="true"
								>
									&rarr;
								</span>
							</>
						);

						return item.href ? (
							<Link key={item.number} href={item.href} className={cardClassName} style={cardStyle}>
								{cardBody}
							</Link>
						) : (
							<div key={item.number} className={cardClassName} style={cardStyle}>
								{cardBody}
							</div>
						);
					})}
				</div>
			</section>

			{/* Latest writing */}
			<section className="mx-auto max-w-6xl px-6 pb-24">
				<div className="mb-8">
					<div className="mb-2 h-px w-5 bg-(--accent)" />
					<span
						className="font-mono text-[9px] uppercase tracking-[0.25em]"
						style={{ color: "rgba(200,132,42,0.75)" }}
					>
						Latest writing
					</span>
				</div>
				<ul className="flex max-w-3xl flex-col">
					{latest.map((post) => (
						<li key={post.slug} className="border-b border-(--border) py-6 first:pt-0">
							<Link
								href={`/thinking/${post.slug}`}
								className="block font-display text-[20px] font-normal leading-[1.3] text-(--text-primary) transition-colors duration-150 hover:text-(--accent)"
							>
								{post.title}
							</Link>
							<p
								className="mt-1 text-[14px] leading-[1.6] text-(--text-muted)"
								style={{
									fontFamily: "Georgia, 'Times New Roman', serif",
									fontStyle: "italic",
								}}
							>
								{post.excerpt}
							</p>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
