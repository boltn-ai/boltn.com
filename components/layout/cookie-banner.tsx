"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "boltn_cookie_notice_dismissed";

export function CookieBanner() {
	const [dismissed, setDismissed] = useState(true);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) setDismissed(false);
	}, []);

	if (dismissed) return null;

	function dismiss() {
		localStorage.setItem(STORAGE_KEY, "1");
		setDismissed(true);
	}

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[--border] bg-[--bg] px-6 py-4">
			<div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
				<p className="font-mono text-[10px] text-[--text-muted]">
					This site uses cookies for booking and analytics.{" "}
					<Link
						href="/legal/cookies"
						className="underline hover:text-[--text-body]"
					>
						Cookie policy
					</Link>
				</p>
				<button
					type="button"
					onClick={dismiss}
					className="shrink-0 bg-[--accent] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[--bg] transition-opacity hover:opacity-[0.88]"
				>
					Got it
				</button>
			</div>
		</div>
	);
}
