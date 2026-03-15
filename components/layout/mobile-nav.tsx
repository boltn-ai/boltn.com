"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
	open: boolean;
	onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
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
		<div
			id="mobile-nav"
			ref={navRef}
			aria-hidden={!open}
			className={cn(
				"overflow-hidden border-t border-[--border] bg-[--bg] transition-all duration-200 ease-in-out md:hidden",
				open ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
			)}
		>
			<nav
				aria-label="Mobile navigation"
				className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-6"
			>
				<Link
					href="/about"
					onClick={onClose}
					className="font-mono text-[10px] uppercase tracking-[0.18em] text-[--text-muted] transition-colors duration-150 hover:text-[--text-body]"
				>
					About
				</Link>
				<Link
					href="/services"
					onClick={onClose}
					className="font-mono text-[10px] uppercase tracking-[0.18em] text-[--text-muted] transition-colors duration-150 hover:text-[--text-body]"
				>
					Services
				</Link>
				<Link
					href="/contact"
					onClick={onClose}
					className="font-mono text-[10px] uppercase tracking-[0.18em] text-[--text-muted] transition-colors duration-150 hover:text-[--text-body]"
				>
					Contact
				</Link>
				<CtaButton href="/book" className="w-fit">
					Book a call →
				</CtaButton>
			</nav>
		</div>
	);
}
