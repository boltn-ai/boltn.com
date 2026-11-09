import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "#content";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
	title: "Thinking",
	description:
		"Steve Bolton on engineering maturity, software architecture, and AI-assisted development.",
};

export default function ThinkingPage() {
	const published = posts
		.filter((post) => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return (
		<>
			<PageHeader
				headline="Thinking"
				subtitle="Essays on engineering maturity, software architecture and AI-assisted development."
			/>

			<section className="container">
				{published.length === 0 ? (
					<p className="text-ink-2">No posts yet.</p>
				) : (
					<ol>
						{published.map((post, i) => (
							<li
								key={post.slug}
								className="grid grid-cols-1 gap-3 border-b border-rule py-10 first:pt-0 md:grid-cols-12 md:gap-8"
							>
								<p className="agate text-sm text-muted md:col-span-2 md:pt-2">
									<time dateTime={post.date}>
										{new Date(post.date).toLocaleDateString("en-GB", {
											day: "numeric",
											month: "short",
											year: "numeric",
										})}
									</time>
								</p>
								<div className="min-w-0 md:col-span-8">
									<h2 className={i === 0 ? "text-section text-ink" : "text-2xl text-ink"}>
										<Link href={`/thinking/${post.slug}`} className="title-link">
											{post.title}
										</Link>
									</h2>
									<p className="mt-4 max-w-[60ch] text-ink-2">{post.excerpt}</p>
								</div>
								<p className="byline md:col-span-2 md:pt-2 md:text-right">{post.category}</p>
							</li>
						))}
					</ol>
				)}
			</section>
		</>
	);
}
