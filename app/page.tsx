import type { Metadata } from "next";
import { CtaButton } from "@/components/ui/cta-button";

export const metadata: Metadata = {
	title: "boltn — Architecture-first AI adoption",
	description:
		"The complexity did not disappear when you moved it into agents. boltn helps engineering leaders see the wall before they hit it.",
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

function AvailabilityIndicator() {
	return (
		<div className="mt-4 flex items-center gap-2">
			<span
				aria-hidden="true"
				style={{
					display: "block",
					flexShrink: 0,
					width: 5,
					height: 5,
					background: "var(--live)",
					borderRadius: "50%",
				}}
			/>
			<span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[--text-faint]">
				2 advisory engagements available — Q3 2026
			</span>
		</div>
	);
}

export default function Home() {
	return (
		<main>
			{/* Two-column hero */}
			<section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
				<div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
					{/* Left column */}
					<div>
						{/* Section marker */}
						<div className="mb-6">
							<div className="mb-2 h-px w-5 bg-[--accent]" />
							<span
								className="font-mono text-[9px] uppercase tracking-[0.25em]"
								style={{ color: "rgba(200,132,42,0.75)" }}
							>
								The pattern
							</span>
						</div>

						{/* H1 */}
						<h1
							className="font-serif font-normal leading-[1.02] text-[--text-primary]"
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
						<div className="my-6 border-t border-[--border]" />

						{/* Lede paragraph */}
						<p
							className="text-[14px] leading-[1.75] text-[--text-muted]"
							style={{
								fontFamily: "Georgia, 'Times New Roman', serif",
								fontStyle: "italic",
							}}
						>
							<span style={{ color: "var(--accent)" }}>&sect;</span> The teams that will outpace
							everyone else are the ones who know how their systems actually work — and can direct
							AI precisely at the hard parts. boltn helps you get there.
						</p>
					</div>

					{/* Right column */}
					<div>
						<p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[--text-faint]">
							The adoption arc
						</p>
						<div className="border border-[--border] p-4">
							<AdoptionArcChart />
						</div>
						<div className="mt-6">
							<CtaButton href="/book">Book a discovery call</CtaButton>
							<AvailabilityIndicator />
						</div>
					</div>
				</div>
			</section>

			{/* Section divider */}
			<div className="mx-auto max-w-6xl px-6">
				<div className="my-12 flex items-center gap-4">
					<div className="flex-1 border-t border-[--border]" />
					<span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[--text-faint]">
						&sect; 01 — The pattern
					</span>
					<div className="flex-1 border-t border-[--border]" />
				</div>
			</div>

			{/* Services section */}
			<section className="mx-auto max-w-6xl px-6 pb-24">
				{/* Section marker */}
				<div className="mb-8">
					<div className="mb-2 h-px w-5 bg-[--accent]" />
					<span
						className="font-mono text-[9px] uppercase tracking-[0.25em]"
						style={{ color: "rgba(200,132,42,0.75)" }}
					>
						Services
					</span>
				</div>

				{/* Gap-grid */}
				<div
					className="grid grid-cols-1 md:grid-cols-3"
					style={{ gap: "1px", background: "var(--border)" }}
				>
					{[
						{
							number: "01",
							slug: "Assessment",
							name: "AI Maturity Assessment",
							description:
								"A structured diagnostic of where you actually stand — architecture, organisation, and team readiness. Not a survey. A scored instrument that surfaces the specific gaps.",
						},
						{
							number: "02",
							slug: "Advisory",
							name: "Architecture Advisory",
							description:
								"Ongoing architectural guidance through the adoption curve. Weekly sessions, async review, decision support when the pressure is on.",
						},
						{
							number: "03",
							slug: "Build",
							name: "Accelerated Build",
							description:
								"Hands-on delivery for teams that need an architect embedded in the work. Scoped engagements with clear boundaries and measurable outcomes.",
						},
					].map((service) => (
						<div
							key={service.number}
							className="group p-6 transition-colors duration-200 hover:bg-[--bg-subtle]"
							style={{ background: "var(--bg)" }}
						>
							<p className="mb-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[--accent]">
								{service.number} / {service.slug}
							</p>
							<h3
								className="mb-3 text-[20px] font-normal leading-[1.2] text-[--text-primary]"
								style={{ fontFamily: "var(--font-display)" }}
							>
								{service.name}
							</h3>
							<p
								className="mb-4 text-[12px] leading-[1.6] text-[--text-muted]"
								style={{
									fontFamily: "Georgia, 'Times New Roman', serif",
									fontStyle: "italic",
								}}
							>
								{service.description}
							</p>
							<span
								className="font-mono text-[12px] transition-colors duration-200 group-hover:text-[--accent]"
								style={{ color: "rgba(200,132,42,0)" }}
								aria-hidden="true"
							>
								&rarr;
							</span>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
