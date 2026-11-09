import Link from "next/link";
import { LINKEDIN_URL } from "@/lib/profile";

const links = [
	{ href: "/thinking", label: "Thinking" },
	{ href: "/about", label: "About" },
	{ href: "/assessment", label: "Assessment" },
	{ href: "/contact", label: "Contact" },
	{ href: "/legal/privacy", label: "Privacy" },
	{ href: "/legal/cookies", label: "Cookies" },
];

export function Footer() {
	return (
		<footer className="mt-(--section-gap) pb-16">
			<div className="container">
				<hr className="rule--double" />
				<div className="grid gap-10 pt-12 md:grid-cols-12 md:gap-8">
					<p className="font-display text-3xl leading-[1.1] tracking-[-0.02em] text-ink md:col-span-7 md:text-[2.5rem]">
						Writing on engineering maturity and AI-assisted development.
					</p>
					<div className="md:col-span-4 md:col-start-9">
						<ul className="grid grid-cols-2 gap-x-8 gap-y-2">
							{links.map((link) => (
								<li key={link.href}>
									<Link href={link.href} className="title-link">
										{link.label}
									</Link>
								</li>
							))}
							<li>
								<a
									href={LINKEDIN_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="title-link"
								>
									LinkedIn
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="byline mt-12 flex flex-col gap-1 border-t border-rule pt-4 sm:flex-row sm:justify-between">
					<p>Steve Bolton, UK. Remote or London.</p>
					<p>© 2026</p>
				</div>
			</div>
		</footer>
	);
}
