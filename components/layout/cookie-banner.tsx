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
		<div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#3f3f46] bg-[#0a0a0a] px-6 py-4">
			<div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
				<p className="text-sm text-muted-foreground">
					This site uses cookies for booking and analytics.{" "}
					<Link
						href="/legal/cookies"
						className="underline hover:text-foreground"
					>
						Cookie policy
					</Link>
				</p>
				<button
					type="button"
					onClick={dismiss}
					className="shrink-0 text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					Got it
				</button>
			</div>
		</div>
	);
}
