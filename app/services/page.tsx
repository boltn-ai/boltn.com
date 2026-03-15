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

			<div className="mx-auto max-w-5xl px-6">
				{engagements.map((engagement, index) => (
					<div
						key={engagement.title}
						className={
							index < engagements.length - 1
								? "border-b border-zinc-800 pb-16 mb-16"
								: "pb-16"
						}
					>
						<p className="text-sm font-medium uppercase tracking-wider text-[#22c55e]">
							{engagement.title}
						</p>
						<h2 className="mt-2 text-2xl font-medium tracking-tight text-foreground md:text-3xl">
							{engagement.tagline}
						</h2>
						<p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
							{engagement.description}
						</p>

						<div className="mt-8">
							<h3 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
								What's included
							</h3>
							<ul className="mt-3 space-y-2">
								{engagement.includes.map((item) => (
									<li
										key={item}
										className="flex items-start gap-2 text-muted-foreground"
									>
										<span
											aria-hidden="true"
											className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#22c55e]"
										/>
										{item}
									</li>
								))}
							</ul>
						</div>

						<div className="mt-8">
							<CtaButton href="/book">Book a discovery call</CtaButton>
						</div>
					</div>
				))}
			</div>

			<Section className="border-t border-zinc-800 text-center">
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
