"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	return (
		<button
			type="button"
			className="font-mono text-[9px] uppercase tracking-[0.18em] text-[--text-faint] transition-colors duration-150 hover:text-[--text-body]"
			onClick={async () => {
				await navigator.clipboard.writeText(text);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}}
		>
			{copied ? "Copied" : "Copy"}
		</button>
	);
}
