import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/blog/mdx-components";
import { ShareButtons } from "@/components/blog/share-buttons";
import { posts } from "#content";

interface PostPageProps {
	params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
	return posts
		.filter((post) => post.published)
		.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: PostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = posts.find((p) => p.slug === slug);
	if (!post) return {};
	return {
		title: post.title,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			type: "article",
			publishedTime: post.date,
		},
	};
}

export default async function PostPage({ params }: PostPageProps) {
	const { slug } = await params;
	const post = posts.find((p) => p.slug === slug && p.published);
	if (!post) notFound();

	const readingTime = Math.max(
		1,
		Math.round(post.metadata.wordCount / 200),
	);

	return (
		<article className="mx-auto max-w-3xl px-6 py-16">
			{/* Post header */}
			<header>
				<div className="flex items-center gap-3">
					<span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[--accent]">
						{post.category}
					</span>
					<span className="font-mono text-[10px] tracking-[0.18em] text-[--text-faint]">
						{new Date(post.date).toLocaleDateString("en-GB", {
							day: "numeric",
							month: "short",
							year: "numeric",
						})}
					</span>
				</div>
				<h1 className="mt-4 font-display text-[36px] font-normal leading-[1.15] text-[--text-primary]">
					{post.title}
				</h1>
				<span className="mt-2 block font-mono text-[10px] tracking-[0.18em] text-[--text-faint]">
					{readingTime} min read
				</span>
				<hr className="mt-6 mb-8 border-t border-[--border]" />
			</header>

			{/* Prose content — narrow column for readability */}
			<div className="prose-boltn mx-auto max-w-[65ch]">
				<MDXContent code={post.content} />
			</div>

			{/* Share buttons */}
			<div className="mx-auto max-w-[65ch]">
				<ShareButtons
					title={post.title}
					url={`https://boltn.com/thinking/${post.slug}`}
				/>
			</div>
		</article>
	);
}
