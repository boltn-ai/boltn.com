import type { Metadata } from "next";
import { CtaButton } from "@/components/ui/cta-button";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
	title: "About",
	description:
		"Twenty years of watching technology adoption cycles repeat. The lens Steve brings to every boltn engagement is pattern recognition, not prediction.",
};

export default function About() {
	return (
		<>
			<PageHeader headline="The lens" />

			{/* Section 1: The lens */}
			<Section className="pt-0">
				<div className="max-w-3xl">
					<p className="text-base text-muted-foreground md:text-lg">
						I have watched the same cycle play out across every major technology shift in the last
						twenty years. The technology changes. The pattern does not.
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						Early in the cloud adoption wave, I saw teams move applications from data centres
						without rethinking how those applications were built. The infrastructure changed. The
						architecture did not. The result was the same problems running somewhere more expensive.
						Microservices followed the same arc — teams decomposed monoliths into distributed
						systems without solving the communication, ownership, and documentation problems that
						made the monolith hard to work with in the first place. The complexity moved. It did not
						shrink.
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						The AI adoption cycle is following the same trajectory. Quick wins arrive fast — a
						Copilot suggestion here, a chatbot there. Confidence builds. And then the jump from
						three agents to thirty exposes every architectural and organisational problem that was
						never resolved. The agents inherit the same gaps the humans worked around: outdated
						documentation, unclear ownership, brittle integrations, institutional knowledge that
						lives in one person's head.
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						I have been early to enough of these cycles to recognise what comes next. Not because I
						predicted the future, but because the pattern is not subtle once you have seen it
						repeat. The companies that get through the wall are the ones that recognised it before
						they hit it. That recognition is the lens I bring to every engagement.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-[--border]" />
			</Section>

			{/* Section 2: The approach */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						The approach
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						boltn is built AI-first. The tooling, the workflows, the way this site was built — all
						of it uses the approach I advocate. That is proof of breadth. It is not a client
						template.
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						Client engagements are different because every client situation is different. Your
						technical debt is yours — the accumulation of every reasonable decision made under
						pressure that now constrains what is possible. Your team has fears, opinions, and
						institutional knowledge that no playbook accounts for. The approach has to start from
						that reality.
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						Three dimensions move together or the complexity wall hits anyway: the technology —
						architecture, integrations, data; the organisation — ownership, process, decision
						structures; and the people — skills, psychology, willingness to change. You cannot solve
						a technology problem when the organisation has not moved. You cannot move the
						organisation when the people are not ready.
					</p>
				</div>
			</Section>

			{/* Bottom CTA */}
			<Section className="py-24 text-center md:py-32">
				<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
					Start with a conversation
				</h2>
				<p className="mt-4 text-muted-foreground">
					30 minutes to talk through where your team is and what is not working yet. No pitch, no
					obligation.
				</p>
				<div className="mt-8">
					<CtaButton href="/book">Book a discovery call</CtaButton>
				</div>
			</Section>
		</>
	);
}
