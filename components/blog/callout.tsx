type CalloutType = "note" | "warning" | "tip";

const labels: Record<CalloutType, string> = {
	note: "Note",
	warning: "Warning",
	tip: "Tip",
};

/** A well in the prose column: paper-2, ruled top and bottom, its kind as a lead-in. */
export function Callout({
	type = "note",
	children,
}: {
	type?: CalloutType;
	children: React.ReactNode;
}) {
	return (
		<aside className="well px-6 py-5 text-ink" role="note" aria-label={labels[type]}>
			<p className="font-display text-lg">{labels[type]}</p>
			<div className="mt-2 [&>*+*]:mt-4">{children}</div>
		</aside>
	);
}
