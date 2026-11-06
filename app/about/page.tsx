import type { Metadata } from "next";
import { CopyButton } from "@/components/blog/copy-button";
import { CtaButton } from "@/components/ui/cta-button";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { FOCUS, HEADLINE, LINKEDIN_URL, OPEN_TO, ROLE, SHORT_BIO } from "@/lib/profile";

export const metadata: Metadata = {
	title: "About",
	description: `Steve Bolton: ${ROLE} working on ${FOCUS}. Thirty years in software, from test automation to chief architect, and lately the context and tooling that make AI agents work in large, long-lived codebases.`,
};

type Role = {
	dates: string;
	title: string;
	org: string;
	highlights: string[];
};

const career: Role[] = [
	{
		dates: "2021 – 2026",
		title: "Lead Architect, Platform & Developer Enablement",
		org: "dotCMS · remote",
		highlights: [
			"Took CI from broken to trusted: root-caused the flaky failures instead of masking them, then a merge queue and blocking gates so main stayed green. Change-impact test selection cut the full build and test run from three hours to one.",
			"Led the adoption of AI-assisted development by doing it first; the company then licensed Claude Code for every engineer.",
			"Designed the agent context architecture that lets coding agents navigate the multi-million-line monorepo, and built agent skills as versioned specifications, each reporting where it failed and where it spent more tokens than it needed.",
			"Built the analytics platform from zero on Jitsu, ClickHouse and Cube.js, and led the Kubernetes and GitOps modernisation: the product Helm chart, multi-region deployment on ArgoCD, and an observability foundation on Grafana and OpenTelemetry.",
			"Created the architecture decision record practice where none existed, reworked the release strategy and led the move to trunk-based development.",
		],
	},
	{
		dates: "2019 – 2021",
		title: "Senior Backend Software Engineer",
		org: "Syndic8",
		highlights: [
			"Re-architected an early-stage product-data marketplace for scale: a CQRS and event-sourcing data platform on Apache Spark, and an incremental move from monolith to modular monolith on Quarkus using the strangler pattern rather than a rewrite.",
		],
	},
	{
		dates: "2005 – 2019",
		title: "Chief Architect · Lead Developer · Solutions Architect",
		org: "Percussion Software",
		highlights: [
			"As Chief Architect (2015 – 2019), owned technical direction for a content management platform serving government, education, healthcare and media: a four-million-line codebase moved to multi-module Maven and Git, JBoss replaced with Jetty, security testing built into the pipeline, and statutory accessibility compliance.",
			"As Lead Developer (2012 – 2015), containerised the platform to ship it as SaaS on AWS, and prototyped a transactional storage engine with Redis and Lua-scripted indexing over S3.",
			"As Solutions Architect (2007 – 2012), led the mass.gov migration: 26 sites and over 700,000 content items.",
		],
	},
	{
		dates: "1996 – 2005",
		title: "Engineering and consulting",
		org: "Mercury Communications · Cable & Wireless · Clarity / Proxicom · Dimension Data",
		highlights: [
			"Started in test automation: a test harness I built kept finding defects a US vendor's own process had missed, and the vendor adopted it. Then systems programming in C++, and content management implementations for public- and private-sector organisations.",
		],
	},
];

const prose = "text-base text-muted-foreground md:text-lg";
const sectionHeading = "text-2xl font-medium tracking-tight text-foreground md:text-3xl";

function Divider() {
	return (
		<Section className="py-0">
			<div className="border-b border-(--border)" />
		</Section>
	);
}

