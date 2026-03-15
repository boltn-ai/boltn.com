type CalloutType = "note" | "warning" | "tip";

const icons: Record<CalloutType, string> = {
	note: "i",
	warning: "!",
	tip: "->",
};

const labels: Record<CalloutType, string> = {
	note: "Note",
	warning: "Warning",
	tip: "Tip",
};

export function Callout({
	type = "note",
	children,
}: {
	type?: CalloutType;
	children: React.ReactNode;
}) {
	return (
		<aside
			className="my-6 border-l-2 border-[--accent-dim] bg-[--bg-raised] px-5 py-4"
			role="note"
		>
			<div className="mb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[--accent]">
				<span aria-hidden="true">{icons[type]}</span> {labels[type]}
			</div>
			<div
				className="text-[14px] leading-[1.75] text-[--text-muted]"
				style={{
					fontFamily: "Georgia, 'Times New Roman', serif",
					fontStyle: "italic",
				}}
			>
				{children}
			</div>
		</aside>
	);
}
