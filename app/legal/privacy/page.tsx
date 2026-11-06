import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: "How this site collects, uses and protects your personal data.",
};

export default function PrivacyPolicy() {
	return (
		<>
			<PageHeader headline="Privacy Policy" />

			{/* Section: Intro and last updated */}
			<Section className="pt-0">
				<div className="max-w-3xl">
					<p className="text-sm text-muted-foreground">Last updated: 6 November 2026</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						This policy explains what personal data this site collects, why I collect it, how long I
						keep it, and what your rights are. I have written it in plain English because that is
						the point — not to bury the important parts.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-(--border)" />
			</Section>

			{/* Section: Who I am */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Who I am
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						This is the personal website of Steve Bolton, who is the data controller and is based in
						the United Kingdom. For all data protection enquiries, contact me at{" "}
						<a
							href="mailto:steve@boltn.com"
							className="underline underline-offset-4 hover:text-foreground"
						>
							steve@boltn.com
						</a>
						.
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						I handle personal data within the requirements of UK GDPR and the Data Protection Act
						2018.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-(--border)" />
			</Section>

			{/* Section: What I collect and why */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						What I collect and why
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						I only collect data you actively provide or that is generated as part of a service you
						use on this site. I do not buy data, run tracking pixels, or use advertising networks.
					</p>

					<h3 className="mt-8 text-lg font-medium text-foreground">
						Contact form submissions (via Resend)
					</h3>
					<p className="mt-2 text-base text-muted-foreground md:text-lg">
						When you use the contact form, I collect your name, email address, and the content of
						your message. I use this to respond to your enquiry.
					</p>
					<p className="mt-2 text-base text-muted-foreground md:text-lg">
						<strong className="text-foreground">Lawful basis:</strong> Legitimate interests (Article
						6(1)(f) UK GDPR). My legitimate interest is responding to enquiries directed at me. I
						have balanced this against your interests and do not consider this processing to be
						intrusive or unexpected.
					</p>

					<h3 className="mt-8 text-lg font-medium text-foreground">
						Site analytics (via Vercel Analytics)
					</h3>
					<p className="mt-2 text-base text-muted-foreground md:text-lg">
						This site uses Vercel Analytics. It is cookieless and collects only aggregate,
						non-personal data — page views, referrer categories, and general device type. No
						individual user records are created or retained by me. No consent is required because no
						personal data is collected and no cookies are set.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-(--border)" />
			</Section>

			{/* Section: Third-party processors */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Third-party processors
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						I use the following third-party services to operate this site. Each processes data on my
						behalf under their own data processing agreements.
					</p>

					<h3 className="mt-8 text-lg font-medium text-foreground">Resend</h3>
					<p className="mt-2 text-base text-muted-foreground md:text-lg">
						Resend is an email delivery service used to route contact form submissions to me. You
						can review their privacy practices at{" "}
						<a
							href="https://resend.com/legal/privacy-policy"
							target="_blank"
							rel="noopener noreferrer"
							className="underline underline-offset-4 hover:text-foreground"
						>
							resend.com/legal/privacy-policy
						</a>
						.
					</p>

					<h3 className="mt-8 text-lg font-medium text-foreground">Vercel</h3>
					<p className="mt-2 text-base text-muted-foreground md:text-lg">
						Vercel hosts this site and provides the cookieless analytics service described above.
						You can review their privacy practices at{" "}
						<a
							href="https://vercel.com/legal/privacy-policy"
							target="_blank"
							rel="noopener noreferrer"
							className="underline underline-offset-4 hover:text-foreground"
						>
							vercel.com/legal/privacy-policy
						</a>
						.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-(--border)" />
			</Section>

			{/* Section: How long I keep your data */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						How long I keep your data
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						Retention periods depend on why the data was collected.
					</p>
					<ul className="mt-4 space-y-3 text-base text-muted-foreground md:text-lg">
						<li>
							<strong className="text-foreground">Resend contact form data:</strong> Retained until
							the enquiry is resolved or you ask me to delete it. I do not keep contact submissions
							after the conversation has concluded.
						</li>
						<li>
							<strong className="text-foreground">Vercel Analytics:</strong> Aggregate data only. No
							individual records are retained by me.
						</li>
					</ul>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-(--border)" />
			</Section>

			{/* Section: Your rights */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Your rights
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						Under UK GDPR, you have the following rights in relation to your personal data:
					</p>
					<ul className="mt-4 space-y-2 text-base text-muted-foreground md:text-lg">
						<li>
							<strong className="text-foreground">Access:</strong> You can request a copy of the
							personal data I hold about you.
						</li>
						<li>
							<strong className="text-foreground">Rectification:</strong> You can ask me to correct
							inaccurate personal data.
						</li>
						<li>
							<strong className="text-foreground">Erasure:</strong> You can ask me to delete your
							personal data where I no longer have grounds to retain it.
						</li>
						<li>
							<strong className="text-foreground">Restriction:</strong> You can ask me to restrict
							processing of your data in certain circumstances.
						</li>
						<li>
							<strong className="text-foreground">Data portability:</strong> Where processing is
							based on consent or contract, you can request your data in a portable format.
						</li>
						<li>
							<strong className="text-foreground">Complaints:</strong> You have the right to lodge a
							complaint with the Information Commissioner&apos;s Office (ICO) at{" "}
							<a
								href="https://ico.org.uk/make-a-complaint/"
								target="_blank"
								rel="noopener noreferrer"
								className="underline underline-offset-4 hover:text-foreground"
							>
								ico.org.uk/make-a-complaint
							</a>
							.
						</li>
					</ul>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						To exercise any of these rights, contact me at{" "}
						<a
							href="mailto:steve@boltn.com"
							className="underline underline-offset-4 hover:text-foreground"
						>
							steve@boltn.com
						</a>
						. I will respond within one calendar month.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-(--border)" />
			</Section>

			{/* Section: Right to object — MUST be separate and prominent per ICO guidance */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Your right to object
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						Where I process your personal data on the basis of legitimate interests — specifically,
						responding to contact form enquiries — you have the right to object to that processing.
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						If you object, I will stop processing your personal data unless I can demonstrate
						compelling legitimate grounds that override your interests, rights, and freedoms, or
						unless the processing is necessary for the establishment, exercise, or defence of legal
						claims.
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						To object, contact me at{" "}
						<a
							href="mailto:steve@boltn.com"
							className="underline underline-offset-4 hover:text-foreground"
						>
							steve@boltn.com
						</a>
						.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-(--border)" />
			</Section>

			{/* Section: Automated decision-making */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Automated decision-making
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						I do not carry out any automated decision-making or profiling that produces legal or
						similarly significant effects. No decisions about you are made by automated means.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-(--border)" />
			</Section>

			{/* Section: Cookies */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Cookies
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						This site sets no cookies. Vercel Analytics is cookieless. For full details, see the{" "}
						<Link
							href="/legal/cookies"
							className="underline underline-offset-4 hover:text-foreground"
						>
							Cookie Policy
						</Link>
						.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-(--border)" />
			</Section>

			{/* Section: Changes to this policy */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Changes to this policy
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						I may update this policy from time to time as the site changes or as legal requirements
						evolve. The &quot;Last updated&quot; date at the top of this page will always reflect
						the most recent version.
					</p>
				</div>
			</Section>
		</>
	);
}