export default function About() {
	return (
		<>
			<PageHeader headline="Steve Bolton" subtitle={`${HEADLINE} Based in the UK.`} />

			{/* Summary */}
			<Section className="pt-0">
				<div className="max-w-3xl">
					<p className={prose}>
						I lead the engineering that other engineering depends on: build systems, CI/CD, release
						strategy, deployment and observability, and, for the last few years, the context and
						tooling that make AI agents useful in a large, long-lived codebase rather than a demo.
					</p>
					<p className={`${prose} mt-4`}>
						I have been building software since 1996: test automation and systems programming in
						telecoms, fourteen years on a content management platform that ended with me as its
						chief architect, an event-sourced data platform at a start-up, and most recently
						platform and developer enablement at dotCMS. The work I am drawn to is a system that has
						grown faster than its foundations, and a team that needs them fixed without the product
						standing still.
					</p>
				</div>
			</Section>

			<Divider />

			{/* Career */}
			<Section>
				<h2 className={sectionHeading}>Career</h2>
				<ol className="mt-8 max-w-4xl">
					{career.map((role) => (
						<li
							key={role.org}
							className="grid grid-cols-1 gap-2 border-t border-(--border) py-8 md:grid-cols-[10rem_1fr] md:gap-8"
						>
							<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-(--accent) md:pt-1.5">
								{role.dates}
							</p>
							<div>
								<h3 className="text-lg font-medium text-foreground md:text-xl">{role.title}</h3>
								<p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-(--text-muted)">
									{role.org}
								</p>
								<ul className="mt-4 space-y-3">
									{role.highlights.map((item) => (
										<li
											key={item}
											className="flex items-start gap-3 text-base text-muted-foreground"
										>
											<span aria-hidden="true" className="text-(--accent)">
												→
											</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</li>
					))}
				</ol>
				<p className="mt-4 text-sm text-muted-foreground">
					The full history is on{" "}
					<a
						href={LINKEDIN_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="underline underline-offset-4 hover:text-foreground"
					>
						LinkedIn
					</a>
					.
				</p>
			</Section>

			<Divider />

			{/* How I think about the work */}
			<Section>
				<div className="max-w-3xl">
					<h2 className={sectionHeading}>How I think about the work</h2>
					<p className={`${prose} mt-4`}>
						I have watched the same cycle repeat across every major technology shift I have worked
						through. Teams moved applications to the cloud without rethinking how they were built,
						and got the same problems somewhere more expensive. Teams split monoliths into services
						without solving the ownership and communication problems that made the monolith hard,
						and the complexity moved rather than shrank.
					</p>
					<p className={`${prose} mt-4`}>
						AI adoption is following the same arc. The quick wins are real, and then the jump from a
						few agents to many exposes every problem that was never resolved: outdated
						documentation, unclear ownership, brittle integrations, knowledge that lives in one
						person&rsquo;s head. The agents inherit the gaps the humans worked around.
					</p>
					<p className={`${prose} mt-4`}>
						No team starts from a clean slate, so the work starts from the architecture and the team
						that actually exist. Technology, organisation and people have to move together, and the
						structure that holds is the structure the system enforces, not the structure people have
						to remember. This site and the assessment on it were built AI-first, with the same
						context architecture and verification I would argue for in any team.
					</p>
				</div>
			</Section>

			<Divider />

			{/* Short bio */}
			<Section>
				<div className="max-w-3xl">
					<div className="flex items-baseline justify-between gap-4">
						<h2 className={sectionHeading}>Short bio</h2>
						<CopyButton text={SHORT_BIO} />
					</div>
					<p className="mt-2 text-sm text-muted-foreground">
						For introductions, event listings and anywhere else that needs one.
					</p>
					<blockquote className="mt-6 border-l-2 border-(--accent) pl-6">
						<p className={prose}>{SHORT_BIO}</p>
					</blockquote>
				</div>
			</Section>

			{/* Bottom CTA */}
			<Section className="py-24 text-center md:py-32">
				<h2 className={sectionHeading}>Get in touch</h2>
				<p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
					{OPEN_TO} I am also always glad to compare notes with people working on the same problems.
				</p>
				<div className="mx-auto mt-8 max-w-sm">
					<CtaButton href="/contact">Get in touch</CtaButton>
				</div>
				<a
					href={LINKEDIN_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-6 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-(--text-muted) transition-colors duration-150 hover:text-(--text-body)"
				>
					LinkedIn &rarr;
				</a>
			</Section>
		</>
	);
}
