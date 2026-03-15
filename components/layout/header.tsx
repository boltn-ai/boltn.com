"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

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
		<header
			className={cn(
				"sticky top-0 z-50 w-full border-b border-[--border] transition-colors duration-200",
				scrolled ? "bg-[--bg]/80 backdrop-blur-sm" : "bg-[--bg]",
			)}
		>
			<div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
				<Link
					href="/"
					className="font-mono text-[13px] uppercase tracking-[0.25em] text-[--text-primary]"
				>
					boltn
				</Link>

				{/* Desktop nav */}
				<nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
					<Link
						href="/about"
						className="font-mono text-[10px] uppercase tracking-[0.18em] text-[--text-muted] transition-colors duration-150 hover:text-[--text-body]"
					>
						About
					</Link>
					<Link
						href="/services"
						className="font-mono text-[10px] uppercase tracking-[0.18em] text-[--text-muted] transition-colors duration-150 hover:text-[--text-body]"
					>
						Services
					</Link>
					<Link
						href="/thinking"
						className="font-mono text-[10px] uppercase tracking-[0.18em] text-[--text-muted] transition-colors duration-150 hover:text-[--text-body]"
					>
						Thinking
					</Link>
					<Link
						href="/book"
						className="font-mono text-[10px] uppercase tracking-[0.18em]"
						style={{
							color: "var(--accent)",
							borderBottom: "1px solid rgba(200,132,42,0.4)",
							paddingBottom: "1px",
						}}
					>
						Book a call →
					</Link>
				</nav>

				{/* Mobile hamburger */}
				<button
					type="button"
					className="inline-flex items-center justify-center text-[--text-primary] md:hidden"
					onClick={() => setMobileOpen(!mobileOpen)}
					aria-label={mobileOpen ? "Close menu" : "Open menu"}
					aria-expanded={mobileOpen}
					aria-controls="mobile-nav"
				>
					{mobileOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			<MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
		</header>
	);
}
