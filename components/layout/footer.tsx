import { LINKEDIN_URL } from "@/lib/profile";

export function Footer() {
	return (
		<footer className="border-t border-(--border) py-4 px-6">
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center md:flex-row md:justify-between md:gap-4 md:text-left">
				<span className="whitespace-nowrap font-mono text-[9px] uppercase text-(--text-faint)">
					UK · Remote or London
				</span>
				<span
					className="text-[9px] text-(--text-faint)"
					style={{
						fontFamily: "Georgia, 'Times New Roman', serif",
						fontStyle: "italic",
					}}
				>
					Steve Bolton · engineering maturity and AI-assisted development
				</span>
				<span className="flex items-center gap-4 whitespace-nowrap font-mono text-[9px] uppercase text-(--text-faint)">
					<a
						href={LINKEDIN_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors duration-150 hover:text-(--text-body)"
					>
						LinkedIn
					</a>
					<span>© 2026</span>
				</span>
			</div>
		</footer>
	);
}
