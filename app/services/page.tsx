import type { Metadata } from "next";
import { CtaButton } from "@/components/ui/cta-button";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
	title: "Services",
	description:
		"Assessment, advisory, and project engagements for engineering teams navigating AI adoption. Every engagement starts from where you actually are.",
};

const engagements = [
	{
		number: "01",
		title: "Assessment",
		tagline: "See where you actually stand",
		description:
			"A diagnostic, not an audit. The AI maturity assessment surfaces the specific gaps in your architecture, organisation, and team readiness that will determine whether scaling AI works or hits the wall. You get a scored result with concrete observations — not a slide deck with quadrants.",
		includes: [
			"Structured AI maturity assessment",
			"Scored result with specific observations",
			"Architecture and organisational gap analysis",
			"30-minute debrief call",
		],
	},
	{
		number: "02",
		title: "Advisory",
		tagline: "Architecture before tooling",
		description:
			"Ongoing advisory for teams navigating AI adoption at scale. The work starts with architecture — what your systems actually look like, not what the last diagram says — and builds from there. Tooling decisions come after the structural work, not before.",
		includes: [
			"Weekly advisory sessions",
			"Architecture review and recommendations",
			"Team readiness assessment",
			"Implementation guidance and pattern review",
		],
	},
	{
		number: "03",
		title: "Project",
		tagline: "Build it right the first time",
		description:
			"Scoped project work for teams that know what they need built. Architecture review, AI integration, system design — with knowledge transfer baked in so your team owns the result. No black-box deliverables. No vendor lock-in.",
		includes: [
			"Defined scope and deliverables",
			"Hands-on implementation",
			"Knowledge transfer throughout",
			"Documentation your team can actually use",
		],
	},
];

export default function ServicesPage() {
	return (
		<>
			<PageHeader
				headline="How we work"
				subtitle="Not every company needs the same engagement. The right approach depends on where you are, what you have built, and what is actually blocking progress."
			/>

			<div
				className="grid grid-cols-1 md:grid-cols-3"
				style={{ gap: "1px", background: "var(--border)" }}
			>
				{engagements.map((engagement) => (
					<div
						key={engagement.title}
						style={{ background: "var(--bg)" }}
						className="group p-6 transition-colors duration-200 hover:bg-[--bg-subtle]"
					>
						<span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[--accent]">
							{engagement.number} / {engagement.title}
						</span>
						<h2
							className="mt-3 text-xl font-medium tracking-tight text-foreground"
							style={{ fontFamily: "var(--font-display)" }}
						>
							{engagement.tagline}
						</h2>
						<p
							className="mt-3 text-[12px] text-[--text-muted]"
							style={{
								fontFamily: "Georgia, 'Times New Roman', serif",
								fontStyle: "italic",
							}}
						>
							{engagement.description}
						</p>

						<div className="mt-6">
							<h3 className="font-mono text-[9px] uppercase tracking-[0.22em] text-[--text-faint]">
								What&apos;s included
							</h3>
							<ul className="mt-3 space-y-2">
								{engagement.includes.map((item) => (
									<li
										key={item}
										className="flex items-start gap-2 text-[12px] text-[--text-muted]"
									>
										<span
											className="transition-colors duration-200 group-hover:text-[--accent]"
											style={{ color: "rgba(200,132,42,0)" }}
										>
											→
										</span>
										{item}
									</li>
								))}
							</ul>
						</div>

						<div className="mt-6">
							<CtaButton href="/book">Book a discovery call</CtaButton>
						</div>
					</div>
				))}
			</div>

			<Section className="border-t border-[--border] text-center">
				<p className="text-lg text-muted-foreground">
					Every engagement starts with a conversation.
				</p>
				<div className="mt-6">
					<CtaButton href="/book">
						Book a discovery call
					</CtaButton>
				</div>
			</Section>
		</>
	);
}
