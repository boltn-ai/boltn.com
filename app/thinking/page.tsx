import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "#content";

export const metadata: Metadata = {
	title: "Thinking",
	description:
		"Perspectives on AI adoption, software architecture, and engineering leadership from boltn.",
};

export default function ThinkingPage() {
	const published = posts
		.filter((post) => post.published)
		.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);

	return (
		<main className="mx-auto max-w-3xl px-6 py-16">
			<div className="mb-12">
				<span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[--text-faint]">
					boltn
				</span>
				<h1 className="mt-2 font-display text-[36px] font-normal leading-[1.15] text-[--text-primary]">
					Thinking
				</h1>
			</div>

			{published.length === 0 ? (
				<p className="text-[14px] text-[--text-faint]" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}>
					No posts yet.
				</p>
			) : (
				<ul className="flex flex-col">
					{published.map((post) => (
						<li
							key={post.slug}
							className="border-b border-[--border] py-6 first:pt-0"
						>
							<span className="block font-mono text-[10px] tracking-[0.18em] text-[--text-faint]">
								{new Date(post.date).toLocaleDateString("en-GB", {
									day: "numeric",
									month: "short",
									year: "numeric",
								})}
							</span>
							<Link
								href={`/thinking/${post.slug}`}
								className="mt-1 block font-display text-[20px] font-normal leading-[1.3] text-[--text-primary] transition-colors duration-150 hover:text-[--accent]"
							>
								{post.title}
							</Link>
							<p
								className="mt-1 text-[14px] leading-[1.6] text-[--text-muted]"
								style={{
									fontFamily: "Georgia, 'Times New Roman', serif",
									fontStyle: "italic",
								}}
							>
								{post.excerpt}
							</p>
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
