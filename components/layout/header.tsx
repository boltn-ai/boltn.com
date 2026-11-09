"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileNav } from "@/components/layout/mobile-nav";

const links = [
	{ href: "/thinking", label: "Thinking" },
	{ href: "/about", label: "About" },
	{ href: "/assessment", label: "Assessment" },
];

export function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		function handleScroll() {
			setScrolled(window.scrollY > 0);
		}
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className="slab sticky top-0 z-[300] w-full" data-scrolled={scrolled || undefined}>
			<div className="container flex min-h-16 items-center justify-between gap-8">
				<Link
					href="/"
					className="font-display text-2xl leading-none tracking-[-0.02em] text-paper"
					aria-label="Steve Bolton, home"
				>
					Steve Bolton
				</Link>

				{/* Desktop nav */}
				<nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
					{links.map((link) => (
						<Link key={link.href} href={link.href} className="nav-link text-base">
							{link.label}
						</Link>
					))}
					<Link href="/contact" className="btn btn--on-ink min-h-11">
						Get in touch
					</Link>
				</nav>

				{/* Mobile menu button */}
				<button
					type="button"
					className="inline-flex size-11 items-center justify-center text-paper md:hidden"
					onClick={() => setMobileOpen(!mobileOpen)}
					aria-label={mobileOpen ? "Close menu" : "Open menu"}
					aria-expanded={mobileOpen}
					aria-controls="mobile-nav"
				>
					{mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
				</button>
			</div>

			<MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={links} />
		</header>
	);
}
