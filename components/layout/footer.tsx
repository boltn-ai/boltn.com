export function Footer() {
	return (
		<footer className="border-t border-[--border] py-4 px-6">
			<div className="mx-auto flex max-w-5xl items-center justify-between">
				<span className="font-mono text-[9px] uppercase text-[--text-faint]">London, UK</span>
				<span
					className="text-[9px] text-[--text-faint]"
					style={{
						fontFamily: "Georgia, 'Times New Roman', serif",
						fontStyle: "italic",
					}}
				>
					boltn.com · architecture-first AI adoption
				</span>
				<span className="font-mono text-[9px] uppercase text-[--text-faint]">© 2026</span>
			</div>
		</footer>
	);
}
