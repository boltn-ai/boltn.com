import { Linkedin } from "lucide-react";

export function ShareButtons({
	title,
	url,
}: { title: string; url: string }) {
	const encodedUrl = encodeURIComponent(url);
	const encodedTitle = encodeURIComponent(title);
	return (
		<div className="mt-12 flex items-center gap-4 border-t border-[--border] pt-6">
			<span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[--text-faint]">
				Share
			</span>
			<a
				href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
				target="_blank"
				rel="noopener noreferrer"
				className="text-[--text-muted] transition-colors duration-150 hover:text-[--text-body]"
				aria-label="Share on LinkedIn"
			>
				<Linkedin size={16} />
			</a>
			<a
				href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
				target="_blank"
				rel="noopener noreferrer"
				className="text-[--text-muted] transition-colors duration-150 hover:text-[--text-body]"
				aria-label="Share on X"
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="currentColor"
					aria-hidden="true"
				>
					<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
				</svg>
			</a>
		</div>
	);
}
