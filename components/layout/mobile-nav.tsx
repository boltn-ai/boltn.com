"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

interface MobileNavProps {
	open: boolean;
	onClose: () => void;
	links: { href: string; label: string }[];
}

export function MobileNav({ open, onClose, links }: MobileNavProps) {
	const navRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;

		function handleClickOutside(e: MouseEvent) {
			if (navRef.current && !navRef.current.contains(e.target as Node)) {
				onClose();
			}
		}

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
		}

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open, onClose]);

	return (
		<div id="mobile-nav" ref={navRef} hidden={!open} className="border-t border-rule-2 md:hidden">
			<nav aria-label="Mobile navigation" className="container flex flex-col gap-2 py-6">
				{links.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						onClick={onClose}
						className="nav-link py-2 font-display text-xl"
					>
						{link.label}
					</Link>
				))}
				<Link href="/contact" onClick={onClose} className="btn btn--on-ink mt-4 w-fit">
					Get in touch
				</Link>
			</nav>
		</div>
	);
}
