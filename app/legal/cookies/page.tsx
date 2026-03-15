import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
	title: "Cookie Policy",
	description: "What cookies boltn.com uses and why.",
};

export default function CookiePolicy() {
	return (
		<>
			<PageHeader headline="Cookie Policy" />

			{/* Section: Intro and last updated */}
			<Section className="pt-0">
				<div className="max-w-3xl">
					<p className="text-sm text-muted-foreground">
						Last updated: 15 March 2026
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						This policy explains what cookies boltn.com uses, why we use them,
						and how you can manage them. We keep it specific — not a generic
						template.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-[--border]" />
			</Section>

			{/* Section: What are cookies */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						What are cookies
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						Cookies are small text files that a website places in your browser.
						They allow a site to remember information about your visit —
						preferences, session state, or other data — so that the site
						functions correctly or can recall your settings on a return visit.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-[--border]" />
			</Section>

			{/* Section: Cookies this site uses */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Cookies this site uses
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						This site uses a minimal set of cookies. The table below covers each
						one.
					</p>

					{/* Cal.com */}
					<h3 className="mt-8 text-lg font-medium text-foreground">
						Cal.com booking widget
					</h3>
					<div className="mt-4 space-y-3 text-base text-muted-foreground md:text-lg">
						<div>
							<span className="font-medium text-foreground">What: </span>
							Session and preference cookies set by the Cal.com scheduling
							widget when you use the booking form.
						</div>
						<div>
							<span className="font-medium text-foreground">Why: </span>
							These cookies enable the booking flow — slot reservation and
							session continuity between steps. Without them, the booking form
							cannot function.
						</div>
						<div>
							<span className="font-medium text-foreground">Duration: </span>
							Session cookies expire when you close your browser. Any persistent
							preference cookies are set according to{" "}
							<a
								href="https://cal.com/privacy"
								target="_blank"
								rel="noopener noreferrer"
								className="underline underline-offset-4 hover:text-foreground"
							>
								Cal.com&apos;s own documentation
							</a>
							.
						</div>
						<div>
							<span className="font-medium text-foreground">Third party: </span>
							Cal.com. These cookies are set by Cal.com, not by boltn.com
							directly.
						</div>
						<div>
							<span className="font-medium text-foreground">Consent: </span>
							These cookies require consent under the Privacy and Electronic
							Communications Regulations (PECR). By using the booking form, you
							are accepting the use of these functional cookies.
						</div>
					</div>

					{/* Vercel Analytics */}
					<h3 className="mt-8 text-lg font-medium text-foreground">
						Vercel Analytics
					</h3>
					<div className="mt-4 space-y-3 text-base text-muted-foreground md:text-lg">
						<div>
							<span className="font-medium text-foreground">Cookies set: </span>
							None. Vercel Analytics is cookieless.
						</div>
						<div>
							<span className="font-medium text-foreground">
								What it collects:{" "}
							</span>
							Aggregate, non-personal data only — page views, referrer
							categories, and general device type. No individual user records
							are created.
						</div>
						<div>
							<span className="font-medium text-foreground">
								Consent required:{" "}
							</span>
							No. Because Vercel Analytics sets no cookies and collects no
							personal data, no consent is required under PECR.
						</div>
					</div>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-[--border]" />
			</Section>

			{/* Section: Managing cookies */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Managing cookies
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						You can control and delete cookies through your browser settings.
						The steps vary by browser — search &quot;[your browser] manage
						cookies&quot; for instructions specific to what you are using.
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						Note that disabling Cal.com cookies will prevent the booking form
						from functioning. If you disable those cookies and still want to get
						in touch, use the contact form instead.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-[--border]" />
			</Section>

			{/* Section: Changes to this policy */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Changes to this policy
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						We may update this policy as the site evolves or if third-party
						services we use change their cookie behaviour. The &quot;Last
						updated&quot; date at the top of this page will reflect the current
						version.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-[--border]" />
			</Section>

			{/* Section: More information */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						More information
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						For information on how we handle personal data more broadly, see our{" "}
						<Link
							href="/legal/privacy"
							className="underline underline-offset-4 hover:text-foreground"
						>
							Privacy Policy
						</Link>
						.
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						For guidance on cookies and your rights under PECR, see the
						ICO&apos;s{" "}
						<a
							href="https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/"
							target="_blank"
							rel="noopener noreferrer"
							className="underline underline-offset-4 hover:text-foreground"
						>
							cookies and similar technologies guidance
						</a>
						.
					</p>
				</div>
			</Section>
		</>
	);
}
