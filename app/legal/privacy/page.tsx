import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: "How boltn collects, uses, and protects your personal data.",
};

export default function PrivacyPolicy() {
	return (
		<>
			<PageHeader headline="Privacy Policy" />

			{/* Section: Intro and last updated */}
			<Section className="pt-0">
				<div className="max-w-3xl">
					<p className="text-sm text-muted-foreground">
						Last updated: 15 March 2026
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						This policy explains what personal data boltn collects, why we
						collect it, how long we keep it, and what your rights are. We have
						written it in plain English because that is the point — not to bury
						the important parts.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-zinc-800" />
			</Section>

			{/* Section: Who we are */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Who we are
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						The data controller is Steve Bolton, trading as boltn, based in the
						United Kingdom. boltn is a sole trader. For all data protection
						enquiries, contact us at{" "}
						<a
							href="mailto:privacy@boltn.com"
							className="underline underline-offset-4 hover:text-foreground"
						>
							privacy@boltn.com
						</a>
						.
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						As a small sole trader, boltn is not required to register with the
						ICO unless we process data in ways that trigger mandatory
						registration. We operate within the requirements of UK GDPR and the
						Data Protection Act 2018.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-zinc-800" />
			</Section>

			{/* Section: What we collect and why */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						What we collect and why
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						We only collect data you actively provide or that is generated as
						part of a service you use on this site. We do not buy data, run
						tracking pixels, or use advertising networks.
					</p>

					<h3 className="mt-8 text-lg font-medium text-foreground">
						Booking data (via Cal.com)
					</h3>
					<p className="mt-2 text-base text-muted-foreground md:text-lg">
						When you book a discovery call, Cal.com collects your name, email
						address, and appointment details. This data is necessary to schedule
						and confirm the booking.
					</p>
					<p className="mt-2 text-base text-muted-foreground md:text-lg">
						<strong className="text-foreground">Lawful basis:</strong>{" "}
						Contractual necessity (Article 6(1)(b) UK GDPR). Processing is
						required to fulfil the booking you requested. Without it, we cannot
						hold the appointment.
					</p>

					<h3 className="mt-8 text-lg font-medium text-foreground">
						Contact form submissions (via Resend)
					</h3>
					<p className="mt-2 text-base text-muted-foreground md:text-lg">
						When you use the contact form, we collect your name, email address,
						and the content of your message. We use this to respond to your
						enquiry.
					</p>
					<p className="mt-2 text-base text-muted-foreground md:text-lg">
						<strong className="text-foreground">Lawful basis:</strong>{" "}
						Legitimate interests (Article 6(1)(f) UK GDPR). Our legitimate
						interest is responding to enquiries directed at us. We have balanced
						this against your interests and do not consider this processing to
						be intrusive or unexpected.
					</p>

					<h3 className="mt-8 text-lg font-medium text-foreground">
						Site analytics (via Vercel Analytics)
					</h3>
					<p className="mt-2 text-base text-muted-foreground md:text-lg">
						This site uses Vercel Analytics. It is cookieless and collects only
						aggregate, non-personal data — page views, referrer categories, and
						general device type. No individual user records are created or
						retained by boltn. No consent is required because no personal data
						is collected and no cookies are set.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-zinc-800" />
			</Section>

			{/* Section: Third-party processors */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Third-party processors
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						We use the following third-party services to operate this site. Each
						processes data on our behalf under their own data processing
						agreements.
					</p>

					<h3 className="mt-8 text-lg font-medium text-foreground">Cal.com</h3>
					<p className="mt-2 text-base text-muted-foreground md:text-lg">
						Cal.com is a US-based scheduling service. Data transferred from the
						UK to the US is handled under standard contractual clauses. You can
						review their privacy practices at{" "}
						<a
							href="https://cal.com/privacy"
							target="_blank"
							rel="noopener noreferrer"
							className="underline underline-offset-4 hover:text-foreground"
						>
							cal.com/privacy
						</a>
						.
					</p>

					<h3 className="mt-8 text-lg font-medium text-foreground">Resend</h3>
					<p className="mt-2 text-base text-muted-foreground md:text-lg">
						Resend is an email delivery service used to route contact form
						submissions to us. You can review their privacy practices at{" "}
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
						Vercel hosts this site and provides the cookieless analytics service
						described above. You can review their privacy practices at{" "}
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
				<div className="border-b border-zinc-800" />
			</Section>

			{/* Section: How long we keep your data */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						How long we keep your data
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						Retention periods depend on why the data was collected.
					</p>
					<ul className="mt-4 space-y-3 text-base text-muted-foreground md:text-lg">
						<li>
							<strong className="text-foreground">Cal.com booking data:</strong>{" "}
							Retained for the duration of the booking relationship. Once the
							engagement is concluded and no further obligation exists, you can
							contact us to request deletion.
						</li>
						<li>
							<strong className="text-foreground">
								Resend contact form data:
							</strong>{" "}
							Retained until the enquiry is resolved or you ask us to delete it.
							We do not keep contact submissions after the conversation has
							concluded.
						</li>
						<li>
							<strong className="text-foreground">Vercel Analytics:</strong>{" "}
							Aggregate data only. No individual records are retained by boltn.
						</li>
					</ul>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-zinc-800" />
			</Section>

			{/* Section: Your rights */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Your rights
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						Under UK GDPR, you have the following rights in relation to your
						personal data:
					</p>
					<ul className="mt-4 space-y-2 text-base text-muted-foreground md:text-lg">
						<li>
							<strong className="text-foreground">Access:</strong> You can
							request a copy of the personal data we hold about you.
						</li>
						<li>
							<strong className="text-foreground">Rectification:</strong> You
							can ask us to correct inaccurate personal data.
						</li>
						<li>
							<strong className="text-foreground">Erasure:</strong> You can ask
							us to delete your personal data where we no longer have grounds to
							retain it.
						</li>
						<li>
							<strong className="text-foreground">Restriction:</strong> You can
							ask us to restrict processing of your data in certain
							circumstances.
						</li>
						<li>
							<strong className="text-foreground">Data portability:</strong>{" "}
							Where processing is based on consent or contract, you can request
							your data in a portable format.
						</li>
						<li>
							<strong className="text-foreground">Complaints:</strong> You have
							the right to lodge a complaint with the Information
							Commissioner&apos;s Office (ICO) at{" "}
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
						To exercise any of these rights, contact us at{" "}
						<a
							href="mailto:privacy@boltn.com"
							className="underline underline-offset-4 hover:text-foreground"
						>
							privacy@boltn.com
						</a>
						. We will respond within one calendar month.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-zinc-800" />
			</Section>

			{/* Section: Right to object — MUST be separate and prominent per ICO guidance */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Your right to object
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						Where we process your personal data on the basis of legitimate
						interests — specifically, responding to contact form enquiries — you
						have the right to object to that processing.
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						If you object, we will stop processing your personal data unless we
						can demonstrate compelling legitimate grounds that override your
						interests, rights, and freedoms, or unless the processing is
						necessary for the establishment, exercise, or defence of legal
						claims.
					</p>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						To object, contact us at{" "}
						<a
							href="mailto:privacy@boltn.com"
							className="underline underline-offset-4 hover:text-foreground"
						>
							privacy@boltn.com
						</a>
						.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-zinc-800" />
			</Section>

			{/* Section: Automated decision-making */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Automated decision-making
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						We do not carry out any automated decision-making or profiling that
						produces legal or similarly significant effects. No decisions about
						you are made by automated means.
					</p>
				</div>
			</Section>

			{/* Divider */}
			<Section className="py-0">
				<div className="border-b border-zinc-800" />
			</Section>

			{/* Section: Cookies */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Cookies
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						This site uses cookies in limited circumstances — specifically,
						functional cookies set by the Cal.com booking widget. Vercel
						Analytics is cookieless and sets no cookies. For full details on
						what cookies are used and why, see our{" "}
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
				<div className="border-b border-zinc-800" />
			</Section>

			{/* Section: Changes to this policy */}
			<Section>
				<div className="max-w-3xl">
					<h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
						Changes to this policy
					</h2>
					<p className="mt-4 text-base text-muted-foreground md:text-lg">
						We may update this policy from time to time as our services change
						or as legal requirements evolve. The &quot;Last updated&quot; date
						at the top of this page will always reflect the most recent version.
						We recommend checking back periodically if you have an ongoing
						relationship with us.
					</p>
				</div>
			</Section>
		</>
	);
}
