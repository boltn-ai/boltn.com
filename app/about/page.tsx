import { existsSync } from "node:fs";
import path from "node:path";
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
		title: "Chief Architect, Lead Developer, Solutions Architect",
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
		org: "Mercury Communications, Cable & Wireless, Clarity / Proxicom, Dimension Data",
		highlights: [
			"Started in test automation: a test harness I built kept finding defects a US vendor's own process had missed, and the vendor adopted it. Then systems programming in C++, and content management implementations for public- and private-sector organisations.",
		],
	},
];

const prose = "max-w-[65ch] text-lg text-ink-2";

// The headshot slot. The photograph is Steve's to supply: drop it at public/headshot.jpg
// (square, at least 800 x 800) and the page shows it, in the theme's black and white.
// Until then the slot does not render, so the page never shows an empty frame.
const HEADSHOT_FILE = "headshot.jpg";
const hasHeadshot = existsSync(path.join(process.cwd(), "public", HEADSHOT_FILE));

export default function About() {
	return (
		<>
			<PageHeader headline="Steve Bolton" subtitle={`${HEADLINE} Based in the UK.`} />

			{/* Summary, with the headshot beside it once there is one */}
			<Section className="pt-0">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
					<div className={hasHeadshot ? "md:col-span-7" : "md:col-span-9"}>
						<p className="text-2xl leading-[1.4] text-ink">
							I lead the engineering that other engineering depends on: build systems, CI/CD,
							release strategy, deployment and observability, and, for the last few years, the
							context and tooling that make AI agents useful in a large, long-lived codebase rather
							than a demo.
						</p>
						<p className={`${prose} mt-8`}>
							I have been building software since 1996: test automation and systems programming in
							telecoms, fourteen years on a content management platform that ended with me as its
							chief architect, an event-sourced data platform at a start-up, and most recently
							platform and developer enablement at dotCMS. The work I am drawn to is a system that
							has grown faster than its foundations, and a team that needs them fixed without the
							product standing still.
						</p>
					</div>
					{hasHeadshot && (
						<figure className="md:col-span-4 md:col-start-9">
							<div
								data-slot="headshot"
								data-alt="Steve Bolton, head and shoulders"
								className="aspect-square border border-rule"
							>
								<img
									src={`/${HEADSHOT_FILE}`}
									alt="Steve Bolton"
									width={1000}
									height={1000}
									fetchPriority="high"
								/>
							</div>
						</figure>
					)}
				</div>
			</Section>

			{/* Career: an index of roles */}
			<Section>
				<hr className="rule--double" />
				<h2 className="mt-12 text-ink">Career</h2>
				<ol className="mt-12">
					{career.map((role) => (
						<li
							key={role.org}
							className="grid grid-cols-1 gap-3 border-t border-rule py-10 md:grid-cols-12 md:gap-8"
						>
							<div className="md:col-span-4">
								<p className="agate text-ink">{role.dates}</p>
								<h3 className="mt-3 text-ink">{role.title}</h3>
								<p className="byline mt-2">{role.org}</p>
							</div>
							<ul className="mt-3 max-w-[70ch] list-[square] space-y-3 pl-5 text-ink-2 marker:text-muted md:col-span-8 md:mt-0">
								{role.highlights.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</li>
					))}
				</ol>
				<p className="mt-2 border-t border-rule pt-6 text-ink-2">
					The full history is on{" "}
					<a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="link">
						LinkedIn
					</a>
					.
				</p>
			</Section>

			{/* How I think about the work: one column of prose */}
			<Section>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-12">
					<h2 className="text-ink md:col-span-4">How I think about the work</h2>
					<div className="md:col-span-8">
						<p className={prose}>
							I have watched the same cycle repeat across every major technology shift I have worked
							through. Teams moved applications to the cloud without rethinking how they were built,
							and got the same problems somewhere more expensive. Teams split monoliths into
							services without solving the ownership and communication problems that made the
							monolith hard, and the complexity moved rather than shrank.
						</p>
						<p className={`${prose} mt-6`}>
							AI adoption is following the same arc. The quick wins are real, and then the jump from
							a few agents to many exposes every problem that was never resolved: outdated
							documentation, unclear ownership, brittle integrations, knowledge that lives in one
							person&rsquo;s head. The agents inherit the gaps the humans worked around.
						</p>
						<p className={`${prose} mt-6`}>
							No team starts from a clean slate, so the work starts from the architecture and the
							team that actually exist. Technology, organisation and people have to move together,
							and the structure that holds is the structure the system enforces, not the structure
							people have to remember. This site and the assessment on it were built AI-first, with
							the same context architecture and verification I would argue for in any team.
						</p>
					</div>
				</div>
			</Section>

			{/* Short bio: a well */}
			<Section>
				<div className="well px-6 py-10 md:px-12">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<h2 className="text-3xl text-ink">Short bio</h2>
						<CopyButton text={SHORT_BIO} />
					</div>
					<p className="byline mt-3">
						For introductions, event listings and anywhere else that needs one.
					</p>
					<p className="mt-8 max-w-[65ch] text-lg text-ink">{SHORT_BIO}</p>
				</div>
			</Section>

			{/* The close: an ink band */}
			<section className="slab mt-(--section-gap-s) py-(--section-gap-s)">
				<div className="container grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
					<h2 className="text-paper md:col-span-5">Get in touch</h2>
					<div className="md:col-span-7">
						<p className="text-lg text-paper">
							{OPEN_TO} I am also always glad to compare notes with people working on the same
							problems.
						</p>
						<div className="mt-8 flex flex-wrap gap-4">
							<CtaButton href="/contact" variant="paper">
								Send a message
							</CtaButton>
							<a
								href={LINKEDIN_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn--on-ink"
							>
								LinkedIn
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
