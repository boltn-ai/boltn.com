"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	return (
		<button
			type="button"
			className="btn btn--secondary min-h-11 px-4"
			onClick={async () => {
				await navigator.clipboard.writeText(text);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}}
		>
			<span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
		</button>
	);
}
